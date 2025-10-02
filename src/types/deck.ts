import { Card } from './card';

export interface Deck {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  cards: Card[];
  black_count: number;
  white_count: number;
  total_cards: number;
  is_public: boolean;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDeckInput {
  name: string;
  description?: string;
  cards: Card[];
  is_public?: boolean;
}

export interface UpdateDeckInput {
  name?: string;
  description?: string;
  cards?: Card[];
  is_public?: boolean;
}

export interface DeckValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}