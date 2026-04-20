import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { ContactSection } from "@/components/contact-section"
import { TreesIcon as Tree } from "lucide-react"

export const metadata: Metadata = {
  title: "お問い合わせ | ボーイスカウト甲府第5団",
  description: "ボーイスカウト甲府第5団へのお問い合わせ・体験入団のお申し込みはこちら。ご質問やご相談もお気軽にどうぞ。",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        <BreadcrumbNav items={[{ label: "お問い合わせ" }]} />
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <Tree className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Contact</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                お問い合わせ
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                ご質問や体験入団のお申し込みなど、お気軽にご連絡ください
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section - reuse the component */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
