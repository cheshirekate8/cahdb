'use client';

import { motion } from 'framer-motion';
import { Users, Layers, Share2, Download } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Active Users',
  },
  {
    icon: Layers,
    value: '1000+',
    label: 'Decks Created',
  },
  {
    icon: Share2,
    value: '250+',
    label: 'Decks Shared',
  },
  {
    icon: Download,
    value: '500+',
    label: 'Downloads',
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center"
              >
                <Icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
