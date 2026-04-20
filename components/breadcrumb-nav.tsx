import Link from "next/link"
import Script from "next/script"
import { ChevronRight, Home } from "lucide-react"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbNavProps = {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const allItems = [{ label: "ホーム", href: "/" }, ...items]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://www.bskofu5.com${item.href}` }),
    })),
  }

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="h-3.5 w-3.5" />}
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
