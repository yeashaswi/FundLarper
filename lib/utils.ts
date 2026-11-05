import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  badge: string;
  bar: string;
} {
  if (score >= 8.0) {
    return {
      text: 'text-white',
      bg: 'bg-[#EB0029]/15',
      border: 'border-[#EB0029]/50',
      badge: 'bg-[#EB0029] text-white border-[#EB0029]',
      bar: 'bg-[#EB0029]',
    };
  }
  if (score >= 6.5) {
    return {
      text: 'text-white',
      bg: 'bg-white/10',
      border: 'border-white/20',
      badge: 'bg-[#292929] text-white border-white/30',
      bar: 'bg-white',
    };
  }
  if (score >= 5.0) {
    return {
      text: 'text-op-grey-200',
      bg: 'bg-op-grey-800/60',
      border: 'border-op-grey-600',
      badge: 'bg-op-grey-800 text-op-grey-100 border-op-grey-600',
      bar: 'bg-op-grey-400',
    };
  }
  return {
    text: 'text-[#EB0029]',
    bg: 'bg-[#EB0029]/10',
    border: 'border-[#EB0029]/40',
    badge: 'bg-[#EB0029]/20 text-[#EB0029] border-[#EB0029]/50',
    bar: 'bg-[#EB0029]',
  };
}

export function getOverallScoreBadge(score: number): {
  label: string;
  grade: string;
  colorClass: string;
  glowClass: string;
} {
  if (score >= 85) {
    return {
      label: '🦄 Unicorn Trajectory (Top 1%)',
      grade: 'A+',
      colorClass: 'text-white bg-[#EB0029] border-[#EB0029]',
      glowClass: 'shadow-[0_0_30px_rgba(235,0,41,0.45)]',
    };
  }
  if (score >= 75) {
    return {
      label: '⚡ High-Potential Seed (Top 10%)',
      grade: 'A-',
      colorClass: 'text-white bg-[#1A1A1A] border-[#EB0029]',
      glowClass: 'shadow-[0_0_20px_rgba(235,0,41,0.3)]',
    };
  }
  if (score >= 60) {
    return {
      label: '💼 Viable Cashflow Niche',
      grade: 'B',
      colorClass: 'text-white bg-[#1A1A1A] border-op-grey-600',
      glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.15)]',
    };
  }
  if (score >= 45) {
    return {
      label: '⚠️ Critical Structural Risks',
      grade: 'C',
      colorClass: 'text-op-grey-100 bg-[#161616] border-op-grey-700',
      glowClass: 'shadow-[0_0_15px_rgba(150,150,150,0.1)]',
    };
  }
  return {
    label: '💀 High Risk / ZIRP Delusion',
    grade: 'D',
    colorClass: 'text-[#EB0029] bg-[#161616] border-[#EB0029]/60',
    glowClass: 'shadow-[0_0_25px_rgba(235,0,41,0.35)]',
  };
}
