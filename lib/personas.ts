import { PersonaConfig } from './types';

export const INVESTOR_PERSONAS: Record<string, PersonaConfig> = {
  val_ai: {
    id: 'val_ai',
    name: 'Val (Validator AI Lead)',
    tagline: 'Objective, data-driven startup validator. Identifies fatal flaws, elevator pitches & customer friction.',
    avatar: '🔴',
    toneDescription: 'Direct, analytical, structured like a venture incubator analyst. Refuses vague answers.',
  },
  yc_partner: {
    id: 'yc_partner',
    name: 'Garry & Paul (YC Style)',
    tagline: 'Brutally honest, allergic to jargon, focused on speed & hair-on-fire problems.',
    avatar: '🟧',
    toneDescription: 'Direct, rapid-fire, challenges assumptions, questions distribution and customer obsession.',
  },
  sand_hill_vc: {
    id: 'sand_hill_vc',
    name: 'Sand Hill Road GP',
    tagline: 'Obsessed with $10B+ TAM, power laws, network effects, and category creation.',
    avatar: '🏛️',
    toneDescription: 'Macro-oriented, looks for 100x return potential, sharp on defensibility and moat against big tech.',
  },
  indie_hacker: {
    id: 'indie_hacker',
    name: 'Bootstrapped Solo Builder',
    tagline: 'No VC fluff. Zero burn, day-1 cash flow, high margins, and fast shipping.',
    avatar: '⚡',
    toneDescription: 'Pragmatic, questions why you need outside capital, points out lean hacks to acquire users.',
  },
  angel_operator: {
    id: 'angel_operator',
    name: 'Ex-Founder Angel Operator',
    tagline: 'Empathetic operator who sold their company; tactical on 0-to-1 PMF.',
    avatar: '🚀',
    toneDescription: 'Constructive, actionable, highlights operational bottlenecks and early team risks.',
  },
};
