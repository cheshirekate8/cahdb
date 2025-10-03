import { BlackCard, WhiteCard } from './card';

export interface Deck {
  id?: string;
  user_id?: string;
  name: string;
  description?: string;
  blackCards: BlackCard[];
  whiteCards: WhiteCard[];
  share_id?: string;
  is_public: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateDeckPayload {
  name: string;
  description?: string;
  blackCards: BlackCard[];
  whiteCards: WhiteCard[];
  is_public?: boolean;
}

export interface UpdateDeckPayload {
  name?: string;
  description?: string;
  blackCards?: BlackCard[];
  whiteCards?: WhiteCard[];
  is_public?: boolean;
}

export interface DeckValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const DECK_CONSTRAINTS = {
  MIN_CARDS: 0,
  MAX_CARDS: 1000,
  MIN_FOR_DOWNLOAD: 1,
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 255,
  DESCRIPTION_MAX_LENGTH: 1000,
} as const;

export interface DeckStats {
  totalCards: number;
  blackCardCount: number;
  whiteCardCount: number;
  uniquePacks: number;
  isDownloadable: boolean;
  percentOfMax: number;
}

export interface DeckListItem {
  id: string;
  name: string;
  blackCardCount: number;
  whiteCardCount: number;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  share_id?: string;
}

export interface SharedDeck {
  id: string;
  name: string;
  description?: string;
  blackCards: BlackCard[];
  whiteCards: WhiteCard[];
  created_at: string;
  share_id: string;
}

export type DeckSortOption = 'newest' | 'oldest' | 'name' | 'cardCount';

export interface DeckFilters {
  searchQuery: string;
  sortBy: DeckSortOption;
  showPublicOnly: boolean;
}
