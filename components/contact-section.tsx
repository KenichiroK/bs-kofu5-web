"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "送信に失敗しました")
      }

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", childAge: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "送信に失敗しました")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-8 md:py-16 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Contact</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            お問い合わせ・体験申込
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            ご質問や体験入団のお申し込みは、下記フォームよりお気軽にどうぞ。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">お問い合わせフォーム</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前 *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="山田 太郎"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="090-1234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childAge">お子様の学年</Label>
                  <Input
                    id="childAge"
                    name="childAge"
                    type="text"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="例：小学3年生"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">お問い合わせ内容 *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="体験入団を希望しています。次回の活動日を教えてください。"
                />
              </div>

              {status === "success" ? (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">お問い合わせを受け付けました。担当者より折り返しご連絡いたします。</p>
                </div>
              ) : (
                <>
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full" size="lg" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        送信中...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        送信する
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">連絡先</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">メール</p>
                    <a href="mailto:bskofu5.info@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      bskofu5.info@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">活動拠点</p>
                    <p className="text-muted-foreground">
                      山梨YMCA
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      〒400-0032 山梨県甲府市中央3丁目10-7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick */}
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">よくあるご質問</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground text-sm">入団にかかる費用は？</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    入団費、年間登録費、月会費がかかります。詳細はお問い合わせください。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">保護者の参加は必要？</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ビーバー隊は保護者同伴、カブ隊・ボーイ隊は送迎のみでOKです。
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/faq">
                    よくある質問をもっと見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
