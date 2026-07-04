"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { Send, Instagram } from "lucide-react"
import Logo from "./logo"

export function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo />
          </div>

          {/* Contacts */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t.footer.contacts}</h4>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p>
                <a
                  href="tel:+998903930591"
                  className="transition-colors hover:text-foreground"
                >
                  +998 90 393 05 91
                </a>
              </p>
              <p>
                <a
                  href="tel:+998936260888"
                  className="transition-colors hover:text-foreground"
                >
                  +998 93 626 08 88
                </a>
              </p>
              <p>
                <a
                  href="mailto:urbantravelchina2025@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  urbantravelchina2025@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t.footer.social}</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/urbantravel_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Send className="h-4 w-4" />
                Telegram
              </a>
              <a
                href="https://www.instagram.com/urban.travel.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Urban Travel. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
