export const site = {
  brand: 'Сымбат',
  brandTagline: { ru: 'налоговый консультант', kz: 'салық кеңесшісі' },
  whatsappNumber: '77019539376',
  whatsappPrefill: {
    ru: 'Здравствуйте, Сымбат! Хочу проверить риски и обсудить переход ИП → ТОО.',
    kz: 'Сәлеметсіз бе, Сымбат! Тәуекелдерді тексеріп, ЖК → ЖШС көшуін талқыласам деймін.',
  },
  instagram: 'https://www.instagram.com/senimdi_esep',
  photo: '/symbat.png',
} as const

export function whatsappUrl(locale: 'ru' | 'kz'): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappPrefill[locale])}`
}
