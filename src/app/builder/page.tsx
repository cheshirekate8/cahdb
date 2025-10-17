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
import { X } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

export default function BuilderPage() {
  const [showDeck, setShowDeck] = useState(false); // Start as false on mobile

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
    packLookup,
  } = useCards();

  const { addBlackCard, addWhiteCard, getTotalCards } = useDeckStore();

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card Browser Section */}
          <div className="lg:col-span-7">
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
                    packLookup={packLookup}
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
                    packLookup={packLookup}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Deck Section - Desktop (always visible) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="lg:sticky lg:top-4 space-y-4">
              <DeckNameEditor />
              <DeckStats />
              <DeckActions />

              <div className="max-h-[600px] overflow-y-auto border rounded-lg bg-card p-4">
                <DeckArea />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Deck Drawer Overlay */}
        {showDeck && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowDeck(false)}
          />
        )}

        {/* Mobile Deck Drawer */}
        <div
          className={`
            lg:hidden fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-background z-50
            transform transition-transform duration-300 ease-in-out
            ${showDeck ? 'translate-x-0' : 'translate-x-full'}
            shadow-2xl overflow-y-auto
          `}
        >
          {/* Close button */}
          <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold">Your Deck</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeck(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Deck content */}
          <div className="p-4 space-y-4">
            <DeckNameEditor />
            <DeckStats />
            <DeckActions />
            <DeckArea />
          </div>
        </div>

        {/* Toggle Deck Button (Mobile) - Floating Button */}
        <Button
          onClick={() => setShowDeck(!showDeck)}
          className="lg:hidden fixed bottom-4 right-4 z-30 h-12 w-12 rounded-full shadow-lg border-2 border-white"
          size="icon"
        >
          <div className="flex justify-center items-center">
            <ChevronLeft />
            {getTotalCards() > 0 && <span className="">{getTotalCards()}</span>}
          </div>
        </Button>
      </div>
    </div>
  );
}
