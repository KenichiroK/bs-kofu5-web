import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  TreesIcon as Tree,
  ArrowRight,
  MapPin,
  Clock,
  Building,
  Users,
  Target,
  Heart
} from "lucide-react"

export const metadata: Metadata = {
  title: "団の概要・歴史 | ボーイスカウト甲府第5団",
  description: "ボーイスカウト甲府第5団の概要と歴史をご紹介。山梨県甲府市で活動する私たちの理念と活動方針についてご覧いただけます。",
}

const values = [
  {
    icon: Target,
    title: "自立心",
    description: "自分で考え、自分で行動できる力を育みます"
  },
  {
    icon: Users,
    title: "協調性",
    description: "仲間と協力し、チームで目標を達成する経験を積みます"
  },
  {
    icon: Heart,
    title: "奉仕の精神",
    description: "社会に貢献する心を育て、行動に移します"
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <Tree className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">About Us</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                団の概要・歴史
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                山梨県甲府市で活動するボーイスカウト甲府第5団について
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                私たちについて
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  ボーイスカウト甲府第5団は、山梨県甲府市を中心に活動するボーイスカウト団体です。
                  自然の中での様々な体験を通じて、子どもたちの「生きる力」を育んでいます。
                </p>
                <p className="leading-relaxed mb-4">
                  キャンプ、ハイキング、奉仕活動など、年齢に応じた多彩なプログラムを通じて、
                  自立心、協調性、奉仕の精神を育成しています。
                </p>
                <p className="leading-relaxed">
                  地域の皆様に支えられながら、これからも子どもたちの健全な成長を
                  サポートしてまいります。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              私たちが大切にしていること
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="border-border text-center">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              基本情報
            </h2>
            <div className="max-w-2xl mx-auto">
              <Card className="border-border">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <div className="flex flex-col sm:flex-row p-4 md:p-6 gap-2 sm:gap-6">
                      <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                        <Building className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">団名</span>
                      </div>
                      <span className="text-muted-foreground sm:pl-4">ボーイスカウト甲府第5団</span>
                    </div>
                    <div className="flex flex-col sm:flex-row p-4 md:p-6 gap-2 sm:gap-6">
                      <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">活動地域</span>
                      </div>
                      <span className="text-muted-foreground sm:pl-4">山梨県甲府市およびその周辺</span>
                    </div>
                    <div className="flex flex-col sm:flex-row p-4 md:p-6 gap-2 sm:gap-6">
                      <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">活動日</span>
                      </div>
                      <span className="text-muted-foreground sm:pl-4">主に日曜日（月1〜2回程度）</span>
                    </div>
                    <div className="flex flex-col sm:flex-row p-4 md:p-6 gap-2 sm:gap-6">
                      <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">対象年齢</span>
                      </div>
                      <span className="text-muted-foreground sm:pl-4">小学1年生〜中学3年生</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* History Placeholder */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              沿革
            </h2>
            <div className="max-w-3xl mx-auto">
              <Card className="border-border">
                <CardContent className="p-6 md:p-8">
                  <p className="text-center text-muted-foreground">
                    団の歴史に関する詳細情報は、準備ができ次第掲載いたします。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Organization */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              組織について
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed mb-6">
                ボーイスカウト甲府第5団は、公益財団法人ボーイスカウト日本連盟に加盟しています。
                日本連盟は世界スカウト機構に加盟しており、世界中のスカウトと繋がっています。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://www.scout.or.jp/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ボーイスカウト日本連盟
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a 
                  href="https://www.scout.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  世界スカウト機構（WOSM）
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              一緒に活動しませんか？
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              見学・体験は随時受け付けています。お気軽にお問い合わせください。
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
  )
}
