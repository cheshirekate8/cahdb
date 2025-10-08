'use client';

import { useState, useEffect, useMemo } from 'react';
import type { CardPack, BlackCard, WhiteCard, CardFilters } from '@/types/card';

const defaultFilters: CardFilters = {
  searchQuery: '',
  cardType: 'all',
  packs: [],
  sortBy: 'default',
};

export function useCards() {
  const [allPacks, setAllPacks] = useState<CardPack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<CardFilters>(defaultFilters);

  useEffect(() => {
    let mounted = true;

    async function fetchCards() {
      try {
        const response = await fetch('/api/cards');
        const result = await response.json();

        if (!mounted) return;

        if (!result.success) {
          throw new Error(result.error || 'Failed to load cards');
        }

        setAllPacks(result.data);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching cards:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchCards();
    return () => {
      mounted = false;
    };
  }, []); 

  const blackCards = useMemo(() => {
    return allPacks.flatMap((pack) => pack.black);
  }, [allPacks]);

  const whiteCards = useMemo(() => {
    return allPacks.flatMap((pack) => pack.white);
  }, [allPacks]);

  const filteredBlackCards = useMemo(() => {
    let filtered = [...blackCards];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((card) =>
        card.text.toLowerCase().includes(query)
      );
    }

    if (filters.packs.length > 0) {
      filtered = filtered.filter((card) => filters.packs.includes(card.pack));
    }

    switch (filters.sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'pack':
        filtered.sort((a, b) => a.pack - b.pack);
        break;
    }

    return filtered;
  }, [blackCards, filters]);

  const filteredWhiteCards = useMemo(() => {
    let filtered = [...whiteCards];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((card) =>
        card.text.toLowerCase().includes(query)
      );
    }

    if (filters.packs.length > 0) {
      filtered = filtered.filter((card) => filters.packs.includes(card.pack));
    }

    switch (filters.sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'pack':
        filtered.sort((a, b) => a.pack - b.pack);
        break;
    }

    return filtered;
  }, [whiteCards, filters]);

  const stats = useMemo(
    () => ({
      totalPacks: allPacks.length,
      totalBlackCards: blackCards.length,
      totalWhiteCards: whiteCards.length,
      filteredBlackCount: filteredBlackCards.length,
      filteredWhiteCount: filteredWhiteCards.length,
    }),
    [allPacks, blackCards, whiteCards, filteredBlackCards, filteredWhiteCards]
  );

  return {
    allPacks,
    blackCards,
    whiteCards,
    filteredBlackCards,
    filteredWhiteCards,
    isLoading,
    error,
    filters,
    setFilters: setFiltersState,
    resetFilters: () => setFiltersState(defaultFilters),
    stats,
  };
}
