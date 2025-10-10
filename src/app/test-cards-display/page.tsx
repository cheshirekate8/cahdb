'use client';

import { useCards } from '@/hooks/useCards';
import { GameCard } from '@/components/cards/GameCard';
import { CardSkeleton } from '@/components/cards/CardSkeleton';
import { EmptyState } from '@/components/cards/EmptyState';
import { CardType } from '@/types/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function TestCardsDisplayPage() {
  const { filteredBlackCards, filteredWhiteCards, isLoading, error, stats } =
    useCards();

  const [showType, setShowType] = useState<'black' | 'white' | 'both'>('both');

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const displayBlackCards = showType === 'black' || showType === 'both';
  const displayWhiteCards = showType === 'white' || showType === 'both';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Card Display Test</h1>
          <p className="text-muted-foreground">
            Testing card rendering and styling
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Total Packs</p>
            <p className="text-2xl font-bold">{stats.totalPacks}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Black Cards</p>
            <p className="text-2xl font-bold">{stats.totalBlackCards}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">White Cards</p>
            <p className="text-2xl font-bold">{stats.totalWhiteCards}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Total Cards</p>
            <p className="text-2xl font-bold">
              {stats.totalBlackCards + stats.totalWhiteCards}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button
            variant={showType === 'both' ? 'default' : 'outline'}
            onClick={() => setShowType('both')}
          >
            Show Both
          </Button>
          <Button
            variant={showType === 'black' ? 'default' : 'outline'}
            onClick={() => setShowType('black')}
          >
            Black Cards Only
          </Button>
          <Button
            variant={showType === 'white' ? 'default' : 'outline'}
            onClick={() => setShowType('white')}
          >
            White Cards Only
          </Button>
        </div>

        {displayBlackCards && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Black Cards ({filteredBlackCards.length})
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : filteredBlackCards.length === 0 ? (
              <EmptyState title="No black cards" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBlackCards.slice(0, 12).map((card, index) => (
                  <GameCard
                    key={`black-${index}`}
                    card={card}
                    type={CardType.BLACK}
                    onClick={() => console.log('Clicked black card:', card)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {displayWhiteCards && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              White Cards ({filteredWhiteCards.length})
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : filteredWhiteCards.length === 0 ? (
              <EmptyState title="No white cards" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredWhiteCards.slice(0, 12).map((card, index) => (
                  <GameCard
                    key={`white-${index}`}
                    card={card}
                    type={CardType.WHITE}
                    onClick={() => console.log('Clicked white card:', card)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
