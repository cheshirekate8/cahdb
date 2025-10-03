export interface WhiteCard {
  text: string;
  pack: number;
}

export interface BlackCard {
  text: string;
  pick: number;
  pack: number;
}

export interface CardPack {
  name: string;
  white: WhiteCard[];
  black: BlackCard[];
  official: boolean;
}

export type CardCollection = CardPack[];

export type Card = WhiteCard | BlackCard;

export function isBlackCard(card: Card): card is BlackCard {
  return 'pick' in card;
}

export function isWhiteCard(card: Card): card is WhiteCard {
  return !('pick' in card);
}

export enum CardType {
  BLACK = 'black',
  WHITE = 'white',
}

export interface TypedCard {
  card: Card;
  type: CardType;
  id: string;
}

export interface CardFilters {
  searchQuery: string;
  cardType: CardType | 'all';
  packs: number[];
  sortBy: 'alphabetical' | 'pack' | 'default';
}

export interface CardStats {
  totalWhite: number;
  totalBlack: number;
  totalPacks: number;
  officialPacks: number;
}
