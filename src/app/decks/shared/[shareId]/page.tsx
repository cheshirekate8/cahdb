'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useDeckStore } from '@/store/deckStore';
import { GameCard } from '@/components/cards/GameCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import Link from 'next/link';
import { CardType } from '@/types/card';
import type { Deck } from '@/types/deck';

export default function SharedDeckPage() {
  const params = useParams();
  const shareId = params.shareId as string;
  const { isAuthenticated } = useAuth();
  const { loadDeck } = useDeckStore();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSharedDeck();
  }, [shareId]);

  const loadSharedDeck = async () => {
    try {
      const response = await fetch(`/api/decks/shared/${shareId}`);
      const result = await response.json();

      if (result.success) {
        setDeck(result.data);
      } else {
        setError(result.error || 'Deck not found');
      }
    } catch (err) {
      setError('Failed to load deck');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClone = () => {
    if (!deck) return;

    const clonedDeck: Deck = {
      name: `Copy of ${deck.name}`,
      description: deck.description,
      blackCards: deck.blackCards,
      whiteCards: deck.whiteCards,
      is_public: false,
    };
    loadDeck(clonedDeck);
    alert('✓ Deck cloned! Edit and save as your own.');
  };

  const handleDownload = () => {
    if (!deck) return;

    const deckData = {
      name: deck.name,
      description: deck.description,
      blackCards: deck.blackCards,
      whiteCards: deck.whiteCards,
    };

    const blob = new Blob([JSON.stringify(deckData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${deck.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✓ Deck downloaded!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading shared deck..." />
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">
            {error || 'Deck not found'}
          </h2>
          <p className="text-muted-foreground mb-6">
            This deck may be private or doesn't exist
          </p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalCards = deck.blackCards.length + deck.whiteCards.length;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{deck.name}</h1>
          {deck.description && (
            <p className="text-muted-foreground text-lg mb-4">
              {deck.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{totalCards} total cards</span>
            <span>•</span>
            <span>{deck.blackCards.length} black</span>
            <span>•</span>
            <span>{deck.whiteCards.length} white</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {isAuthenticated ? (
            <>
              <Button onClick={handleClone} asChild>
                <Link href="/builder">
                  <Copy className="h-4 w-4 mr-2" />
                  Clone & Edit
                </Link>
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/auth/signup">Sign Up to Clone This Deck</Link>
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}
        </div>

        <div className="space-y-8">
          {deck.blackCards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Black Cards ({deck.blackCards.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {deck.blackCards.map((card, index) => (
                  <GameCard
                    key={`black-${index}`}
                    card={card}
                    type={CardType.BLACK}
                  />
                ))}
              </div>
            </div>
          )}

          {deck.whiteCards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                White Cards ({deck.whiteCards.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {deck.whiteCards.map((card, index) => (
                  <GameCard
                    key={`white-${index}`}
                    card={card}
                    type={CardType.WHITE}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
