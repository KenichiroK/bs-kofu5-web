import { createClient } from "microcms-js-sdk"

// MicroCMS環境変数チェック
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY
const isMicroCMSConfigured = Boolean(serviceDomain && apiKey)

// MicroCMS クライアント（環境変数が設定されている場合のみ作成）
export const client = isMicroCMSConfigured
  ? createClient({
      serviceDomain: serviceDomain!,
      apiKey: apiKey!,
    })
  : null

// 型定義
export type NewsItem = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  category?: { id: string; name: string } | null
  expiredAt?: string
}

export type BlogItem = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  eyecatch?: {
    url: string
    height: number
    width: number
  }
  category: string[]
  postDate?: string
  instagramNote?: string
  isInstagram: boolean
}

// カテゴリ表示用ヘルパー（配列の先頭を返す）
export function getBlogCategory(blog: BlogItem): string {
  return blog.category?.[0] || "未分類"
}

export type ListResponse<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

// 記事の表示用日付を取得（postDate優先、なければpublishedAt）
export function getBlogDate(blog: BlogItem): string {
  return blog.postDate || blog.publishedAt
}

// モックデータ
const mockNews: NewsItem[] = [
  {
    id: "1",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
    title: "MicroCMSを設定してお知らせを追加してください",
    content: "<p>環境変数 MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定すると、MicroCMSから記事を取得できます。</p>",
    category: null,
    expiredAt: "2099-12-31T00:00:00.000Z",
  },
]

const mockBlogs: BlogItem[] = [
  {
    id: "1",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
    title: "MicroCMSを設定して記事を追加してください",
    content: "<p>環境変数を設定すると、MicroCMSから記事を取得できます。</p><p>MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定してください。</p>",
    category: ["活動報告"],
    postDate: new Date().toISOString().split("T")[0],
    isInstagram: false,
  },
]

// お知らせ一覧を取得
export async function getNewsList(options?: {
  limit?: number
  offset?: number
  filters?: string
}): Promise<ListResponse<NewsItem>> {
  if (!client) {
    return { contents: mockNews, totalCount: mockNews.length, offset: 0, limit: 10 }
  }
  
  const { limit = 10, offset = 0, filters } = options || {}
  
  return await client.get<ListResponse<NewsItem>>({
    endpoint: "news",
    queries: {
      limit,
      offset,
      filters,
      orders: "-publishedAt",
    },
  })
}

// お知らせ詳細を取得
export async function getNewsDetail(id: string): Promise<NewsItem | null> {
  if (!client) {
    return mockNews.find((n) => n.id === id) || null
  }
  return await client.get<NewsItem>({
    endpoint: "news",
    contentId: id,
  })
}

// 有効なお知らせを取得（掲載終了日が今日以降）
export async function getActiveNews(limit?: number): Promise<ListResponse<NewsItem>> {
  if (!client) {
    return { contents: mockNews, totalCount: mockNews.length, offset: 0, limit: limit || 100 }
  }

  const now = new Date()

  // 全件取得してコード側でフィルタリング（MicroCMSのdate型はフィルター非対応のため）
  const all = await getNewsList({ limit: limit || 100 })
  const filtered = all.contents.filter((item) => {
    if (!item.expiredAt) return false
    return new Date(item.expiredAt) >= now
  })
  return {
    ...all,
    contents: filtered,
    totalCount: filtered.length,
  }
}

// 記事一覧を取得
export async function getBlogList(options?: {
  limit?: number
  offset?: number
  category?: string
}): Promise<ListResponse<BlogItem>> {
  if (!client) {
    return { contents: mockBlogs, totalCount: mockBlogs.length, offset: 0, limit: 10 }
  }
  
  const { limit = 10, offset = 0, category } = options || {}
  
  const queries: Record<string, unknown> = {
    limit,
    offset,
    orders: "-postDate",
  }
  
  if (category && category !== "すべて") {
    queries.filters = `category[contains]${category}`
  }
  
  return await client.get<ListResponse<BlogItem>>({
    endpoint: "blog",
    queries,
  })
}

// 記事詳細を取得
export async function getBlogDetail(id: string): Promise<BlogItem | null> {
  if (!client) {
    return mockBlogs.find((b) => b.id === id) || null
  }
  return await client.get<BlogItem>({
    endpoint: "blog",
    contentId: id,
  })
}

// 関連記事を取得（同カテゴリの最新記事）
export async function getRelatedBlogs(currentId: string, category: string, limit = 3): Promise<BlogItem[]> {
  if (!client) {
    return mockBlogs.filter((b) => b.id !== currentId && b.category.includes(category)).slice(0, limit)
  }
  
  const result = await client.get<ListResponse<BlogItem>>({
    endpoint: "blog",
    queries: {
      limit: limit + 1,
      filters: `category[contains]${category}`,
      orders: "-postDate",
    },
  })
  
  // 現在の記事を除外
  const filtered = result.contents.filter((item) => item.id !== currentId)
  return filtered.slice(0, limit)
}

// 前後の記事を取得
export async function getAdjacentBlogs(currentId: string, postDate: string): Promise<{ prev: BlogItem | null; next: BlogItem | null }> {
  if (!client) {
    return { prev: null, next: null }
  }

  // 前の記事（現在より古い記事で最新のもの）
  const prevResult = await client.get<ListResponse<BlogItem>>({
    endpoint: "blog",
    queries: {
      limit: 1,
      filters: `postDate[less_than]${postDate}`,
      orders: "-postDate",
    },
  })

  // 次の記事（現在より新しい記事で最古のもの）
  const nextResult = await client.get<ListResponse<BlogItem>>({
    endpoint: "blog",
    queries: {
      limit: 1,
      filters: `postDate[greater_than]${postDate}`,
      orders: "postDate",
    },
  })
  
  return {
    prev: prevResult.contents[0] || null,
    next: nextResult.contents[0] || null,
  }
}

// 全件取得ヘルパー（100件ずつページネーション）
async function getAllIds(endpoint: string): Promise<string[]> {
  if (!client) return []

  const ids: string[] = []
  let offset = 0

  do {
    const result = await client.get<ListResponse<{ id: string }>>({
      endpoint,
      queries: { limit: 100, offset, fields: "id" },
    })
    ids.push(...result.contents.map((item) => item.id))
    if (ids.length >= result.totalCount) break
    offset += 100
  } while (true)

  return ids
}

// 全記事のIDを取得（SSG用）
export async function getAllBlogIds(): Promise<string[]> {
  if (!client) return mockBlogs.map((b) => b.id)
  return getAllIds("blog")
}

// 全お知らせのIDを取得（SSG用）
export async function getAllNewsIds(): Promise<string[]> {
  if (!client) return mockNews.map((n) => n.id)
  return getAllIds("news")
}
