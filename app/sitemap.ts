import { MetadataRoute } from "next"
import { getAllBlogIds, getBlogList } from "@/lib/microcms"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bskofu5.com"

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
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // 記事ページを取得
  let blogPages: MetadataRoute.Sitemap = []
  
  try {
    const blogs = await getBlogList({ limit: 1000 })
    blogPages = blogs.contents.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.updatedAt || blog.postDate || blog.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error)
  }

  return [...staticPages, ...blogPages]
}
