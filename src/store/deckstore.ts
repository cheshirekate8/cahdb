import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Deck } from '@/types/deck';
import type { BlackCard, WhiteCard } from '@/types/card';
import { DECK_CONSTRAINTS } from '@/types/deck';

interface DeckState {
  currentDeck: Deck;
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

  getTotalCards: () => number;
  isValid: () => boolean;
  canDownload: () => boolean;
}

const initialDeck: Deck = {
  name: 'Untitled Deck',
  description: '',
  blackCards: [],
  whiteCards: [],
  is_public: false,
};

export const useDeckStore = create<DeckState>()(
  persist(
    (set, get) => ({
      currentDeck: initialDeck,
      isModified: false,
      lastSaved: null,

      setDeckName: (name) =>
        set((state) => ({
          currentDeck: { ...state.currentDeck, name },
          isModified: true,
        })),

      setDeckDescription: (description) =>
        set((state) => ({
          currentDeck: { ...state.currentDeck, description },
          isModified: true,
        })),

      addBlackCard: (card) =>
        set((state) => {
          const totalCards =
            state.currentDeck.blackCards.length +
            state.currentDeck.whiteCards.length;

          if (totalCards >= DECK_CONSTRAINTS.MAX_CARDS) {
            alert(
              `Cannot add more than ${DECK_CONSTRAINTS.MAX_CARDS} cards to a deck`
            );
            return state;
          }

          return {
            currentDeck: {
              ...state.currentDeck,
              blackCards: [...state.currentDeck.blackCards, card],
            },
            isModified: true,
          };
        }),

      addWhiteCard: (card) =>
        set((state) => {
          const totalCards =
            state.currentDeck.blackCards.length +
            state.currentDeck.whiteCards.length;

          if (totalCards >= DECK_CONSTRAINTS.MAX_CARDS) {
            alert(
              `Cannot add more than ${DECK_CONSTRAINTS.MAX_CARDS} cards to a deck`
            );
            return state;
          }

          return {
            currentDeck: {
              ...state.currentDeck,
              whiteCards: [...state.currentDeck.whiteCards, card],
            },
            isModified: true,
          };
        }),

      removeBlackCard: (index) =>
        set((state) => ({
          currentDeck: {
            ...state.currentDeck,
            blackCards: state.currentDeck.blackCards.filter(
              (_, i) => i !== index
            ),
          },
          isModified: true,
        })),

      removeWhiteCard: (index) =>
        set((state) => ({
          currentDeck: {
            ...state.currentDeck,
            whiteCards: state.currentDeck.whiteCards.filter(
              (_, i) => i !== index
            ),
          },
          isModified: true,
        })),

      clearDeck: () =>
        set({
          currentDeck: initialDeck,
          isModified: false,
          lastSaved: null,
        }),

      loadDeck: (deck) =>
        set({
          currentDeck: deck,
          isModified: false,
          lastSaved: new Date().toISOString(),
        }),

      resetDeck: () =>
        set({
          currentDeck: initialDeck,
          isModified: false,
          lastSaved: null,
        }),

      togglePublic: () =>
        set((state) => ({
          currentDeck: {
            ...state.currentDeck,
            is_public: !state.currentDeck.is_public,
          },
          isModified: true,
        })),

      getTotalCards: () => {
        const state = get();
        return (
          state.currentDeck.blackCards.length +
          state.currentDeck.whiteCards.length
        );
      },

      isValid: () => {
        const state = get();
        const totalCards =
          state.currentDeck.blackCards.length +
          state.currentDeck.whiteCards.length;
        return totalCards > 0 && state.currentDeck.name.length > 0;
      },

      canDownload: () => {
        const state = get();
        return (
          state.currentDeck.blackCards.length > 0 ||
          state.currentDeck.whiteCards.length > 0
        );
      },
    }),
    {
      name: 'deck-storage',
      partialize: (state) => ({
        currentDeck: state.currentDeck,
      }),
    }
  )
);
