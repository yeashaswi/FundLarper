'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  MessageSquare,
  BarChart3,
  Layers,
  Zap,
  ArrowRight,
  Upload,
  Lightbulb,
  Shield,
  Target,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Loader2,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import ScorecardView from '@/components/ScorecardView';
import CompetitorMatrix from '@/components/CompetitorMatrix';
import ActionRoadmapView from '@/components/ActionRoadmapView';
import FileUploadZone from '@/components/FileUploadZone';
import ExportReportModal from '@/components/ExportReportModal';
import ApiKeyModal from '@/components/ApiKeyModal';

import { EvaluationReport, InvestorPersona, UploadedProjectFile, ChatMessage } from '@/lib/types';
import { SAMPLE_PITCHES, SamplePitch } from '@/lib/samplePitches';
import { INVESTOR_PERSONAS } from '@/lib/personas';

export default function Home() {
  const [pitchInput, setPitchInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedProjectFile[]>([]);
  const [persona, setPersona] = useState<InvestorPersona>('yc_partner');
  const [apiKey, setApiKey] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [report, setReport] = useState<EvaluationReport | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'scorecard' | 'competitors' | 'roadmap'>('chat');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  // Chat message history
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Load saved preferences & pitch from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('fundlarper_api_key') || '';
      const savedPersona = localStorage.getItem('fundlarper_persona') as InvestorPersona;
      const savedReport = localStorage.getItem('fundlarper_last_report');
      const savedPitch = localStorage.getItem('fundlarper_last_pitch');

      if (savedKey) setApiKey(savedKey);
      if (savedPersona && INVESTOR_PERSONAS[savedPersona]) setPersona(savedPersona);

      if (savedReport) {
        try {
          const parsed = JSON.parse(savedReport);
          setReport(parsed);
          setActiveTab('scorecard');
        } catch (e) {
          console.error(e);
        }
      }

      if (savedPitch) {
        setPitchInput(savedPitch);
      }
    }
  }, []);

  // Initialize initial welcoming chat message based on persona
  useEffect(() => {
    if (messages.length === 0) {
      const p = INVESTOR_PERSONAS[persona];
      setMessages([
        {
          id: 'welcome_1',
          role: 'assistant',
          content: `### Welcome to FundLarper. I'm ${p.name}.

${p.tagline}

Tell me your startup idea or drop your pitch deck / project files. I will rate it across **8 critical investment dimensions**:
1. Competitor Landscape & Crowding
2. Uniqueness & Moat
3. Profitability & Unit Economics
4. Market Size & Timing (TAM/SAM/SOM)
5. Target Audience & ICP
6. Scalability & Operational Leverage
7. Capital Needed & Runway
8. Longevity & Defensibility against Big Tech

What problem are you solving, who is your customer, and why won't an incumbent crush you?`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [persona]);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    if (typeof window !== 'undefined') {
      if (newKey) localStorage.setItem('fundlarper_api_key', newKey);
      else localStorage.removeItem('fundlarper_api_key');
    }
  };

  const handlePersonaChange = (newPersona: InvestorPersona) => {
    setPersona(newPersona);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fundlarper_persona', newPersona);
    }
    const p = INVESTOR_PERSONAS[newPersona];
    setMessages((prev) => [
      ...prev,
      {
        id: 'persona_switch_' + Date.now(),
        role: 'assistant',
        content: `*Switched reviewer persona to **${p.name}**.* ${p.toneDescription}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleSelectSamplePitch = (sample: SamplePitch) => {
    setPitchInput(sample.fullPitch);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fundlarper_last_pitch', sample.fullPitch);
    }
    setMessages((prev) => [
      ...prev,
      {
        id: 'sample_load_' + Date.now(),
        role: 'user',
        content: `Here is our pitch for **${sample.name}** (${sample.category}):\n\n${sample.fullPitch}`,
        timestamp: new Date().toISOString(),
      },
    ]);
    // Automatically trigger evaluation for smooth 1-click preview
    triggerEvaluation(sample.fullPitch);
  };

  const handleReset = () => {
    if (confirm('Start a new pitch evaluation? Current scorecard will be cleared.')) {
      setPitchInput('');
      setUploadedFiles([]);
      setReport(null);
      setActiveTab('chat');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('fundlarper_last_report');
        localStorage.removeItem('fundlarper_last_pitch');
      }
      setMessages([]);
    }
  };

  // Main evaluation trigger
  const triggerEvaluation = async (pitchOverride?: string) => {
    const textToEvaluate = pitchOverride || pitchInput;
    if (!textToEvaluate.trim() && uploadedFiles.length === 0) {
      alert('Please enter your startup idea or upload a pitch deck / file first!');
      return;
    }

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitchText: textToEvaluate,
          files: uploadedFiles,
          persona,
          apiKey: apiKey.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Evaluation failed');
      }

      const data = await response.json();
      const newReport: EvaluationReport = data.report;
      setReport(newReport);
      setActiveTab('scorecard');

      if (typeof window !== 'undefined') {
        localStorage.setItem('fundlarper_last_report', JSON.stringify(newReport));
        if (textToEvaluate) localStorage.setItem('fundlarper_last_pitch', textToEvaluate);
      }

      // Add evaluation summary into chat feed
      setMessages((prev) => [
        ...prev,
        {
          id: 'eval_result_' + Date.now(),
          role: 'assistant',
          content: `### 📊 Official Scorecard Generated!
**Overall Score:** ${newReport.overallScore}/100 (${newReport.verdictTier})

**Executive Summary:**
${newReport.verdictSummary}

Check the **8-Dimension Scorecard** tab for the full radar chart and breakdown, or ask me questions right here to drill into any score!`,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Fire celebratory confetti for promising projects!
      if (newReport.overallScore >= 70) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#06b6d4', '#f59e0b'],
        });
      }
    } catch (err: any) {
      console.error(err);
      alert('Evaluation error: ' + (err.message || 'Something went wrong.'));
    } finally {
      setIsEvaluating(false);
    }
  };

  // Chat message send handler
  const handleSendMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString(),
      files: uploadedFiles.map((f) => ({ name: f.name, type: f.type })),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          persona,
          currentEvaluation: report,
          apiKey: apiKey.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get chat response');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: 'msg_reply_' + Date.now(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: 'I had trouble processing that request. Please try again or check your network connection.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGrillInChat = (question: string) => {
    setActiveTab('chat');
    handleSendMessage(`Simulate an investor interview: ${question}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      {/* Top Navigation */}
      <Header
        currentPersona={persona}
        onPersonaChange={handlePersonaChange}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        hasCustomKey={!!apiKey}
        onSelectSamplePitch={handleSelectSamplePitch}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Workspace Tab Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'chat'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Pitch & Grilling Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('scorecard')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'scorecard'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>8-Dimension Scorecard</span>
              {report && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-950/40 font-bold ml-1">
                  {report.overallScore}/100
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('competitors')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'competitors'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Competitors</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'roadmap'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>What Can Be Better</span>
            </button>
          </div>

          {/* Quick Evaluate Button if not yet on scorecard */}
          {report && (
            <button
              onClick={() => setExportModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Export Memo</span>
            </button>
          )}
        </div>

        {/* TAB 1: Chat & Quick Submission Room */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Chat */}
            <div className="lg:col-span-8">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isChatLoading}
                persona={persona}
                currentEvaluation={report}
                onTriggerEvaluation={triggerEvaluation}
                isEvaluating={isEvaluating}
                uploadedFiles={uploadedFiles}
                onFilesChange={setUploadedFiles}
              />
            </div>

            {/* Right: Quick Pitch Card & File Dock */}
            <div className="lg:col-span-4 space-y-4">
              {/* Pitch Summary / Quick Submit Card */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Your Pitch Description</h3>
                  </div>
                  {pitchInput && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {pitchInput.length} chars
                    </span>
                  )}
                </div>

                <textarea
                  value={pitchInput}
                  onChange={(e) => {
                    setPitchInput(e.target.value);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('fundlarper_last_pitch', e.target.value);
                    }
                  }}
                  placeholder="Paste your 1-paragraph startup pitch, problem, customer, and business model here..."
                  rows={5}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none transition"
                />

                {/* Upload Pitch Files */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                    <span>Project Files & Pitch Decks</span>
                    <span className="text-[10px] text-slate-500 font-mono">PDF, TXT, MD, Code</span>
                  </label>
                  <FileUploadZone
                    files={uploadedFiles}
                    onFilesChange={setUploadedFiles}
                    disabled={isEvaluating}
                  />
                </div>

                {/* Main Evaluate Button */}
                <button
                  onClick={() => triggerEvaluation()}
                  disabled={isEvaluating || (!pitchInput.trim() && uploadedFiles.length === 0)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-40 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Synthesizing 8 Dimensions...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Generate 8-Dimension Scorecard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Sample Starters */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>One-Click Benchmark Startups:</span>
                </div>
                <div className="space-y-1.5">
                  {SAMPLE_PITCHES.slice(0, 3).map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSamplePitch(sample)}
                      className="w-full text-left p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 transition flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-200">{sample.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {sample.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Full 8-Dimension Scorecard */}
        {activeTab === 'scorecard' && (
          <div>
            {report ? (
              <ScorecardView
                report={report}
                onOpenChat={() => setActiveTab('chat')}
                onOpenExport={() => setExportModalOpen(true)}
              />
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">No Evaluation Generated Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Pitch your startup in the chat or paste your pitch deck in the sidebar to generate a comprehensive 8-dimension rating report.
                </p>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
                >
                  Go to Pitch Chat
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Competitor Landscape & White Space */}
        {activeTab === 'competitors' && (
          <div>
            {report ? (
              <CompetitorMatrix report={report} />
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <Layers className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Competitor Analysis Yet</h3>
                <p className="text-xs text-slate-400">Run an evaluation first to reveal market crowding and competitor intelligence.</p>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
                >
                  Start Pitch
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: What Can Be Better (Action Roadmap) */}
        {activeTab === 'roadmap' && (
          <div>
            {report ? (
              <ActionRoadmapView report={report} onGrillInChat={handleGrillInChat} />
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
                <Zap className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Action Roadmap Yet</h3>
                <p className="text-xs text-slate-400">Evaluate your startup idea first to generate dealbreakers, pivot options, and sprint milestones.</p>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
                >
                  Start Pitch
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Export Report Modal */}
      {report && (
        <ExportReportModal
          report={report}
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
        />
      )}

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}
