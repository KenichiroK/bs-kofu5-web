import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  generator: 'v0.app',
  openGraph: {
    title: 'ボーイスカウト甲府第5団 | 山梨県甲府市',
    description: '山梨県甲府市で活動するボーイスカウト甲府第5団。キャンプやハイキングなどの野外活動を通じて、子どもたちの成長をサポートします。',
    locale: 'ja_JP',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
