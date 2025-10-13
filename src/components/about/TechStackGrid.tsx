'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface TechItem {
  name: string;
  category: string;
  description: string;
  reason: string;
  icon?: string;
}

const techStack: TechItem[] = [
  {
    name: 'Next.js 15',
    category: 'Framework',
    description: 'React framework with App Router',
    reason: 'Full-stack capabilities, SEO, performance',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Type-safe JavaScript',
    reason: 'Catch bugs early, better IDE support',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    description: 'Utility-first CSS framework',
    reason: 'Rapid development, consistent design',
  },
  {
    name: 'Supabase',
    category: 'Backend',
    description: 'PostgreSQL database & auth',
    reason: 'Real-time, authentication built-in',
  },
  {
    name: 'Zustand',
    category: 'State',
    description: 'Lightweight state management',
    reason: 'Simple API, no boilerplate',
  },
  {
    name: 'Framer Motion',
    category: 'Animation',
    description: 'React animation library',
    reason: 'Smooth animations, gestures',
  },
  {
    name: 'shadcn/ui',
    category: 'Components',
    description: 'Accessible component library',
    reason: 'Beautiful, customizable, accessible',
  },
  {
    name: 'React Hook Form',
    category: 'Forms',
    description: 'Performant form handling',
    reason: 'Minimal re-renders, validation',
  },
  {
    name: 'Zod',
    category: 'Validation',
    description: 'TypeScript schema validation',
    reason: 'Type-safe, runtime validation',
  },
];

export function TechStackGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {techStack.map((tech) => (
        <motion.div key={tech.name} variants={staggerItem}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{tech.name}</CardTitle>
                <Badge variant="secondary">{tech.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
              <div className="pt-2">
                <p className="text-xs font-medium text-primary">Why?</p>
                <p className="text-sm">{tech.reason}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
