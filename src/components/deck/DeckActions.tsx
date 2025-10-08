'use client';

import { useDeckStore } from '@/store/deckStore';
import { Button } from '@/components/ui/button';
import { Trash2, Save, Download } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function DeckActions() {
  const { currentDeck, clearDeck, canDownload, isModified } = useDeckStore();

  const handleDownload = () => {
    const deckData = {
      name: currentDeck.name,
      description: currentDeck.description,
      blackCards: currentDeck.blackCards,
      whiteCards: currentDeck.whiteCards,
      createdAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(deckData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentDeck.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Save Button (placeholder for now) */}
      <Button disabled={!isModified} className="flex-1 sm:flex-none">
        <Save className="h-4 w-4 mr-2" />
        Save Deck
      </Button>

      {/* Download Button */}
      <Button
        variant="outline"
        onClick={handleDownload}
        disabled={!canDownload()}
        className="flex-1 sm:flex-none"
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>

      {/* Clear Deck Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="flex-1 sm:flex-none">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear entire deck?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all cards from your deck. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearDeck}>
              Clear Deck
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
