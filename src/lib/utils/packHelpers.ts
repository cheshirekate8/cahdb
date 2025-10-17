import type { CardPack, BlackCard, WhiteCard } from '@/types/card';

/**
 * Create a lookup map of pack number to pack name
 */
export function createPackLookup(packs: CardPack[]): Map<number, string> {
  const lookup = new Map<number, string>();

  packs.forEach((pack) => {
    const packNumber = pack.black[0]?.pack || pack.white[0]?.pack;
    if (packNumber !== undefined) {
      lookup.set(packNumber, pack.name);
    }
  });

  return lookup;
}
export function getPackName(
  card: BlackCard | WhiteCard,
  packs: CardPack[]
): string {
  const pack = packs.find(
    (p) =>
      p.black.some((c) => c.pack === card.pack) ||
      p.white.some((c) => c.pack === card.pack)
  );
  return pack?.name || `Pack ${card.pack}`;
}
