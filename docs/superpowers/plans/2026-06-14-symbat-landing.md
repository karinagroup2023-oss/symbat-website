# Symbat Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (RU/KZ) single-page premium landing for tax consultant Сымбат whose primary CTA is WhatsApp.

**Architecture:** React 19 + Vite SPA. One page composed of focused section components in `src/sections/`. All copy lives in locale dictionaries (`src/i18n/ru.ts`, `kz.ts`) keyed identically; a `LocaleContext` provides the active locale and a `useT()` accessor. Contacts/links live once in `src/config/site.ts`. No backend — WhatsApp/Instagram are external links.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS v4, Vitest + @testing-library/react, Google Fonts (Playfair Display + Inter). Deploy: Vercel.

**Design source:** `docs/superpowers/specs/2026-06-14-symbat-landing-design.md`
**Real content source:** `docs/content/real-content.md`

---

## Visual tokens (from spec §5)

| Token | Hex |
|---|---|
| emerald-900 | `#0b2c22` |
| emerald-800 | `#0f3d2e` |
| emerald-700 | `#185640` |
| gold | `#c8a04a` |
| gold-light | `#e6c473` |
| cream | `#f7f3ea` |
| whatsapp | `#27c08a` |
| muted | `#9fc3b4` |

Fonts: headings `Playfair Display` (700/800), body `Inter` (400–600).

## File structure

```
index.html                      # fonts, lang, meta
vite.config.ts                  # react + tailwind plugins + vitest
tsconfig*.json
package.json
src/
  main.tsx                      # mounts <App/> inside <LocaleProvider/>
  App.tsx                       # renders all sections in order
  index.css                     # tailwind import + @theme tokens
  config/site.ts                # contacts, links, brand, flagship facts
  i18n/
    types.ts                    # Dict type (shape of one locale)
    ru.ts                       # Russian copy
    kz.ts                       # Kazakh copy (review by native speaker)
    LocaleContext.tsx           # provider + useLocale + useT
  components/
    WhatsAppButton.tsx          # builds wa.me link w/ prefilled text
    LangSwitch.tsx
    SectionHeading.tsx
    Section.tsx                 # wrapper: id anchor + padding
  sections/
    Header.tsx Hero.tsx Pains.tsx WhyNotOrdinary.tsx Services.tsx
    Passport.tsx Process.tsx Audience.tsx About.tsx FinalCta.tsx Footer.tsx
  test/
    setup.ts
```

---

### Task 0: Scaffold project (Vite + React + TS + Tailwind v4 + Vitest)

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/test/setup.ts`

- [ ] **Step 1: Init deps**

Run in repo root `/Users/yerkink/symbat-website`:
```bash
npm init -y
npm i react@^19 react-dom@^19
npm i -D vite@^7 @vitejs/plugin-react typescript @types/react @types/react-dom \
  tailwindcss@^4 @tailwindcss/vite \
  vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: `package.json` scripts**

Merge into `package.json`:
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 3: `vite.config.ts`**
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' },
})
```

- [ ] **Step 4: `tsconfig.json` + `tsconfig.node.json`**
```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022", "useDefineForClassFields": true, "lib": ["ES2022","DOM","DOM.Iterable"],
    "module": "ESNext", "skipLibCheck": true, "moduleResolution": "bundler",
    "resolveJsonModule": true, "isolatedModules": true, "noEmit": true,
    "jsx": "react-jsx", "strict": true, "noUnusedLocals": true, "noUnusedParameters": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
```jsonc
// tsconfig.node.json
{
  "compilerOptions": {
    "target": "ES2022", "lib": ["ES2023"], "module": "ESNext",
    "skipLibCheck": true, "moduleResolution": "bundler", "isolatedModules": true,
    "noEmit": true, "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: `index.html`** (lang default ru; fonts)
```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>Сымбат — налоговый консультант | Безопасный переход ИП → ТОО</title>
    <meta name="description" content="Бухгалтер-аналитик и налоговый консультант для бизнеса Казахстана. Безопасный переход ИП → ТОО, диагностика учёта, снижение налоговых рисков." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: `src/index.css`** (Tailwind v4 + theme tokens)
