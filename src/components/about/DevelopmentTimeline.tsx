'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Project Setup',
    items: [
      'Next.js & TypeScript',
      'Supabase Configuration',
      'Type Definitions',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Authentication',
    items: [
      'Email/Password Login',
      'OAuth (Google, GitHub)',
      'Protected Routes',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Card System',
    items: ['Card API', 'Card Components', 'Search & Filters'],
  },
  {
    phase: 'Phase 4',
    title: 'Deck Building',
    items: [
      'Deck State Management',
      'Click-to-Add Interface',
      'Real-time Validation',
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Deck Management',
    items: ['Save to Database', 'My Decks Page', 'Deck Sharing'],
  },
  {
    phase: 'Phase 6',
    title: 'Polish & Deploy',
    items: ['Animations', 'Navigation', 'Production Deployment'],
  },
];

export function DevelopmentTimeline() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {phases.map((phase, index) => (
        <motion.div
          key={phase.phase}
          variants={staggerItem}
          className="flex gap-6"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {index + 1}
            </div>
            {index < phases.length - 1 && (
              <div className="w-0.5 h-full bg-border mt-2" />
            )}
          </div>

          <div className="flex-1 pb-8">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{phase.title}</h3>
              <span className="text-xs text-muted-foreground">
                {phase.phase}
              </span>
            </div>
            <ul className="space-y-1">
              {phase.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
