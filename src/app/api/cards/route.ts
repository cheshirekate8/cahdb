import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import type { CardPack } from '@/types/card'

let cardsCache: CardPack[] | null = null

export async function GET() {
  try {
    if (cardsCache) {
      return NextResponse.json({
        success: true,
        data: cardsCache,
        cached: true,
      })
    }

    const filePath = join(process.cwd(), 'public', 'cards.json')
    const fileContents = await readFile(filePath, 'utf8')
    const cards: CardPack[] = JSON.parse(fileContents)

    if (!Array.isArray(cards)) {
      throw new Error('Cards data must be an array of packs')
    }

    cardsCache = cards

    return NextResponse.json({
      success: true,
      data: cards,
      cached: false,
    })
  } catch (error) {
    console.error('Error reading cards:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load cards',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function HEAD() {
  try {
    const filePath = join(process.cwd(), 'public', 'cards.json')
    const fileContents = await readFile(filePath, 'utf8')
    const cards: CardPack[] = JSON.parse(fileContents)

    const stats = {
      totalPacks: cards.length,
      totalWhiteCards: cards.reduce((sum, pack) => sum + pack.white.length, 0),
      totalBlackCards: cards.reduce((sum, pack) => sum + pack.black.length, 0),
      officialPacks: cards.filter(pack => pack.official).length,
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate stats' },
      { status: 500 }
    )
  }
}