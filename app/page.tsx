import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsSection } from "@/components/news-section"
import { LatestBlogsSection, getLatestBlogsData } from "@/components/latest-blogs-section"
import { ActivitiesSection } from "@/components/activities-section"
import { TroopsSection } from "@/components/troops-section"
import { JoinSection } from "@/components/join-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { HomeJsonLd } from "@/components/json-ld"
import { getActiveNews } from "@/lib/microcms"

export const revalidate = 60 // 60秒ごとに再検証

async function getNewsSectionData() {
  try {
    const result = await getActiveNews(5)
    return result.contents
  } catch (error) {
    console.error("Failed to fetch news:", error)
    return []
  }
}

export default async function Home() {
  const [news, blogs] = await Promise.all([
    getNewsSectionData(),
    getLatestBlogsData(),
  ])

  return (
    <>
      <HomeJsonLd />
      <Header />
      <main className="pt-16">
        <HeroSection />
        <NewsSection news={news} />
        <LatestBlogsSection blogs={blogs} />
        <ActivitiesSection />
        <TroopsSection />
        <JoinSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
