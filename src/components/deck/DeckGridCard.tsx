'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2, Share2, MoreVertical, Lock, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Deck } from '@/types/deck';

interface DeckGridCardProps {
  deck: Deck;
  onDelete?: (id: string) => void;
  onShare?: (deck: Deck) => void;
}

export function DeckGridCard({ deck, onDelete, onShare }: DeckGridCardProps) {
  const totalCards = deck.blackCards.length + deck.whiteCards.length;
  const createdDate = deck.created_at
    ? new Date(deck.created_at).toLocaleDateString()
    : 'Unknown';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{deck.name}</h3>
            {deck.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {deck.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 ml-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/decks/${deck.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              {onShare && (
                <DropdownMenuItem onClick={() => onShare(deck)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(deck.id!)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="font-medium">{totalCards}</span>
            <span className="text-muted-foreground"> cards</span>
          </div>
          <div>
            <span className="font-medium">{deck.blackCards.length}</span>
            <span className="text-muted-foreground"> black</span>
          </div>
          <div>
            <span className="font-medium">{deck.whiteCards.length}</span>
            <span className="text-muted-foreground"> white</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2">
          {deck.is_public ? (
            <Badge variant="secondary" className="text-xs">
              <Globe className="h-3 w-3 mr-1" />
              Public
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              <Lock className="h-3 w-3 mr-1" />
              Private
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{createdDate}</span>
      </CardFooter>
    </Card>
  );
}
