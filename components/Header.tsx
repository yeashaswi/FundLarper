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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/65 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo & Window Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center space-x-1.5 opacity-60 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30"></span>
          </div>

          <div
            onClick={onReset}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs tracking-tight shadow-sm">
              FL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white">
                  FundLarper
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/70 border border-white/10">
                  SWIFT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sample Pitches Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSampleMenu(!showSampleMenu);
                setShowPersonaMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.09] hover:border-white/[0.20] text-white/70 hover:text-white text-xs font-medium transition apple-press"
            >
              <Lightbulb className="w-3.5 h-3.5 text-white" />
              <span className="hidden md:inline">Benchmark Pitches</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/40" />
            </button>

            {showSampleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-black/85 backdrop-blur-2xl border border-white/[0.14] rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1">
                <div className="px-2.5 py-1 text-[10px] uppercase text-white/40 font-mono tracking-wider">
                  Benchmark Startup Pitches
                </div>
                {SAMPLE_PITCHES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onSelectSamplePitch(sample);
                      setShowSampleMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/[0.08] transition flex flex-col gap-0.5 apple-press"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{sample.name}</span>
                      <span className="text-[10px] text-white/50 font-mono bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                        {sample.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/50 line-clamp-1">
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.09] hover:border-white/[0.20] text-white text-xs font-medium transition apple-press"
            >
              <span>{activePersona.avatar}</span>
              <span className="hidden lg:inline">{activePersona.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/40" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-black/85 backdrop-blur-2xl border border-white/[0.14] rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1">
                <div className="px-2.5 py-1 text-[10px] uppercase text-white/40 font-mono tracking-wider">
                  Reviewer Perspective
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
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 apple-press ${
                        isSelected ? 'bg-white text-black font-semibold' : 'hover:bg-white/[0.08] text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="text-lg shrink-0">{p.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${isSelected ? 'text-black' : 'text-white'}`}>
                            {p.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                        </div>
                        <p className={`text-[11px] line-clamp-2 mt-0.5 ${isSelected ? 'text-black/70' : 'text-white/40'}`}>
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition apple-press ${
              hasCustomKey
                ? 'bg-white text-black font-semibold border-white shadow-sm'
                : 'bg-white/[0.05] hover:bg-white/[0.09] text-white/60 hover:text-white border-white/[0.10]'
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
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.10] text-white/60 hover:text-white transition apple-press"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
