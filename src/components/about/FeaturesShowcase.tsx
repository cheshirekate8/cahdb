'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Palette,
  Lock,
  Database,
  Zap,
  Share2,
  Download,
  Search,
  Layout,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const features = [
  {
    icon: Layout,
    title: 'Intuitive Builder',
    description: 'Click-to-add card interface with real-time preview',
  },
  {
    icon: Search,
    title: 'Advanced Filtering',
    description: 'Search and filter cards by type, pack, and text',
  },
  {
    icon: Database,
    title: 'Cloud Storage',
    description: 'Save unlimited decks to Supabase PostgreSQL',
  },
  {
    icon: Lock,
    title: 'Secure Auth',
    description: 'Email/password and OAuth (Google, GitHub)',
  },
  {
    icon: Share2,
    title: 'Deck Sharing',
    description: 'Generate public links to share decks with anyone',
  },
  {
    icon: Download,
    title: 'Export Decks',
    description: 'Download decks as JSON for backup or sharing',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized rendering with React best practices',
  },
  {
    icon: Palette,
    title: 'Beautiful UI',
    description: 'Modern design with smooth animations',
  },
];

export function FeaturesShowcase() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <motion.div key={feature.title} variants={staggerItem}>
            <Card className="h-full text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
