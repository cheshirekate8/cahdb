'use client'

import { GameCard } from './GameCard'
import { CardSkeleton } from './CardSkeleton'
import type { BlackCard, WhiteCard, CardType } from '@/types/card'

interface CardListProps {
  cards: (BlackCard | WhiteCard)[]
  type: CardType
  isLoading?: boolean
  onCardClick?: (card: BlackCard | WhiteCard) => void
}

export function CardList({
  cards,
  type,
  isLoading = false,
  onCardClick,
}: CardListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No cards found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <GameCard
          key={`${type}-${index}`}
          card={card}
          type={type}
          onClick={() => onCardClick?.(card)}
        />
      ))}
    </div>
  )
}