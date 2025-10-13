import { ArchitectureDiagram } from '@/components/about/ArchitectureDiagram';
import { DevelopmentTimeline } from '@/components/about/DevelopmentTimeline';
import { FeaturesShowcase } from '@/components/about/FeaturesShowcase';
import { TechStackGrid } from '@/components/about/TechStackGrid';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about the Deck Builder project, tech stack, and development process.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold">About Deck Builder</h1>
          <p className="text-xl text-muted-foreground">
            A modern, full-stack web application for creating and sharing custom
            card decks. Built with cutting-edge technologies to showcase
            production-ready development skills.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a
                href="https://github.com/cheshirekate8/cahdb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                View Source
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/builder">
                Try it Out
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Key Features</h2>
            <p className="text-muted-foreground">
              Everything you need to build, save, and share custom decks
            </p>
          </div>
          <FeaturesShowcase />
        </section>

        {/* Tech Stack */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Tech Stack</h2>
            <p className="text-muted-foreground">
              Modern, production-ready technologies for 2025
            </p>
          </div>
          <TechStackGrid />
        </section>

        {/* Architecture */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Architecture</h2>
            <p className="text-muted-foreground">
              Full-stack application with clear separation of concerns
            </p>
          </div>
          <ArchitectureDiagram />
        </section>

        {/* Development Process */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Development Journey</h2>
            <p className="text-muted-foreground">
              Built iteratively over 6 phases with best practices
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <DevelopmentTimeline />
          </div>
        </section>

        {/* Project Stats */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Project Highlights</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg border bg-card">
              <p className="text-4xl font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">TypeScript</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <p className="text-4xl font-bold text-primary mb-2">WCAG</p>
              <p className="text-sm text-muted-foreground">Accessible</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <p className="text-4xl font-bold text-primary mb-2">OAuth</p>
              <p className="text-sm text-muted-foreground">Social Login</p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <p className="text-4xl font-bold text-primary mb-2">RLS</p>
              <p className="text-sm text-muted-foreground">Secure DB</p>
            </div>
          </div>
        </section>

        {/* Why This Project */}
        <section className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center">Why This Project?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              This project demonstrates proficiency in modern full-stack
              development, from planning and architecture to deployment and user
              experience.
            </p>
            <p>Key learning outcomes include:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Full-stack development with Next.js 15 and TypeScript</li>
              <li>Backend integration with Supabase (PostgreSQL + Auth)</li>
              <li>State management with Zustand</li>
              <li>Responsive, accessible UI design</li>
              <li>Animation and micro-interactions with Framer Motion</li>
              <li>API development and RESTful design</li>
              <li>Authentication and authorization (OAuth + email)</li>
              <li>Database design with Row Level Security</li>
              <li>Production deployment on Vercel</li>
            </ul>
          </div>
        </section>

        {/* Contact/Links */}
        <section className="text-center space-y-6 py-12 border-t">
          <h2 className="text-2xl font-bold">Want to Learn More?</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild variant="outline">
              <a
                href="https://github.com/cheshirekate8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub Profile
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://cheshirekate8.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Portfolio
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:katie.f.young@me.com">Contact Me</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
