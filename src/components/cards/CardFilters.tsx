'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import type { CardFilters as CardFiltersType, CardPack } from '@/types/card';

interface CardFiltersProps {
  filters: CardFiltersType;
  onFiltersChange: (filters: CardFiltersType) => void;
  onReset: () => void;
  allPacks: CardPack[];
  stats: {
    filteredBlackCount: number;
    filteredWhiteCount: number;
  };
}

export function CardFilters({
  filters,
  onFiltersChange,
  onReset,
  stats,
}: CardFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            value={filters.searchQuery}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchQuery: e.target.value })
            }
            className="pl-10 pr-10"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFiltersChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select
          value={filters.cardType}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              cardType: value as 'all' | 'black' | 'white',
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Card type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cards</SelectItem>
            <SelectItem value="black">Black Cards</SelectItem>
            <SelectItem value="white">White Cards</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              sortBy: value as CardFiltersType['sortBy'],
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="pack">By Pack</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {stats.filteredBlackCount} black and {stats.filteredWhiteCount}{' '}
        white cards
      </div>
    </div>
  );
}
