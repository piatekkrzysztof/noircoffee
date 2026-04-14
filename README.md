# Noir · Kraków Coffee Atelier

Strona portfolio — Nuxt 4, TypeScript, Tailwind CSS.  
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

Utwórz folder i wrzuć zdjęcia:

```bash
mkdir -p public/images
```

| Nazwa pliku w projekcie | Twój plik                              |
|-------------------------|----------------------------------------|
| `public/images/hero.jpg`      | alexas_fotos-coffee-can-1705026.jpg    |
| `public/images/pour.jpg`      | shixugang-coffee-563800.jpg            |
| `public/images/colombia.jpg`  | kolumiba_kawa.jpg                      |
| `public/images/ethiopia.jpg`  | etiopia.jpg                            |
| `public/images/guatemala.jpg` | gwatemala_kawa.jpg                     |
| `public/images/rwanda.jpg`    | rwanda_kawa.jpg                        |

---

## Strony

| URL           | Opis                                  |
|---------------|---------------------------------------|
| `/`           | Główna — hero, teaser eventów/origins |
| `/flavor`     | Flavor Explorer (4 suwaki + karty)    |
| `/originy`    | Origin Stories (Nuxt Content .md)     |
| `/warsztaty`  | Kalendarium + filtry tagów            |
| `/preorder`   | Wybór pakietów kawy (mock)            |
| `/rezerwacje` | Formularz rezerwacji (mock)           |

---

## Struktura

```
noir-project/
├── nuxt.config.ts
├── tailwind.config.ts
├── types/index.ts
├── composables/
│   ├── useReservation.ts   ← mock (bez bazy danych)
│   └── useFlavorFilter.ts
├── components/
│   ├── NoirNav.vue
│   ├── NoirFooter.vue
│   ├── FlavorExplorer.vue
│   ├── BeanCard.vue
│   ├── EventCard.vue
│   ├── OriginCard.vue
│   ├── ReservationForm.vue ← mock
│   └── NewsletterBlock.vue ← mock
├── pages/
│   ├── index.vue
│   ├── flavor.vue
│   ├── originy.vue
│   ├── warsztaty.vue
│   ├── preorder.vue        ← mock
│   └── rezerwacje.vue
├── content/
│   ├── origins/*.md        ← Etiopia, Kolumbia, Gwatemala, Rwanda
│   └── events/events.json
└── assets/css/main.css
```

---

## Deployment (Cloudflare Pages)

```bash
npm run build
```

- Build command: `npm run build`
- Output dir: `.output/public`

*Noir · Kraków Coffee Atelier · 2025*
