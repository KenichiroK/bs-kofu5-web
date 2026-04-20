import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  TreesIcon as Tree,
  ArrowRight,
  Star,
  Heart,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "各隊紹介 | ボーイスカウト甲府第5団",
  description: "ボーイスカウト甲府第5団の各隊（ビーバー隊・カブ隊・ボーイ隊）をご紹介。年齢に応じたプログラムで、子どもたちの成長をサポートします。",
}

const troops = [
  {
    name: "ビーバースカウト",
    age: "小学1年生〜2年生",
    color: "bg-beaver",
    colorLight: "bg-beaver-light",
    colorText: "text-beaver",
    icon: Star,
    image: "/troop-beaver.jpg",
    motto: "なかよし",
    description: "ビーバースカウトは、スカウト活動の入口となる隊です。「みんなとなかよくあそぶ」をモットーに、遊びを通じて自然に親しみ、集団生活の基礎を学びます。",
    activities: [
      "自然の中での遊び",
      "歌やゲーム",
      "工作活動",
      "簡単なハイキング",
      "季節の行事"
    ],
    features: [
      "保護者同伴での活動が基本",
      "短時間の活動が中心",
      "遊びを通じた学び",
      "仲間づくりの第一歩"
    ]
  },
  {
    name: "カブスカウト",
    age: "小学3年生〜5年生",
    color: "bg-cub",
    colorLight: "bg-cub-light",
    colorText: "text-cub",
    icon: Heart,
    image: "/troop-cub.jpg",
    motto: "いつも元気",
    description: "カブスカウトは、「いつも元気」をモットーに、組と呼ばれる小グループで活動します。ハイキングやキャンプなど、より本格的な野外活動が始まります。",
    activities: [
      "デイキャンプ・宿泊キャンプ",
      "ハイキング",
      "野外炊事",
      "ロープワーク",
      "チャレンジ章取得"
    ],
    features: [
      "組（6〜8人）での活動",
      "リーダーシップの芽生え",
      "技能の習得開始",
      "達成感を味わう経験"
    ]
  },
  {
    name: "ボーイスカウト",
    age: "小学6年生〜中学3年生",
    color: "bg-boy",
    colorLight: "bg-boy-light",
    colorText: "text-boy",
    icon: Users,
    image: "/troop-boy.jpg",
    motto: "そなえよつねに",
    description: "ボーイスカウトは、「そなえよつねに」をモットーに、班と呼ばれる小グループで自主的に活動します。本格的なキャンプや登山など、挑戦的な活動が増えます。",
    activities: [
      "長期キャンプ",
      "登山・縦走",
      "奉仕活動",
      "技能章取得",
      "野外技術の習得"
    ],
    features: [
      "班（6〜8人）での自主活動",
      "リーダーシップの発揮",
      "責任感の育成",
      "社会貢献への意識"
    ]
  }
]

export default function TroopsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        <BreadcrumbNav items={[{ label: "各隊について" }]} />
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <Tree className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Troops</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                各隊紹介
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                年齢に応じた3つの隊で、段階的に成長をサポートします
              </p>
            </div>
          </div>
        </section>

        {/* Troops Detail */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 md:space-y-12">
              {troops.map((troop) => (
                <Card key={troop.name} className="overflow-hidden border-2 border-transparent">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* 写真エリア */}
                    <div className={`relative aspect-[16/9] lg:aspect-auto lg:min-h-[400px] ${troop.colorLight}`}>
                      <Image
                        src={troop.image}
                        alt={`${troop.name}の活動写真`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* 情報エリア */}
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${troop.color}`}>
                          <troop.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            {troop.name}
                          </h2>
                          <p className={`text-sm font-medium ${troop.colorText}`}>
                            対象：{troop.age}
                          </p>
                        </div>
                      </div>

                      <div className={`inline-flex items-center gap-2 rounded-full ${troop.colorLight} px-4 py-1.5 mb-4`}>
                        <span className={`text-sm font-medium ${troop.colorText}`}>
                          モットー：「{troop.motto}」
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {troop.description}
                      </p>

                      {/* 主な活動 */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${troop.color}`} />
                            主な活動
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {troop.activities.map((activity) => (
                              <div
                                key={activity}
                                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${troop.color} flex-shrink-0`} />
                                <span className="text-xs sm:text-sm text-foreground">{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 特徴 */}
                        <div>
                          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${troop.color}`} />
                            特徴
                          </h3>
                          <ul className="space-y-1.5">
                            {troop.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                              >
                                <ArrowRight className={`h-3.5 w-3.5 ${troop.colorText} flex-shrink-0 mt-0.5`} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Age Chart */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              年齢と隊の対応
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 md:p-6 bg-beaver-light border-b border-beaver/20">
                    <p className="text-sm md:text-base font-bold text-beaver mb-1">ビーバー</p>
                    <p className="text-xs md:text-sm text-beaver/80">小1〜小2</p>
                  </div>
                  <div className="p-4 md:p-6 bg-cub-light border-b border-cub/20">
                    <p className="text-sm md:text-base font-bold text-cub mb-1">カブ</p>
                    <p className="text-xs md:text-sm text-cub/80">小3〜小5</p>
                  </div>
                  <div className="p-4 md:p-6 bg-boy-light border-b border-boy/20">
                    <p className="text-sm md:text-base font-bold text-boy mb-1">ボーイ</p>
                    <p className="text-xs md:text-sm text-boy/80">小6〜中3</p>
                  </div>
                </div>
                <div className="p-4 md:p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    ※ 学年は目安です。体験入団は随時受け付けています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              どの隊から始めても大丈夫
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              途中入団も歓迎です。まずは体験に参加してみませんか？
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
  )
}
