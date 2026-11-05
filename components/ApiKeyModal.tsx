'use client';

import React, { useState, useEffect } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }: ApiKeyModalProps) {
  const [tempKey, setTempKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTempKey(apiKey);
  }, [apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(tempKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setTempKey('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md text-white">
      <div className="relative w-full max-w-lg bg-[#121212] border border-[#262626] rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EB0029] flex items-center justify-center text-white">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">AI Model & Validator Settings</h3>
              <p className="text-xs text-op-grey-400">Optional: Connect your Google Gemini API Key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-op-grey-400 hover:text-white rounded-lg hover:bg-[#1C1C1C] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-1.5">
            <div className="flex items-center gap-1.5 text-white font-bold font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EB0029]"></span>
              <span>Built-in Validator Works Out of the Box</span>
            </div>
            <p className="text-[11px] text-op-grey-300 leading-relaxed">
              FundLarper includes an advanced built-in validator engine that generates full SWOT, simulated customer objections, elevator pitch rewrites, and the 8 dimensions offline. Connecting your Google Gemini key unlocks live web-augmented frontier model reasoning.
            </p>
          </div>

          <div>
            <label className="block text-white font-semibold font-mono uppercase text-xs mb-1.5">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#2E2E2E] focus:border-[#EB0029] focus:outline-none text-white text-xs font-mono placeholder:text-op-grey-600 transition"
            />
            <div className="flex items-center justify-between mt-1.5 text-[11px]">
              <span className="text-op-grey-400 font-mono">Stored securely in local browser storage</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[#EB0029] hover:underline flex items-center gap-1 font-mono font-semibold"
              >
                <span>Get free Gemini key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181818] border border-[#262626] text-[11px] text-op-grey-300">
            <ShieldCheck className="w-4 h-4 text-[#EB0029] shrink-0" />
            <span>Zero telemetry: keys are never saved to our database or transmitted to any third party.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-[#EB0029] hover:underline font-mono uppercase font-bold transition"
          >
            Clear Stored Key
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#EB0029] hover:bg-[#B8001F] text-white text-xs font-bold uppercase tracking-wider transition shadow-op-red-sm"
            >
              {saved ? <Check className="w-4 h-4" /> : null}
              <span>{saved ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
