import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FileText, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBlogList, getBlogDate, getBlogCategory, type BlogItem } from "@/lib/microcms"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

type LatestBlogsSectionProps = {
  blogs: BlogItem[]
}

export function LatestBlogsSection({ blogs }: LatestBlogsSectionProps) {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Blog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            最新の記事
          </h2>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <Card className="h-full border-border hover:border-primary/50 transition-colors overflow-hidden group">
                  {/* Eyecatch Image */}
                  <div className="relative aspect-video bg-muted">
                    {blog.eyecatch ? (
                      <Image
                        src={blog.eyecatch.url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Instagram Badge */}
                    {blog.isInstagram && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                          <Instagram className="h-3 w-3 mr-1" />
                          Instagram
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        getBlogCategory(blog) === "活動報告"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {getBlogCategory(blog)}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {formatDate(getBlogDate(blog))}
                      </time>
                    </div>
                    <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-border max-w-xl mx-auto">
            <CardContent className="p-6 md:p-8 text-center">
              <p className="text-muted-foreground">記事がまだありません</p>
            </CardContent>
          </Card>
        )}

        {/* View All Link */}
        <div className="text-center mt-8 md:mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              記事一覧を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// サーバーコンポーネント用のデータ取得関数
export async function getLatestBlogsData(): Promise<BlogItem[]> {
  try {
    const result = await getBlogList({ limit: 5 })
    return result.contents
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    return []
  }
}
