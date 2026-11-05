'use client';

import React, { useState } from 'react';
import { EvaluationReport } from '@/lib/types';
import { AlertCircle, Lightbulb, HelpCircle, Calendar, ChevronDown, ChevronUp, Check, ArrowRight, Zap } from 'lucide-react';

interface ActionRoadmapViewProps {
  report: EvaluationReport;
  onGrillInChat: (question: string) => void;
}

export default function ActionRoadmapView({ report, onGrillInChat }: ActionRoadmapViewProps) {
  const plan = report.actionPlan;
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-white">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] space-y-2 shadow-op-card">
        <div className="flex items-center gap-2 text-[#EB0029]">
          <Zap className="w-5 h-5" />
          <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">
            Action Roadmap: What Can Be Better
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-op-grey-300">
          Tactical fixes, pivot opportunities, and the specific answers required to survive institutional diligence.
        </p>
      </div>

      {/* 1. Critical Dealbreaker Fixes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#EB0029]" />
          <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
            Immediate Dealbreakers to Fix ({plan.criticalFixes.length})
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plan.criticalFixes.map((fix, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#121212] border border-[#262626] flex items-start gap-3 hover:border-[#3D3D3D] transition shadow-op-card"
            >
              <div className="w-6 h-6 rounded-full bg-[#EB0029] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-op-grey-200 leading-relaxed">
                {fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Strategic Pivot Angles */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-white" />
          <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
            High-Impact Pivot & Expansion Vectors
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.pivotSuggestions.map((pivot, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#EB0029]/50 transition space-y-3 flex flex-col justify-between shadow-op-card"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EB0029]"></span>
                  <h5 className="text-sm font-bold text-white">{pivot.title}</h5>
                </div>
                <p className="text-xs text-op-grey-300 leading-relaxed">
                  {pivot.rationale}
                </p>
              </div>

              <div className="pt-3 border-t border-[#262626]">
                <span className="text-[10px] font-mono uppercase text-[#EB0029] font-bold block mb-0.5">
                  Expected Impact
                </span>
                <p className="text-xs text-white font-medium">
                  {pivot.expectedImpact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Hard Investor Questions & Answers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#EB0029]" />
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
              Tough Investor Diligence Questions & Model Defense
            </h4>
          </div>
          <span className="text-xs text-op-grey-400 font-mono">Click to expand model answers</span>
        </div>

        <div className="space-y-3">
          {plan.investorHardQuestions.map((q, idx) => {
            const isOpen = openQuestionIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#121212] border border-[#262626] overflow-hidden transition shadow-op-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenQuestionIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-[#161616] transition"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[#EB0029] mt-0.5">Q{idx + 1}.</span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      "{q.question}"
                    </span>
                  </div>
                  <div className="text-op-grey-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 border-t border-[#262626] space-y-3 text-xs bg-[#0A0A0A]">
                    <div className="p-2.5 rounded-lg bg-[#181818] border border-[#2E2E2E] text-white">
                      <span className="font-bold mr-1 text-[#EB0029]">Why investors ask this:</span>
                      {q.whyTheyAsk}
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#121212] border-l-2 border-l-[#EB0029] border border-[#262626] text-white space-y-1">
                      <div className="text-[#EB0029] font-bold text-[11px] uppercase tracking-wider font-mono">
                        Recommended Defense Strategy:
                      </div>
                      <p className="leading-relaxed text-xs text-op-grey-100">
                        {q.recommendedAnswer}
                      </p>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => onGrillInChat(q.question)}
                        className="flex items-center gap-1.5 text-xs text-[#EB0029] hover:underline font-bold uppercase tracking-wider font-mono"
                      >
                        <span>Simulate this defense in Chat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 90-Day Execution Milestones */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#EB0029]" />
          <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
            Suggested 90-Day Sprint Milestones
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.ninetyDayMilestones.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#121212] border border-[#262626] space-y-2 relative shadow-op-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-white bg-[#EB0029] px-2 py-0.5 rounded tracking-wider">
                  {m.timeline}
                </span>
                <span className="text-xs text-op-grey-400 font-mono">Phase {idx + 1}</span>
              </div>
              <h5 className="text-xs font-bold text-white pt-1">{m.focus}</h5>
              <p className="text-xs text-op-grey-300 leading-relaxed">{m.deliverable}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
