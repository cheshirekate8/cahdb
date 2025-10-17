'use client';

import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { CardSkeleton } from './CardSkeleton';
import type { BlackCard, WhiteCard, CardType } from '@/types/card';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface CardListProps {
  cards: (BlackCard | WhiteCard)[];
  type: CardType;
  isLoading?: boolean;
  onCardClick?: (card: BlackCard | WhiteCard) => void;
  packLookup?: Map<number, string>;
}

export function CardList({
  cards,
  type,
  packLookup,
  isLoading = false,
  onCardClick,
}: CardListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-muted-foreground"
      >
        No cards found
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div
          key={`${type}-${card.text}-${index}`}
          variants={staggerItem}
        >
          <GameCard
            card={card}
            type={type}
            packName={packLookup?.get(card.pack)}
            onClick={() => onCardClick?.(card)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
