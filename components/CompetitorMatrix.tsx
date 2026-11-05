'use client';

import React from 'react';
import { EvaluationReport } from '@/lib/types';
import { Layers, ShieldCheck, Target, Compass } from 'lucide-react';

interface CompetitorMatrixProps {
  report: EvaluationReport;
}

export default function CompetitorMatrix({ report }: CompetitorMatrixProps) {
  const comp = report.dimensions.competitors;
  const existing = comp.existingProjects || [];

  const getThreatBadge = (level: 'Direct' | 'Indirect' | 'Incumbent') => {
    switch (level) {
      case 'Direct':
        return 'bg-[#EB0029] text-white border-[#EB0029]';
      case 'Incumbent':
        return 'bg-[#1E1E1E] text-white border-white/40';
      default:
        return 'bg-[#181818] text-op-grey-300 border-[#2E2E2E]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-white">
      {/* Header Overview Banner */}
      <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] space-y-3 shadow-op-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EB0029]/15 border border-[#EB0029]/30 flex items-center justify-center text-[#EB0029]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">
                Competitor Intelligence & Alternatives
              </h3>
              <p className="text-xs text-op-grey-400">Analysis of market crowding, incumbents, and your differentiation edge</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1A1A1A] border border-[#2E2E2E] text-white">
            Crowding: <span className="text-[#EB0029]">{comp.crowdingLevel}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-op-grey-200 leading-relaxed pt-1">
          {comp.analysis}
        </p>
      </div>

      {/* Identified Existing Competitors & Projects */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#EB0029]" />
          <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
            Identified Competitors & Market Alternatives
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {existing.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#121212] border border-[#262626] hover:border-[#3D3D3D] transition flex flex-col justify-between space-y-3 shadow-op-card"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-white">{item.name}</h5>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getThreatBadge(item.threatLevel)}`}>
                    {item.threatLevel}
                  </span>
                </div>
                <p className="text-xs text-op-grey-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#262626]">
                <p className="text-[10px] uppercase font-mono text-[#EB0029] font-bold mb-1">
                  Your Differentiator / Moat
                </p>
                <p className="text-xs text-op-grey-100 leading-relaxed">
                  {item.differentiator}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The White Space Opportunity */}
      <div className="p-6 rounded-2xl bg-[#121212] border-l-4 border-l-[#EB0029] border border-[#262626] shadow-op-card space-y-2">
        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest font-mono">
          <Compass className="w-4 h-4 text-[#EB0029]" />
          <span>The Unoccupied White Space</span>
        </div>
        <p className="text-xs sm:text-sm text-op-grey-100 leading-relaxed">
          {comp.whiteSpace}
        </p>
      </div>
    </div>
  );
}
