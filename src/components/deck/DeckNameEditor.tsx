'use client';

import { useState, useEffect } from 'react';
import { useDeckStore } from '@/store/deckStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export function DeckNameEditor() {
  const { currentDeck, setDeckName, setDeckDescription } = useDeckStore();

  const [name, setName] = useState(currentDeck.name);
  const [description, setDescription] = useState(currentDeck.description || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name !== currentDeck.name) {
        setDeckName(name);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (description !== currentDeck.description) {
        setDeckDescription(description);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [description]);

  useEffect(() => {
    setName(currentDeck.name);
    setDescription(currentDeck.description || '');
  }, [currentDeck.id]);

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="deck-name">Deck Name</Label>
          <Input
            id="deck-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter deck name..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="deck-description">Description (Optional)</Label>
          <Textarea
            id="deck-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this deck about?"
            className="mt-1 resize-none"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
