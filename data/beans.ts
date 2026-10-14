// data/beans.ts
// Micro-lots shown in the Flavor Explorer.

import type { CoffeeBean } from '~/types'

export const BEANS: CoffeeBean[] = [
  {
    id: '1', imageUrl: '/images/found/kwiat-kawowca.jpg', imageAlt: 'Biały kwiat kawowca', name: 'Yirgacheffe Konga', origin: 'Etiopia · Yirgacheffe',
    country: 'Etiopia', region: 'Yirgacheffe', altitude: '1900–2200m',
    processing: 'Washed', variety: 'Heirloom', roast: 'Light',
    scaScore: 92, price: 89,  inStock: true,
    flavorProfile: { chocolate: 2, citrus: 8, ferment: 3, floral: 9 },
    tasting: ['jaśmin', 'bergamotka', 'biała herbata'],
    description: 'Jasna, kwiatowa, jak wiosenne łąki. Nuty bergamotki i białej herbaty przeplatają się z delikatną nutą jaśminu.',
  },
  {
    id: '2', imageUrl: '/images/found/owoce-kawowca.jpg', imageAlt: 'Dojrzałe czerwone owoce kawowca na gałązce', name: 'Huila Natural', origin: 'Kolumbia · Huila',
    country: 'Kolumbia', region: 'Huila', altitude: '1500–2000m',
    processing: 'Natural', variety: 'Caturra', roast: 'Light-Medium',
    scaScore: 90, price: 79, inStock: true,
    flavorProfile: { chocolate: 6, citrus: 4, ferment: 8, floral: 4 },
    tasting: ['ananas', 'passion fruit', 'ciemna śliwka'],
    description: 'Ekspresja procesu natural — tropikalne owoce, fermentacyjna złożoność. Ananas, passion fruit i ciemna śliwka.',
  },
  {
    id: '3', imageUrl: '/images/hero.jpg', imageAlt: 'Palone ziarna kawy w metalowej puszce', name: 'Fazenda Santa Ines', origin: 'Brazylia · Sul de Minas',
    country: 'Brazylia', region: 'Sul de Minas', altitude: '1100–1400m',
    processing: 'Natural', variety: 'Bourbon', roast: 'Medium',
    scaScore: 88, price: 64, inStock: true,
    flavorProfile: { chocolate: 9, citrus: 2, ferment: 4, floral: 2 },
    tasting: ['gorzka czekolada', 'laskowy orzech', 'trzcina cukrowa'],
    description: 'Klasyczny brazylijski profil. Gorzka czekolada, laskowe orzechy, trzcina cukrowa. Ciało jak aksamit.',
  },
  {
    id: '4', imageUrl: '/images/found/cupping-zblizenie.jpg', imageAlt: 'Degustatorka wącha kawę podczas cuppingu', name: 'Gesha Boji', origin: 'Etiopia · Jimma',
    country: 'Etiopia', region: 'Jimma', altitude: '2000–2300m',
    processing: 'Washed', variety: 'Gesha', roast: 'Light',
    scaScore: 94, price: 149, inStock: true,
    flavorProfile: { chocolate: 3, citrus: 6, ferment: 5, floral: 10 },
    tasting: ['magnolia', 'fiołek', 'herbata Earl Grey'],
    description: 'Legendarny gesha. Eksplozja floralna — magnolia, fiołek, herbata Earl Grey. Absolutna rzadkość.',
  },
  {
    id: '5', imageUrl: '/images/found/palarnia-poster.jpg', imageAlt: 'Świeżo palone ziarna stygną w bębnie palarni', name: 'Anaerobic Honey', origin: 'Gwatemala · Huehuetenango',
    country: 'Gwatemala', region: 'Huehuetenango', altitude: '1800–2100m',
    processing: 'Anaerobic Honey', variety: 'Bourbon', roast: 'Light-Medium',
    scaScore: 91, price: 94, inStock: true,
    flavorProfile: { chocolate: 7, citrus: 5, ferment: 9, floral: 5 },
    tasting: ['wino musujące', 'malina', 'kakao'],
    description: 'Anaerobic honey processing. Wino musujące, czerwone owoce, delikatna kakao. Przebojowa kwasowość malinowa.',
  },
  {
    id: '6', imageUrl: '/images/rwanda.jpg', imageAlt: 'Zielone wzgórza Rwandy z tarasami upraw', name: 'Washed Bourbon', origin: 'Rwanda · Nyamasheke',
    country: 'Rwanda', region: 'Nyamasheke', altitude: '1700–2000m',
    processing: 'Washed', variety: 'Bourbon', roast: 'Light',
    scaScore: 89, price: 74, inStock: true,
    flavorProfile: { chocolate: 4, citrus: 7, ferment: 3, floral: 7 },
    tasting: ['czerwona porzeczka', 'hibiskus', 'herbata rumiankowa'],
    description: 'Elegancja washed process. Czerwona porzeczka, hibiskus, herbata rumiankowa. Czysta i precyzyjna.',
  },
]
