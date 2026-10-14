# Noir · Kraków Coffee Atelier

Strona portfolio — Nuxt 3, TypeScript, Tailwind CSS.  
**Brak zewnętrznych zależności** (Supabase usunięty — formularze działają jako mock).

---

## Szybki start

```bash
npm install
npm run dev
```

Otwórz `http://localhost:3000` — gotowe.

---

## Zdjęcia

- `public/images/*.jpg` to zdjęcia z Pixabay, zoptymalizowane pod web.
- `public/images/found/` to zdjęcia ulicy Floriańskiej, cuppingu i kawowca oraz 9-sekundowy klip z palarni z Wikimedia Commons (CC BY / CC BY-SA). Autorzy i licencje są w `public/images/found/credits.json` i `data/credits.ts`, a strona wypisuje je w stopce. Przy podmianie zdjęcia trzeba zaktualizować oba pliki.

---

## Strony

| URL                    | Opis                                              |
|------------------------|---------------------------------------------------|
| `/`                    | Główna: Floriańska nocą, karta cuppingowa, regiony, warsztaty, galeria, wizyta |
| `/smaki`               | Odkryj smaki: radar profilu, 4 suwaki, % dopasowania |
| `/pochodzenie`         | Cztery regiony upraw                              |
| `/pochodzenie/:slug`   | Historia regionu + przejście do następnego        |
| `/warsztaty`           | Kalendarium z filtrami i licznikiem miejsc        |
| `/preorder`            | Pakiety, formularz z walidacją, podsumowanie (mock) |
| `/rezerwacje`          | Rezerwacja przestrzeni lub zapis na warsztat (mock) |

---

## Struktura

```
noir-standalone/
├── nuxt.config.ts
├── tailwind.config.ts      ← tokeny kolorów, fonty, skala z-index
├── error.vue               ← strona 404 / błędu
├── types/index.ts
├── data/
│   ├── beans.ts            ← micro-loty (lista „Na barze” i /smaki)
│   ├── credits.ts          ← podpisy zdjęć z otwartych zbiorów
│   ├── events.ts           ← kalendarium warsztatów
│   └── origins.ts          ← regiony i ich historie
├── composables/
│   ├── useEvents.ts
│   ├── useFlavorFilter.ts
│   └── useReservation.ts
├── plugins/reveal.ts       ← v-reveal: animacja przy przewijaniu
├── components/
│   ├── NoirNav.vue / NoirFooter.vue (pocztówka + newsletter) / PageIntro.vue
│   ├── AddressShowcase.vue / BarList.vue / DragGallery.vue  ← sekcje strony głównej
│   ├── FlavorExplorer.vue / FlavorRadar.vue / BeanCard.vue
│   ├── EventCard.vue
│   └── ReservationForm.vue  ← mock
├── pages/
│   ├── index.vue, smaki.vue, warsztaty.vue, preorder.vue, rezerwacje.vue
│   └── pochodzenie/index.vue, pochodzenie/[slug].vue
└── assets/css/main.css
```

---

## Deployment (Vercel)

Konfiguracja w `vercel.json` (`npm run generate`, preset `vercel-static`).

*Noir · Kraków Coffee Atelier · 2026*