```css
@import "tailwindcss";

@theme {
  --color-emerald-900: #0b2c22;
  --color-emerald-800: #0f3d2e;
  --color-emerald-700: #185640;
  --color-gold: #c8a04a;
  --color-gold-light: #e6c473;
  --color-cream: #f7f3ea;
  --color-whatsapp: #27c08a;
  --color-muted: #9fc3b4;
  --font-display: "Playfair Display", serif;
  --font-sans: "Inter", system-ui, sans-serif;
}

html { scroll-behavior: smooth; }
body { background: var(--color-emerald-800); color: var(--color-cream); font-family: var(--font-sans); }
```

- [ ] **Step 7: `src/test/setup.ts`**
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 8: temporary `src/main.tsx` + `src/App.tsx`** (replaced in later tasks)
```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
```
```tsx
// src/App.tsx
export default function App() { return <h1 className="font-display">Сымбат</h1> }
```

- [ ] **Step 9: Verify dev build**

Run: `npm run build`
Expected: build succeeds, `dist/` created.

- [ ] **Step 10: Commit**
```bash
git add -A && git commit -m "chore: scaffold Vite + React + TS + Tailwind v4 + Vitest"
```

---

### Task 1: Site config (single source of contacts/links)

**Files:**
- Create: `src/config/site.ts`

- [ ] **Step 1: Write `src/config/site.ts`**
```ts
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
```

- [ ] **Step 2: Commit**
```bash
git add src/config/site.ts && git commit -m "feat: add site config and whatsappUrl builder"
```

---

### Task 2: i18n types + dictionaries (the real content)

**Files:**
- Create: `src/i18n/types.ts`, `src/i18n/ru.ts`, `src/i18n/kz.ts`
- Test: `src/i18n/dict.test.ts`

- [ ] **Step 1: `src/i18n/types.ts`** — shape of one locale
```ts
export interface Dict {
  nav: { services: string; passport: string; process: string; about: string; faqAnchor: string }
  cta: { whatsapp: string; passportLink: string }
  hero: { badge: string; titleA: string; titleHighlight: string; subtitle: string;
    stats: { value: string; label: string }[] }
  pains: { heading: string; items: string[] }
  why: { heading: string; ordinaryLabel: string; symbatLabel: string;
    rows: { ordinary: string; symbat: string }[] }
  services: { heading: string; items: { title: string; text: string }[] }
  passport: { badge: string; heading: string; subtitle: string; items: string[]; outcome: string }
  process: { heading: string; steps: { n: string; title: string; text: string }[] }
  audience: { heading: string; niches: { title: string; text: string }[];
    idealTitle: string; ideal: string[]; notForLabel: string; notFor: string }
  about: { heading: string; body: string[]; quote: string }
  final: { heading: string; subtitle: string; instagram: string }
  footer: { rights: string; disclaimer: string }
}
```

