<template>
  <section class="px-12 py-20" style="background:#130c08;padding-top:108px">
    <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">/ Pochodzenie kawy</div>
    <h1 class="font-serif font-light text-cream" style="font-size:clamp(32px,4.5vw,56px)">
      Skąd pochodzi<br><em class="italic text-brass">Twoja kawa</em>
    </h1>
    <div class="w-14 h-px my-7" style="background:#8a6924" />
    <p class="font-serif text-[15px] text-cream-dim leading-relaxed mb-14 max-w-lg">
      Każde ziarno nosi w sobie historię miejsca, w którym wyrosło.
      Poznaj cztery regiony, które definiują naszą selekcję.
    </p>

    <div class="grid gap-px" style="grid-template-columns:1fr 1fr;background:rgba(196,150,58,.1)">
      <OriginCard v-for="o in origins" :key="o.id" :origin="o" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { OriginStory } from '~/types'

useSeoMeta({
  title: 'Pochodzenie · Noir Kraków',
  description: 'Poznaj historię i terroir każdego micro-lotu z Noir Coffee Atelier.',
})

const origins: OriginStory[] = [
  {
    id: '01', slug: 'etiopia',
    country: 'Etiopia', region: 'Yirgacheffe',
    title: 'Kolebka kawy',
    body: 'Yirgacheffe to święta ziemia każdego coffee geeka. Na wysokości 1900–2200 m n.p.m., w cieniu lasów pierwotnych, dojrzewają ziarna o profilu, który zmienił świat. Heirloom varieties rosną tu od tysiącleci — dzikie i nieposkromione.',
    altitude: '1900–2200m', processing: 'Washed',
    imageUrl: '/images/ethiopia.jpg',
  },
  {
    id: '02', slug: 'kolumbia',
    country: 'Kolumbia', region: 'Huila',
    title: 'Kraj mikroklimatów',
    body: 'Dolina rzeki Magdalena kryje tysiące małych ferm, gdzie każda rodzina uprawia swoją własną historię. Bogactwo varietals — Bourbon, Caturra, Colombia — tworzy nieporównywalną różnorodność profili smakowych.',
    altitude: '1500–2000m', processing: 'Natural / Honey',
    imageUrl: '/images/colombia.jpg',
  },
  {
    id: '03', slug: 'gwatemala',
    country: 'Gwatemala', region: 'Huehuetenango',
    title: 'Zimny wiatr z Meksyku',
    body: 'Zimny wiatr Cuxibel wiejący z meksykańskich terenów chroni plantacje przed przymrozkami na wyjątkowych 2000m. Ten mikroklimat tworzy wino kawowe — owocowe, złożone, zapamiętywane na długo po ostatnim łyku.',
    altitude: '1800–2100m', processing: 'Anaerobic',
    imageUrl: '/images/guatemala.jpg',
  },
  {
    id: '04', slug: 'rwanda',
    country: 'Rwanda', region: 'Nyamasheke',
    title: 'Kraj tysiąca wzgórz',
    body: 'Rwanda to historia odrodzenia. Przemysł kawowy stał się symbolem nowego początku. Cooperatives jak Nyamasheke łączą setki smallholderów w dążeniu do doskonałości. Variety Bourbon — jasna, herbaciana elegancja.',
    altitude: '1700–2000m', processing: 'Washed',
    imageUrl: '/images/rwanda.jpg',
  },
]
</script>
