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
