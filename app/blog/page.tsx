import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText
} from "lucide-react"
import { getBlogList, type BlogItem } from "@/lib/microcms"
import { BlogListJsonLd } from "@/components/json-ld"
import { BlogCard } from "@/components/blog-card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "記事一覧 | ボーイスカウト甲府第5団",
  description: "ボーイスカウト甲府第5団の活動報告やブログ記事の一覧です。キャンプ、ハイキング、奉仕活動など、日々の活動の様子をお伝えします。",
}

const ITEMS_PER_PAGE = 9

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const category = (params.category as string) || "すべて"
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  let blogs: BlogItem[] = []
  let totalCount = 0

  try {
    const result = await getBlogList({
      limit: ITEMS_PER_PAGE,
      offset,
      category: category === "すべて" ? undefined : category,
    })
    blogs = result.contents
    totalCount = result.totalCount
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const categories = ["すべて", "活動報告", "ブログ"]

  return (
    <>
      <BlogListJsonLd />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
      
      <main className="flex-1 pt-16">
        <BreadcrumbNav items={[{ label: "記事" }]} />
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Blog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                記事一覧
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                ボーイスカウト甲府第5団の活動の様子をお伝えします
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={cat === "すべて" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">記事がまだありません</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  disabled={currentPage === 1}
                >
                  <Link 
                    href={`/blog?page=${currentPage - 1}${category !== "すべて" ? `&category=${encodeURIComponent(category)}` : ""}`}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      asChild
                      className="w-10 h-10"
                    >
                      <Link href={`/blog?page=${page}${category !== "すべて" ? `&category=${encodeURIComponent(category)}` : ""}`}>
                        {page}
                      </Link>
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  disabled={currentPage === totalPages}
                >
                  <Link 
                    href={`/blog?page=${currentPage + 1}${category !== "すべて" ? `&category=${encodeURIComponent(category)}` : ""}`}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </>
  )
}
