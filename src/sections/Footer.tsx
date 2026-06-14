import { useT } from '../i18n/LocaleContext'

export function Footer() {
  const t = useT()
  return (
    <footer className="border-t border-white/10 bg-emerald-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-cream">{t.footer.rights}</span>
        <span>© {new Date().getFullYear()} · {t.footer.disclaimer}</span>
      </div>
    </footer>
  )
}
