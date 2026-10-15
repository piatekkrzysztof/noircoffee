// data/beans.ts
// Micro-lots shown in the Flavor Explorer.

import type { CoffeeBean } from '~/types'

export const BEANS: CoffeeBean[] = [
  {
    id: '1', imageUrl: '/images/found/kwiat-kawowca.jpg', imageAlt: 'Biały kwiat kawowca', name: 'Yirgacheffe Konga', origin: 'Etiopia, Yirgacheffe',
    country: 'Etiopia', region: 'Yirgacheffe', altitude: '1900–2200 m',
    processing: 'Washed', variety: 'Heirloom', roast: 'Light',
    scaScore: 92, price: 89,  inStock: true,
    flavorProfile: { chocolate: 2, citrus: 8, ferment: 3, floral: 9 },
    tasting: ['jaśmin', 'bergamotka', 'biała herbata'],
    description: 'Lekka jak herbata. Pachnie jaśminem, w smaku bergamotka i biała herbata. Najlepsza z dripa i bez mleka.',
  },
  {
    id: '2', imageUrl: '/images/found/owoce-kawowca.jpg', imageAlt: 'Dojrzałe czerwone owoce kawowca na gałązce', name: 'Huila Natural', origin: 'Kolumbia, Huila',
    country: 'Kolumbia', region: 'Huila', altitude: '1500–2000 m',
    processing: 'Natural', variety: 'Caturra', roast: 'Light-Medium',
    scaScore: 90, price: 79, inStock: true,
    flavorProfile: { chocolate: 6, citrus: 4, ferment: 8, floral: 4 },
    tasting: ['ananas', 'marakuja', 'ciemna śliwka'],
    description: 'Suszona w całym owocu, więc smakuje jak dojrzały ananas i ciemna śliwka. Słodka bez cukru. Dobra z dripa i z AeroPressu.',
  },
  {
    id: '3', imageUrl: '/images/hero.jpg', imageAlt: 'Palone ziarna kawy w metalowej puszce', name: 'Fazenda Santa Ines', origin: 'Brazylia, Sul de Minas',
    country: 'Brazylia', region: 'Sul de Minas', altitude: '1100–1400 m',
    processing: 'Natural', variety: 'Bourbon', roast: 'Medium',
    scaScore: 88, price: 64, inStock: true,
    flavorProfile: { chocolate: 9, citrus: 2, ferment: 4, floral: 2 },
    tasting: ['gorzka czekolada', 'laskowy orzech', 'trzcina cukrowa'],
    description: 'Najbardziej czekoladowa kawa na barze: gorzkie kakao, orzech laskowy, trzcina cukrowa. Gęsta i pełna. Z niej robimy espresso i flat white.',
  },
  {
    id: '4', imageUrl: '/images/found/cupping-zblizenie.jpg', imageAlt: 'Degustatorka wącha kawę podczas cuppingu', name: 'Gesha Boji', origin: 'Etiopia, Jimma',
    country: 'Etiopia', region: 'Jimma', altitude: '2000–2300 m',
    processing: 'Washed', variety: 'Gesha', roast: 'Light',
    scaScore: 94, price: 149, inStock: true,
    flavorProfile: { chocolate: 3, citrus: 6, ferment: 5, floral: 10 },
    tasting: ['magnolia', 'fiołek', 'herbata Earl Grey'],
    description: 'Odmiana, o którą licytują się palarnie z całego świata. Magnolia, fiołek i Earl Grey, bardzo delikatnie. Mamy jeden worek na sezon.',
  },
  {
    id: '5', imageUrl: '/images/found/palarnia-poster.jpg', imageAlt: 'Świeżo palone ziarna stygną w bębnie palarni', name: 'Anaerobic Honey', origin: 'Gwatemala, Huehuetenango',
    country: 'Gwatemala', region: 'Huehuetenango', altitude: '1800–2100 m',
    processing: 'Anaerobic Honey', variety: 'Bourbon', roast: 'Light-Medium',
    scaScore: 91, price: 94, inStock: true,
    flavorProfile: { chocolate: 7, citrus: 5, ferment: 9, floral: 5 },
    tasting: ['wino musujące', 'malina', 'kakao'],
    description: 'Fermentowana bez dostępu powietrza, dlatego smakuje jak musujące wino z malinami, a na końcu kakao. Pierwszy łyk dziwi, trzeci przekonuje.',
  },
  {
    id: '6', imageUrl: '/images/rwanda.jpg', imageAlt: 'Zielone wzgórza Rwandy z tarasami upraw', name: 'Washed Bourbon', origin: 'Rwanda, Nyamasheke',
    country: 'Rwanda', region: 'Nyamasheke', altitude: '1700–2000 m',
    processing: 'Washed', variety: 'Bourbon', roast: 'Light',
    scaScore: 89, price: 74, inStock: true,
    flavorProfile: { chocolate: 4, citrus: 7, ferment: 3, floral: 7 },
    tasting: ['czerwona porzeczka', 'hibiskus', 'herbata rumiankowa'],
    description: 'Czysta i soczysta: czerwona porzeczka, hibiskus, rumianek. Dobra na drugą kawę dnia, kiedy pierwsza była espresso.',
  },
]
