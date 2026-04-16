import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// レート制限: 同一IPから1時間に5回まで
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1時間

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  // レート制限チェック
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "送信回数の上限に達しました。しばらく経ってからもう一度お試しください。" },
      { status: 429 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const toEmail = process.env.CONTACT_FORM_TO!
  const fromEmail = process.env.CONTACT_FORM_FROM!

  try {
    const body = await request.json()
    const { name, email, phone, childAge, message } = body

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "お名前、メールアドレス、お問い合わせ内容は必須です" },
        { status: 400 }
      )
    }

    // メール本文（団宛て通知）
    const notifyHtml = `
      <h2>ウェブサイトからお問い合わせがありました</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold; width: 140px;">お名前</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">メールアドレス</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">電話番号</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${phone ? escapeHtml(phone) : "未入力"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">お子様の学年</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${childAge ? escapeHtml(childAge) : "未入力"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">お問い合わせ内容</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
    `

    // メール本文（自動返信）
    const replyHtml = `
      <p>${escapeHtml(name)} 様</p>
      <p>お問い合わせいただきありがとうございます。<br>
      以下の内容で受け付けました。担当者より折り返しご連絡いたします。</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p><strong>お問い合わせ内容：</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 14px; color: #666;">
        ボーイスカウト甲府第5団<br>
        メール：bskofu5.info@gmail.com<br>
        活動拠点：山梨YMCA（山梨県甲府市中央3丁目10-7）
      </p>
    `

    // 通知メールの送信先: 環境変数のアドレスのみ（送信者には自動返信で別途送る）
    const toAddresses = toEmail.split(",").map((a: string) => a.trim()).filter(Boolean)

    const [notifyResult, replyResult] = await Promise.allSettled([
      // 団宛て通知メール
      resend.emails.send({
        from: `お問い合わせフォーム <${fromEmail}>`,
        to: toAddresses,
        replyTo: email,
        subject: `【お問い合わせ】${escapeHtml(name)}様より`,
        html: notifyHtml,
      }),
      resend.emails.send({
        from: `ボーイスカウト甲府第5団 <${fromEmail}>`,
        to: [email],
        subject: "【ボーイスカウト甲府第5団】お問い合わせありがとうございます",
        html: replyHtml,
      }),
    ])

    // 両方失敗した場合のみエラー
    const notifyOk = notifyResult.status === "fulfilled" && notifyResult.value.data
    const replyOk = replyResult.status === "fulfilled" && replyResult.value.data

    if (!notifyOk) {
      const err = notifyResult.status === "fulfilled" ? notifyResult.value.error : notifyResult.reason
      console.error("Notify email failed:", JSON.stringify(err))
    }
    if (!replyOk) {
      const err = replyResult.status === "fulfilled" ? replyResult.value.error : replyResult.reason
      console.error("Reply email failed:", JSON.stringify(err))
    }

    if (!notifyOk && !replyOk) {
      return NextResponse.json(
        { error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      // 片方失敗した場合は警告を含める（デバッグ用、本番では削除可）
      ...((!notifyOk || !replyOk) && { warning: "一部のメール送信に失敗しました" }),
    })
  } catch (error) {
    console.error("Contact form error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
