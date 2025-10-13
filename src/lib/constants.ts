export const ROUTES = {
  HOME: '/',
  BUILDER: '/builder',
  DECKS: '/decks',
  CART: '/cart',
  ABOUT: '/about',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  SHARED_DECK: (shareId: string) => `/decks/shared/${shareId}`,
  EDIT_DECK: (deckId: string) => `/decks/${deckId}`,
} as const;

export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
} as const;

export const STORAGE_KEYS = {
  CART: 'deck-builder-cart',
  DRAFT_DECK: 'deck-builder-draft',
  THEME: 'deck-builder-theme',
  FILTERS: 'deck-builder-filters',
} as const;

export const API_ENDPOINTS = {
  CARDS: '/api/cards',
  DECKS: '/api/decks',
  DECK_BY_ID: (id: string) => `/api/decks/${id}`,
} as const;

export const EXTERNAL_LINKS = {
  PORTFOLIO:
    process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://cheshirekate8.github.io/',
  GITHUB: 'https://github.com/cheshirekate8/cahdb',
} as const;
