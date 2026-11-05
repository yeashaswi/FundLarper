import { InvestorPersona, EvaluationReport, ChatMessage } from './types';
import { INVESTOR_PERSONAS } from './personas';

export async function generateChatReply(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  persona: InvestorPersona,
  currentEvaluation?: EvaluationReport | null,
  apiKey?: string
): Promise<string> {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const personaConfig = INVESTOR_PERSONAS[persona] || INVESTOR_PERSONAS.yc_partner;

  const evaluationContext = currentEvaluation
    ? `\nCURRENT EVALUATION STATUS:
Project Name: ${currentEvaluation.projectName}
Overall Score: ${currentEvaluation.overallScore}/100 (${currentEvaluation.verdictTier})
Executive Summary: ${currentEvaluation.verdictSummary}
Moat Score: ${currentEvaluation.dimensions.uniqueness.score}/10 (${currentEvaluation.dimensions.uniqueness.moatType})
Competitor Crowding: ${currentEvaluation.dimensions.competitors.score}/10 (${currentEvaluation.dimensions.competitors.crowdingLevel})
Profitability Score: ${currentEvaluation.dimensions.profitability.score}/10 (Margin: ${currentEvaluation.dimensions.profitability.estimatedGrossMargin})
Capital Needed: ${currentEvaluation.dimensions.capitalNeeded.estimatedFunding}
Top Critical Fix: ${currentEvaluation.actionPlan.criticalFixes[0] || 'Clarify distribution channel'}`
    : `\nNo formal evaluation scorecard has been generated yet. You are having an initial pitch interview with the founder.`;

  const systemInstruction = `You are ${personaConfig.name}.
Persona Style: ${personaConfig.tagline}
Tone: ${personaConfig.toneDescription}

Your objective:
1. Actively grill, advise, and guide the founder on their startup idea, project files, and business model.
2. Ask pointed, uncomfortably specific questions when they give vague answers (e.g. asking for specific numbers, first 10 customers, how they stop Google from copying them).
3. If they ask for help (e.g., "how do I fix my moat?", "how do I price this?"), provide sharp, actionable advice with real-world examples.
4. Keep responses punchy, formatted with clear markdown bullet points, bold text for key takeaways, and zero corporate fluff.
${evaluationContext}`;

  if (effectiveKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: systemInstruction }]
              },
              ...messages.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
              }))
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch (e) {
      console.warn('Gemini chat call failed, using built-in interactive coach:', e);
    }
  }

  // Realistic persona-aware conversational reply generator
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

  if (lastUserMessage.includes('moat') || lastUserMessage.includes('unique') || lastUserMessage.includes('copy')) {
    return `### 🛡️ How to Build an Unbreakable Moat Here

If your differentiator is just *"we have a better UI"* or *"we use a custom system prompt"*, you don't have a moat—you have a 60-day head start.

Here is how you actually build defensibility:

1. **Workflow Entanglement (High Switching Costs)**:
   Embed into the operational system of record. If ripping your tool out means breaking their daily payroll or patient appointments, churn drops to near zero.
2. **Proprietary Data Loop**:
   Every transaction processed should make the system 1% smarter for that specific client. Generic LLMs cannot replicate data stored strictly inside customer firewalls.
3. **Distribution Lock-in**:
   Partner with the legacy software vendors that target businesses already trust. It's much easier to ride on top of an established rail than dig your own tunnel.

**Question for you:** What is the single piece of data you will collect from your first 20 customers that nobody else has access to?`;
  }

  if (lastUserMessage.includes('price') || lastUserMessage.includes('revenue') || lastUserMessage.includes('charge') || lastUserMessage.includes('profit')) {
    return `### 💰 The Pricing Strategy You Should Use

Most founders undercharge because they lack confidence in the ROI they generate.

Here is the golden rule: **Charge at least 10-20% of the quantifiable value or cost savings you produce.**

* **Don't do $29/mo self-serve** if this requires onboarding support. You will burn out supporting low-ticket users.
* **Charge an upfront Pilot / Setup Fee** ($1,500 - $3,000) + a recurring monthly SaaS license ($499 - $1,200/mo). The setup fee filters out tire-kickers and finances your early customer onboarding.
* **Tie expansion to volume**: Add a variable component (e.g. per active transaction, per seat, or per lead generated).

Who is writing the check right now, and what line item in their existing budget does this replace?`;
  }

  if (lastUserMessage.includes('first 10') || lastUserMessage.includes('customer') || lastUserMessage.includes('acquire') || lastUserMessage.includes('marketing')) {
    return `### 🎯 How to Get Your First 10 Paying Customers in 21 Days

Stop running paid ads. Do not buy Google AdWords. At this stage, you need high-bandwidth founder-led sales:

1. **The "Cold Audit" Strategy**:
   Find 50 target buyers on LinkedIn or local registries. Don't pitch them. Send them a 90-second Loom showing a specific bug, lost revenue leak, or inefficiency in their current setup.
2. **Niche Communities & Trade Associations**:
   Every industry has a private Slack, Discord, or regional conference. Reach out to the top 5 most vocal contributors and offer to build a custom solution for free in exchange for a case study and video testimonial.
3. **The Design Partner Agreement**:
   *"We are onboarding only 5 founding clinics this month. In exchange for your daily feedback, you get locked in at 50% lifetime pricing and direct access to my personal cell phone."*

Have you spoken to at least 5 potential buyers face-to-face this week? What did they say?`;
  }

  // General back-and-forth grilling
  if (persona === 'yc_partner') {
    return `### 🟧 YC Partner Feedback

Let's cut right to the point. Here are the 2 things that will make or break this:

1. **The "Hair on Fire" Test**:
   Is this problem something the customer wakes up at 2 AM thinking about, or is it a nice-to-have "vitamin"? Vitamins don't get bought during a budget crunch.
2. **Speed of Execution**:
   How fast can you get a raw, imperfect version into the hands of 3 users? Not in 3 months—by next Friday. What is the smallest slice of this you can manually run tomorrow?

Tell me: what is the single biggest reason a prospect will say **"No"** when you ask them to pay?`;
  }

  if (persona === 'sand_hill_vc') {
    return `### 🏛️ Venture Partner Evaluation

From an institutional investor standpoint, here is how we look at this deal:

* **Category Creation Potential**: Are you building a feature that gets absorbed by an incumbent suite, or is this the wedge into a brand-new multi-billion dollar category?
* **Defensibility Against Frontier Models**: When the next generation of multimodal LLMs comes out with native reasoning, does your software get destroyed, or does it get 10x better and cheaper to run?
* **Power Law Distribution**: To justify venture returns, this needs to reach $100M ARR in 7 years. 

What is your wedge product, and what does the business look like at 10,000 customers?`;
  }

  return `### 🚀 Actionable Feedback

Your thesis has strong fundamentals, but remember: **startups almost never fail from lack of code; they fail from lack of customer urgency.**

Let's address the immediate priorities:
1. **Validate Willingness to Pay**: Have you secured any letters of intent (LOIs) or pre-orders?
2. **Simplify the Value Proposition**: Can you explain what this does in 10 words or less so that an exhausted customer immediately grasps the benefit?

What is your immediate focus for this week? Building more features, or getting customer commitments?`;
}
