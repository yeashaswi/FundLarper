'use client';

import React from 'react';
import { DimensionScore } from '@/lib/types';

interface RadarScoreChartProps {
  dimensions: {
    competitors: DimensionScore;
    uniqueness: DimensionScore;
    profitability: DimensionScore;
    market: DimensionScore;
    targetAudience: DimensionScore;
    scalability: DimensionScore;
    capitalNeeded: DimensionScore;
    longevity: DimensionScore;
  };
  overallScore: number;
}

export default function RadarScoreChart({ dimensions, overallScore }: RadarScoreChartProps) {
  const axes = [
    { key: 'uniqueness', label: 'Uniqueness & Moat', score: dimensions.uniqueness.score },
    { key: 'market', label: 'Market & TAM', score: dimensions.market.score },
    { key: 'profitability', label: 'Profitability', score: dimensions.profitability.score },
    { key: 'targetAudience', label: 'Target ICP', score: dimensions.targetAudience.score },
    { key: 'scalability', label: 'Scalability', score: dimensions.scalability.score },
    { key: 'capitalNeeded', label: 'Capital Efficiency', score: dimensions.capitalNeeded.score },
    { key: 'longevity', label: 'Longevity', score: dimensions.longevity.score },
    { key: 'competitors', label: 'Competitive Edge', score: dimensions.competitors.score },
  ];

  const size = 380;
  const center = size / 2;
  const radius = size * 0.36;
  const totalAxes = axes.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  const levels = [2, 4, 6, 8, 10];

  const getCoordinates = (value: number, index: number, max: number = 10) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / max) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const scorePoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(axis.score, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-5 bg-[#121212] rounded-2xl border border-[#262626] shadow-op-card">
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EB0029] animate-pulse shadow-[0_0_8px_#EB0029]"></span>
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
            8-Dimension Viability Radar
          </h3>
        </div>
        <div className="text-xs text-op-grey-300 font-mono">
          Avg: <span className="text-[#EB0029] font-bold">{(overallScore / 10).toFixed(1)}/10</span>
        </div>
      </div>

      <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <radialGradient id="oneplusRadarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EB0029" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#B8001F" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.05" />
            </radialGradient>
            <filter id="oneplusGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Polygons */}
          {levels.map((lvl) => {
            const points = axes
              .map((_, i) => {
                const { x, y } = getCoordinates(lvl, i);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={lvl}
                points={points}
                fill="none"
                stroke="#292929"
                strokeWidth={lvl === 10 ? '1.5' : '1'}
                strokeDasharray={lvl === 10 ? undefined : '3 3'}
              />
            );
          })}

          {/* Radial Axis Lines */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(10, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#292929"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled Area */}
          <polygon
            points={scorePoints}
            fill="url(#oneplusRadarGradient)"
            stroke="#EB0029"
            strokeWidth="2.5"
            filter="url(#oneplusGlow)"
            className="transition-all duration-700 ease-out"
          />

          {/* Data Points on vertices */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(axis.score, i);
            return (
              <g key={i} className="group cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill="#EB0029"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="transition-transform group-hover:scale-150"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="9"
                  fill="#EB0029"
                  className="opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
                />
              </g>
            );
          })}

          {/* Labels */}
          {axes.map((axis, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelDistance = radius + 28;
            const x = center + labelDistance * Math.cos(angle);
            const y = center + labelDistance * Math.sin(angle);

            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (Math.cos(angle) > 0.3) textAnchor = 'start';
            else if (Math.cos(angle) < -0.3) textAnchor = 'end';

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                className="text-[11px] font-semibold fill-white font-mono tracking-tight"
              >
                {axis.label}
                <tspan
                  x={x}
                  dy="13"
                  textAnchor={textAnchor}
                  className="fill-[#EB0029] font-bold text-[10px]"
                >
                  {axis.score.toFixed(1)}/10
                </tspan>
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-center gap-5 text-[11px] font-mono text-op-grey-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#EB0029]"></span>
          <span>Strong (≥ 8.0)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-white"></span>
          <span>Moderate (6.0 - 7.9)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#3D3D3D]"></span>
          <span>Critical (&lt; 6.0)</span>
        </div>
      </div>
    </div>
  );
}
