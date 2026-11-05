'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, AlertTriangle, Lightbulb, Shield, TrendingUp, Users, Zap, DollarSign, Clock, Layers } from 'lucide-react';
import { DimensionScore } from '@/lib/types';
import { getScoreColor } from '@/lib/utils';

interface DimensionCardProps {
  dimensionKey: string;
  dimension: DimensionScore;
  icon?: React.ReactNode;
  tags?: { label: string; value: string }[];
}

export default function DimensionCard({
  dimensionKey,
  dimension,
  icon,
  tags = [],
}: DimensionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const scoreColors = getScoreColor(dimension.score);

  const getIcon = () => {
    if (icon) return icon;
    switch (dimensionKey) {
      case 'competitors':
        return <Layers className="w-4 h-4" />;
      case 'uniqueness':
        return <Shield className="w-4 h-4" />;
      case 'profitability':
        return <DollarSign className="w-4 h-4" />;
      case 'market':
        return <TrendingUp className="w-4 h-4" />;
      case 'targetAudience':
        return <Users className="w-4 h-4" />;
      case 'scalability':
        return <Zap className="w-4 h-4" />;
      case 'capitalNeeded':
        return <DollarSign className="w-4 h-4" />;
      case 'longevity':
        return <Clock className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#3D3D3D] transition shadow-op-card">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 cursor-pointer select-none bg-[#161616] hover:bg-[#1A1A1A] transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EB0029]/15 text-[#EB0029] border border-[#EB0029]/30">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">{dimension.title}</h4>
            <p className="text-xs text-op-grey-300">{dimension.verdict}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Numerical Score Badge */}
          <div className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#EB0029] text-white shadow-[0_0_8px_rgba(235,0,41,0.4)]">
            {dimension.score.toFixed(1)} / 10
          </div>
          <button className="text-op-grey-400 hover:text-white transition">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar under header: OnePlus Red */}
      <div className="w-full h-1 bg-[#1F1F1F]">
        <div
          className="h-full bg-[#EB0029] transition-all duration-700"
          style={{ width: `${(dimension.score / 10) * 100}%` }}
        />
      </div>

      {/* Body Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 text-xs">
          {/* Tags / Metadata Pills */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-0.5">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#1C1C1C] border border-[#2E2E2E] text-white text-[11px]"
                >
                  <span className="text-op-grey-400 mr-1.5">{tag.label}:</span>
                  <span className="font-semibold text-white">{tag.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Narrative */}
          <p className="text-op-grey-100 leading-relaxed text-xs">
            {dimension.analysis}
          </p>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {dimension.strengths && dimension.strengths.length > 0 && (
              <div className="p-3 rounded-xl bg-[#181818] border border-[#2E2E2E] space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-bold text-[11px] font-mono uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Key Strengths</span>
                </div>
                <ul className="space-y-1 text-op-grey-200 text-[11px]">
                  {dimension.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#EB0029] font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dimension.weaknesses && dimension.weaknesses.length > 0 && (
              <div className="p-3 rounded-xl bg-[#EB0029]/10 border border-[#EB0029]/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#EB0029] font-bold text-[11px] font-mono uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#EB0029]" />
                  <span>Risks & Vulnerabilities</span>
                </div>
                <ul className="space-y-1 text-op-grey-100 text-[11px]">
                  {dimension.weaknesses.map((weak, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#EB0029] font-bold">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Key Metric or Insight Highlight */}
          {dimension.keyMetricOrInsight && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181818] border border-[#2E2E2E] text-white text-[11px]">
              <Lightbulb className="w-3.5 h-3.5 text-[#EB0029] shrink-0" />
              <span>
                <strong className="text-white">Validator Insight:</strong> {dimension.keyMetricOrInsight}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
