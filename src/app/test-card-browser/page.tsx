'use client';

import { useCards } from '@/hooks/useCards';
import { CardFilters } from '@/components/cards/CardFilters';
import { CardList } from '@/components/cards/CardList';
import { CardType } from '@/types/card';

export default function TestCardBrowserPage() {
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

  if (error) {
    return <div className="p-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Card Browser</h1>

        <CardFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          allPacks={allPacks}
          stats={stats}
        />

        <div className="mt-8 space-y-8">
          {(filters.cardType === 'all' || filters.cardType === 'black') && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Black Cards ({filteredBlackCards.length})
              </h2>
              <CardList
                cards={filteredBlackCards}
                type={CardType.BLACK}
                isLoading={isLoading}
                onCardClick={(card) => console.log('Clicked:', card)}
              />
            </div>
          )}

          {(filters.cardType === 'all' || filters.cardType === 'white') && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                White Cards ({filteredWhiteCards.length})
              </h2>
              <CardList
                cards={filteredWhiteCards.slice(0, 20)}
                type={CardType.WHITE}
                isLoading={isLoading}
                onCardClick={(card) => console.log('Clicked:', card)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
