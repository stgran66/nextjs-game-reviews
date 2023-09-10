import { searchReviews } from '@/lib/reviews';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');
  const reviews = await searchReviews(query, 5);
  return NextResponse.json(reviews);
}
