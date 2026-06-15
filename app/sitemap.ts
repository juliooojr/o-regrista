import type { MetadataRoute } from 'next'
import { getAllPublishedPosts } from '@/lib/content'

const BASE_URL = 'https://oregrista.com'

const TYPE_ROUTE: Record<string, string> = {
  review:       'reviews',
  article:      'artigos',
  top10:        'top10',
  'how-to-play': 'como-jogar',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/reviews`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/artigos`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/top10`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/como-jogar`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/sobre`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = posts
    .filter(p => TYPE_ROUTE[p.type])
    .map(p => ({
      url: `${BASE_URL}/${TYPE_ROUTE[p.type]}/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: p.type === 'review' ? 0.8 : 0.7,
    }))

  return [...staticRoutes, ...dynamicRoutes]
}