- [ ] **Step 2: `src/i18n/ru.ts`** (full Russian copy)
```ts
import type { Dict } from './types'
export const ru: Dict = {
  nav: { services: 'Услуги', passport: 'Паспорт перехода', process: 'Как я работаю', about: 'Обо мне', faqAnchor: 'Контакты' },
  cta: { whatsapp: 'Написать в WhatsApp', passportLink: 'Что такое «Паспорт перехода»' },
  hero: {
    badge: 'Бухгалтер-аналитик · налоговый консультант',
    titleA: 'Безопасный переход', titleHighlight: 'ИП → ТОО',
    subtitle: 'Растите легально — без штрафов, доначислений и хаоса. Нахожу налоговые риски раньше, чем их найдёт налоговая.',
    stats: [
      { value: 'от 10 млн ₸', label: 'оборот клиентов' },
      { value: '3 ниши', label: 'услуги · торговля · фарма' },
      { value: '0', label: 'хаоса после перехода' },
    ],
  },
  pains: {
    heading: 'Знакомо?',
    items: [
      'Обороты выросли, и непонятно — пора ли переходить на ТОО.',
      'Есть бухгалтер, но нет уверенности, что всё сделано правильно.',
      'Пришло уведомление от налоговой.',
      'Заблокировали счёт.',
      'После смены бухгалтера остался хаос.',
      'Непонятно, сколько налогов будет после перехода.',
      'Есть риск доначислений и штрафов.',
    ],
  },
  why: {
    heading: 'Почему обычный бухгалтер не спасает',
    ordinaryLabel: 'Обычный бухгалтер', symbatLabel: 'Сымбат',
    rows: [
      { ordinary: 'Работает с тем, что уже есть', symbat: 'Ищет причину проблемы' },
      { ordinary: 'Просто сдаёт отчётность', symbat: 'Анализирует цифры и логику учёта' },
      { ordinary: 'Фиксирует последствия ошибок', symbat: 'Предупреждает риски заранее' },
      { ordinary: 'Говорит на языке терминов', symbat: 'Объясняет простым языком и даёт сценарии' },
    ],
  },
  services: {
    heading: 'Услуги',
    items: [
      { title: 'Безопасный переход ИП → ТОО', text: 'Расчёт нагрузки по сценариям, выбор режима и сопровождение перехода без ошибок и убытков.' },
      { title: 'Второй контур контроля', text: 'Независимая проверка вашего учёта: банк, первичка, ЭСФ, договоры, налоговый режим.' },
      { title: 'Восстановление учёта', text: 'Привожу в порядок запущенный учёт, расхождения по банку и несходящиеся цифры.' },
      { title: 'Решение проблем с налоговой', text: 'Блокировки, уведомления, несданная отчётность, ошибки прошлых бухгалтеров.' },
      { title: 'Финотчётность для банков', text: 'Корректная отчётность для кредитования и подтверждения финансового состояния.' },
    ],
  },
  passport: {
    badge: 'Фирменный результат',
    heading: '«Паспорт безопасного перехода ИП → ТОО»',
    subtitle: 'Готовый контрольный документ, по которому бизнес работает спокойно и предсказуемо.',
    items: [
      'Налоговые расчёты и выбранный режим',
      'Карта рисков и выполненных исправлений',
      'Правила работы с банком и назначениями платежей',
      'Требования к первичной документации и ЭСФ',
      'Календарь отчётности и контроль первых периодов',
    ],
    outcome: 'Итог — бизнес работает спокойно, без риска убытков и доначислений.',
  },
  process: {
    heading: 'Как я работаю',
    steps: [
      { n: '01', title: 'Диагностика', text: 'Анализирую текущую деятельность, учёт и точки риска.' },
      { n: '02', title: 'Сценарии расчёта', text: 'Считаю налоговую нагрузку по нескольким вариантам и подбираю оптимальный режим.' },
      { n: '03', title: 'Внедрение', text: 'Сопровождаю переход, настраиваю учёт и отчётность.' },
      { n: '04', title: 'Контроль', text: 'Веду первые периоды, чтобы всё работало как единая система.' },
    ],
  },
  audience: {
    heading: 'Для кого',
    niches: [
      { title: 'Услуги', text: 'маркетинг и реклама, аренда, консалтинг, сервис, агентства.' },
      { title: 'Торговля', text: 'опт и розница, купля-продажа товаров по Казахстану.' },
      { title: 'Фармация', text: 'отдельное направление работы.' },
    ],
    idealTitle: 'Мой клиент — собственник ИП или ТОО',
    ideal: ['оборот от 10 млн ₸ в год', 'сам принимает решения', 'платит за результат', 'понимает ценность цифр и аналитики'],
    notForLabel: 'Не мой профиль:', notFor: 'строительство и логистика.',
  },
  about: {
    heading: 'Обо мне',
    body: [
      'Я бухгалтер-аналитик и налоговый консультант для малого и среднего бизнеса Казахстана.',
      'Моя сильная сторона — не механическое ведение учёта, а диагностика, восстановление логики цифр и предотвращение налоговых рисков.',
    ],
    quote: 'Я показываю собственнику реальную картину бизнеса, нахожу риски заранее и помогаю расти легально — без убытков, доначислений и хаоса.',
  },
  final: {
    heading: 'Напишите — и узнайте реальные риски вашего бизнеса',
    subtitle: 'Отвечу в WhatsApp и подскажу первые шаги.',
    instagram: 'Instagram',
  },
  footer: {
    rights: 'Сымбат — налоговый консультант',
    disclaimer: 'Информация на сайте не является публичной офертой.',
  },
}
```

