import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const { data: decks, error: dbError } = await supabase
      .from('decks')
      .select('count')
      .limit(1);

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      auth: {
        connected: !authError,
        user: user ? { id: user.id, email: user.email } : null,
      },
      database: {
        connected: !dbError,
      },
    });
  } catch (error) {
    console.error('Supabase connection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Supabase connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
