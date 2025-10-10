import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Deck } from '@/types/deck';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: decks, error } = await supabase
      .from('decks')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching decks:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch decks' },
        { status: 500 }
      );
    }

    const parsedDecks = decks.map((deck) => ({
      ...deck,
      blackCards: deck.black_cards || [],
      whiteCards: deck.white_cards || [],
      black_cards: undefined,
      white_cards: undefined,
    }));

    return NextResponse.json({
      success: true,
      data: parsedDecks,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, blackCards, whiteCards, is_public } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Deck name is required' },
        { status: 400 }
      );
    }

    if (!blackCards && !whiteCards) {
      return NextResponse.json(
        { success: false, error: 'Deck must contain at least one card' },
        { status: 400 }
      );
    }

    const shareId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const { data: deck, error } = await supabase
      .from('decks')
      .insert({
        user_id: user.id,
        name: name.trim(),
        description: description?.trim() || null,
        black_cards: blackCards || [],
        white_cards: whiteCards || [],
        share_id: shareId,
        is_public: is_public || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating deck:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create deck' },
        { status: 500 }
      );
    }

    const parsedDeck = {
      ...deck,
      blackCards: deck.black_cards || [],
      whiteCards: deck.white_cards || [],
      black_cards: undefined,
      white_cards: undefined,
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
