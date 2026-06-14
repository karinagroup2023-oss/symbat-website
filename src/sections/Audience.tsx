import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function Audience() {
  const t = useT()
  return (
    <Section>
      <SectionHeading>{t.audience.heading}</SectionHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {t.audience.niches.map((n, i) => (
          <div key={i} className="rounded-xl border border-gold/20 bg-emerald-700/25 p-6">
            <h3 className="font-display text-lg font-bold text-gold-light">{n.title}</h3>
            <p className="mt-2 text-sm text-cream/85">{n.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-white/10 bg-emerald-900/40 p-6">
        <h3 className="font-semibold text-cream">{t.audience.idealTitle}</h3>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/85">
          {t.audience.ideal.map((it, i) => <li key={i} className="flex items-center gap-2"><span className="text-gold-light">✓</span>{it}</li>)}
        </ul>
        <p className="mt-4 text-sm text-muted"><span className="text-cream/70">{t.audience.notForLabel}</span> {t.audience.notFor}</p>
      </div>
    </Section>
  )
}
