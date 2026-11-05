'use client';

import React, { useState } from 'react';
import { EvaluationReport } from '@/lib/types';
import { getOverallScoreBadge } from '@/lib/utils';
import RadarScoreChart from './RadarScoreChart';
import DimensionCard from './DimensionCard';
import {
  Sparkles,
  MessageSquare,
  Download,
  AlertOctagon,
  Quote,
  Copy,
  Check,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Flame,
  Activity,
  Layers,
  Compass
} from 'lucide-react';

interface ScorecardViewProps {
  report: EvaluationReport;
  onOpenChat: () => void;
  onOpenExport: () => void;
}

export default function ScorecardView({ report, onOpenChat, onOpenExport }: ScorecardViewProps) {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const badge = getOverallScoreBadge(report.overallScore);
  const dims = report.dimensions;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(report.elevatorPitchRewrite);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-white">
      {/* 1. TOP HERO: Overall Viability & Grade */}
      <div className={`relative p-6 sm:p-8 rounded-3xl bg-[#121212] border border-[#262626] ${badge.glowClass} overflow-hidden shadow-op-card`}>
        {/* Subtle OnePlus Red gradient accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EB0029]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EB0029] text-white tracking-wider shadow-[0_0_10px_rgba(235,0,41,0.5)]">
                {badge.label}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#1F1F1F] text-op-grey-100 border border-[#2E2E2E]">
                GRADE: <span className="text-white font-extrabold">{report.viabilityGrade}</span>
              </span>
              <span className="text-xs text-op-grey-400 font-mono">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {report.projectName}
            </h2>

            <p className="text-sm font-semibold text-white">
              "{report.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-op-grey-200 leading-relaxed">
              {report.verdictSummary}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenChat}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EB0029] hover:bg-[#B8001F] text-white font-bold text-xs uppercase tracking-wider transition shadow-op-red"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Interrogate with Val</span>
              </button>
              <button
                onClick={onOpenExport}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-white text-xs font-semibold border border-[#2E2E2E] transition"
              >
                <Download className="w-4 h-4" />
                <span>Export Validator Memo</span>
              </button>
            </div>
          </div>

          {/* Viability Index Dial */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-7 rounded-2xl bg-[#0A0A0A] border border-[#2E2E2E] shadow-2xl min-w-[210px] shrink-0 self-center lg:self-auto text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-op-grey-400 mb-1">
              VIABILITY SCORE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-[#EB0029] font-mono tracking-tighter">
                {report.overallScore}
              </span>
              <span className="text-op-grey-400 text-lg font-mono">/100</span>
            </div>
            <div className="mt-2.5">
              <span className="text-xs font-bold text-white uppercase font-mono px-2.5 py-0.5 rounded bg-[#1A1A1A] border border-[#333333]">
                Grade {report.viabilityGrade}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ELEVATOR PITCH REWRITE (ValidatorAI Signature) */}
      <div className="p-6 rounded-2xl bg-[#121212] border-l-4 border-l-[#EB0029] border border-[#262626] shadow-op-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EB0029]" />
            <h3 className="text-xs font-bold uppercase tracking-widest font-mono text-white">
              The 2-Sentence Pitch Rewrite (Use This With Investors)
            </h3>
          </div>
          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] border border-[#2E2E2E] text-xs font-medium text-white transition"
          >
            {copiedPitch ? <Check className="w-3.5 h-3.5 text-[#EB0029]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPitch ? 'Copied' : 'Copy Pitch'}</span>
          </button>
        </div>
        <p className="text-sm sm:text-base font-semibold text-white leading-relaxed italic">
          "{report.elevatorPitchRewrite}"
        </p>
      </div>

      {/* 3. SIMULATED SKEPTICAL CUSTOMER & VC GRILLING (ValidatorAI Core Experience) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Skeptical Customer Objection */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] space-y-3 shadow-op-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EB0029] flex items-center gap-1.5">
                <Quote className="w-4 h-4" />
                <span>Simulated Customer Objection</span>
              </span>
              <span className="text-[10px] text-op-grey-400 font-mono">Target Buyer</span>
            </div>

            <blockquote className="text-xs sm:text-sm font-medium text-white leading-relaxed border-l-2 border-[#EB0029] pl-3 italic">
              {report.simulatedCustomerObjection.quote}
            </blockquote>

            <p className="text-[11px] text-op-grey-300 font-mono">
              — {report.simulatedCustomerObjection.customerProfile}
            </p>
          </div>

          <div className="pt-3 border-t border-[#262626] space-y-1">
            <span className="text-[10px] font-mono uppercase text-op-grey-400 font-bold block">
              Why They Resist & How to Win:
            </span>
            <p className="text-xs text-op-grey-200 leading-relaxed">
              {report.simulatedCustomerObjection.objectionAnalysis}
            </p>
          </div>
        </div>

        {/* Simulated VC Diligence Grilling */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] space-y-3 shadow-op-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#EB0029]" />
                <span>Simulated VC Diligence Pushback</span>
              </span>
              <span className="text-[10px] text-op-grey-400 font-mono">Lead Partner</span>
            </div>

            <blockquote className="text-xs sm:text-sm font-medium text-white leading-relaxed border-l-2 border-white pl-3 italic">
              {report.simulatedVcGrilling.quote}
            </blockquote>

            <p className="text-[11px] text-op-grey-300 font-mono">
              — {report.simulatedVcGrilling.investorProfile}
            </p>
          </div>

          <div className="pt-3 border-t border-[#262626] space-y-1">
            <span className="text-[10px] font-mono uppercase text-op-grey-400 font-bold block">
              Required Defense Strategy:
            </span>
            <p className="text-xs text-op-grey-200 leading-relaxed">
              {report.simulatedVcGrilling.defenseAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* 4. 4-QUADRANT SWOT MATRIX */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#EB0029]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Validator SWOT Matrix
            </h3>
          </div>
          <span className="text-xs text-op-grey-400 font-mono">Core Strategic Analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-mono tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>Strengths (Internal Advantages)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-op-grey-200">
              {report.swot.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EB0029] font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-mono tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB0029]"></span>
              <span>Weaknesses (Internal Blind Spots)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-op-grey-200">
              {report.swot.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EB0029] font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-mono tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>Opportunities (External Growth Vectors)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-op-grey-200">
              {report.swot.opportunities.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EB0029] font-bold">•</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-mono tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB0029]"></span>
              <span>Threats (External Market Hazards)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-op-grey-200">
              {report.swot.threats.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EB0029] font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. TOP FATAL FLAWS & 7-DAY NO-CODE TEST */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Top Fatal Flaws */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-[#121212] border border-[#EB0029]/40 space-y-3 shadow-op-card">
          <div className="flex items-center gap-2 text-[#EB0029]">
            <ShieldAlert className="w-5 h-5" />
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
              Top 3 Fatal Flaws (Why This Could Die)
            </h4>
          </div>
          <div className="space-y-2.5 pt-1">
            {report.topFatalFlaws.map((flaw, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E]">
                <span className="w-5 h-5 rounded-full bg-[#EB0029] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-op-grey-100 leading-relaxed">
                  {flaw}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day No-Code Validation Test */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-[#121212] border border-[#2E2E2E] space-y-3 shadow-op-card flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#EB0029]" />
                <span>7-Day No-Code Validation Sprint</span>
              </span>
              <span className="text-[10px] text-white font-mono bg-[#1F1F1F] px-2 py-0.5 rounded border border-[#333333]">
                Cost: {report.sevenDayNoCodeTest.estimatedCost}
              </span>
            </div>

            <h5 className="text-sm font-bold text-white pt-1">
              {report.sevenDayNoCodeTest.title}
            </h5>

            <p className="text-xs text-op-grey-200 leading-relaxed">
              {report.sevenDayNoCodeTest.testDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-[#262626]">
            <span className="text-[10px] font-mono uppercase text-[#EB0029] font-bold block mb-0.5">
              Success Metric to Prove Demand:
            </span>
            <p className="text-xs text-white font-medium">
              {report.sevenDayNoCodeTest.successMetric}
            </p>
          </div>
        </div>
      </div>

      {/* 6. RADAR CHART & METRICS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <RadarScoreChart dimensions={dims} overallScore={report.overallScore} />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626]">
              <p className="text-[10px] text-op-grey-400 uppercase font-mono">TAM Estimate</p>
              <p className="text-sm font-bold text-white mt-0.5 truncate">{dims.market.tam}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626]">
              <p className="text-[10px] text-op-grey-400 uppercase font-mono">Gross Margin</p>
              <p className="text-sm font-bold text-[#EB0029] mt-0.5">{dims.profitability.estimatedGrossMargin}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626]">
              <p className="text-[10px] text-op-grey-400 uppercase font-mono">Funding Target</p>
              <p className="text-sm font-bold text-white mt-0.5 truncate">{dims.capitalNeeded.estimatedFunding}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626]">
              <p className="text-[10px] text-op-grey-400 uppercase font-mono">Moat Architecture</p>
              <p className="text-xs font-semibold text-white mt-0.5 truncate">{dims.uniqueness.moatType}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626]">
              <p className="text-[10px] text-op-grey-400 uppercase font-mono">Customer Urgency</p>
              <p className="text-xs font-semibold text-[#EB0029] mt-0.5">{dims.targetAudience.urgencyOfPain}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626]">
              <p className="text-[10px] text-op-grey-400 uppercase font-mono">Competitor Density</p>
              <p className="text-xs font-semibold text-white mt-0.5">{dims.competitors.crowdingLevel}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#161616] border border-[#2E2E2E] space-y-2">
            <span className="text-xs font-bold uppercase font-mono text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EB0029]"></span>
              <span>Priority Dealbreakers to Resolve</span>
            </span>
            <ul className="space-y-1.5 text-xs text-op-grey-200">
              {report.actionPlan.criticalFixes.slice(0, 3).map((fix, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#EB0029] font-bold font-mono">#{idx + 1}</span>
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 7. THE 8 IN-DEPTH DIMENSION CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              In-Depth 8-Dimension Evaluation
            </h3>
            <p className="text-xs text-op-grey-400">
              Granular analysis across every operational and investor dimension
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DimensionCard
            dimensionKey="competitors"
            dimension={dims.competitors}
            tags={[
              { label: 'Crowding', value: dims.competitors.crowdingLevel },
              { label: 'Mapped', value: `${dims.competitors.existingProjects.length} players` },
            ]}
          />

          <DimensionCard
            dimensionKey="uniqueness"
            dimension={dims.uniqueness}
            tags={[
              { label: 'Moat', value: dims.uniqueness.moatType },
              { label: 'Defensibility', value: dims.uniqueness.defensibilityLevel },
            ]}
          />

          <DimensionCard
            dimensionKey="profitability"
            dimension={dims.profitability}
            tags={[
              { label: 'Model', value: dims.profitability.revenueModel },
              { label: 'Gross Margin', value: dims.profitability.estimatedGrossMargin },
              { label: 'Pricing Power', value: dims.profitability.pricingPower },
            ]}
          />

          <DimensionCard
            dimensionKey="market"
            dimension={dims.market}
            tags={[
              { label: 'TAM', value: dims.market.tam },
              { label: 'SOM', value: dims.market.som },
            ]}
          />

          <DimensionCard
            dimensionKey="targetAudience"
            dimension={dims.targetAudience}
            tags={[
              { label: 'Urgency', value: dims.targetAudience.urgencyOfPain },
              { label: 'Willingness to Pay', value: dims.targetAudience.willingnessToPay },
            ]}
          />

          <DimensionCard
            dimensionKey="scalability"
            dimension={dims.scalability}
            tags={[
              { label: 'Friction', value: dims.scalability.operationalFriction },
            ]}
          />

          <DimensionCard
            dimensionKey="capitalNeeded"
            dimension={dims.capitalNeeded}
            tags={[
              { label: 'Stage', value: dims.capitalNeeded.stage },
              { label: 'Funding Target', value: dims.capitalNeeded.estimatedFunding },
              { label: 'Runway', value: dims.capitalNeeded.runwayMonths },
            ]}
          />

          <DimensionCard
            dimensionKey="longevity"
            dimension={dims.longevity}
            tags={[
              { label: 'Big Tech Risk', value: 'Insulated by Vertical' },
              { label: 'AI Obsolescence', value: dims.longevity.aiObsolescenceRisk },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
