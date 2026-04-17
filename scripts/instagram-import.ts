/**
 * Instagram → MicroCMS 自動インポートスクリプト
 *
 * 必要な環境変数:
 * - INSTAGRAM_ACCESS_TOKEN: Instagram Graph APIアクセストークン
 * - INSTAGRAM_USER_ID: InstagramユーザーID
 * - MICROCMS_API_KEY: MicroCMS APIキー
 * - MICROCMS_SERVICE_DOMAIN: MicroCMSサービスドメイン
 * - AWS_REGION: AWSリージョン
 * - AWS_S3_BUCKET: S3バケット名
 * - AWS_ACCESS_KEY_ID: AWSアクセスキー
 * - AWS_SECRET_ACCESS_KEY: AWSシークレットキー
 *
 * 使用方法:
 * npx tsx scripts/instagram-import.ts          # 最新10件
 * npx tsx scripts/instagram-import.ts --all    # 全件一括
 *
 * インポート仕様:
 * - 本文: キャプション全文 + Instagramリンク（画像埋め込みなし）
 * - 1枚目の画像: S3に保存（アイキャッチ用、手動設定）
 * - 登録状態: 下書き（非公開）
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { createClient } from "microcms-js-sdk"

const microCmsClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
})

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

interface InstagramPost {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  timestamp: string
  thumbnail_url?: string
}

async function fetchInstagramPosts(limit = 25, after?: string): Promise<{
  data: InstagramPost[]
  paging?: { cursors: { after: string } }
}> {
  const fields = "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url"
  let url = `https://graph.instagram.com/${process.env.INSTAGRAM_USER_ID}/media?fields=${fields}&limit=${limit}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  if (after) url += `&after=${after}`

  const response = await fetch(url)
  if (!response.ok) throw new Error(`Instagram API error: ${response.statusText}`)
  return response.json()
}

async function uploadImageToS3(imageUrl: string, key: string): Promise<string> {
  const response = await fetch(imageUrl)
  if (!response.ok) throw new Error(`Failed to download image: ${response.statusText}`)

  const buffer = Buffer.from(await response.arrayBuffer())
  const contentType = response.headers.get("content-type") || "image/jpeg"

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

async function checkExistingPost(instagramId: string): Promise<boolean> {
  try {
    const result = await microCmsClient.get({
      endpoint: "blog",
      queries: {
        filters: `isInstagram[equals]true`,
        limit: 100,
        fields: "id,content",
      },
    })
    return result.contents.some((post: { content: string }) =>
      post.content.includes(`instagram-id:${instagramId}`)
    )
  } catch {
    return false
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

async function processPost(post: InstagramPost): Promise<boolean> {
  if (post.media_type === "VIDEO" && !post.thumbnail_url) {
    console.log(`  Skip (video no thumb): ${post.id}`)
    return false
  }

  const exists = await checkExistingPost(post.id)
  if (exists) {
    console.log(`  Skip (exists): ${post.id}`)
    return false
  }

  // 1枚目の画像をS3に保存（アイキャッチ用）
  const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url! : post.media_url
  await uploadImageToS3(imageUrl, `instagram/${post.id}.jpg`)

  // タイトル（キャプション1行目）
  const caption = post.caption || ""
  const lines = caption.split("\n").filter((line) => line.trim())
  const title = lines[0]?.substring(0, 100) || `Instagram投稿 ${new Date(post.timestamp).toLocaleDateString("ja-JP")}`

  // 本文（テキスト + Instagramリンク）
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

  console.log(`  OK: ${title.substring(0, 50)}`)
  return true
}

async function importLatestPosts(): Promise<void> {
  console.log("Fetching latest Instagram posts...")
  const result = await fetchInstagramPosts(10)
  let imported = 0

  for (const post of result.data) {
    try {
      const success = await processPost(post)
      if (success) imported++
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`  FAIL: ${post.id} -`, error)
    }
  }

  console.log(`Imported ${imported} new posts`)
}

async function importAllPosts(): Promise<void> {
  console.log("Fetching all Instagram posts...")
  let after: string | undefined
  let hasMore = true
  let totalImported = 0

  while (hasMore) {
    const result = await fetchInstagramPosts(25, after)
    console.log(`Fetched ${result.data.length} posts`)

    for (const post of result.data) {
      try {
        const success = await processPost(post)
        if (success) totalImported++
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } catch (error) {
        console.error(`  FAIL: ${post.id} -`, error)
      }
    }

    if (result.paging?.cursors?.after) {
      after = result.paging.cursors.after
    } else {
      hasMore = false
    }
  }

  console.log(`Total imported: ${totalImported} posts`)
}

async function main(): Promise<void> {
  const requiredEnvVars = [
    "INSTAGRAM_ACCESS_TOKEN",
    "INSTAGRAM_USER_ID",
    "MICROCMS_API_KEY",
    "MICROCMS_SERVICE_DOMAIN",
    "AWS_REGION",
    "AWS_S3_BUCKET",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ]

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Missing required environment variable: ${envVar}`)
      process.exit(1)
    }
  }

  const isFullImport = process.argv.includes("--all")

  try {
    if (isFullImport) {
      await importAllPosts()
    } else {
      await importLatestPosts()
    }
  } catch (error) {
    console.error("Import failed:", error)
    process.exit(1)
  }
}

main()
