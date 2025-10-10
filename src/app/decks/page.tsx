'use client';

import { useEffect, useState } from 'react';
import { useDecks } from '@/hooks/useDecks';
import { DeckGridCard } from '@/components/deck/DeckGridCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Deck } from '@/types/deck';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const { fetchDecks, deleteDeck, updateDeck, isLoading } = useDecks();

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    const fetchedDecks = await fetchDecks();
    setDecks(fetchedDecks);
  };

  const handleDelete = async () => {
    if (!deckToDelete) return;

    const success = await deleteDeck(deckToDelete);
    if (success) {
      setDecks(decks.filter((d) => d.id !== deckToDelete));
      alert('✓ Deck deleted successfully');
    } else {
      alert('✗ Failed to delete deck');
    }
    setDeckToDelete(null);
  };

  const handleShare = async (deck: Deck) => {
    if (!deck.is_public && deck.id) {
      const updated = await updateDeck(deck.id, { is_public: true });
      if (updated) {
        setDecks(decks.map((d) => (d.id === deck.id ? updated : d)));
        deck = updated;
      }
    }

    const url = `${window.location.origin}/decks/shared/${deck.share_id}`;
    setShareUrl(url);
  };

  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      alert('✓ Share link copied to clipboard!');
      setShareUrl(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading your decks..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Decks</h1>
            <p className="text-muted-foreground">
              {decks.length} {decks.length === 1 ? 'deck' : 'decks'} in your
              collection
            </p>
          </div>
          <Button asChild>
            <Link href="/builder">
              <Plus className="h-4 w-4 mr-2" />
              New Deck
            </Link>
          </Button>
        </div>

        {decks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No decks yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Start building your first deck to save and share it with others
            </p>
            <Button asChild>
              <Link href="/builder">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Deck
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckGridCard
                key={deck.id}
                deck={deck}
                onDelete={(id) => setDeckToDelete(id)}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

        <AlertDialog
          open={!!deckToDelete}
          onOpenChange={(open) => !open && setDeckToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete deck?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                deck.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={!!shareUrl}
          onOpenChange={(open) => !open && setShareUrl(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Share Deck</AlertDialogTitle>
              <AlertDialogDescription>
                Anyone with this link can view your deck
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
              {shareUrl}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={copyShareUrl}>
                Copy Link
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