- [ ] **Step 3: `src/i18n/kz.ts`** (Kazakh copy — flag for native review)
```ts
import type { Dict } from './types'
// NOTE: машинный перевод-черновик. Выверить у носителя (термины: ЖК/ЖШС, ЭШФ, есеп).
export const kz: Dict = {
  nav: { services: 'Қызметтер', passport: 'Көшу паспорты', process: 'Жұмыс тәртібі', about: 'Мен туралы', faqAnchor: 'Байланыс' },
  cta: { whatsapp: 'WhatsApp-қа жазу', passportLink: '«Көшу паспорты» дегеніміз не' },
  hero: {
    badge: 'Бухгалтер-талдаушы · салық кеңесшісі',
    titleA: 'Қауіпсіз көшу', titleHighlight: 'ЖК → ЖШС',
    subtitle: 'Айыппұлсыз, қосымша есептеулерсіз және ретсіздіксіз заңды өсіңіз. Салық тәуекелдерін салық қызметінен бұрын табамын.',
    stats: [
      { value: '10 млн ₸-ден', label: 'клиенттер айналымы' },
      { value: '3 сала', label: 'қызмет · сауда · фарма' },
      { value: '0', label: 'көшуден кейінгі ретсіздік' },
    ],
  },
  pains: {
    heading: 'Таныс па?',
    items: [
      'Айналым өсті, ЖШС-ге көшу керек пе — белгісіз.',
      'Бухгалтер бар, бірақ бәрі дұрыс жасалғанына сенім жоқ.',
      'Салық қызметінен хабарлама келді.',
      'Шот бұғатталды.',
      'Бухгалтер ауысқаннан кейін ретсіздік қалды.',
      'Көшкеннен кейін салық қанша болатыны белгісіз.',
      'Қосымша есептеу мен айыппұл қаупі бар.',
    ],
  },
  why: {
    heading: 'Неге кәдімгі бухгалтер құтқармайды',
    ordinaryLabel: 'Кәдімгі бухгалтер', symbatLabel: 'Сымбат',
    rows: [
      { ordinary: 'Бар нәрсемен жұмыс істейді', symbat: 'Мәселенің себебін іздейді' },
      { ordinary: 'Тек есеп тапсырады', symbat: 'Сандар мен есеп логикасын талдайды' },
      { ordinary: 'Қателердің салдарын тіркейді', symbat: 'Тәуекелді алдын ала ескертеді' },
      { ordinary: 'Терминмен сөйлейді', symbat: 'Қарапайым тілмен түсіндіреді, сценарий береді' },
    ],
  },
  services: {
    heading: 'Қызметтер',
    items: [
      { title: 'Қауіпсіз көшу ЖК → ЖШС', text: 'Сценарийлер бойынша есептеу, режимді таңдау және қатесіз сүйемелдеу.' },
      { title: 'Бақылаудың екінші контуры', text: 'Есебіңізді тәуелсіз тексеру: банк, бастапқы құжаттар, ЭШФ, шарттар, режим.' },
      { title: 'Есепті қалпына келтіру', text: 'Қараусыз қалған есеп пен банк бойынша алшақтықтарды ретке келтіремін.' },
      { title: 'Салықпен мәселені шешу', text: 'Бұғаттау, хабарламалар, тапсырылмаған есеп, бұрынғы қателер.' },
      { title: 'Банкке қаржы есебі', text: 'Несие мен қаржы жағдайын растауға арналған дұрыс есеп.' },
    ],
  },
  passport: {
    badge: 'Фирмалық нәтиже',
    heading: '«ЖК → ЖШС қауіпсіз көшу паспорты»',
    subtitle: 'Бизнес тыныш әрі болжамды жұмыс істейтін дайын бақылау құжаты.',
    items: [
      'Салық есептеулері және таңдалған режим',
      'Тәуекелдер картасы және жасалған түзетулер',
      'Банкпен және төлем мақсатымен жұмыс ережелері',
      'Бастапқы құжаттама мен ЭШФ талаптары',
      'Есеп күнтізбесі және алғашқы кезеңдерді бақылау',
    ],
    outcome: 'Нәтиже — бизнес шығынсыз және қосымша есептеусіз тыныш жұмыс істейді.',
  },
  process: {
    heading: 'Жұмыс тәртібі',
    steps: [
      { n: '01', title: 'Диагностика', text: 'Қызметті, есепті және тәуекел нүктелерін талдаймын.' },
      { n: '02', title: 'Есептеу сценарийлері', text: 'Бірнеше нұсқа бойынша салықты есептеп, тиімді режимді таңдаймын.' },
      { n: '03', title: 'Енгізу', text: 'Көшуді сүйемелдеймін, есеп пен есептілікті баптаймын.' },
      { n: '04', title: 'Бақылау', text: 'Бәрі бірыңғай жүйе болуы үшін алғашқы кезеңдерді жүргіземін.' },
    ],
  },
  audience: {
    heading: 'Кімге арналған',
    niches: [
      { title: 'Қызметтер', text: 'маркетинг пен жарнама, жалдау, консалтинг, сервис, агенттіктер.' },
      { title: 'Сауда', text: 'көтерме және бөлшек, Қазақстан бойынша тауар саудасы.' },
      { title: 'Фармация', text: 'жеке бағыт.' },
    ],
    idealTitle: 'Менің клиентім — ЖК немесе ЖШС иесі',
    ideal: ['жылдық айналымы 10 млн ₸-ден', 'шешімді өзі қабылдайды', 'нәтиже үшін төлейді', 'сандар мен талдаудың құнын түсінеді'],
    notForLabel: 'Менің бағытым емес:', notFor: 'құрылыс пен логистика.',
  },
  about: {
    heading: 'Мен туралы',
    body: [
      'Мен Қазақстанның шағын және орта бизнесіне арналған бухгалтер-талдаушы әрі салық кеңесшісімін.',
      'Күшті жағым — есепті механикалық жүргізу емес, диагностика, сандар логикасын қалпына келтіру және салық тәуекелдерінің алдын алу.',
    ],
    quote: 'Мен иесіне бизнестің нақты бейнесін көрсетемін, тәуекелді алдын ала тауып, шығынсыз, қосымша есептеусіз және ретсіздіксіз заңды өсуге көмектесемін.',
  },
  final: {
    heading: 'Жазыңыз — бизнесіңіздің нақты тәуекелдерін біліңіз',
    subtitle: 'WhatsApp-та жауап беріп, алғашқы қадамдарды айтамын.',
    instagram: 'Instagram',
  },
  footer: {
    rights: 'Сымбат — салық кеңесшісі',
    disclaimer: 'Сайттағы ақпарат жария оферта емес.',
  },
}
```

