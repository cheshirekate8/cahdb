'use client';

import { useState } from 'react';
import { useCards } from '@/hooks/useCards';
import { useDeckStore } from '@/store/deckStore';
import { CardFilters } from '@/components/cards/CardFilters';
import { CardList } from '@/components/cards/CardList';
import { DeckArea } from '@/components/deck/DeckArea';
import { DeckStats } from '@/components/deck/DeckStats';
import { DeckActions } from '@/components/deck/DeckActions';
import { DeckNameEditor } from '@/components/deck/DeckNameEditor';
import { CardType } from '@/types/card';
import type { BlackCard, WhiteCard } from '@/types/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BuilderPage() {
  const [showDeck, setShowDeck] = useState(true);

  const {
    filteredBlackCards,
    filteredWhiteCards,
    isLoading,
    error,
    filters,
    setFilters,
    resetFilters,
    allPacks,
    stats,
  } = useCards();

  const { addBlackCard, addWhiteCard } = useDeckStore();

  const handleCardClick = (card: BlackCard | WhiteCard, type: CardType) => {
    if (type === CardType.BLACK) {
      addBlackCard(card as BlackCard);
    } else {
      addWhiteCard(card as WhiteCard);
    }
  };

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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Deck Builder</h1>
          <p className="text-muted-foreground">
            Click cards to add them to your deck
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8  overflow-y-auto">
          {/* Card Browser Section */}
          <div className={`${showDeck ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <CardFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
              allPacks={allPacks}
              stats={stats}
            />

            <div className="mt-6 space-y-8">
              {(filters.cardType === 'all' || filters.cardType === 'black') && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Black Cards ({filteredBlackCards.length})
                  </h2>
                  <CardList
                    cards={filteredBlackCards}
                    type={CardType.BLACK}
                    isLoading={isLoading}
                    onCardClick={(card) =>
                      handleCardClick(card, CardType.BLACK)
                    }
                  />
                </div>
              )}

              {(filters.cardType === 'all' || filters.cardType === 'white') && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    White Cards ({filteredWhiteCards.length})
                  </h2>
                  <CardList
                    cards={filteredWhiteCards}
                    type={CardType.WHITE}
                    isLoading={isLoading}
                    onCardClick={(card) =>
                      handleCardClick(card, CardType.WHITE)
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* Deck Section */}
          {showDeck && (
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-4 space-y-4">
                <DeckNameEditor />
                <DeckStats />
                <DeckActions />

                {/* Scrollable deck area */}
                <div className="max-h-[600px] border rounded-lg bg-card p-4">
                  <DeckArea />
                </div>
              </div>
            </div>
          )}

          {/* Toggle Deck Button (Mobile) */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowDeck(!showDeck)}
            className="fixed bottom-4 right-4 lg:hidden z-50 h-12 w-12 rounded-full shadow-lg"
          >
            {showDeck ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      </div>
    </div>
  );
}
