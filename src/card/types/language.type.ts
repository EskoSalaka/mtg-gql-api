import { registerEnumType } from '@nestjs/graphql';

enum Language {
  en = 'en',
  es = 'es',
  fr = 'fr',
  de = 'de',
  it = 'it',
  pt = 'pt',
  ja = 'ja',
  ko = 'ko',
  ru = 'ru',
  zhs = 'zhs',
  zht = 'zht',
  he = 'he',
  la = 'la',
  grc = 'grc',
  ar = 'ar',
  sa = 'sa',
  ph = 'ph',
}

registerEnumType(Language, {
  name: 'Language',
  description: `
  Scryfall archives Magic cards in 17 languages (including some unofficial languages).

  Each Card object indicates its language in the lang property using an ISO-like code. When available, cards may also include their printed text in printed_name, printed_type_line, and printed_text fields.
  
  Please note that Oracle text is always English, per game rules. Cards printed in non-English languages are a translation of the Oracle text at the time the card was printed, but these texts do not receive errata.
  
  Our support for multiple languages in older sets is limited. We are expanding this data slowly over time.
  `,
  valuesMap: {
    en: { description: 'English' },
    es: { description: 'Spanish' },
    fr: { description: 'French' },
    de: { description: 'German' },
    it: { description: 'Italian' },
    pt: { description: 'Portuguese' },
    ja: { description: 'Japanese' },
    ko: { description: 'Korean' },
    ru: { description: 'Russian' },
    zhs: { description: 'Simplified Chinese' },
    zht: { description: 'Traditional Chinese' },
    he: { description: 'Hebrew' },
    la: { description: 'Latin' },
    grc: { description: 'Ancient Greek' },
    ar: { description: 'Arabic' },
    sa: { description: 'Sanskrit' },
    ph: { description: 'Phyrexian' },
  },
});

export default Language;