- [ ] **Step 4: Write failing test `src/i18n/dict.test.ts`**
```ts
import { describe, it, expect } from 'vitest'
import { ru } from './ru'
import { kz } from './kz'

function keyPaths(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) return obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))
  if (obj && typeof obj === 'object')
    return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k))
  return [prefix]
}

describe('locale dictionaries', () => {
  it('ru and kz have identical key/array structure', () => {
    expect(keyPaths(kz)).toEqual(keyPaths(ru))
  })
  it('no empty strings', () => {
    for (const dict of [ru, kz])
      for (const [path, val] of Object.entries(flatten(dict)))
        expect(val, path).not.toBe('')
  })
})

function flatten(obj: unknown, prefix = '', out: Record<string,string> = {}): Record<string,string> {
  if (Array.isArray(obj)) obj.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out))
  else if (obj && typeof obj === 'object')
    Object.entries(obj).forEach(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k, out))
  else out[prefix] = String(obj)
  return out
}
```

- [ ] **Step 5: Run test**

Run: `npm test`
Expected: PASS (structures match; fix any mismatch in kz.ts/ru.ts until green).

- [ ] **Step 6: Commit**
```bash
git add src/i18n && git commit -m "feat: add i18n types + RU/KZ dictionaries with parity test"
```

---

