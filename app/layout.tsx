import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FundLarper — AI Startup Evaluator & Pitch Deck Roaster',
  description: 'Evaluate your startup idea or pitch deck across 8 critical dimensions: Competitors, Uniqueness, Profitability, Market TAM, Target Audience, Scalability, Capital Needed, and Longevity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
