'use client';

import { useDeckStore } from '@/store/deckStore';
import { DECK_CONSTRAINTS } from '@/types/deck';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function DeckStats() {
  const { currentDeck, getTotalCards, isValid, canDownload } = useDeckStore();

  const totalCards = getTotalCards();
  const blackCount = currentDeck.blackCards.length;
  const whiteCount = currentDeck.whiteCards.length;
  const percentFull = (totalCards / DECK_CONSTRAINTS.MAX_CARDS) * 100;
  const isValidDeck = isValid();
  const isDownloadable = canDownload();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Deck Name */}
          <div>
            <h3 className="text-lg font-semibold truncate">
              {currentDeck.name}
            </h3>
            {currentDeck.description && (
              <p className="text-sm text-muted-foreground truncate">
                {currentDeck.description}
              </p>
            )}
          </div>

          {/* Card Counts */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold">{totalCards}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{blackCount}</p>
              <p className="text-xs text-muted-foreground">Black</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{whiteCount}</p>
              <p className="text-xs text-muted-foreground">White</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Capacity</span>
              <span>
                {totalCards} / {DECK_CONSTRAINTS.MAX_CARDS}
              </span>
            </div>
            <Progress value={percentFull} className="h-2" />
          </div>

          {/* Validation Status */}
          <div className="flex items-center gap-2 text-sm">
            {isValidDeck ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-green-700">Valid deck</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700">Add cards to validate</span>
              </>
            )}
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {isDownloadable && <Badge variant="secondary">Downloadable</Badge>}
            {currentDeck.is_public && <Badge variant="outline">Public</Badge>}
            {totalCards === 0 && <Badge variant="outline">Empty</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
