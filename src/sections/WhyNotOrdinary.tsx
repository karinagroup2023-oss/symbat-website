import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function WhyNotOrdinary() {
  const t = useT()
  return (
    <Section className="rounded-3xl bg-emerald-900/40">
      <SectionHeading>{t.why.heading}</SectionHeading>
      <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-2 bg-emerald-700/40 text-sm font-semibold">
          <div className="p-4 text-muted">{t.why.ordinaryLabel}</div>
          <div className="p-4 text-gold-light">{t.why.symbatLabel}</div>
        </div>
        {t.why.rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 border-t border-white/10 text-sm">
            <div className="p-4 text-cream/70">{r.ordinary}</div>
            <div className="p-4 text-cream">{r.symbat}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
