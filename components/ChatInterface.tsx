'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, FileText, Loader2, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { ChatMessage, InvestorPersona, EvaluationReport, UploadedProjectFile } from '@/lib/types';
import { INVESTOR_PERSONAS } from '@/lib/personas';
import FileUploadZone from './FileUploadZone';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  persona: InvestorPersona;
  currentEvaluation: EvaluationReport | null;
  onTriggerEvaluation: (pitchOverride?: string) => Promise<void>;
  isEvaluating: boolean;
  uploadedFiles: UploadedProjectFile[];
  onFilesChange: (files: UploadedProjectFile[]) => void;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
  persona,
  currentEvaluation,
  onTriggerEvaluation,
  isEvaluating,
  uploadedFiles,
  onFilesChange,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const personaConfig = INVESTOR_PERSONAS[persona] || INVESTOR_PERSONAS.val_ai;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const content = input;
    setInput('');
    await onSendMessage(content);
  };

  const handleQuickChip = async (chipText: string) => {
    if (isLoading) return;
    await onSendMessage(chipText);
  };

  return (
    <div className="flex flex-col h-[750px] bg-[#232326] border border-[#36363B] rounded-3xl overflow-hidden shadow-sm">
      {/* Persona Header Bar */}
      <div className="p-4 px-6 bg-[#232326] border-b border-[#36363B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{personaConfig.avatar}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">{personaConfig.name}</h3>
              <span className="w-2 h-2 rounded-full bg-[#E05656] animate-pulse shadow-[0_0_8px_#E05656]"></span>
            </div>
            <p className="text-xs text-op-grey-400">{personaConfig.tagline}</p>
          </div>
        </div>

        {/* Action button to evaluate */}
        <button
          onClick={() => onTriggerEvaluation()}
          disabled={isEvaluating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E05656] hover:bg-[#C94545] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Dimensions...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentEvaluation ? 'Re-Evaluate Idea' : 'Run Full Validator'}</span>
            </>
          )}
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm ${
                  isUser
                    ? 'bg-[#E05656] text-white font-bold'
                    : 'bg-[#2C2C30] border border-[#36363B] text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : personaConfig.avatar}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#2C2C30] border border-[#36363B] text-white shadow-md ml-auto'
                    : 'bg-[#232326] border border-[#36363B] text-white'
                }`}
              >
                {/* File attachments badge */}
                {msg.files && msg.files.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5 pb-2 border-b border-[#36363B]">
                    {msg.files.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#36363B] text-op-grey-100"
                      >
                        <FileText className="w-3 h-3 text-[#E05656]" />
                        <span>{f.name}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Formatted Text */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4 key={pIdx} className="font-bold text-[#E05656] text-sm pt-1 uppercase font-mono tracking-wider">
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={pIdx} className="font-bold text-white text-base pt-1 tracking-tight">
                          {paragraph.replace('## ', '')}
                        </h3>
                      );
                    }
                    return <p key={pIdx} className="text-op-grey-100">{paragraph}</p>;
                  })}
                </div>

                <div className="mt-2 text-[10px] text-right font-mono text-op-grey-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2C2C30] border border-[#36363B] flex items-center justify-center text-sm">
              {personaConfig.avatar}
            </div>
            <div className="p-3.5 rounded-2xl bg-[#232326] border border-[#36363B] flex items-center gap-2 text-xs text-op-grey-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E05656]" />
              <span>{personaConfig.name} is evaluating your concept...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="px-4 py-2.5 bg-[#18181A] border-t border-[#36363B] flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[10px] font-mono text-op-grey-400 uppercase font-bold shrink-0">Validation Prompts:</span>
        <button
          onClick={() => handleQuickChip('Give me a harsh critique of my value proposition and customer urgency.')}
          className="px-3 py-1 rounded-full bg-[#232326] hover:bg-[#222222] text-white text-xs whitespace-nowrap border border-[#36363B] hover:border-[#E05656] transition shrink-0"
        >
          🔥 Harsh Value Critique
        </button>
        <button
          onClick={() => handleQuickChip('How do I build an unbreakable moat against competitors and big tech?')}
          className="px-3 py-1 rounded-full bg-[#232326] hover:bg-[#222222] text-white text-xs whitespace-nowrap border border-[#36363B] hover:border-[#E05656] transition shrink-0"
        >
          🛡️ Defensibility & Moat
        </button>
        <button
          onClick={() => handleQuickChip('Simulate a skeptical customer refusing to buy. What is their excuse?')}
          className="px-3 py-1 rounded-full bg-[#232326] hover:bg-[#222222] text-white text-xs whitespace-nowrap border border-[#36363B] hover:border-[#E05656] transition shrink-0"
        >
          👤 Skeptical Buyer Pushback
        </button>
        <button
          onClick={() => handleQuickChip('What is the cheapest 7-day no-code test to validate this idea?')}
          className="px-3 py-1 rounded-full bg-[#232326] hover:bg-[#222222] text-white text-xs whitespace-nowrap border border-[#36363B] hover:border-[#E05656] transition shrink-0"
        >
          ⚡ 7-Day Smoke Test
        </button>
      </div>

      {/* File Upload Drawer */}
      {showFileUpload && (
        <div className="p-4 bg-[#18181A] border-t border-[#36363B] animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-white">Attach Pitch Decks & Specs</span>
            <button
              onClick={() => setShowFileUpload(false)}
              className="text-xs text-op-grey-400 hover:text-white"
            >
              Done
            </button>
          </div>
          <FileUploadZone
            files={uploadedFiles}
            onFilesChange={onFilesChange}
            disabled={isLoading || isEvaluating}
          />
        </div>
      )}

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-[#232326] border-t border-[#36363B] flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowFileUpload(!showFileUpload)}
          className={`p-2.5 rounded-xl border transition shrink-0 flex items-center gap-1.5 text-xs font-semibold ${
            uploadedFiles.length > 0 || showFileUpload
              ? 'bg-[#E05656] text-white border-[#E05656]'
              : 'bg-[#2C2C30] text-op-grey-300 border-[#36363B] hover:text-white hover:border-[#E05656]'
          }`}
          title="Upload project files or decks"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">
            {uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s)` : 'Decks / Files'}
          </span>
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Describe your idea or ask ${personaConfig.name} to pressure-test your assumptions...`}
          disabled={isLoading}
          className="flex-1 bg-[#18181A] border border-[#36363B] focus:border-[#E05656] focus:outline-none rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-op-grey-500 transition"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 sm:px-5 sm:py-2.5 bg-[#E05656] hover:bg-[#C94545] disabled:opacity-40 text-white font-bold rounded-xl transition shrink-0 flex items-center gap-1.5 text-xs uppercase tracking-wider shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </form>
    </div>
  );
}
