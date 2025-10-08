'use client';

import { useState, useCallback } from 'react';
import type { Deck } from '@/types/deck';

export function useDecks() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all decks
  const fetchDecks = useCallback(async (): Promise<Deck[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/decks');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch decks');
      }

      return result.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch decks';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save new deck
  const saveDeck = useCallback(
    async (deck: Partial<Deck>): Promise<Deck | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/decks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: deck.name,
            description: deck.description,
            blackCards: deck.blackCards,
            whiteCards: deck.whiteCards,
            is_public: deck.is_public,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to save deck');
        }

        return result.data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to save deck';
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Update existing deck
  const updateDeck = useCallback(
    async (id: string, updates: Partial<Deck>): Promise<Deck | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/decks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: updates.name,
            description: updates.description,
            blackCards: updates.blackCards,
            whiteCards: updates.whiteCards,
            is_public: updates.is_public,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to update deck');
        }

        return result.data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to update deck';
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Delete deck
  const deleteDeck = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/decks/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete deck');
      }

      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete deck';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchDecks,
    saveDeck,
    updateDeck,
    deleteDeck,
  };
}
