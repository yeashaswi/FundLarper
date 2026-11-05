export type InvestorPersona = 
  | 'val_ai'
  | 'yc_partner'
  | 'sand_hill_vc'
  | 'indie_hacker'
  | 'angel_operator';

export interface PersonaConfig {
  id: InvestorPersona;
  name: string;
  tagline: string;
  avatar: string;
  toneDescription: string;
}

export interface UploadedProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string; // extracted text content
  pageCount?: number;
  summary?: string;
  uploadedAt: string;
}

export interface CompetitorItem {
  name: string;
  description: string;
  threatLevel: 'Direct' | 'Indirect' | 'Incumbent';
  differentiator: string;
}

export interface DimensionScore {
  score: number; // 1 - 10
  title: string;
  verdict: string;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
  keyMetricOrInsight?: string;
}

export interface EvaluationReport {
  id: string;
  projectName: string;
  tagline: string;
  overallScore: number; // 0 - 100
  viabilityGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';
  verdictTier: 
    | '🦄 Unicorn Trajectory (Top 1%)'
    | '⚡ High-Potential Seed (Top 10%)'
    | '💼 Viable Cashflow Niche'
    | '⚠️ Critical Structural Risks'
    | '💀 High Risk / ZIRP Delusion';
  verdictSummary: string;
  elevatorPitch: string;
  
  // ValidatorAI Signature Feature 1: The Razor-Sharp Pitch Rewrite
  elevatorPitchRewrite: string;

  // ValidatorAI Signature Feature 2: Simulated Skeptical Customer Objection
  simulatedCustomerObjection: {
    quote: string;
    customerProfile: string;
    objectionAnalysis: string;
  };

  // ValidatorAI Signature Feature 3: Simulated VC / Incubator Partner Pushback
  simulatedVcGrilling: {
    quote: string;
    investorProfile: string;
    defenseAdvice: string;
  };

  // ValidatorAI Signature Feature 4: 4-Quadrant SWOT Matrix
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };

  // Top 3 Fatal Flaws that could kill the business
  topFatalFlaws: string[];

  // 7-Day No-Code Validation Experiment
  sevenDayNoCodeTest: {
    title: string;
    testDescription: string;
    successMetric: string;
    estimatedCost: string;
  };

  // The 8 Core In-Depth Investment Dimensions
  dimensions: {
    competitors: DimensionScore & {
      crowdingLevel: 'Low Crowding' | 'Moderate Competition' | 'Hyper Saturated';
      existingProjects: CompetitorItem[];
      whiteSpace: string;
    };
    uniqueness: DimensionScore & {
      moatType: 'Network Effects' | 'Proprietary Tech & IP' | 'Switching Costs' | 'Distribution Flywheel' | 'Commodity / Low Barrier';
      defensibilityLevel: 'High' | 'Medium' | 'Fragile';
    };
    profitability: DimensionScore & {
      revenueModel: string;
      unitEconomics: string;
      estimatedGrossMargin: string;
      pricingPower: 'High' | 'Moderate' | 'Price Taker';
    };
    market: DimensionScore & {
      tam: string;
      sam: string;
      som: string;
      tailwinds: string[];
      headwinds: string[];
    };
    targetAudience: DimensionScore & {
      icp: string;
      buyerPersona: string;
      urgencyOfPain: 'Hair on Fire' | 'Major Pain' | 'Moderate' | 'Vitamin / Nice to Have';
      willingnessToPay: 'High' | 'Medium' | 'Low / Skeptical';
    };
    scalability: DimensionScore & {
      scalingBottlenecks: string[];
      operationalFriction: 'Low (Software)' | 'Medium (Hybrid)' | 'High (Ops heavy)';
    };
    capitalNeeded: DimensionScore & {
      stage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Bootstrappable';
      estimatedFunding: string;
      runwayMonths: string;
      burnProfile: 'Capital Efficient' | 'Moderate Burn' | 'Capital Intensive';
      capitalAllocation: { category: string; percentage: number }[];
    };
    longevity: DimensionScore & {
      fiveYearOutlook: string;
      bigTechRisk: string;
      regulatoryRisk: 'Low' | 'Medium' | 'High';
      aiObsolescenceRisk: 'Low' | 'Medium' | 'Severe';
    };
  };

  // Strategic Action Plan
  actionPlan: {
    criticalFixes: string[];
    pivotSuggestions: {
      title: string;
      rationale: string;
      expectedImpact: string;
    }[];
    investorHardQuestions: {
      question: string;
      whyTheyAsk: string;
      recommendedAnswer: string;
    }[];
    ninetyDayMilestones: {
      timeline: string;
      focus: string;
      deliverable: string;
    }[];
  };

  filesAnalyzed?: {
    name: string;
    type: string;
    keyInsights: string[];
  }[];
  
  personaUsed: InvestorPersona;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  files?: { name: string; type: string }[];
  evaluationId?: string;
  isStreaming?: boolean;
}
