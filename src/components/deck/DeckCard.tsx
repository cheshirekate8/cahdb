'use client';

import { GameCard } from '@/components/cards/GameCard';
import type { BlackCard, WhiteCard, CardType } from '@/types/card';

interface DeckCardProps {
  card: BlackCard | WhiteCard;
  type: CardType;
  index: number;
  onRemove: (index: number) => void;
  packName: string | undefined;
}

export function DeckCard({
  card,
  type,
  index,
  onRemove,
  packName,
}: DeckCardProps) {
  return (
    <GameCard
      card={card}
      type={type}
      isInDeck={true}
      onRemove={() => onRemove(index)}
      packName={packName}
    />
  );
}
