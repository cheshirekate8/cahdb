'use client';

import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function BuilderPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading builder..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Deck Builder</h1>
        <p className="text-muted-foreground mb-8">
          Welcome, {user?.email}! This is where the deck builder will go.
        </p>

        <div className="p-8 border-2 border-dashed rounded-lg bg-muted/50">
          <p className="text-center text-muted-foreground">
            🎴 Deck builder interface coming in Step 10-20
          </p>
        </div>
      </div>
    </div>
  );
}
