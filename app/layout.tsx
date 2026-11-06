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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#18181A] text-[#BFBFC5] font-sans antialiased selection:bg-[#F4F4F6] selection:text-[#18181A]">
        {children}
      </body>
    </html>
  );
}
