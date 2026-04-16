import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, ArrowRight } from "lucide-react"
import { FaqJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "よくある質問 | ボーイスカウト甲府第5団",
  description: "ボーイスカウト甲府第5団に関するよくある質問と回答。入団方法、費用、活動日、対象年齢などについてお答えします。",
  alternates: { canonical: "/faq" },
}

const faqs = [
  {
    question: "ボーイスカウト甲府第5団はどこで活動していますか？",
    answer: "山梨YMCAを拠点に、山梨県甲府市内の公園・施設で活動しています。住所は〒400-0032 山梨県甲府市中央3丁目10-7です。",
  },
  {
    question: "何歳から入団できますか？",
    answer: "幼稚園年長（ビーバー隊）から中学3年生（ボーイ隊）まで入団できます。",
  },
  {
    question: "体験入団はできますか？",
    answer: "はい、随時受け付けています。お問い合わせフォームからお申し込みください。体験は無料です。",
  },
  {
    question: "費用はどのくらいかかりますか？",
    answer: "入団費・年間登録費・月会費がかかります。詳細はお問い合わせください。",
  },
  {
    question: "保護者の参加は必要ですか？",
    answer: "ビーバー隊は保護者同伴、カブ隊・ボーイ隊は送迎のみでOKです。",
  },
  {
    question: "活動日はいつですか？",
    answer: "主に月2回、日曜日に活動しています。",
  },
]

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-16">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">FAQ</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                  よくある質問
                </h1>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                  ボーイスカウト甲府第5団に関するよくある質問にお答えします
                </p>
              </div>
            </div>
          </section>

          {/* FAQ List */}
          <section className="py-12 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          Q
                        </span>
                        <p className="text-base md:text-lg font-bold text-foreground pt-0.5">
                          {faq.question}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 mt-4">
                        <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-bold">
                          A
                        </span>
                        <p className="text-muted-foreground leading-relaxed pt-0.5">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-20 bg-primary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                その他のご質問はお気軽にどうぞ
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                こちらに掲載されていないご質問は、お問い合わせフォームからお送りください。
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  お問い合わせ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
