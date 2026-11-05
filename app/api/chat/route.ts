import { NextRequest, NextResponse } from 'next/server';
import { generateChatReply } from '@/lib/chatEngine';
import { InvestorPersona, EvaluationReport } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, persona, currentEvaluation, apiKey } = body as {
      messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
      persona?: InvestorPersona;
      currentEvaluation?: EvaluationReport | null;
      apiKey?: string;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const reply = await generateChatReply(
      messages,
      persona || 'yc_partner',
      currentEvaluation,
      apiKey
    );

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate chat reply' },
      { status: 500 }
    );
  }
}
