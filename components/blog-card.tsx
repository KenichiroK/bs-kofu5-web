import Link from "next/link"
import Image from "next/image"
import { Calendar, FileText, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getBlogDate, getBlogCategory, type BlogItem } from "@/lib/microcms"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  })
}

export function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <Link href={`/blog/${blog.id}`} className="group">
      <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {blog.eyecatch ? (
            <Image
              src={blog.eyecatch.url}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          {/* Instagram Badge */}
          {blog.isInstagram && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Instagram className="h-3 w-3" />
                Instagram
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-4 md:p-5">
          {/* Category & Date */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
              getBlogCategory(blog) === "活動報告"
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-primary/10 text-primary"
            }`}>
              {getBlogCategory(blog)}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <time dateTime={getBlogDate(blog)}>{formatDate(getBlogDate(blog))}</time>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}
