/**
 * lib/content.ts — Queries Supabase para o O Regrista
 *
 * cache() do React deduplica chamadas dentro do mesmo request.
 * export const revalidate = 300 nas páginas controla o ISR em produção.
 */

import { cache } from 'react'
import { createPublicClient } from './supabase/public'

// ─── tipos ───────────────────────────────────────────────────────────────────

export type PostType   = 'review' | 'article' | 'top10' | 'how-to-play'
export type PostStatus = 'draft' | 'published' | 'archived'
export type Locale     = 'pt' | 'en'

export interface Game {
  id: string
  name: string
  name_pt: string | null
  bgg_id: number | null
  image_url: string | null
  min_players: number | null
  max_players: number | null
  min_duration: number | null
  max_duration: number | null
  min_age: number | null
  year: number | null
  designer: string | null
  publisher: string | null
  weight: number | null
  bgg_rating: number | null
  bgg_rank: number | null
  ludopedia_rating: number | null
  ludopedia_url: string | null
  categories: string[] | null
  mechanics: string[] | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  slug: string
  type: PostType
  status: PostStatus
  title_pt: string
  title_en: string | null
  excerpt_pt: string | null
  excerpt_en: string | null
  content_pt: string | null
  content_en: string | null
  cover_url: string | null
  reading_time: number | null
  featured: boolean
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface ScoreComponents {
  componentes?: number
  mecanica?: number
  interacao?: number
  replay?: number
  curva?: number
  [key: string]: number | undefined
}

export interface ReviewData {
  id: string
  post_id: string
  game_id: string
  score: number
  score_components: ScoreComponents | null
  verdict: string | null
  recommended_players: string | null
  created_at: string
}

export interface ReviewFull extends Post {
  review: ReviewData
  game: Game
}

export interface Top10Item {
  id: string
  list_id: string
  game_id: string
  position: number
  prev_position: number | null
  notes_pt: string | null
  notes_en: string | null
  game: Game
}

export interface Top10Full extends Post {
  items: Top10Item[]
}

// ─── helpers ─────────────────────────────────────────────────────────────────

export function localizedTitle(post: Post, locale: Locale): string {
  return (locale === 'en' && post.title_en) ? post.title_en : post.title_pt
}

export function localizedExcerpt(post: Post, locale: Locale): string | null {
  return (locale === 'en' && post.excerpt_en) ? post.excerpt_en : post.excerpt_pt
}

export function localizedContent(post: Post, locale: Locale): string | null {
  return (locale === 'en' && post.content_en) ? post.content_en : post.content_pt
}

// ─── queries — posts ─────────────────────────────────────────────────────────

export const getPostsByType = cache(async (type: PostType, limit = 10): Promise<Post[]> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', type)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) console.error('[getPostsByType]', error)
  return (data ?? []) as Post[]
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (error) console.error('[getPostBySlug]', error)
  return data as Post | null
})

export const getLatestPosts = cache(async (limit = 6): Promise<Post[]> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) console.error('[getLatestPosts]', error)
  return (data ?? []) as Post[]
})

export const getFeaturedPost = cache(async (): Promise<Post | null> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) console.error('[getFeaturedPost]', error)
  return data as Post | null
})

// ─── queries — reviews ───────────────────────────────────────────────────────

export const getReviews = cache(async (limit = 10): Promise<ReviewFull[]> => {
  const supabase = createPublicClient()

  // Busca posts do tipo review com join na tabela reviews e games
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('type', 'review')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (postsError) { console.error('[getReviews/posts]', postsError); return [] }
  if (!posts?.length) return []

  const postIds = posts.map(p => p.id)

  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*, games(*)')
    .in('post_id', postIds)

  if (reviewsError) { console.error('[getReviews/reviews]', reviewsError); return [] }

  const reviewMap = Object.fromEntries((reviews ?? []).map(r => [r.post_id, r]))

  return posts
    .map(post => {
      const r = reviewMap[post.id]
      if (!r) return null
      return {
        ...post,
        review: {
          id: r.id,
          post_id: r.post_id,
          game_id: r.game_id,
          score: r.score,
          score_components: r.score_components,
          verdict: r.verdict,
          recommended_players: r.recommended_players,
          created_at: r.created_at,
        },
        game: r.games,
      } as ReviewFull
    })
    .filter((r): r is ReviewFull => r !== null)
})

