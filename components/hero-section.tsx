import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-primary/5">
      {/* Background Image - PC */}
      <Image
        src="/header_hero.jpg"
        alt="ボーイスカウト甲府第5団の活動風景"
        fill
        className="object-cover hidden md:block"
        priority
      />
      {/* Background Image - Mobile */}
      <Image
        src="/header_hero_mobile.jpg"
        alt="ボーイスカウト甲府第5団の活動風景"
        fill
        className="object-cover md:hidden"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white mb-6 sm:mb-8 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>山梨県甲府市で活動中</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
            <span className="block text-lg sm:text-xl md:text-2xl text-white/80 mb-2 sm:mb-3">山梨・甲府のボーイスカウト</span>
            <span className="block">自然の中で</span>
            <span className="block text-yellow-300 mt-1 sm:mt-2">子どもたちの</span>
            <span className="block mt-1 sm:mt-2">可能性を広げる</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-white leading-relaxed text-pretty px-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
            ボーイスカウト甲府第5団は、キャンプやハイキングなどの野外活動を通じて、
            子どもたちの自主性・協調性・リーダーシップを育てます。
            小学1年生から中学生まで、一緒に冒険しませんか？
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/contact">体験入団に申し込む</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white/20 bg-transparent">
              <Link href="/activities">活動内容を見る</Link>
            </Button>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
