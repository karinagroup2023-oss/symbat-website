import { useLocale, useT } from '../i18n/LocaleContext'

export function Footer() {
  const t = useT()
  const { locale } = useLocale()
  return (
    <footer className="border-t border-white/10 bg-emerald-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-cream">{t.footer.rights}</span>
        <span>© {new Date().getFullYear()} · {t.footer.disclaimer}</span>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-muted/70">
        <a href="https://wa.me/77066567765" target="_blank" rel="noopener noreferrer"
          className="transition hover:text-gold-light">
          {locale === 'ru' ? 'Сделано в ' : 'KARINA Media — '}
          <span className="font-semibold">{locale === 'ru' ? 'KARINA Media' : 'жасаған'}</span>
        </a>
      </div>
    </footer>
  )
}
