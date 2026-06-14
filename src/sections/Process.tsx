import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function Process() {
  const t = useT()
  return (
    <Section id="process">
      <SectionHeading>{t.process.heading}</SectionHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.process.steps.map((s) => (
          <div key={s.n} className="rounded-xl border border-white/10 bg-emerald-700/25 p-6">
            <div className="font-display text-3xl font-bold text-gold/60">{s.n}</div>
            <h3 className="mt-2 font-semibold text-cream">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/80">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
