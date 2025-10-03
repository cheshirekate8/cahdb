import type { BlackCard, CardFilters, WhiteCard } from './card';
import type { Deck } from './deck';
import { User } from './user';

export interface DeckStoreState {
  currentDeck: Deck;
  history: Deck[];
  historyIndex: number;
  isModified: boolean;
  lastSaved: string | null;
  setDeckName: (name: string) => void;
  setDeckDescription: (description: string) => void;
  addBlackCard: (card: BlackCard) => void;
  addWhiteCard: (card: WhiteCard) => void;
  removeBlackCard: (index: number) => void;
  removeWhiteCard: (index: number) => void;
  clearDeck: () => void;
  loadDeck: (deck: Deck) => void;
  resetDeck: () => void;
  togglePublic: () => void;
}

export interface CartStoreState {
  items: Deck[];

  addToCart: (deck: Deck) => void;
  removeFromCart: (deckId: string) => void;
  clearCart: () => void;
  isInCart: (deckId: string) => boolean;
}

export interface AuthStoreState {
  user: User | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export interface UIStoreState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;

  cardFilters: CardFilters;
  updateCardFilters: (filters: Partial<CardFilters>) => void;
  resetCardFilters: () => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
