import { MetadataRoute } from "next"
import { getAllBlogIds, getBlogList } from "@/lib/microcms"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.bskofu5.com"

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/troops`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // 記事ページを取得（100件ずつページネーション）
  let blogPages: MetadataRoute.Sitemap = []

  try {
    const PER_PAGE = 100
    let offset = 0
    let totalCount = 0

    do {
      const result = await getBlogList({ limit: PER_PAGE, offset })
      totalCount = result.totalCount

      blogPages.push(
        ...result.contents.map((blog) => ({
          url: `${baseUrl}/blog/${blog.id}`,
          lastModified: new Date(blog.updatedAt || blog.postDate || blog.publishedAt),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }))
      )

      offset += PER_PAGE
    } while (offset < totalCount)
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error)
  }

  return [...staticPages, ...blogPages]
}
