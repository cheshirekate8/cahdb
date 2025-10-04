'use client'

import { useState } from 'react'
import { useCards } from '@/hooks/useCards'
import { CardFilters } from './CardFilters'
import { CardList } from './CardList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CardType } from '@/types/card'
import type { BlackCard, WhiteCard } from '@/types/card'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'


interface CardBrowserProps {
  onCardSelect?: (card: BlackCard | WhiteCard, type: CardType) => void
}

export function CardBrowser({ onCardSelect }: CardBrowserProps) {
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
  } = useCards()

  useKeyboardShortcuts({
  '/': () => document.getElementById('search-input')?.focus(),
  'Escape': () => resetFilters(),
  'ctrl+f': () => document.getElementById('search-input')?.focus(),
})

  const [activeTab, setActiveTab] = useState<'all' | 'black' | 'white'>('all')

  if (error) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-semibold text-destructive mb-2">
          Error Loading Cards
        </h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  

  return (
    <div className="space-y-6">
      <CardFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={resetFilters}
        allPacks={allPacks}
        stats={stats}
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">
            All Cards ({stats.filteredBlackCount + stats.filteredWhiteCount})
          </TabsTrigger>
          <TabsTrigger value="black">
            Black ({stats.filteredBlackCount})
          </TabsTrigger>
          <TabsTrigger value="white">
            White ({stats.filteredWhiteCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8 mt-6">
          {filteredBlackCards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Black Cards</h2>
              <CardList
                cards={filteredBlackCards}
                type={CardType.BLACK}
                isLoading={isLoading}
                onCardClick={(card) => onCardSelect?.(card, CardType.BLACK)}
              />
            </div>
          )}

          {filteredWhiteCards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">White Cards</h2>
              <CardList
                cards={filteredWhiteCards}
                type={CardType.WHITE}
                isLoading={isLoading}
                onCardClick={(card) => onCardSelect?.(card, CardType.WHITE)}
              />
            </div>
          )}

          {filteredBlackCards.length === 0 && filteredWhiteCards.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No cards match your filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="black" className="mt-6">
          <CardList
            cards={filteredBlackCards}
            type={CardType.BLACK}
            isLoading={isLoading}
            onCardClick={(card) => onCardSelect?.(card, CardType.BLACK)}
            emptyTitle="No black cards found"
          />
        </TabsContent>

        <TabsContent value="white" className="mt-6">
          <CardList
            cards={filteredWhiteCards}
            type={CardType.WHITE}
            isLoading={isLoading}
            onCardClick={(card) => onCardSelect?.(card, CardType.WHITE)}
            emptyTitle="No white cards found"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}