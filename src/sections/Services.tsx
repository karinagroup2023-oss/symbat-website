import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function Services() {
  const t = useT()
  return (
    <Section id="services">
      <SectionHeading>{t.services.heading}</SectionHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.services.items.map((s, i) => (
          <div key={i} className="rounded-xl border border-gold/20 bg-emerald-700/25 p-6">
            <h3 className="font-display text-lg font-bold text-gold-light">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
