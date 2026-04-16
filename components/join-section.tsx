import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "自然の中で仲間と一緒に活動できる",
  "リーダーシップと協調性が身につく",
  "野外スキルや生活力が向上する",
  "地域や社会に貢献する心が育つ",
  "年齢を超えた仲間との絆ができる",
  "達成感と自信を得られる",
]

const steps = [
  {
    number: "01",
    title: "体験入団のお申し込み",
    description: "お問い合わせフォームから体験入団をお申し込みください。",
  },
  {
    number: "02",
    title: "活動に参加",
    description: "実際の活動に参加して、雰囲気を体験してください。",
  },
  {
    number: "03",
    title: "正式入団",
    description: "お子様とご家族で相談の上、入団手続きを行います。",
  },
]

export function JoinSection() {
  return (
    <section id="join" className="py-12 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column - Benefits */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Join Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
              ボーイスカウトで得られること
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
              ボーイスカウト活動を通じて、子どもたちは様々な力を身につけていきます。
            </p>

            <ul className="mt-6 md:mt-10 space-y-3 md:space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Steps */}
          <div className="bg-muted/50 rounded-2xl p-6 md:p-8 lg:p-10">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 md:mb-8">入団までの流れ</h3>
            <div className="space-y-6 md:space-y-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-10 md:h-12 bg-border mx-auto mt-2" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm md:text-base">{step.title}</h4>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-medium">体験は無料です！</span>
                <br />
                まずはお気軽にお問い合わせください。
              </p>
            </div>

            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href="/contact">
                  体験入団のお申し込み
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
