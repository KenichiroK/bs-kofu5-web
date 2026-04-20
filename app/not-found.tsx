import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-8xl font-bold text-primary/20 mb-4">404</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            ページが見つかりませんでした
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            お探しのページは移動または削除された可能性があります。
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              トップページに戻る
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
