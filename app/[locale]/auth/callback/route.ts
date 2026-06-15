// TODO: Callback do Supabase Auth (OAuth / magic link)
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  // Supabase auth callback logic goes here
  return NextResponse.redirect(requestUrl.origin)
}
