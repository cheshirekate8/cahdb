'use client';

import { motion } from 'framer-motion';
import { BlackCard, WhiteCard, CardType } from '@/types/card';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonTap, cardHover } from '@/lib/animations';
import Image from 'next/image';

interface GameCardProps {
  card: BlackCard | WhiteCard;
  type: CardType;
  packName?: string | undefined; // Be very explicit
  isSelected?: boolean;
  isInDeck?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function GameCard({
  card,
  type,
  packName,
  isSelected = false,
  isInDeck = false,
  onClick,
  onRemove,
  className,
}: GameCardProps) {
  const isBlack = type === CardType.BLACK;
  const pick = 'pick' in card ? card.pick : undefined;

  return (
    <motion.div
      layout
      variants={cardHover}
      initial="rest"
      onClick={onClick}
      className={cn('relative group', className)}
      whileTap={buttonTap}
    >
      <div
        className={cn(
          'game-card relative w-full h-64 p-6 rounded-xl shadow-lg',
          'flex flex-col justify-between',
          'transition-shadow duration-200',
          isBlack
            ? 'bg-black text-white border-2 border-gray-800'
            : 'bg-white text-black border-2 border-gray-200',
          isSelected && 'ring-4 ring-primary ring-offset-2'
        )}
      >
        {pick !== undefined && pick > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={cn(
              'absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold',
              isBlack ? 'bg-white text-black' : 'bg-black text-white'
            )}
          >
            PICK {pick}
          </motion.div>
        )}

        {/* Remove button */}
        {isInDeck && onRemove && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              'absolute top-2 right-2 p-1 rounded-full',
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'hover:bg-red-500 hover:text-white',
              isBlack ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
            )}
            aria-label="Remove card"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}

        {/* Card text */}
        <div className="flex-1 flex items-center justify-center">
          <p
            className={cn(
              'text-lg font-medium leading-relaxed text-center line-clamp-6'
            )}
          >
            {card.text}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-4">
          <div className="text-xs opacity-60">
            {packName || `Pack ${card.pack}`}
          </div>
          <div className="relative w-8 h-8 opacity-60">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>{' '}
        </div>
      </div>
    </motion.div>
  );
}
