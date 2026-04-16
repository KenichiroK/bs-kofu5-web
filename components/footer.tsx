import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

const navigation = {
  main: [
    { name: "ホーム", href: "/" },
    { name: "記事", href: "/blog" },
    { name: "各隊について", href: "/troops" },
    { name: "団について", href: "/about" },
    { name: "よくある質問", href: "/faq" },
    { name: "お問い合わせ", href: "/contact" },
  ],
  external: [
    { name: "ボーイスカウト日本連盟", href: "https://www.scout.or.jp/" },
    { name: "ボーイスカウト山梨", href: "http://scout-yamanashi.jp/" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="ボーイスカウト甲府第5団"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-background leading-tight">ボーイスカウト</span>
                <span className="text-xs text-background/70 leading-tight">甲府第5団</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-background/70 max-w-md leading-relaxed">
              山梨県甲府市で活動するボーイスカウト甲府第5団です。
              キャンプやハイキングなどの野外活動を通じて、子どもたちの成長をサポートしています。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-background">サイトマップ</h3>
            <ul className="mt-4 space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-background">お問い合わせ</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-background/70 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:bskofu5.info@gmail.com"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  bskofu5.info@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-background/70 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-background/70">
                  山梨YMCA<br />
                  〒400-0032<br />
                  山梨県甲府市中央3丁目10-7
                </span>
              </li>
            </ul>
            
            <h3 className="text-sm font-semibold text-background mt-6">関連リンク</h3>
            <ul className="mt-4 space-y-3">
              {navigation.external.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-background/10 pt-8">
          <p className="text-center text-xs text-background/50">
            &copy; {new Date().getFullYear()} ボーイスカウト甲府第5団. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
