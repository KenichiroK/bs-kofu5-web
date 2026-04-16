import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
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

async function uploadImageToS3(imageUrl: string, postId: string): Promise<string> {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const contentType = response.headers.get("content-type") || "image/jpeg"
  const extension = contentType.includes("png") ? "png" : "jpg"
  const key = `instagram/${postId}.${extension}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read",
    })
  )

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

async function checkExistingPost(instagramId: string): Promise<boolean> {
  const microCmsClient = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.MICROCMS_API_KEY!,
  })

  try {
    const result = await microCmsClient.get({
      endpoint: "blog",
      queries: {
        filters: `isInstagram[equals]true`,
        limit: 100,
      },
    })

    return result.contents.some((post: { content: string }) =>
      post.content.includes(`instagram-id:${instagramId}`)
    )
  } catch {
    return false
  }
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

    for (const post of posts) {
      // 動画でサムネイルがない場合はスキップ
      if (post.media_type === "VIDEO" && !post.thumbnail_url) {
        continue
      }

      // 重複チェック
      const exists = await checkExistingPost(post.id)
      if (exists) continue

      // 画像URL（動画の場合はサムネイル）
      const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url! : post.media_url

      // S3にアップロード
      const s3Url = await uploadImageToS3(imageUrl, post.id)

      // タイトル生成（キャプション1行目）
      const caption = post.caption || ""
      const lines = caption.split("\n").filter((line) => line.trim())
      const title = lines[0]?.substring(0, 100) || `Instagram投稿 ${new Date(post.timestamp).toLocaleDateString("ja-JP")}`

      // 本文生成
      const content = `
<p>${caption.replace(/\n/g, "<br>")}</p>
<p><a href="${post.permalink}" target="_blank" rel="noopener noreferrer">Instagramで見る</a></p>
<!-- instagram-id:${post.id} -->
      `.trim()

      // MicroCMSに登録
      await microCmsClient.create({
        endpoint: "blog",
        content: {
          title,
          content,
          eyecatch: s3Url,
          category: "活動報告",
          postDate: post.timestamp,
          instagramNote: "Instagramからの投稿です",
          isInstagram: true,
        },
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
