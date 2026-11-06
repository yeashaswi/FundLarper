'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Eye, Loader2 } from 'lucide-react';
import { UploadedProjectFile } from '@/lib/types';

interface FileUploadZoneProps {
  files: UploadedProjectFile[];
  onFilesChange: (files: UploadedProjectFile[]) => void;
  disabled?: boolean;
}

export default function FileUploadZone({ files, onFilesChange, disabled }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<UploadedProjectFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed (${response.status})`);
      }

      const parsedData = await response.json();
      onFilesChange([...files, parsedData]);
    } catch (err: any) {
      console.error('File upload error:', err);
      setErrorMessage(err.message || 'Failed to read or parse file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      await processFile(droppedFiles[0]);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      await processFile(selectedFiles[0]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (id: string) => {
    onFilesChange(files.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full space-y-3">
      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-[#E05656] bg-[#E05656]/10 scale-[1.01]'
            : 'border-[#36363B] hover:border-[#E05656] bg-[#18181A] hover:bg-[#232326]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.md,.json,.csv,.js,.ts,.py"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled || isUploading}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-[#E05656]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">Extracting pitch deck & files...</p>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[#232326] border border-[#36363B] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-[#E05656]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  <span className="text-[#E05656] underline decoration-[#E05656]/50 underline-offset-2">Click to upload</span> or drag & drop pitch files
                </p>
                <p className="text-[11px] text-op-grey-400 mt-0.5 font-mono">
                  Pitch Decks (PDF), Whitepapers, Specs (TXT, MD), Architecture Code (up to 12MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#E05656]/15 border border-[#E05656]/40 text-white text-xs">
          <AlertCircle className="w-4 h-4 text-[#E05656] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-op-grey-400 font-mono px-1">
            <span className="font-bold text-white uppercase tracking-wider">Attached Documents ({files.length})</span>
            <span>Included in evaluation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#232326] border border-[#36363B] hover:border-[#47474E] text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded bg-[#E05656]/15 border border-[#E05656]/30 flex items-center justify-center text-[#E05656] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-op-grey-400 font-mono">
                      {formatFileSize(file.size)} {file.pageCount ? `• ${file.pageCount} pages` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewFile(file);
                    }}
                    title="Preview extracted content"
                    className="p-1 rounded text-op-grey-400 hover:text-white hover:bg-[#36363B] transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    title="Remove file"
                    className="p-1 rounded text-op-grey-400 hover:text-[#E05656] hover:bg-[#36363B] transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extracted Text Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#232326] border border-[#36363B] rounded-2xl p-6 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#36363B] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E05656]" />
                <div>
                  <h4 className="text-sm font-bold text-white">{previewFile.name}</h4>
                  <p className="text-xs text-op-grey-400 font-mono">
                    Extracted {previewFile.content.length.toLocaleString()} characters for AI ingestion
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-1 text-op-grey-400 hover:text-white rounded-lg hover:bg-[#222222] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#18181A] p-4 rounded-xl border border-[#36363B] font-mono text-xs text-op-grey-200 whitespace-pre-wrap leading-relaxed select-text">
              {previewFile.content || '(No text could be extracted from this document)'}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 bg-[#2C2C30] hover:bg-[#2A2A2A] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
