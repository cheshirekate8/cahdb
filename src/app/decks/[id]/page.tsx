'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCards } from '@/hooks/useCards';
import { useDeckStore } from '@/store/deckStore';
import { CardFilters } from '@/components/cards/CardFilters';
import { CardList } from '@/components/cards/CardList';
import { DeckArea } from '@/components/deck/DeckArea';
import { DeckStats } from '@/components/deck/DeckStats';
import { DeckActions } from '@/components/deck/DeckActions';
import { DeckNameEditor } from '@/components/deck/DeckNameEditor';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { CardType } from '@/types/card';
import type { BlackCard, WhiteCard } from '@/types/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditDeckPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.id as string;

  const [isLoadingDeck, setIsLoadingDeck] = useState(true);

  const {
    filteredBlackCards,
    filteredWhiteCards,
    isLoading: isLoadingCards,
    error: cardsError,
    filters,
    setFilters,
    resetFilters,
    allPacks,
    stats,
  } = useCards();

  const { addBlackCard, addWhiteCard, loadDeck } = useDeckStore();

  useEffect(() => {
    loadDeckData();
  }, [deckId]);

  const loadDeckData = async () => {
    try {
      const response = await fetch(`/api/decks/${deckId}`);
      const result = await response.json();

      if (result.success) {
        loadDeck(result.data);
      } else {
        alert('✗ Failed to load deck');
        router.push('/decks');
      }
    } catch (error) {
      console.error('Error loading deck:', error);
      alert('✗ Error loading deck');
      router.push('/decks');
    } finally {
      setIsLoadingDeck(false);
    }
  };

  const handleCardClick = (card: BlackCard | WhiteCard, type: CardType) => {
    if (type === CardType.BLACK) {
      addBlackCard(card as BlackCard);
    } else {
      addWhiteCard(card as WhiteCard);
    }
  };

  if (isLoadingDeck) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading deck..." />
      </div>
    );
  }

  if (cardsError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{cardsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/decks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Decks
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Edit Deck</h1>
          <p className="text-muted-foreground">
            Modify your deck and save changes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                    isLoading={isLoadingCards}
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
                    isLoading={isLoadingCards}
                    onCardClick={(card) =>
                      handleCardClick(card, CardType.WHITE)
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
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
      </div>
    </div>
  );
}
