// Dados fictícios para construção do layout — substituir pelas queries do Supabase no Passo 5

export type PostType = 'review' | 'article' | 'top10' | 'how-to-play'

export interface MockPost {
  id: string
  slug: string
  type: PostType
  title: string
  excerpt: string
  cover_color: string   // placeholder até ter imagens reais
  cover_label: string   // nome do jogo / título curto
  published_at: string
  reading_time: number
  score?: number
  game_name?: string
}

export const featuredPost: MockPost = {
  id: '1',
  slug: 'dune-imperium-review',
  type: 'review',
  title: 'Dune: Imperium é o engine-builder perfeito para quem odeia engine-builders',
  excerpt: 'Uma análise sobre como o jogo resolve o problema clássico do solitaire multiplayer sem que você perceba que isso está acontecendo.',
  cover_color: '#7B5EA7',
  cover_label: 'Dune: Imperium',
  published_at: '2026-06-14',
  reading_time: 12,
  score: 8.5,
  game_name: 'Dune: Imperium',
}

export const sidebarPosts: MockPost[] = [
  {
    id: '2',
    slug: 'ark-nova-review',
    type: 'review',
    title: 'Ark Nova',
    excerpt: 'O melhor jogo dos últimos anos?',
    cover_color: '#2E7D32',
    cover_label: 'Ark Nova',
    published_at: '2026-06-10',
    reading_time: 15,
    score: 9.0,
    game_name: 'Ark Nova',
  },
  {
    id: '3',
    slug: 'top10-jogos-2-jogadores',
    type: 'top10',
    title: 'Os 10 melhores jogos de 2 jogadores de todos os tempos',
    excerpt: '',
    cover_color: '#1565C0',
    cover_label: 'Top 10',
    published_at: '2026-06-08',
    reading_time: 8,
  },
  {
    id: '4',
    slug: 'como-jogar-wingspan',
    type: 'how-to-play',
    title: 'Como jogar Wingspan em 5 minutos',
    excerpt: '',
    cover_color: '#BF6F3A',
    cover_label: 'Wingspan',
    published_at: '2026-06-05',
    reading_time: 5,
  },
  {
    id: '5',
    slug: 'worker-placement-ultima-decada',
    type: 'article',
    title: 'Por que o worker placement dominou a última década',
    excerpt: '',
    cover_color: '#546E7A',
    cover_label: 'Artigo',
    published_at: '2026-05-28',
    reading_time: 10,
  },
]

export const latestReviews: MockPost[] = [
  {
    id: '6',
    slug: 'root-review',
    type: 'review',
    title: 'Root: caos assimétrico em forma de floresta',
    excerpt: 'Cada facção joga um jogo diferente. Isso é um problema ou é o ponto?',
    cover_color: '#B5471B',
    cover_label: 'Root',
    published_at: '2026-06-01',
    reading_time: 11,
    score: 9.0,
    game_name: 'Root',
  },
  {
    id: '7',
    slug: 'ticket-to-ride-europa-review',
    type: 'review',
    title: 'Ticket to Ride Europa: a porta de entrada perfeita',
    excerpt: 'Um clássico que ainda funciona depois de 20 anos no mercado.',
    cover_color: '#C62828',
    cover_label: 'Ticket to Ride',
    published_at: '2026-05-25',
    reading_time: 9,
    score: 7.0,
    game_name: 'Ticket to Ride Europa',
  },
  {
    id: '8',
    slug: 'pandemic-legacy-s1-review',
    type: 'review',
    title: 'Pandemic Legacy S1: o melhor jogo cooperativo já feito',
    excerpt: 'Experiência única que não pode ser repetida. Vale cada partida.',
    cover_color: '#00695C',
    cover_label: 'Pandemic Legacy',
    published_at: '2026-05-18',
    reading_time: 14,
    score: 9.5,
    game_name: 'Pandemic Legacy S1',
  },
]

export const howToPlayPosts: MockPost[] = [
  { id: '9',  slug: 'como-jogar-wingspan',      type: 'how-to-play', title: 'Wingspan',         excerpt: '', cover_color: '#BF6F3A', cover_label: 'Wingspan',     published_at: '2026-06-05', reading_time: 5 },
  { id: '10', slug: 'como-jogar-catan',         type: 'how-to-play', title: 'Catan',            excerpt: '', cover_color: '#E65100', cover_label: 'Catan',        published_at: '2026-05-20', reading_time: 6 },
  { id: '11', slug: 'como-jogar-dune-imperium', type: 'how-to-play', title: 'Dune: Imperium',   excerpt: '', cover_color: '#7B5EA7', cover_label: 'Dune',         published_at: '2026-05-10', reading_time: 7 },
  { id: '12', slug: 'como-jogar-ark-nova',      type: 'how-to-play', title: 'Ark Nova',         excerpt: '', cover_color: '#2E7D32', cover_label: 'Ark Nova',     published_at: '2026-04-30', reading_time: 8 },
]
