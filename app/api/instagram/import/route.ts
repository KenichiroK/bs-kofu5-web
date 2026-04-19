import { NextRequest, NextResponse } from "next/server"
import { createClient } from "microcms-js-sdk"

interface InstagramPost {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  timestamp: string
  thumbnail_url?: string
}

async function fetchInstagramPosts(limit = 10): Promise<InstagramPost[]> {
  const fields = "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url"
  const url = `https://graph.instagram.com/${process.env.INSTAGRAM_USER_ID}/media?fields=${fields}&limit=${limit}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export async function GET(request: NextRequest) {
  // Vercel Cron Jobsからの認証チェック
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const microCmsClient = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.MICROCMS_API_KEY!,
  })

  try {
    const posts = await fetchInstagramPosts(10)
    let imported = 0

    // 過去24時間の投稿のみ対象
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    for (const post of posts) {
      // 24時間以内の投稿でなければスキップ
      if (new Date(post.timestamp) < oneDayAgo) {
        continue
      }

      // 動画でサムネイルがない場合はスキップ
      if (post.media_type === "VIDEO" && !post.thumbnail_url) {
        continue
      }

      // タイトル生成（キャプション1行目）
      const caption = post.caption || ""
      const lines = caption.split("\n").filter((line) => line.trim())
      const title = lines[0]?.substring(0, 100) || `Instagram投稿 ${new Date(post.timestamp).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}`

      // 本文生成（テキスト + Instagramリンク）
      const content = `<p>${escapeHtml(caption).replace(/\n/g, "<br>")}</p>
<p><a href="${post.permalink}" target="_blank" rel="noopener noreferrer">Instagramで見る</a></p>
<!-- instagram-id:${post.id} -->`

      // MicroCMSに下書きとして登録
      await microCmsClient.create({
        endpoint: "blog",
        content: {
          title,
          content,
          category: ["活動報告"],
          postDate: post.timestamp,
          instagramNote: "Instagramからの投稿です",
          isInstagram: true,
        },
        isDraft: true,
      })

      imported++
    }

    return NextResponse.json({ success: true, imported })
  } catch (error) {
    console.error("Instagram import error:", error)
    return NextResponse.json(
      { error: "Import failed", details: String(error) },
      { status: 500 }
    )
  }
}
