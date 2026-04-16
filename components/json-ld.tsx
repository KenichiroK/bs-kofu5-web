import Script from "next/script"

// 組織情報
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ボーイスカウト甲府第5団",
  alternateName: "BSK5",
  url: "https://www.bskofu5.com",
  logo: "https://www.bskofu5.com/logo.png",
  description: "山梨県甲府市で活動するボーイスカウト団体。キャンプやハイキングなどの野外活動を通じて、子どもたちの成長をサポートしています。",
  address: {
    "@type": "PostalAddress",
    streetAddress: "中央3丁目10-7",
    addressLocality: "甲府市",
    addressRegion: "山梨県",
    postalCode: "400-0032",
    addressCountry: "JP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "bskofu5.info@gmail.com",
    contactType: "customer service",
    availableLanguage: "Japanese",
  },
  sameAs: [
    "https://www.scout.or.jp/",
    "http://scout-yamanashi.jp/",
  ],
}

// トップページ用
export function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ボーイスカウト甲府第5団",
    url: "https://www.bskofu5.com",
    description: "山梨県甲府市で活動するボーイスカウト甲府第5団の公式サイト。幼稚園年長から中学生まで、キャンプやハイキングなどの野外活動を通じて、子どもたちの成長をサポートします。",
    publisher: organizationJsonLd,
  }

  return (
    <Script
      id="home-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// 組織ページ用
export function AboutJsonLd() {
  return (
    <Script
      id="about-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  )
}

// 記事一覧ページ用
export function BlogListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "記事一覧 | ボーイスカウト甲府第5団",
    description: "ボーイスカウト甲府第5団の活動報告やブログ記事の一覧です。",
    url: "https://www.bskofu5.com/blog",
    isPartOf: {
      "@type": "WebSite",
      name: "ボーイスカウト甲府第5団",
      url: "https://www.bskofu5.com",
    },
  }

  return (
    <Script
      id="blog-list-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// 記事詳細ページ用
type ArticleJsonLdProps = {
  title: string
  description: string
  url: string
  publishDate: string
  imageUrl?: string
  category: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  publishDate,
  imageUrl,
  category,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishDate,
    dateModified: publishDate,
    author: organizationJsonLd,
    publisher: organizationJsonLd,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: category,
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  }

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// お問い合わせページ用
export function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "お問い合わせ | ボーイスカウト甲府第5団",
    description: "ボーイスカウト甲府第5団へのお問い合わせ・体験入団のお申し込みページです。",
    url: "https://www.bskofu5.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "ボーイスカウト甲府第5団",
      email: "bskofu5.info@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "中央3丁目10-7",
        addressLocality: "甲府市",
        addressRegion: "山梨県",
        postalCode: "400-0032",
        addressCountry: "JP",
      },
    },
  }

  return (
    <Script
      id="contact-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// 各隊紹介ページ用
export function TroopsJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "各隊について | ボーイスカウト甲府第5団",
    description: "ボーイスカウト甲府第5団のビーバー隊、カブ隊、ボーイ隊の紹介です。",
    url: "https://www.bskofu5.com/troops",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ビーバースカウト",
        description: "小学1年生〜2年生を対象とした隊。遊びを通じて自然に親しみ、集団生活の基礎を学びます。",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "カブスカウト",
        description: "小学3年生〜5年生を対象とした隊。ハイキングやキャンプなど、より本格的な野外活動が始まります。",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ボーイスカウト",
        description: "小学6年生〜中学3年生を対象とした隊。班活動を中心に、リーダーシップと自主性を発揮します。",
      },
    ],
  }

  return (
    <Script
      id="troops-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// FAQページ用
export function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "よくある質問 | ボーイスカウト甲府第5団",
    url: "https://www.bskofu5.com/faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "ボーイスカウト甲府第5団はどこで活動していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "山梨YMCAを拠点に、山梨県甲府市内の公園・施設で活動しています。住所は〒400-0032 山梨県甲府市中央3丁目10-7です。",
        },
      },
      {
        "@type": "Question",
        name: "何歳から入団できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "幼稚園年長（ビーバー隊）から中学3年生（ボーイ隊）まで入団できます。",
        },
      },
      {
        "@type": "Question",
        name: "体験入団はできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、随時受け付けています。お問い合わせフォームからお申し込みください。体験は無料です。",
        },
      },
      {
        "@type": "Question",
        name: "費用はどのくらいかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "入団費・年間登録費・月会費がかかります。詳細はお問い合わせください。",
        },
      },
      {
        "@type": "Question",
        name: "保護者の参加は必要ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ビーバー隊は保護者同伴、カブ隊・ボーイ隊は送迎のみでOKです。",
        },
      },
      {
        "@type": "Question",
        name: "活動日はいつですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "主に月2回、日曜日に活動しています。",
        },
      },
    ],
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
