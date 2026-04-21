import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { ActivitiesJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Tent, 
  Mountain, 
  Flame, 
  Users, 
  Award,
  TreesIcon as Tree,
  MapPin,
  Compass,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "活動紹介 | ボーイスカウト甲府第5団",
  description: "ボーイスカウト甲府第5団の活動内容をご紹介。キャンプ、ハイキング、野外炊事など、自然の中で子どもたちが成長できる様々なプログラムを実施しています。",
}

const mainActivities = [
  {
    icon: Tent,
    title: "キャンプ",
    description: "テント設営から野外炊事まで、自然の中で生活する技術を学びます。夏季キャンプでは数泊の本格的なキャンプ体験ができます。",
    details: ["テント設営・撤収", "野外炊事", "キャンプファイヤー", "自然観察"]
  },
  {
    icon: Mountain,
    title: "ハイキング・登山",
    description: "山梨の美しい自然の中を歩き、体力と忍耐力を養います。地図読みやコンパスの使い方も学びます。",
    details: ["近郊ハイキング", "登山チャレンジ", "地図・コンパス活用", "自然観察"]
  },
  {
    icon: Flame,
    title: "野外炊事",
    description: "火おこしから調理まで、自分たちで食事を作る体験を通じて、生活力と協調性を身につけます。",
    details: ["火おこし体験", "飯盒炊爨", "アウトドアクッキング", "食材の準備・片付け"]
  },
  {
    icon: Users,
    title: "奉仕活動",
    description: "地域の清掃活動や募金活動など、社会に貢献する活動を通じて、奉仕の心を育てます。",
    details: ["地域清掃", "赤い羽根募金", "緑の募金", "イベントボランティア"]
  },
  {
    icon: Compass,
    title: "スカウト技能",
    description: "ロープワーク、応急処置、手旗信号など、スカウトならではの技能を楽しみながら習得します。",
    details: ["ロープワーク", "応急処置", "手旗・モールス信号", "追跡ハイク"]
  },
  {
    icon: Award,
    title: "進級・章取得",
    description: "様々な課題に挑戦し、バッジを取得することで達成感を味わい、次の目標へのモチベーションを高めます。",
    details: ["進級課目", "技能章", "ターゲットバッジ", "チャレンジ章"]
  },
]

const yearlySchedule = [
  { month: "4月", event: "入団・上進式、春のハイキング" },
  { month: "5月", event: "緑の募金、野外活動" },
  { month: "6月", event: "団キャンプ準備、スカウト技能訓練" },
  { month: "7月", event: "夏季キャンプ" },
  { month: "8月", event: "夏季キャンプ、水辺の活動" },
  { month: "9月", event: "秋のハイキング" },
  { month: "10月", event: "赤い羽根募金、地域奉仕活動" },
  { month: "11月", event: "秋季キャンプ" },
  { month: "12月", event: "クリスマス会、年末奉仕" },
  { month: "1月", event: "新年集会、初詣" },
  { month: "2月", event: "スキー・雪中ハイキング" },
  { month: "3月", event: "年度末キャンプ、修了式" },
]

export default function ActivitiesPage() {
  return (
    <>
    <ActivitiesJsonLd />
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        <BreadcrumbNav items={[{ label: "活動紹介" }]} />
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <Tree className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Activities</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                活動紹介
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                自然の中での様々な体験を通じて、子どもたちの
                「生きる力」を育みます
              </p>
            </div>
          </div>
        </section>

        {/* Main Activities */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              主な活動内容
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainActivities.map((activity) => (
                <Card key={activity.title} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                      <activity.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {activity.description}
                    </p>
                    <ul className="space-y-1">
                      {activity.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-foreground/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Yearly Schedule */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              年間スケジュール
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {yearlySchedule.map((item) => (
                <Card key={item.month} className="border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-lg font-bold text-primary mb-1">{item.month}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.event}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Location */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">活動場所</h3>
                  <p className="text-muted-foreground">
                    甲府市内の公民館や公園を中心に、山梨県内の自然豊かなフィールドで活動しています。
                    キャンプは県内外のキャンプ場で実施します。
                  </p>
                </div>
                <Button asChild className="flex-shrink-0">
                  <Link href="/contact">
                    お問い合わせ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              まずは体験してみませんか？
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              見学・体験は随時受け付けています。お気軽にお問い合わせください。
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                体験入団のお申し込み
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
