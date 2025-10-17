'use client';

import { motion } from 'framer-motion';
import { BlackCard, WhiteCard, CardType } from '@/types/card';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonTap, cardHover } from '@/lib/animations';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface GameCardProps {
  card: BlackCard | WhiteCard;
  type: CardType;
  packName?: string | undefined;
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

  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState('text-lg');

  // Adjust font size to fit text
  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const container = element.parentElement;
    if (!container) return;

    // Reset to largest size first
    element.className = cn(
      'font-medium leading-relaxed text-center transition-all',
      'text-lg'
    );

    // Check if text overflows
    if (element.scrollHeight > container.clientHeight) {
      element.className = cn(
        'font-medium leading-relaxed text-center transition-all',
        'text-base'
      );
    }

    if (element.scrollHeight > container.clientHeight) {
      element.className = cn(
        'font-medium leading-relaxed text-center transition-all',
        'text-sm'
      );
    }

    if (element.scrollHeight > container.clientHeight) {
      element.className = cn(
        'font-medium leading-relaxed text-center transition-all',
        'text-xs'
      );
    }
  }, [card.text]);

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
          'game-card relative max-w-40 aspect-[5/7] p-6 rounded-xl shadow-lg',
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

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <p
            ref={textRef}
            className="font-medium leading-relaxed text-center text-lg"
          >
            {card.text}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4"></div>

        <div className="flex items-end justify-between text-[10px] opacity-80 gap-1 min-h-[20px]">
          <div className="text-xs opacity-60">
            {packName || `Pack ${card.pack}`}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
