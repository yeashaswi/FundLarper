'use client';

import React, { useState } from 'react';
import { EvaluationReport } from '@/lib/types';
import { X, Copy, Check, Download, Printer, FileText } from 'lucide-react';

interface ExportReportModalProps {
  report: EvaluationReport;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({ report, isOpen, onClose }: ExportReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const dims = report.dimensions;

  const markdownContent = `# ${report.projectName} — Validator AI Evaluation Report
**Tagline:** ${report.tagline}
**Viability Score:** ${report.overallScore}/100 (Grade: ${report.viabilityGrade})
**Verdict Tier:** ${report.verdictTier}
**Date Evaluated:** ${new Date(report.createdAt).toLocaleDateString()}

---

## 1. Executive Summary
${report.verdictSummary}

### Elevator Pitch Rewrite (Use with Investors):
> "${report.elevatorPitchRewrite}"

---

## 2. Simulated Market Pushback

### A. Skeptical Customer Objection
**Buyer:** ${report.simulatedCustomerObjection.customerProfile}
> "${report.simulatedCustomerObjection.quote}"
*Analysis & Defense:* ${report.simulatedCustomerObjection.objectionAnalysis}

### B. Simulated VC Diligence Grilling
**Investor:** ${report.simulatedVcGrilling.investorProfile}
> "${report.simulatedVcGrilling.quote}"
*Defense Strategy:* ${report.simulatedVcGrilling.defenseAdvice}

---

## 3. SWOT Matrix
- **Strengths:** ${report.swot.strengths.join('; ')}
- **Weaknesses:** ${report.swot.weaknesses.join('; ')}
- **Opportunities:** ${report.swot.opportunities.join('; ')}
- **Threats:** ${report.swot.threats.join('; ')}

---

## 4. Top 3 Fatal Flaws
${report.topFatalFlaws.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

## 5. 7-Day No-Code Validation Test
- **Test:** ${report.sevenDayNoCodeTest.title}
- **Description:** ${report.sevenDayNoCodeTest.testDescription}
- **Success Metric:** ${report.sevenDayNoCodeTest.successMetric}
- **Cost:** ${report.sevenDayNoCodeTest.estimatedCost}

---

## 6. The 8 Investment Dimensions

### I. Competitor Landscape & Market Crowding (Score: ${dims.competitors.score}/10)
- **Crowding:** ${dims.competitors.crowdingLevel}
- **Analysis:** ${dims.competitors.analysis}
- **Alternatives:**
${dims.competitors.existingProjects.map(c => `  * **${c.name}** (${c.threatLevel}): ${c.description} (Differentiator: ${c.differentiator})`).join('\n')}
- **Market White Space:** ${dims.competitors.whiteSpace}

### II. Uniqueness & Moat (Score: ${dims.uniqueness.score}/10)
- **Moat Architecture:** ${dims.uniqueness.moatType}
- **Defensibility:** ${dims.uniqueness.defensibilityLevel}
- **Analysis:** ${dims.uniqueness.analysis}

### III. Profitability & Unit Economics (Score: ${dims.profitability.score}/10)
- **Revenue Model:** ${dims.profitability.revenueModel}
- **Gross Margin:** ${dims.profitability.estimatedGrossMargin}
- **Pricing Power:** ${dims.profitability.pricingPower}
- **Analysis:** ${dims.profitability.analysis}

### IV. Market & TAM/SAM/SOM (Score: ${dims.market.score}/10)
- **TAM:** ${dims.market.tam} | **SAM:** ${dims.market.sam} | **SOM:** ${dims.market.som}
- **Tailwinds:** ${dims.market.tailwinds.join('; ')}
- **Headwinds:** ${dims.market.headwinds.join('; ')}

### V. Target Audience & ICP (Score: ${dims.targetAudience.score}/10)
- **ICP:** ${dims.targetAudience.icp}
- **Pain Urgency:** ${dims.targetAudience.urgencyOfPain}
- **Willingness to Pay:** ${dims.targetAudience.willingnessToPay}
- **Analysis:** ${dims.targetAudience.analysis}

### VI. Scalability & Operational Leverage (Score: ${dims.scalability.score}/10)
- **Operational Friction:** ${dims.scalability.operationalFriction}
- **Analysis:** ${dims.scalability.analysis}

### VII. Capital Requirements & Runway (Score: ${dims.capitalNeeded.score}/10)
- **Stage:** ${dims.capitalNeeded.stage}
- **Funding Target:** ${dims.capitalNeeded.estimatedFunding}
- **Runway:** ${dims.capitalNeeded.runwayMonths}

### VIII. Longevity & Defensibility (Score: ${dims.longevity.score}/10)
- **5-Year Outlook:** ${dims.longevity.fiveYearOutlook}
- **Big Tech Threat:** ${dims.longevity.bigTechRisk}
- **AI Obsolescence Risk:** ${dims.longevity.aiObsolescenceRisk}

---

## 7. Action Plan & 90-Day Sprint
### Critical Fixes:
${report.actionPlan.criticalFixes.map((f, i) => `${i + 1}. ${f}`).join('\n')}

### Strategic Pivot Angles:
${report.actionPlan.pivotSuggestions.map(p => `* **${p.title}:** ${p.rationale} (Impact: ${p.expectedImpact})`).join('\n')}

### 90-Day Sprint Milestones:
${report.actionPlan.ninetyDayMilestones.map(m => `* **${m.timeline} (${m.focus}):** ${m.deliverable}`).join('\n')}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.projectName.toLowerCase().replace(/\s+/g, '-')}-validator-report.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md text-white">
      <div className="relative w-full max-w-3xl bg-[#121212] border border-[#262626] rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EB0029] flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Export Validator AI Report</h3>
              <p className="text-xs text-op-grey-400">Complete analysis memo with SWOT and 8-dimension audit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-op-grey-400 hover:text-white rounded-lg hover:bg-[#1C1C1C] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-5 rounded-2xl border border-[#262626] font-mono text-xs text-op-grey-200 whitespace-pre-wrap leading-relaxed select-text">
          {markdownContent}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="text-xs text-op-grey-400 font-mono">
            Formatted as Markdown • Ready to Share
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-white text-xs font-semibold border border-[#2E2E2E] transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#EB0029]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-white text-xs font-semibold border border-[#2E2E2E] transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EB0029] hover:bg-[#B8001F] text-white text-xs font-bold uppercase tracking-wider transition shadow-op-red-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
