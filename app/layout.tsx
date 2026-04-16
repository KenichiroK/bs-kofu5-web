import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: 'ボーイスカウト甲府第5団 | 山梨県甲府市で子どもとアウトドア・キャンプ・外遊び',
  description: '山梨県甲府市で活動するボーイスカウト甲府第5団の公式サイトです。幼稚園年長から中学生まで、キャンプやハイキングなどの野外活動を通じて、子どもたちの成長をサポートします。体験入団随時受付中！',
  keywords: ['ボーイスカウト', '甲府', '山梨', 'キャンプ', 'アウトドア', '外遊び', '子ども', '習い事'],
  metadataBase: new URL('https://www.bskofu5.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ボーイスカウト甲府第5団 | 山梨県甲府市',
    description: '山梨県甲府市で活動するボーイスカウト甲府第5団。キャンプやハイキングなどの野外活動を通じて、子どもたちの成長をサポートします。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ボーイスカウト甲府第5団",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "中央3丁目10-7",
    "addressLocality": "甲府市",
    "addressRegion": "山梨県",
    "postalCode": "400-0032",
    "addressCountry": "JP"
  },
  "email": "bskofu5.info@gmail.com",
  "url": "https://www.bskofu5.com",
  "sameAs": [
    "https://www.instagram.com/boyscouts.kofu5/"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
