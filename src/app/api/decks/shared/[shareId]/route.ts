import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { shareId: string } }
) {
  try {
    const supabase = await createClient();
    const shareId = params.shareId;

    const { data: deck, error } = await supabase
      .from('decks')
      .select('*')
      .eq('share_id', shareId)
      .eq('is_public', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Deck not found or not public' },
          { status: 404 }
        );
      }
      console.error('Error fetching shared deck:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch deck' },
        { status: 500 }
      );
    }

    const parsedDeck = {
      id: deck.id,
      name: deck.name,
      description: deck.description,
      blackCards: deck.black_cards || [],
      whiteCards: deck.white_cards || [],
      share_id: deck.share_id,
      created_at: deck.created_at,
    };

    return NextResponse.json({
      success: true,
      data: parsedDeck,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
