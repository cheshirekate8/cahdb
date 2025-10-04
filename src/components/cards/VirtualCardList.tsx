'use client'

import { FixedSizeGrid as Grid } from 'react-window'
import { GameCard } from './GameCard'
import type { BlackCard, WhiteCard, CardType } from '@/types/card'
import { useEffect, useState } from 'react'

interface VirtualCardListProps {
  cards: (BlackCard | WhiteCard)[]
  type: CardType
  onCardClick?: (card: BlackCard | WhiteCard) => void
}

export function VirtualCardList({
  cards,
  type,
  onCardClick,
}: VirtualCardListProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const cardWidth = 280
  const cardHeight = 320
  const gap = 24
  const columnCount = Math.floor((dimensions.width - 64) / (cardWidth + gap)) || 1
  const rowCount = Math.ceil(cards.length / columnCount)

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex
    if (index >= cards.length) return null

    const card = cards[index]

    return (
      <div
        style={{
          ...style,
          left: (style.left as number) + gap / 2,
          top: (style.top as number) + gap / 2,
          width: cardWidth,
          height: cardHeight,
        }}
      >
        <GameCard
          card={card}
          type={type}
          onClick={() => onCardClick?.(card)}
        />
      </div>
    )
  }

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={cardWidth + gap}
      height={Math.min(dimensions.height - 400, rowCount * (cardHeight + gap))}
      rowCount={rowCount}
      rowHeight={cardHeight + gap}
      width={dimensions.width - 64}
    >
      {Cell}
    </Grid>
  )
}