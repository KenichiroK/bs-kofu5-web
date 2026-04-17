import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const troops = [
  {
    name: "ビーバー隊",
    age: "小学1年生〜小学2年生",
    color: "bg-beaver",
    textColor: "text-beaver-foreground",
    image: "/troop-beaver.jpg",
    description: "自然の中で遊びながら、集団生活の基礎を学びます。歌やゲーム、簡単な工作など楽しい活動が中心です。",
    activities: ["自然遊び", "歌とゲーム", "工作", "探検ごっこ"],
  },
  {
    name: "カブ隊",
    age: "小学3年生〜小学5年生",
    color: "bg-cub",
    textColor: "text-cub-foreground",
    image: "/troop-cub.jpg",
    description: "仲間と協力しながら、野外活動の基本スキルを身につけます。キャンプや冒険活動を通じて自立心を育てます。",
    activities: ["デイキャンプ", "ハイキング", "ロープワーク", "野外料理"],
  },
  {
    name: "ボーイ隊",
    age: "小学6年生〜中学3年生",
    color: "bg-boy",
    textColor: "text-boy-foreground",
    image: "/troop-boy.jpg",
    description: "班活動を中心に、リーダーシップと自主性を発揮します。本格的なキャンプや冒険活動に挑戦します。",
    activities: ["班キャンプ", "山岳ハイキング", "奉仕活動", "技能訓練"],
  },
]

export function TroopsSection() {
  return (
    <section id="troops" className="py-8 md:py-16 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Troops</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            年齢に合わせた3つの隊
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            ボーイスカウトでは、年齢に応じた活動を通じて段階的に成長していきます。
          </p>
        </div>

        {/* Troops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {troops.map((troop) => (
            <Card key={troop.name} className="overflow-hidden border-border">
              <div className={`${troop.color} px-4 md:px-6 py-3 md:py-4`}>
                <h3 className={`text-lg md:text-xl font-bold ${troop.textColor}`}>{troop.name}</h3>
                <p className={`text-sm ${troop.textColor} opacity-80`}>{troop.age}</p>
              </div>
              <div className="relative aspect-video">
                <Image
                  src={troop.image}
                  alt={`${troop.name}の活動写真`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader className="pb-2 md:pb-4">
                <CardDescription className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {troop.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-foreground mb-3">主な活動</p>
                <div className="flex flex-wrap gap-2">
                  {troop.activities.map((activity) => (
                    <span
                      key={activity}
                      className="inline-flex items-center rounded-full bg-muted px-2.5 md:px-3 py-1 text-xs md:text-sm text-muted-foreground"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-6 md:mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/troops">
              各隊について詳しく見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
