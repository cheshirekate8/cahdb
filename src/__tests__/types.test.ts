import { validateDeck } from '@/lib/utils/validation';
import { isBlackCard, isWhiteCard } from '@/types/card';
import type { Deck } from '@/types/deck';

describe('Card Type Guards', () => {
  test('isBlackCard identifies black cards', () => {
    const card = { text: 'Test', pick: 1, pack: 1 };
    expect(isBlackCard(card)).toBe(true);
  });

  test('isWhiteCard identifies white cards', () => {
    const card = { text: 'Test', pack: 1 };
    expect(isWhiteCard(card)).toBe(true);
  });
});

describe('Deck Validation', () => {
  test('empty deck is invalid', () => {
    const deck: Deck = {
      name: 'Test',
      blackCards: [],
      whiteCards: [],
      is_public: false,
    };

    const result = validateDeck(deck);
    expect(result.isValid).toBe(false);
  });

  test('deck with cards is valid', () => {
    const deck: Deck = {
      name: 'Test Deck',
      blackCards: [{ text: 'Test', pick: 1, pack: 1 }],
      whiteCards: [],
      is_public: false,
    };

    const result = validateDeck(deck);
    expect(result.isValid).toBe(true);
  });
});
