import { CARD_TYPES, CARD_RARITIES } from '@/lib/constants';

export type CardType = typeof CARD_TYPES[keyof typeof CARD_TYPES];
export type CardRarity = typeof CARD_RARITIES[keyof typeof CARD_RARITIES];

export interface Card {
  id: string;
  type: CardType;
  title: string;
  text: string;
  rarity: CardRarity;
  category: string;
}

export interface CardFilters {
  type?: CardType;
  rarity?: CardRarity;
  category?: string;
  searchQuery?: string;
}

export type CardSortOption = 'name' | 'rarity' | 'type' | 'recent';