import { site } from '../config/site'
import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  const t = useT()
  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
        <img src={site.photo} alt={site.brand}
          className="mx-auto w-60 rounded-2xl border border-gold/30 object-cover" />
        <div>
          <SectionHeading>{t.about.heading}</SectionHeading>
          {t.about.body.map((p, i) => <p key={i} className="mt-4 text-cream/85 leading-relaxed">{p}</p>)}
          <blockquote className="mt-6 border-l-2 border-gold pl-5 font-display text-xl italic text-gold-light">
            {t.about.quote}
          </blockquote>
        </div>
      </div>
    </Section>
  )
}
