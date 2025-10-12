'use client'

import { motion } from 'framer-motion'
import { useDeckStore } from '@/store/deckStore'
import { DECK_CONSTRAINTS } from '@/types/deck'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { fadeInUp } from '@/lib/animations'

export function DeckStats() {
  const { currentDeck, getTotalCards, isValid, canDownload } = useDeckStore()
  
  const totalCards = getTotalCards()
  const blackCount = currentDeck.blackCards.length
  const whiteCount = currentDeck.whiteCards.length
  const percentFull = (totalCards / DECK_CONSTRAINTS.MAX_CARDS) * 100
  const isValidDeck = isValid()
  const isDownloadable = canDownload()

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Deck Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold truncate">{currentDeck.name}</h3>
              {currentDeck.description && (
                <p className="text-sm text-muted-foreground truncate">
                  {currentDeck.description}
                </p>
              )}
            </motion.div>

            {/* Card Counts */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <p className="text-2xl font-bold">{totalCards}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <p className="text-2xl font-bold">{blackCount}</p>
                <p className="text-xs text-muted-foreground">Black</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <p className="text-2xl font-bold">{whiteCount}</p>
                <p className="text-xs text-muted-foreground">White</p>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Capacity</span>
                <span>{totalCards} / {DECK_CONSTRAINTS.MAX_CARDS}</span>
              </div>
              <Progress value={percentFull} className="h-2" />
            </motion.div>

            {/* Validation Status */}
            <motion.div 
              className="flex items-center gap-2 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>

            {/* Badges */}
            <motion.div 
              className="flex gap-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isDownloadable && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge variant="secondary">Downloadable</Badge>
                </motion.div>
              )}
              {currentDeck.is_public && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge variant="outline">Public</Badge>
                </motion.div>
              )}
              {totalCards === 0 && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge variant="outline">Empty</Badge>
                </motion.div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}