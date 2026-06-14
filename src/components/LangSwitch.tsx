import { useLocale } from '../i18n/LocaleContext'

export function LangSwitch() {
  const { locale, setLocale } = useLocale()
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-gold/40 text-sm">
      {(['ru', 'kz'] as const).map((l) => (
        <button key={l} onClick={() => setLocale(l)}
          className={`px-2.5 py-1 uppercase ${locale === l ? 'bg-gold text-emerald-900' : 'text-gold'}`}>
          {l}
        </button>
      ))}
    </div>
  )
}
