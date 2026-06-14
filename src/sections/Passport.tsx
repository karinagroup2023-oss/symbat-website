import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { WhatsAppButton } from '../components/WhatsAppButton'

export function Passport() {
  const t = useT()
  return (
    <Section id="passport">
      <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-emerald-700/40 to-emerald-900/60 p-8 sm:p-12">
        <span className="text-xs uppercase tracking-widest text-gold">{t.passport.badge}</span>
        <h2 className="mt-3 font-display text-2xl font-bold text-cream sm:text-3xl">{t.passport.heading} ⭐</h2>
        <p className="mt-3 max-w-2xl text-cream/85">{t.passport.subtitle}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {t.passport.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-cream/90">
              <span className="mt-0.5 text-gold-light">◆</span>{it}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-medium text-gold-light">{t.passport.outcome}</p>
        <div className="mt-7"><WhatsAppButton /></div>
      </div>
    </Section>
  )
}
