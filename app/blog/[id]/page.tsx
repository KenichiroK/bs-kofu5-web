import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calendar,
  ArrowLeft,
  ArrowRight,
  Instagram,
  ExternalLink,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { 
  getBlogDetail, 
  getRelatedBlogs, 
  getAdjacentBlogs,
  getAllBlogIds,
  getBlogDate,
  getBlogCategory,
  type BlogItem
} from "@/lib/microcms"
import { ArticleJsonLd } from "@/components/json-ld"

export const revalidate = 60

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export async function generateStaticParams() {
  try {
    const ids = await getAllBlogIds()
    return ids.map((id) => ({ id }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    const blog = await getBlogDetail(id)
    if (!blog) {
      return { title: "記事が見つかりません | ボーイスカウト甲府第5団" }
    }
    const description = blog.content
      .replace(/<[^>]*>/g, "")
      .substring(0, 120)
      .trim() + "..."

    return {
      title: `${blog.title} | ボーイスカウト甲府第5団`,
      description,
      openGraph: {
        title: blog.title,
        description,
        images: blog.eyecatch ? [blog.eyecatch.url] : [],
      },
    }
  } catch {
    return {
      title: "記事が見つかりません | ボーイスカウト甲府第5団",
    }
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const blog = await getBlogDetail(id)
  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(id, getBlogCategory(blog), 3)
  const adjacentBlogs = await getAdjacentBlogs(id, getBlogDate(blog))

  const description = blog.content
    .replace(/<[^>]*>/g, "")
    .substring(0, 120)
    .trim() + "..."

  return (
    <>
      <ArticleJsonLd
        title={blog.title}
        description={description}
        url={`https://bskofu5.com/blog/${blog.id}`}
        publishDate={getBlogDate(blog)}
        imageUrl={blog.eyecatch?.url}
        category={getBlogCategory(blog)}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
      
      <main className="flex-1 pt-16">
        <article>
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-muted">
            {blog.eyecatch ? (
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-primary/20 to-primary/5">
                <FileText className="h-24 w-24 text-primary/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Badges */}
            {blog.isInstagram && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </span>
              </div>
            )}
          </div>

          <div className="py-8 md:py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              {/* Back Link */}
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                記事一覧に戻る
              </Link>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={getBlogDate(blog)}>{formatDate(getBlogDate(blog))}</time>
                </div>

                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded ${
                  getBlogCategory(blog) === "活動報告"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-primary/10 text-primary"
                } mb-2`}>
                  {getBlogCategory(blog)}
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
                  {blog.title}
                </h1>
              </div>

              {/* Instagram Link */}
              {blog.isInstagram && blog.instagramNote && (
                <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Instagram className="h-6 w-6 text-pink-500" />
                      <span className="text-sm text-foreground">
                        {blog.instagramNote || "この記事はInstagramでも公開しています"}
                      </span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                      <a href="https://www.instagram.com/bskofu5/" target="_blank" rel="noopener noreferrer">
                        Instagramを見る
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-green max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Article Navigation */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adjacentBlogs.prev ? (
                    <Link href={`/blog/${adjacentBlogs.prev.id}`} className="group">
                      <Card className="h-full border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <ChevronLeft className="h-4 w-4" />
                            <span>前の記事</span>
                          </div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {adjacentBlogs.prev.title}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {adjacentBlogs.next ? (
                    <Link href={`/blog/${adjacentBlogs.next.id}`} className="group">
                      <Card className="h-full border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                            <span>次の記事</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {adjacentBlogs.next.title}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-bold text-foreground mb-6">関連記事</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedBlogs.map((related) => (
                      <Link key={related.id} href={`/blog/${related.id}`} className="group">
                        <Card className="h-full border-border hover:border-primary/50 transition-all overflow-hidden">
                          <div className="relative aspect-video overflow-hidden bg-muted">
                            {related.eyecatch ? (
                              <Image
                                src={related.eyecatch.url}
                                alt={related.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FileText className="h-8 w-8 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <time className="text-xs text-muted-foreground">
                              {formatDate(getBlogDate(related))}
                            </time>
                            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                              {related.title}
                            </h3>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to List */}
              <div className="mt-12 text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    記事一覧に戻る
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>

        <Footer />
      </div>
    </>
  )
}
