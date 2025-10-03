import { Deck, DECK_CONSTRAINTS, DeckValidation } from '@/types/deck';
import { z } from 'zod';

export const deckNameSchema = z
  .string()
  .min(DECK_CONSTRAINTS.NAME_MIN_LENGTH, 'Deck name is required')
  .max(
    DECK_CONSTRAINTS.NAME_MAX_LENGTH,
    `Deck name must be less than ${DECK_CONSTRAINTS.NAME_MAX_LENGTH} characters`
  );

export const deckDescriptionSchema = z
  .string()
  .max(
    DECK_CONSTRAINTS.DESCRIPTION_MAX_LENGTH,
    `Description must be less than ${DECK_CONSTRAINTS.DESCRIPTION_MAX_LENGTH} characters`
  )
  .optional();

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(72, 'Password must be less than 72 characters');

export function validateDeck(deck: Deck): DeckValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const nameResult = deckNameSchema.safeParse(deck.name);
  if (!nameResult.success) {
    errors.push(nameResult.error.issues[0].message);
  }

  if (deck.description) {
    const descResult = deckDescriptionSchema.safeParse(deck.description);
    if (!descResult.success) {
      errors.push(descResult.error.issues[0].message);
    }
  }

  const totalCards = deck.blackCards.length + deck.whiteCards.length;

  if (totalCards === 0) {
    errors.push('Deck must contain at least one card');
  }

  if (totalCards > DECK_CONSTRAINTS.MAX_CARDS) {
    errors.push(
      `Deck cannot contain more than ${DECK_CONSTRAINTS.MAX_CARDS} cards`
    );
  }

  if (totalCards > 500) {
    warnings.push('Large deck size may impact performance');
  }

  if (deck.blackCards.length === 0) {
    warnings.push('Deck has no black cards');
  }

  if (deck.whiteCards.length === 0) {
    warnings.push('Deck has no white cards');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function isDeckDownloadable(deck: Deck): boolean {
  const totalCards = deck.blackCards.length + deck.whiteCards.length;
  return totalCards >= DECK_CONSTRAINTS.MIN_FOR_DOWNLOAD;
}

export function calculateDeckStats(deck: Deck) {
  const totalCards = deck.blackCards.length + deck.whiteCards.length;
  const uniquePacks = new Set([
    ...deck.blackCards.map((c) => c.pack),
    ...deck.whiteCards.map((c) => c.pack),
  ]).size;

  return {
    totalCards,
    blackCardCount: deck.blackCards.length,
    whiteCardCount: deck.whiteCards.length,
    uniquePacks,
    isDownloadable: isDeckDownloadable(deck),
    percentOfMax: (totalCards / DECK_CONSTRAINTS.MAX_CARDS) * 100,
  };
}
