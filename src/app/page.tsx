'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    async function test() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      setStatus(error ? 'Error: ' + error.message : 'Connected!');
    }
    test();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Build Your Perfect
            <span className="block text-primary mt-2">Card Deck</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Create, customize, and share unique card decks with our intuitive
            drag-and-drop builder.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Get Started Free
          </Link>

          <Link
            href="/builder"
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/10 transition-colors"
          >
            Try Builder
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">🎨 Drag & Drop</h3>
            <p className="text-muted-foreground">
              Intuitive interface with smooth animations for effortless deck
              building.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">💾 Save & Share</h3>
            <p className="text-muted-foreground">
              Save unlimited decks and share them with your friends via link.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">📱 Mobile Ready</h3>
            <p className="text-muted-foreground">
              Full responsive design that works beautifully on any device.
            </p>
          </div>
        </div>

        <div>Supabase Status: {status}</div>

        <div className="mt-16 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
          <p>
            🚧 Development Mode: This is a placeholder. Full landing page coming
            in Step 32.
          </p>
        </div>
      </div>
    </main>
  );
}
