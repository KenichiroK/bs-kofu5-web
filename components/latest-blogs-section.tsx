import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getBlogList, type BlogItem } from "@/lib/microcms"
import { BlogCard } from "@/components/blog-card"

type LatestBlogsSectionProps = {
  blogs: BlogItem[]
}

export function LatestBlogsSection({ blogs }: LatestBlogsSectionProps) {
  return (
    <section className="py-8 md:py-14 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
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
            {blogs.map((blog, index) => (
              <div key={blog.id} className={index >= 3 ? "hidden md:block" : ""}>
                <BlogCard blog={blog} />
              </div>
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
        <div className="text-center mt-6 md:mt-8">
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
    const result = await getBlogList({ limit: 6 })
    return result.contents
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    return []
  }
}
