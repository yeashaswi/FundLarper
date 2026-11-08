import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FundLarper — Startup Pitch Review & Stress-Test',
  description: 'Sanity-check startup ideas across 8 dimensions: Competitors, Moat, Profitability, Market TAM, Target Audience, Scalability, Capital, and Longevity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white/90 font-sans antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
