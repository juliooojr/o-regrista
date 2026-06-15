import Image from 'next/image'
import type { ReviewFull } from '@/lib/content'

// TODO: Card de review com imagem do jogo, score colorido e badge de tipo
export default function ReviewCard({ review, locale }: { review: ReviewFull; locale: string }) {
  const title = locale === 'en' && review.title_en ? review.title_en : review.title_pt
  const excerpt = locale === 'en' && review.excerpt_en ? review.excerpt_en : review.excerpt_pt

  return (
    <article>
      {review.game.image_url && (
        <Image src={review.game.image_url} alt={review.game.name} width={300} height={200} style={{ objectFit: 'cover', width: '100%', borderRadius: 8 }} />
      )}
      <span>{title}</span>
      <span>{review.review.score}</span>
      {excerpt && <p>{excerpt}</p>}
    </article>
  )
}
