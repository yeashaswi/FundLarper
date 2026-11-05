import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = file.name;
    const fileType = file.type || 'application/octet-stream';
    const fileSize = file.size;

    // Limit to 12MB
    if (fileSize > 12 * 1024 * 1024) {
      return NextResponse.json({ error: 'File exceeds 12MB limit' }, { status: 400 });
    }

    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    let extractedText = '';
    let pageCount = 1;

    if (fileName.toLowerCase().endsWith('.pdf') || fileType.includes('pdf')) {
      try {
        const { PDFParse } = await import('pdf-parse');
        const parser = new PDFParse(new Uint8Array(arrayBuf));
        const textResult = await parser.getText();
        extractedText = typeof textResult === 'string' ? textResult : (textResult?.text || '');
        const info = await (parser as any).getInfo?.().catch(() => null);
        pageCount = (info as any)?.pages || 1;
      } catch (pdfErr) {
        console.warn('PDF parser class error, falling back to clean text extraction:', pdfErr);
        // Fallback ASCII/UTF8 extraction
        extractedText = buffer.toString('utf-8', 0, Math.min(buffer.length, 60000))
          .replace(/[^\x20-\x7E\t\r\n]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
    } else {
      // Plain text, markdown, json, code, csv
      extractedText = buffer.toString('utf-8');
    }

    // Clean up excessive whitespace
    extractedText = extractedText.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

    return NextResponse.json({
      id: 'file_' + Math.random().toString(36).substring(2, 9),
      name: fileName,
      size: fileSize,
      type: fileType,
      pageCount,
      content: extractedText.slice(0, 35000), // safe context window slice
      uploadedAt: new Date().toISOString(),
      summary: extractedText.length > 200 ? extractedText.slice(0, 200) + '...' : extractedText,
    });
  } catch (error: any) {
    console.error('File parse API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to parse file' },
      { status: 500 }
    );
  }
}
