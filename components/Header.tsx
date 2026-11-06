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
    <header className="sticky top-0 z-40 w-full border-b border-[#2A2A2E] bg-[#18181A]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={onReset}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#232326] border border-[#36363B] flex items-center justify-center text-[#F4F4F6] font-serif font-bold text-sm tracking-tight shadow-sm group-hover:border-[#47474E] transition-colors">
              FL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-medium text-lg tracking-tight text-[#F4F4F6]">
                  FundLarper
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-[#232326] text-[#85858D] border border-[#36363B]">
                  Pitch Audit
                </span>
              </div>
              <p className="text-[11px] text-[#85858D] hidden sm:block">
                8-Dimension Diligence & Sanity Check
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#232326] border border-[#36363B] hover:border-[#47474E] text-[#BFBFC5] hover:text-[#F4F4F6] text-xs font-medium transition"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#E05656]" />
              <span className="hidden md:inline">Benchmark Pitches</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85858D]" />
            </button>

            {showSampleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1E1E21] border border-[#36363B] rounded-xl p-1.5 shadow-xl z-50 text-xs space-y-1">
                <div className="px-2.5 py-1 text-[10px] uppercase text-[#85858D] font-medium tracking-wider">
                  Select a Benchmark Startup:
                </div>
                {SAMPLE_PITCHES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onSelectSamplePitch(sample);
                      setShowSampleMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#2C2C30] transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#F4F4F6]">{sample.name}</span>
                      <span className="text-[10px] text-[#85858D] font-mono bg-[#232326] px-1.5 py-0.5 rounded border border-[#2A2A2E]">
                        {sample.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#85858D] line-clamp-1">
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#232326] border border-[#36363B] hover:border-[#47474E] text-[#F4F4F6] text-xs font-medium transition"
            >
              <span>{activePersona.avatar}</span>
              <span className="hidden lg:inline">{activePersona.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#85858D]" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1E1E21] border border-[#36363B] rounded-xl p-1.5 shadow-xl z-50 text-xs space-y-1">
                <div className="px-2.5 py-1 text-[10px] uppercase text-[#85858D] font-medium tracking-wider">
                  Reviewer Perspective:
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
                      className={`w-full text-left p-2.5 rounded-lg transition flex items-start gap-2.5 ${
                        isSelected ? 'bg-[#2C2C30] text-[#F4F4F6] border border-[#36363B]' : 'hover:bg-[#232326] text-[#BFBFC5]'
                      }`}
                    >
                      <span className="text-lg shrink-0">{p.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${isSelected ? 'text-[#F4F4F6]' : 'text-[#BFBFC5]'}`}>
                            {p.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#5BA887]" />}
                        </div>
                        <p className="text-[11px] text-[#85858D] line-clamp-2 mt-0.5">
                          {p.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              hasCustomKey
                ? 'bg-[#5BA887]/15 text-[#5BA887] border-[#5BA887]/30 hover:bg-[#5BA887]/25'
                : 'bg-[#232326] hover:bg-[#2C2C30] text-[#85858D] hover:text-[#F4F4F6] border-[#36363B]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasCustomKey ? 'Key Active' : 'API Key'}
            </span>
          </button>

          {/* Reset / New Pitch Button */}
          <button
            onClick={onReset}
            title="Start new evaluation"
            className="p-2 rounded-lg bg-[#232326] hover:bg-[#2C2C30] border border-[#36363B] text-[#85858D] hover:text-[#F4F4F6] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
