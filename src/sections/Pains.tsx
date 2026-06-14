import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function Pains() {
  const t = useT()
  return (
    <Section>
      <SectionHeading>{t.pains.heading}</SectionHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.pains.items.map((p, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-emerald-700/30 p-5 text-cream/90">
            <span className="font-display text-gold-light">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-2 text-sm leading-relaxed">{p}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
