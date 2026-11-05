import { NextRequest, NextResponse } from 'next/server';
import { evaluateStartupPitch } from '@/lib/evaluationEngine';
import { InvestorPersona, UploadedProjectFile } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pitchText, files, persona, apiKey, apiProvider } = body as {
      pitchText: string;
      files?: UploadedProjectFile[];
      persona?: InvestorPersona;
      apiKey?: string;
      apiProvider?: 'gemini' | 'openai';
    };

    if (!pitchText && (!files || files.length === 0)) {
      return NextResponse.json(
        { error: 'Please provide either a pitch description or upload project files.' },
        { status: 400 }
      );
    }

    const report = await evaluateStartupPitch({
      pitchText: pitchText || 'Project documentation uploaded via file attachment.',
      files,
      persona: persona || 'yc_partner',
      apiKey,
      apiProvider,
    });

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error('Evaluate API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to complete evaluation' },
      { status: 500 }
    );
  }
}
