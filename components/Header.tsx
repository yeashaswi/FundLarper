'use client';

import React, { useState } from 'react';
import { Key, RotateCcw, ChevronDown, Check, Lightbulb } from 'lucide-react';
import { InvestorPersona } from '@/lib/types';
import { INVESTOR_PERSONAS } from '@/lib/personas';
import { SAMPLE_PITCHES, SamplePitch } from '@/lib/samplePitches';

interface HeaderProps {
  currentPersona: InvestorPersona;
  onPersonaChange: (persona: InvestorPersona) => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  onSelectSamplePitch: (sample: SamplePitch) => void;
  onReset: () => void;
}

export default function Header({
  currentPersona,
  onPersonaChange,
  onOpenApiKeyModal,
  hasCustomKey,
  onSelectSamplePitch,
  onReset,
}: HeaderProps) {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showSampleMenu, setShowSampleMenu] = useState(false);

  const activePersona = INVESTOR_PERSONAS[currentPersona] || INVESTOR_PERSONAS.val_ai;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262626] bg-[#0A0A0A]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo: OnePlus Aesthetic */}
        <div className="flex items-center gap-3">
          <div
            onClick={onReset}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* OnePlus Iconic Red Square */}
            <div className="w-8 h-8 rounded-lg bg-[#EB0029] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-[0_0_15px_rgba(235,0,41,0.5)] group-hover:scale-105 transition-transform">
              1+
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#EB0029] transition-colors">
                  FundLarper
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#EB0029] text-white uppercase tracking-widest">
                  NEVER SETTLE
                </span>
              </div>
              <p className="text-[10px] text-op-grey-400 font-mono tracking-wider hidden sm:block">
                VALIDATOR AI • 8-DIMENSION RATING
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sample Pitches Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSampleMenu(!showSampleMenu);
                setShowPersonaMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141414] border border-[#2E2E2E] hover:border-[#EB0029] text-op-grey-200 hover:text-white text-xs font-medium transition"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#EB0029]" />
              <span className="hidden md:inline">Benchmark Pitches</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {showSampleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#141414] border border-[#2E2E2E] rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-op-grey-400 font-bold">
                  Select a Benchmark Startup:
                </div>
                {SAMPLE_PITCHES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onSelectSamplePitch(sample);
                      setShowSampleMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#1F1F1F] transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{sample.name}</span>
                      <span className="text-[10px] text-[#EB0029] font-mono bg-[#EB0029]/10 px-1.5 py-0.5 rounded">
                        {sample.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-op-grey-400 line-clamp-1">
                      {sample.shortDescription}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Persona Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPersonaMenu(!showPersonaMenu);
                setShowSampleMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414] border border-[#2E2E2E] hover:border-[#EB0029] text-white text-xs font-medium transition"
            >
              <span>{activePersona.avatar}</span>
              <span className="hidden lg:inline">{activePersona.name}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-[#141414] border border-[#2E2E2E] rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-op-grey-400 font-bold">
                  Select Reviewer Persona:
                </div>
                {Object.values(INVESTOR_PERSONAS).map((p) => {
                  const isSelected = p.id === currentPersona;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onPersonaChange(p.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                        isSelected ? 'bg-[#EB0029]/15 border border-[#EB0029]/40' : 'hover:bg-[#1F1F1F]'
                      }`}
                    >
                      <span className="text-xl shrink-0">{p.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${isSelected ? 'text-[#EB0029]' : 'text-white'}`}>
                            {p.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#EB0029]" />}
                        </div>
                        <p className="text-[11px] text-op-grey-400 line-clamp-1">{p.tagline}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Engine Status Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
              hasCustomKey
                ? 'bg-[#EB0029]/15 text-white border-[#EB0029]'
                : 'bg-[#141414] text-op-grey-300 border-[#2E2E2E] hover:text-white'
            }`}
            title="Configure AI API Key"
          >
            <Key className="w-3.5 h-3.5 text-[#EB0029]" />
            <span className="hidden sm:inline">
              {hasCustomKey ? 'Gemini 2.5 Active' : 'AI Engine'}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                hasCustomKey ? 'bg-[#EB0029]' : 'bg-op-grey-500'
              }`}
            />
          </button>

          {/* Reset Pitch Button */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-[#141414] border border-[#2E2E2E] hover:border-[#EB0029] text-op-grey-400 hover:text-white transition"
            title="Start New Pitch"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