### Task 3: LocaleContext + useT

**Files:**
- Create: `src/i18n/LocaleContext.tsx`
- Test: `src/i18n/LocaleContext.test.tsx`

- [ ] **Step 1: Write failing test `src/i18n/LocaleContext.test.tsx`**
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LocaleProvider, useLocale, useT } from './LocaleContext'

function Probe() {
  const { locale, setLocale } = useLocale()
  const t = useT()
  return (
    <div>
      <span data-testid="h">{t.pains.heading}</span>
      <span data-testid="l">{locale}</span>
      <button onClick={() => setLocale('kz')}>kz</button>
    </div>
  )
}

describe('LocaleContext', () => {
  it('defaults to ru and switches to kz', () => {
    render(<LocaleProvider><Probe /></LocaleProvider>)
    expect(screen.getByTestId('l').textContent).toBe('ru')
    expect(screen.getByTestId('h').textContent).toBe('Знакомо?')
    fireEvent.click(screen.getByText('kz'))
    expect(screen.getByTestId('l').textContent).toBe('kz')
    expect(screen.getByTestId('h').textContent).toBe('Таныс па?')
  })
})
```

- [ ] **Step 2: Run test → FAIL** (`useLocale is not a function`)

Run: `npm test`

- [ ] **Step 3: Implement `src/i18n/LocaleContext.tsx`**
```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Dict } from './types'
import { ru } from './ru'
import { kz } from './kz'

export type Locale = 'ru' | 'kz'
const dicts: Record<Locale, Dict> = { ru, kz }

interface Ctx { locale: Locale; setLocale: (l: Locale) => void }
const LocaleCtx = createContext<Ctx | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru')
  const setLocale = (l: Locale) => { setLocaleState(l); document.documentElement.lang = l }
  return <LocaleCtx.Provider value={{ locale, setLocale }}>{children}</LocaleCtx.Provider>
}

export function useLocale(): Ctx {
  const c = useContext(LocaleCtx)
  if (!c) throw new Error('useLocale must be used within LocaleProvider')
  return c
}

export function useT(): Dict { return dicts[useLocale().locale] }
```

- [ ] **Step 4: Run test → PASS**

Run: `npm test`

- [ ] **Step 5: Wire provider in `src/main.tsx`**
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LocaleProvider } from './i18n/LocaleContext'
createRoot(document.getElementById('root')!).render(
  <StrictMode><LocaleProvider><App /></LocaleProvider></StrictMode>
)
```

- [ ] **Step 6: Commit**
```bash
git add src/i18n/LocaleContext.tsx src/i18n/LocaleContext.test.tsx src/main.tsx && git commit -m "feat: add LocaleContext + useT with switch test"
```

---

### Task 4: Shared components (WhatsAppButton, LangSwitch, SectionHeading, Section)

**Files:**
- Create: `src/components/WhatsAppButton.tsx`, `src/components/LangSwitch.tsx`, `src/components/SectionHeading.tsx`, `src/components/Section.tsx`
- Test: `src/components/WhatsAppButton.test.tsx`

- [ ] **Step 1: Write failing test `src/components/WhatsAppButton.test.tsx`**
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocaleProvider } from '../i18n/LocaleContext'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('links to wa.me with the number and prefilled text', () => {
    render(<LocaleProvider><WhatsAppButton /></LocaleProvider>)
    const a = screen.getByRole('link')
    expect(a).toHaveAttribute('href', expect.stringContaining('https://wa.me/77019539376?text='))
    expect(a.getAttribute('href')).toContain(encodeURIComponent('Сымбат'))
    expect(a).toHaveAttribute('target', '_blank')
  })
})
```

- [ ] **Step 2: Run test → FAIL**

Run: `npm test`

- [ ] **Step 3: Implement components**
```tsx
// src/components/WhatsAppButton.tsx
import { useLocale, useT } from '../i18n/LocaleContext'
import { whatsappUrl } from '../config/site'

