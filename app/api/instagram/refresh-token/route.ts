import { NextRequest, NextResponse } from "next/server"

const CRON_SECRET = process.env.CRON_SECRET!

export async function GET(request: NextRequest) {
  // 認証チェック
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!currentToken) {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN is not set" },
      { status: 500 }
    )
  }

  try {
    // Instagram Graph APIの長期トークンを更新
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`

    const response = await fetch(url)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Token refresh failed: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    // 注意: 新しいトークンはVercelの環境変数を手動で更新するか、
    // Vercel APIを使って自動更新する仕組みを別途構築する必要があります。
    // ここではログに出力して手動更新を促します。
    console.log("Token refreshed successfully. New token expires in:", data.expires_in, "seconds")

    return NextResponse.json({
      success: true,
      expires_in: data.expires_in,
      message: "Token refreshed. Update INSTAGRAM_ACCESS_TOKEN in Vercel dashboard.",
    })
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json(
      { error: "Token refresh failed", details: String(error) },
      { status: 500 }
    )
  }
}
