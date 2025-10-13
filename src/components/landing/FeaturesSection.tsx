'use client';

import { motion } from 'framer-motion';
import { Layers, Share2, Download, Zap, Shield, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const features = [
  {
    icon: Layers,
    title: 'Intuitive Builder',
    description:
      'Create decks with our easy-to-use interface. Just click to add cards to your deck.',
  },
  {
    icon: Share2,
    title: 'Share Instantly',
    description:
      'Share your decks with anyone via a simple link. No account required to view.',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description:
      'Download your decks as JSON files to use anywhere you need them.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with modern tech for instant loading and smooth interactions.',
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description:
      'Your decks are safely stored in the cloud with enterprise-grade security.',
  },
  {
    icon: Sparkles,
    title: 'Beautiful Design',
    description:
      'Gorgeous UI with smooth animations that make deck building a joy.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features designed to make deck building effortless
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
