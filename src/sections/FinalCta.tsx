import { site } from '../config/site'
import { useT } from '../i18n/LocaleContext'
import { WhatsAppButton } from '../components/WhatsAppButton'

export function FinalCta() {
  const t = useT()
  return (
    <section id="contacts" className="bg-emerald-900/60">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">{t.final.heading}</h2>
        <p className="mt-4 text-cream/80">{t.final.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton />
          <a href={site.instagram} target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-gold/40 px-6 py-3 font-semibold text-gold-light hover:bg-gold/10">
            {t.final.instagram}
          </a>
        </div>
      </div>
    </section>
  )
}