export function WhatsAppButton({ className = '' }: { className?: string }) {
  const { locale } = useLocale()
  const t = useT()
  return (
    <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer"
       className={`inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-emerald-900 transition hover:brightness-110 ${className}`}>
      {t.cta.whatsapp} →
    </a>
  )
}
```
```tsx
// src/components/LangSwitch.tsx
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
```
```tsx
// src/components/SectionHeading.tsx
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">{children}</h2>
}
```
```tsx
// src/components/Section.tsx
export function Section({ id, className = '', children }:
  { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  )
}
```

- [ ] **Step 4: Run test → PASS**

Run: `npm test`

- [ ] **Step 5: Commit**
```bash
git add src/components && git commit -m "feat: add shared components (WhatsApp, LangSwitch, headings)"
```

---

### Task 5: Header section

**Files:**
- Create: `src/sections/Header.tsx`

- [ ] **Step 1: Implement `src/sections/Header.tsx`**
```tsx
import { site } from '../config/site'
import { useLocale, useT } from '../i18n/LocaleContext'
import { LangSwitch } from '../components/LangSwitch'
import { WhatsAppButton } from '../components/WhatsAppButton'

export function Header() {
  const t = useT(); const { locale } = useLocale()
  const links = [
    ['#services', t.nav.services], ['#passport', t.nav.passport],
    ['#process', t.nav.process], ['#about', t.nav.about], ['#contacts', t.nav.faqAnchor],
  ] as const
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-emerald-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-xl font-bold text-cream">
          {site.brand} <span className="hidden text-sm font-normal text-muted sm:inline">— {site.brandTagline[locale]}</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-cream/85 lg:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="hover:text-gold-light">{label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <WhatsAppButton className="hidden px-4 py-2 text-sm sm:inline-flex" />
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Header.tsx && git commit -m "feat: header with nav, lang switch, whatsapp"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: Implement `src/sections/Hero.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Hero.tsx && git commit -m "feat: hero section"
```

---

### Task 7: Pains section

**Files:**
- Create: `src/sections/Pains.tsx`

- [ ] **Step 1: Implement `src/sections/Pains.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Pains.tsx && git commit -m "feat: pains section"
```

---

### Task 8: WhyNotOrdinary section

**Files:**
- Create: `src/sections/WhyNotOrdinary.tsx`

- [ ] **Step 1: Implement `src/sections/WhyNotOrdinary.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/WhyNotOrdinary.tsx && git commit -m "feat: why-not-ordinary comparison"
```

---

### Task 9: Services section

**Files:**
- Create: `src/sections/Services.tsx`

- [ ] **Step 1: Implement `src/sections/Services.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Services.tsx && git commit -m "feat: services section"
```

---

### Task 10: Passport (flagship) section

**Files:**
- Create: `src/sections/Passport.tsx`

- [ ] **Step 1: Implement `src/sections/Passport.tsx`**
```tsx
import { useT } from '../i18n/LocaleContext'
import { Section } from '../components/Section'
import { WhatsAppButton } from '../components/WhatsAppButton'

export function Passport() {
  const t = useT()
  return (
    <Section id="passport">
      <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-emerald-700/40 to-emerald-900/60 p-8 sm:p-12">
        <span className="text-xs uppercase tracking-widest text-gold">{t.passport.badge}</span>
        <h2 className="mt-3 font-display text-2xl font-bold text-cream sm:text-3xl">{t.passport.heading} ⭐</h2>
        <p className="mt-3 max-w-2xl text-cream/85">{t.passport.subtitle}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {t.passport.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-cream/90">
              <span className="mt-0.5 text-gold-light">◆</span>{it}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-medium text-gold-light">{t.passport.outcome}</p>
        <div className="mt-7"><WhatsAppButton /></div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Passport.tsx && git commit -m "feat: flagship passport section"
```

---

### Task 11: Process section

**Files:**
- Create: `src/sections/Process.tsx`

- [ ] **Step 1: Implement `src/sections/Process.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Process.tsx && git commit -m "feat: process section"
```

---

### Task 12: Audience section

**Files:**
- Create: `src/sections/Audience.tsx`

- [ ] **Step 1: Implement `src/sections/Audience.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/Audience.tsx && git commit -m "feat: audience section"
```

---

### Task 13: About section

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1: Implement `src/sections/About.tsx`**
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/sections/About.tsx && git commit -m "feat: about section"
```

---

### Task 14: FinalCta + Footer

**Files:**
- Create: `src/sections/FinalCta.tsx`, `src/sections/Footer.tsx`

- [ ] **Step 1: Implement `src/sections/FinalCta.tsx`**
```tsx
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
```

- [ ] **Step 2: Implement `src/sections/Footer.tsx`**
```tsx
import { useT } from '../i18n/LocaleContext'

export function Footer() {
  const t = useT()
  return (
    <footer className="border-t border-white/10 bg-emerald-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-cream">{t.footer.rights}</span>
        <span>© {new Date().getFullYear()} · {t.footer.disclaimer}</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**
```bash
git add src/sections/FinalCta.tsx src/sections/Footer.tsx && git commit -m "feat: final CTA + footer"
```

---

### Task 15: Compose App + full build verification

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement `src/App.tsx`**
```tsx
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Pains } from './sections/Pains'
import { WhyNotOrdinary } from './sections/WhyNotOrdinary'
import { Services } from './sections/Services'
import { Passport } from './sections/Passport'
import { Process } from './sections/Process'
import { Audience } from './sections/Audience'
import { About } from './sections/About'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pains />
        <WhyNotOrdinary />
        <Services />
        <Passport />
        <Process />
        <Audience />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run tests + build**

Run: `npm test && npm run build`
Expected: all tests PASS; build succeeds with no TS errors.

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open the local URL. Verify: hero renders with photo, RU↔KZ switch changes all copy and `<html lang>`, WhatsApp buttons open `wa.me/77019539376`, anchors scroll, layout holds at 360px and desktop.

- [ ] **Step 4: Commit**
```bash
git add src/App.tsx && git commit -m "feat: compose full landing page"
```

---

### Task 16: SEO meta + Open Graph + favicon

**Files:**
- Modify: `index.html`
- Create: `public/og-image` reference (reuse `public/symbat.png` if no dedicated OG asset)

- [ ] **Step 1: Add meta to `<head>` in `index.html`** (after description)
```html
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Сымбат — налоговый консультант. Безопасный переход ИП → ТОО" />
    <meta property="og:description" content="Диагностика учёта и снижение налоговых рисков для бизнеса Казахстана." />
    <meta property="og:image" content="/symbat.png" />
    <meta name="robots" content="index,follow" />
    <link rel="icon" href="/symbat.png" />
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**
```bash
git add index.html && git commit -m "chore: SEO + Open Graph meta"
```

---

### Task 17: Vercel deploy config + push

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json`** (SPA + static build)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

- [ ] **Step 2: Push branch**
```bash
git push origin main
```

- [ ] **Step 3: Deploy**

Deploy via Vercel (dashboard import of `karinagroup2023-oss/symbat-website`, or `vercel --prod`). Confirm the live URL loads, RU/KZ switch works, WhatsApp opens chat. Record the URL in `docs/content/real-content.md`.

---

## Self-Review

**Spec coverage:** §1 positioning → Hero/About/Passport copy ✓. §2 goals (WhatsApp primary, Instagram, no form/call, brand) → WhatsAppButton, FinalCta, Header ✓. §3 scope (single-page, RU+KZ, no blog/CMS) → App + i18n ✓. §4 stack → Task 0 ✓. §5 visual tokens → index.css `@theme` + hero gradient ✓. §6 all 11 blocks → Tasks 5–14 ✓. §7 component architecture → file structure matches ✓. §8 content inputs → real-content.md + site.ts (photo `symbat.png`, wa number, instagram) ✓. §9 NFR (responsive, SEO meta, lang attr) → Tasks 15–16 + LocaleContext sets `document.documentElement.lang` ✓. §10 YAGNI → nothing out-of-scope added ✓.

**Placeholder scan:** No TBD/TODO; every code step has full code. KZ copy is complete (flagged for native review, not a placeholder).

**Type consistency:** `Dict` shape in `types.ts` is consumed identically across all sections; `whatsappUrl(locale)`, `useT()`, `useLocale()`, `site.photo` names are consistent across tasks.
