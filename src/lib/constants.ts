// App Configuration
export const APP_CONFIG = {
  name: 'Deck Builder',
  description: 'Build and share custom card decks',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  maxDeckSize: parseInt(process.env.NEXT_PUBLIC_MAX_DECK_SIZE || '60'),
  minDeckSize: 0, // No minimum, but need at least 1 card to download
} as const;

// Card Types
export const CARD_TYPES = {
  BLACK: 'black',
  WHITE: 'white',
} as const;

// Card Rarities
export const CARD_RARITIES = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  COLLECTION: '/collection',
  BUILDER: '/builder',
  DECKS: '/decks',
  CART: '/cart',
  PROFILE: '/profile',
  ABOUT: '/about',
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  FLIP: 600,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'deck-builder-cart',
  DRAFT_DECK: 'deck-builder-draft',
  THEME: 'deck-builder-theme',
} as const;