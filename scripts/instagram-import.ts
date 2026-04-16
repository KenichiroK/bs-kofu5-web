/**
 * Instagram → MicroCMS 自動インポートスクリプト
 * 
 * このスクリプトはInstagramの投稿をMicroCMSの記事APIに自動登録します。
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
 * npx ts-node scripts/instagram-import.ts
 * 
 * 初回一括インポート:
 * npx ts-node scripts/instagram-import.ts --all
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { createClient } from "microcms-js-sdk"

// 環境変数
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID!
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY!
const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN!
const AWS_REGION = process.env.AWS_REGION!
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!

// MicroCMS クライアント
const microCmsClient = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
})

// S3 クライアント
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// Instagram投稿の型
interface InstagramPost {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  timestamp: string
  thumbnail_url?: string
}

// MicroCMS記事の型
interface BlogPost {
  id: string
  title: string
  content: string
  eyecatch?: {
    url: string
  }
  category: "活動報告" | "ブログ"
  postDate: string
  instagramNote?: string
  isInstagram: boolean
}

/**
 * Instagram Graph APIから投稿を取得
 */
async function fetchInstagramPosts(limit = 25, after?: string): Promise<{
  data: InstagramPost[]
  paging?: { cursors: { after: string } }
}> {
  const fields = "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url"
  let url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=${fields}&limit=${limit}&access_token=${INSTAGRAM_ACCESS_TOKEN}`
  
  if (after) {
    url += `&after=${after}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * 画像をダウンロードしてS3にアップロード
 */
async function uploadImageToS3(imageUrl: string, postId: string): Promise<string> {
  // 画像をダウンロード
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }

  const buffer = await response.arrayBuffer()
  const contentType = response.headers.get("content-type") || "image/jpeg"
  const extension = contentType.includes("png") ? "png" : "jpg"
  const key = `instagram/${postId}.${extension}`

  // S3にアップロード
  await s3Client.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: contentType,
    })
  )

  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`
}

/**
 * MicroCMSに記事が既に存在するか確認
 */
async function checkExistingPost(instagramId: string): Promise<boolean> {
  try {
    // Instagram IDをタイトルや本文に含む記事を検索
    const result = await microCmsClient.get({
      endpoint: "blog",
      queries: {
        filters: `isInstagram[equals]true`,
        limit: 100,
      },
    })

    // 本文にInstagram IDが含まれているかチェック
    return result.contents.some((post: BlogPost) => 
      post.content.includes(`instagram-id:${instagramId}`)
    )
  } catch {
    return false
  }
}

/**
 * MicroCMSに記事を作成
 */
async function createBlogPost(post: InstagramPost, s3ImageUrl: string): Promise<void> {
  const caption = post.caption || ""
  const lines = caption.split("\n").filter((line) => line.trim())
  const title = lines[0]?.substring(0, 100) || `Instagram投稿 ${new Date(post.timestamp).toLocaleDateString("ja-JP")}`
  
  // 本文を作成（HTMLフォーマット）
  const content = `
<p>${caption.replace(/\n/g, "<br>")}</p>
<p><a href="${post.permalink}" target="_blank" rel="noopener noreferrer">Instagramで見る</a></p>
<!-- instagram-id:${post.id} -->
  `.trim()

  await microCmsClient.create({
    endpoint: "blog",
    content: {
      title,
      content,
      eyecatch: s3ImageUrl,
      category: "活動報告",
      postDate: post.timestamp,
      instagramNote: "Instagramからの投稿です",
      isInstagram: true,
    },
  })

  console.log(`Created: ${title}`)
}

/**
 * 単一の投稿を処理
 */
async function processPost(post: InstagramPost): Promise<boolean> {
  // 動画の場合はスキップ（またはサムネイルを使用）
  if (post.media_type === "VIDEO" && !post.thumbnail_url) {
    console.log(`Skipping video without thumbnail: ${post.id}`)
    return false
  }

  // 既に登録済みかチェック
  const exists = await checkExistingPost(post.id)
  if (exists) {
    console.log(`Already exists: ${post.id}`)
    return false
  }

  // 画像URLを取得（動画の場合はサムネイル）
  const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url! : post.media_url

  // S3にアップロード
  const s3Url = await uploadImageToS3(imageUrl, post.id)

  // MicroCMSに記事作成
  await createBlogPost(post, s3Url)

  return true
}

/**
 * 最新の投稿をインポート（定期実行用）
 */
async function importLatestPosts(): Promise<void> {
  console.log("Fetching latest Instagram posts...")
  
  const result = await fetchInstagramPosts(10)
  let imported = 0

  for (const post of result.data) {
    try {
      const success = await processPost(post)
      if (success) imported++
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error)
    }
  }

  console.log(`Imported ${imported} new posts`)
}

/**
 * 全投稿を一括インポート（初回実行用）
 */
async function importAllPosts(): Promise<void> {
  console.log("Fetching all Instagram posts...")
  
  let after: string | undefined
  let totalImported = 0
  let hasMore = true

  while (hasMore) {
    const result = await fetchInstagramPosts(25, after)
    
    for (const post of result.data) {
      try {
        const success = await processPost(post)
        if (success) totalImported++
        
        // レート制限を避けるため少し待機
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error)
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

// メイン実行
async function main(): Promise<void> {
  // 環境変数チェック
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
