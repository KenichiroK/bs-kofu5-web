import Link from "next/link"
import { Tent, Mountain, Flame, Compass, Users, Heart, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const activities = [
  {
    icon: Tent,
    title: "キャンプ",
    description: "テント設営から野外炊事まで、自然の中で生活する力を身につけます。",
  },
  {
    icon: Mountain,
    title: "ハイキング",
    description: "山梨の美しい山々を歩き、自然の素晴らしさと体力を養います。",
  },
  {
    icon: Flame,
    title: "野外料理",
    description: "火おこしから調理まで、自分たちの手で食事を作る体験をします。",
  },
  {
    icon: Compass,
    title: "冒険活動",
    description: "地図とコンパスを使ったナビゲーションや探検活動を行います。",
  },
  {
    icon: Users,
    title: "チームワーク",
    description: "仲間と協力してゲームやプロジェクトに取り組み、協調性を育みます。",
  },
  {
    icon: Heart,
    title: "奉仕活動",
    description: "地域清掃や募金活動など、社会に貢献する心を育てます。",
  },
]

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-12 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Activities</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            多彩な活動を通じて成長
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            ボーイスカウトでは、野外活動を中心に様々な体験を通じて、
            子どもたちの心と体を育てます。
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {activities.map((activity) => (
            <Card key={activity.title} className="border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-primary/10 mb-3 md:mb-4">
                  <activity.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-lg md:text-xl text-foreground">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {activity.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-8 md:mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/activities">
              活動内容をもっと見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
