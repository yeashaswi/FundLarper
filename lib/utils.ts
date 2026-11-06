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
      text: 'text-[#F4F4F6]',
      bg: 'bg-[#5BA887]/15',
      border: 'border-[#5BA887]/30',
      badge: 'bg-[#2C2C30] text-[#5BA887] border-[#5BA887]/40',
      bar: 'bg-[#5BA887]',
    };
  }
  if (score >= 6.5) {
    return {
      text: 'text-[#F4F4F6]',
      bg: 'bg-[#232326]',
      border: 'border-[#36363B]',
      badge: 'bg-[#2C2C30] text-[#BFBFC5] border-[#36363B]',
      bar: 'bg-[#BFBFC5]',
    };
  }
  if (score >= 5.0) {
    return {
      text: 'text-[#BFBFC5]',
      bg: 'bg-[#1E1E21]',
      border: 'border-[#2A2A2E]',
      badge: 'bg-[#232326] text-[#85858D] border-[#2A2A2E]',
      bar: 'bg-[#85858D]',
    };
  }
  return {
    text: 'text-[#E05656]',
    bg: 'bg-[#E05656]/10',
    border: 'border-[#E05656]/30',
    badge: 'bg-[#E05656]/15 text-[#E05656] border-[#E05656]/30',
    bar: 'bg-[#E05656]',
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
      label: 'Top 1% Potential',
      grade: 'A+',
      colorClass: 'text-[#F4F4F6] bg-[#2C2C30] border-[#5BA887]/50',
      glowClass: 'shadow-sm',
    };
  }
  if (score >= 75) {
    return {
      label: 'High-Potential Seed',
      grade: 'A-',
      colorClass: 'text-[#F4F4F6] bg-[#232326] border-[#36363B]',
      glowClass: 'shadow-sm',
    };
  }
  if (score >= 60) {
    return {
      label: 'Viable Cashflow Niche',
      grade: 'B',
      colorClass: 'text-[#BFBFC5] bg-[#232326] border-[#36363B]',
      glowClass: 'shadow-sm',
    };
  }
  if (score >= 45) {
    return {
      label: 'Structural Friction Noted',
      grade: 'C',
      colorClass: 'text-[#85858D] bg-[#1E1E21] border-[#2A2A2E]',
      glowClass: 'shadow-sm',
    };
  }
  return {
    label: 'High Structural Risks',
    grade: 'D',
    colorClass: 'text-[#E05656] bg-[#1E1E21] border-[#E05656]/40',
    glowClass: 'shadow-sm',
  };
}
