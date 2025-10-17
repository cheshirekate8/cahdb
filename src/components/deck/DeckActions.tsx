'use client';

import { useState } from 'react';
import { useDeckStore } from '@/store/deckStore';
import { useDecks } from '@/hooks/useDecks';
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
import { motion } from 'framer-motion';
import { buttonTap } from '@/lib/animations';

export function DeckActions() {
  const { currentDeck, clearDeck, canDownload, isModified, loadDeck } =
    useDeckStore();
  const { saveDeck, updateDeck, isLoading } = useDecks();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      let result;
      if (currentDeck.id) {
        result = await updateDeck(currentDeck.id, currentDeck);
      } else {
        result = await saveDeck(currentDeck);
      }

      if (result) {
        loadDeck(result);
        alert(`✓ Deck "${result.name}" saved successfully!`);
      } else {
        alert('✗ Failed to save deck. Please try again.');
      }
    } catch (error) {
      alert(
        `✗ Error saving deck: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsSaving(false);
    }
  };

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

    alert('✓ Deck downloaded!');
  };

  const handleClear = () => {
    clearDeck();
    alert(`Deck Cleared!`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <motion.div whileTap={buttonTap} className="flex-1 sm:flex-none">
        <Button
          onClick={handleSave}
          disabled={!canDownload() || isSaving}
          className="w-full"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving
            ? 'Saving...'
            : currentDeck.id
              ? 'Update Deck'
              : 'Save Deck'}
        </Button>
      </motion.div>

      <motion.div whileTap={buttonTap} className="flex-1 sm:flex-none">
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={!canDownload()}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </motion.div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <motion.div whileTap={buttonTap} className="flex-1 sm:flex-none">
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </motion.div>
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
            <AlertDialogAction onClick={handleClear}>
              Clear Deck
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
