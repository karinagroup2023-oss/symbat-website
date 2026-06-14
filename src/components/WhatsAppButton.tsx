import { useLocale, useT } from '../i18n/LocaleContext'
import { whatsappUrl } from '../config/site'

export function WhatsAppButton({ className = '' }: { className?: string }) {
  const { locale } = useLocale()
  const t = useT()
  return (
    <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer"
       className={`inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-emerald-900 transition hover:brightness-110 ${className}`}>
      {t.cta.whatsapp} →
    </a>
  )
}
