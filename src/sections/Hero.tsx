import { site } from '../config/site'
import { useT } from '../i18n/LocaleContext'
import { WhatsAppButton } from '../components/WhatsAppButton'

export function Hero() {
  const t = useT()
  return (
    <div id="top" className="relative overflow-hidden"
      style={{ background: 'radial-gradient(120% 100% at 80% 0%, #185640 0%, #0f3d2e 55%, #0b2c22 100%)' }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <span className="inline-block rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-widest text-gold">{t.hero.badge}</span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {t.hero.titleA}<br /><span className="text-gold-light">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/85">{t.hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <WhatsAppButton />
            <a href="#passport" className="border-b border-gold-light/40 pb-0.5 font-semibold text-gold-light">{t.cta.passportLink}</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-7">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-lg font-bold text-cream">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-64 max-w-full">
            <img src={site.photo} alt={site.brand}
              className="w-full rounded-2xl border border-gold/30 object-cover" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-xl bg-cream px-3 py-2 text-center text-xs font-semibold text-emerald-800 shadow-lg">
              {t.passport.heading} ⭐
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
