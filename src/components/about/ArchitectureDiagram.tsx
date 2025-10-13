'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export function ArchitectureDiagram() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card>
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Frontend Layer */}
            <div className="space-y-4">
              <h4 className="font-semibold text-center">Frontend Layer</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800">
                  <p className="font-medium text-center">Next.js App Router</p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    React Components
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border-2 border-purple-200 dark:border-purple-800">
                  <p className="font-medium text-center">Zustand Store</p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    State Management
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950 border-2 border-pink-200 dark:border-pink-800">
                  <p className="font-medium text-center">Tailwind CSS</p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    Styling
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
            </div>

            {/* API Layer */}
            <div className="space-y-4">
              <h4 className="font-semibold text-center">API Layer</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800">
                  <p className="font-medium text-center">Next.js API Routes</p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    /api/decks, /api/cards
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border-2 border-amber-200 dark:border-amber-800">
                  <p className="font-medium text-center">Supabase Auth</p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    OAuth & Email/Password
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
            </div>

            {/* Database Layer */}
            <div className="space-y-4">
              <h4 className="font-semibold text-center">Database Layer</h4>
              <div className="p-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800">
                <p className="font-medium text-center">Supabase PostgreSQL</p>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Tables: users (auth), decks (user_id, black_cards,
                  white_cards)
                </p>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  Row Level Security (RLS) for data protection
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
