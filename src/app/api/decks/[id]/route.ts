import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET single deck
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const deckId = params.id;

    // Check authentication
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

    // Fetch deck
    const { data: deck, error } = await supabase
      .from('decks')
      .select('*')
      .eq('id', deckId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Deck not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching deck:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch deck' },
        { status: 500 }
      );
    }

    // Parse JSONB
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

// PUT - Update deck
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const deckId = params.id;

    // Check authentication
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

    // Parse body
    const body = await request.json();
    const { name, description, blackCards, whiteCards, is_public } = body;

    // Build update object
    const updates: any = {};
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined)
      updates.description = description?.trim() || null;
    if (blackCards !== undefined) updates.black_cards = blackCards;
    if (whiteCards !== undefined) updates.white_cards = whiteCards;
    if (is_public !== undefined) updates.is_public = is_public;

    // Update deck
    const { data: deck, error } = await supabase
      .from('decks')
      .update(updates)
      .eq('id', deckId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating deck:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update deck' },
        { status: 500 }
      );
    }

    // Parse response
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

// DELETE deck
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const deckId = params.id;

    // Check authentication
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

    // Delete deck
    const { error } = await supabase
      .from('decks')
      .delete()
      .eq('id', deckId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting deck:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete deck' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Deck deleted successfully',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
