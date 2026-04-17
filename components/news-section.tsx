"use client"

import { useState } from "react"
import { Bell, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { NewsItem } from "@/lib/microcms"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function NewsItemRow({ item }: { item: NewsItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 flex items-start gap-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <time className="text-xs sm:text-sm text-muted-foreground">
            {formatDate(item.publishedAt)}
          </time>
          <p className="text-foreground font-medium mt-1">{item.title}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mx-4 mb-4 md:mx-6 md:mb-6 rounded-lg bg-muted/50 p-4">
          <div
            className="prose prose-sm max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      )}
    </div>
  )
}

type NewsSectionProps = {
  news: NewsItem[]
}

export function NewsSection({ news }: NewsSectionProps) {
  if (news.length === 0) return null

  return (
    <section className="py-8 md:py-14 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Bell className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">News</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            お知らせ
          </h2>
        </div>

        {/* News List */}
        <div className="max-w-3xl mx-auto">
            <Card className="border-border">
              <CardContent className="p-0">
                {news.map((item) => (
                  <NewsItemRow key={item.id} item={item} />
                ))}
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  )
}