export const getReviewBySlug = cache(async (slug: string): Promise<ReviewFull | null> => {
  const supabase = createPublicClient()

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (postError) { console.error('[getReviewBySlug/post]', postError); return null }
  if (!post) return null

  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('*, games(*)')
    .eq('post_id', post.id)
    .maybeSingle()

  if (reviewError) { console.error('[getReviewBySlug/review]', reviewError); return null }
  if (!review) return null

  return {
    ...post,
    review: {
      id: review.id,
      post_id: review.post_id,
      game_id: review.game_id,
      score: review.score,
      score_components: review.score_components,
      verdict: review.verdict,
      recommended_players: review.recommended_players,
      created_at: review.created_at,
    },
    game: review.games,
  } as ReviewFull
})

// ─── queries — games ─────────────────────────────────────────────────────────

export const getGameByBggId = cache(async (bggId: number): Promise<Game | null> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('bgg_id', bggId)
    .maybeSingle()
  if (error) console.error('[getGameByBggId]', error)
  return data as Game | null
})

// ─── queries — top10 ─────────────────────────────────────────────────────────

export const getTop10BySlug = cache(async (slug: string): Promise<Top10Full | null> => {
  const supabase = createPublicClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (!post) return null

  const { data: list } = await supabase
    .from('top10_lists')
    .select('id')
    .eq('post_id', post.id)
    .maybeSingle()

  if (!list) return null

  const { data: items, error } = await supabase
    .from('top10_items')
    .select('*, games(*)')
    .eq('list_id', list.id)
    .order('position', { ascending: true })

  if (error) console.error('[getTop10BySlug]', error)

  return {
    ...post,
    items: (items ?? []).map(i => ({ ...i, game: i.games })),
  } as Top10Full
})

// ─── queries — como jogar ────────────────────────────────────────────────────

export const getHowToPlayGuides = cache(async (limit = 12): Promise<Post[]> => {
  return getPostsByType('how-to-play', limit)
})

export const getHowToPlayBySlug = cache(async (slug: string): Promise<Post | null> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('type', 'how-to-play')
    .eq('status', 'published')
    .maybeSingle()
  if (error) console.error('[getHowToPlayBySlug]', error)
  return data as Post | null
})

export const getArticleBySlug = cache(async (slug: string): Promise<Post | null> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('type', 'article')
    .eq('status', 'published')
    .maybeSingle()
  if (error) console.error('[getArticleBySlug]', error)
  return data as Post | null
})

export const getAllPublishedPosts = cache(async (): Promise<Pick<Post, 'slug' | 'type' | 'published_at' | 'updated_at'>[]> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('posts')
    .select('slug, type, published_at, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (error) console.error('[getAllPublishedPosts]', error)
  return (data ?? []) as Pick<Post, 'slug' | 'type' | 'published_at' | 'updated_at'>[]
})

// ─── queries — stats ─────────────────────────────────────────────────────────

export const getSiteStats = cache(async (): Promise<{
  reviews: number
  guides: number
  games: number
}> => {
  const supabase = createPublicClient()
  const [{ count: reviews }, { count: guides }, { count: games }] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('type', 'review').eq('status', 'published'),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('type', 'how-to-play').eq('status', 'published'),
    supabase.from('games').select('*', { count: 'exact', head: true }),
  ])
  return { reviews: reviews ?? 0, guides: guides ?? 0, games: games ?? 0 }
})
