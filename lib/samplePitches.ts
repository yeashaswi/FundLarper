export interface SamplePitch {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullPitch: string;
}

export const SAMPLE_PITCHES: SamplePitch[] = [
  {
    id: 'ai-dentist-ops',
    name: 'DentisPulse AI',
    category: 'Vertical B2B SaaS',
    shortDescription: 'Autonomous outbound booking & insurance prior-authorization agent for dental practices.',
    fullPitch: `DentisPulse AI is an autonomous AI voice and workflow agent built specifically for private dental practices (150,000+ in the US alone). 
    
Currently, dental front-office staff spend 4.5 hours daily chasing overdue patient hygiene checkups and battling insurance companies over prior authorizations, resulting in an average $140,000 in lost annual production per chair. 

DentisPulse integrates directly with legacy dental practice management systems (Dentrix, Eaglesoft, OpenDental) via a desktop local gateway. It proactively reaches out via natural voice and SMS to schedule unscheduled treatment plans, confirms insurance eligibility in real-time, and files pre-authorizations automatically with zero human intervention.

We charge $599/month per clinic plus a $15 success fee per resurrected unscheduled patient appointment. Unit economics: $0 marginal customer cost after onboarded, LTV/CAC ~ 5.5x.`
  },
  {
    id: 'decentralized-gpu',
    name: 'NeuroMesh Grid',
    category: 'AI Infrastructure',
    shortDescription: 'P2P orchestration layer aggregating underutilized enterprise H100s for distributed inference.',
    fullPitch: `NeuroMesh Grid is a decentralized compute orchestration layer that turns idle enterprise AI clusters and secondary data-center GPUs into an on-demand, fault-tolerant inference fabric at 65% lower cost than AWS/Azure.

While foundation model training requires ultra-high bandwidth InfiniBand, LLM and diffusion model inference can be efficiently partitioned across geographic nodes using pipeline parallelism and speculation.

Our proprietary consensus & speculative verification engine checks output tensor accuracy with sub-3% verification overhead, eliminating malicious or inaccurate worker nodes.

Revenue model: 18% protocol take-rate on all compute transactions. We have signed LOIs with 4 tier-3 European data centers representing 1,200 idle A100/H100 equivalents.`
  },
  {
    id: 'food-waste-logistics',
    name: 'PerishRoute',
    category: 'Climate & Supply Chain',
    shortDescription: 'Dynamic cold-chain rerouting to liquidate surplus agricultural produce before spoil.',
    fullPitch: `Over 30% of harvested commercial produce spoils in transit or warehouse holding due to unexpected carrier delays, port congestion, or retail order cancellations, costing shippers $35B annually in North America alone.

PerishRoute deploys IoT cellular ethylene/temperature sensors into standard pallets and connects to an algorithmic secondary market engine. When sensors detect accelerated ripening or when a buyer rejects a load, PerishRoute automatically reroutes the refrigerated truck in mid-transit to the nearest discounted wholesale food processor, juicer, or regional discount grocer.

We charge the shipper an 8% transaction fee on salvaged load value and sell anonymized perishable transit data to cargo insurers.`
  },
  {
    id: 'ai-code-reviewer',
    name: 'Synthetix PR Guard',
    category: 'Developer Tools',
    shortDescription: 'Deterministic architectural invariant checker for AI-generated code pull requests.',
    fullPitch: `As AI coding tools (Copilot, Cursor) 5x the volume of code written, engineering leaders face an unprecedented crisis of "code review fatigue" and architectural drift. Code compiles and passes unit tests, but violates distributed system invariants, security tenancy boundaries, and ORM database N+1 traps.

Synthetix PR Guard generates an abstract execution graph of every PR and checks it against team-defined architectural contracts (e.g., 'no customer tenant ID may ever be queried without organization_id filter', 'payments service must never be called from client components').

It blocks pull requests before human engineers waste 30 minutes reading generated boilerplate. Pricing: $29/seat/month for teams up to 50 engineers; $99/seat/month for enterprise with on-prem Gitlab/GitHub integrations.`
  }
];
