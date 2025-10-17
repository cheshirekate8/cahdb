'use client';

import { useDeckStore } from '@/store/deckStore';
import { DeckCard } from './DeckCard';
import { CardType } from '@/types/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackagePlus } from 'lucide-react';
import { useCards } from '@/hooks/useCards';
export function DeckArea() {
  const { currentDeck, removeBlackCard, removeWhiteCard } = useDeckStore();
  const { packLookup } = useCards();

  const blackCards = currentDeck.blackCards;
  const whiteCards = currentDeck.whiteCards;
  const isEmpty = blackCards.length === 0 && whiteCards.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg bg-muted/50">
        <PackagePlus className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your deck is empty</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Click on cards from the card browser to add them to your deck
        </p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">
          All ({blackCards.length + whiteCards.length})
        </TabsTrigger>
        <TabsTrigger value="black">Black ({blackCards.length})</TabsTrigger>
        <TabsTrigger value="white">White ({whiteCards.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-6 mt-4">
        {blackCards.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              BLACK CARDS ({blackCards.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {blackCards.map((card, index) => (
                <DeckCard
                  key={`black-${index}`}
                  card={card}
                  type={CardType.BLACK}
                  index={index}
                  onRemove={removeBlackCard}
                  packName={packLookup?.get(card.pack) || undefined}
                />
              ))}
            </div>
          </div>
        )}

        {whiteCards.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              WHITE CARDS ({whiteCards.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {whiteCards.map((card, index) => (
                <DeckCard
                  key={`white-${index}`}
                  card={card}
                  type={CardType.WHITE}
                  index={index}
                  onRemove={removeWhiteCard}
                  packName={packLookup?.get(card.pack)}
                />
              ))}
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="black" className="mt-4">
        {blackCards.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No black cards in deck yet
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {blackCards.map((card, index) => (
              <DeckCard
                key={`black-${index}`}
                card={card}
                type={CardType.BLACK}
                index={index}
                onRemove={removeBlackCard}
                packName={packLookup?.get(card.pack)}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="white" className="mt-4">
        {whiteCards.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No white cards in deck yet
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {whiteCards.map((card, index) => (
              <DeckCard
                key={`white-${index}`}
                card={card}
                type={CardType.WHITE}
                index={index}
                onRemove={removeWhiteCard}
                packName={packLookup?.get(card.pack)}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
