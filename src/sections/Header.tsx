import { site } from '../config/site'
import { useLocale, useT } from '../i18n/LocaleContext'
import { LangSwitch } from '../components/LangSwitch'
import { WhatsAppButton } from '../components/WhatsAppButton'

export function Header() {
  const t = useT(); const { locale } = useLocale()
  const links = [
    ['#services', t.nav.services], ['#passport', t.nav.passport],
    ['#process', t.nav.process], ['#about', t.nav.about], ['#contacts', t.nav.faqAnchor],
  ] as const
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-emerald-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-xl font-bold text-cream">
          {site.brand} <span className="hidden text-sm font-normal text-muted sm:inline">— {site.brandTagline[locale]}</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-cream/85 lg:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="hover:text-gold-light">{label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <WhatsAppButton className="hidden px-4 py-2 text-sm sm:inline-flex" />
        </div>
      </div>
    </header>
  )
}
