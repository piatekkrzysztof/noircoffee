<template>
  <div>
    <!-- HERO: the street at night, the name beneath it like a film title -->
    <section class="hero relative flex h-[100svh] min-h-[600px] flex-col overflow-hidden">
      <div class="relative h-[50%] overflow-hidden md:h-[58%]">
        <img
          src="/images/found/florianska-noc.jpg"
          alt="Ulica Floriańska w Krakowie nocą: oświetlone kamienice i przechodnie na bruku"
          width="1920"
          height="1280"
          fetchpriority="high"
          class="hero-photo h-full w-full object-cover object-[center_62%]"
        />
      </div>

      <div class="shell flex flex-1 flex-col justify-between pb-4 pt-6 md:pb-5">
        <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p class="max-w-[46ch] text-[18px] leading-relaxed text-cream fade-up">
            Atelier kawowe przy Floriańskiej 28 w Krakowie. Sześć micro-lotów, cupping w małych grupach i cztery sale, w których nikt nie goni. {{ openNow }}
          </p>
          <NuxtLink to="/rezerwacje" class="btn-primary hidden self-start fade-up fade-up-delay-1 md:inline-flex">
            Zarezerwuj stolik
          </NuxtLink>
        </div>

        <div class="fade-up fade-up-delay-2">
          <h1 class="wordmark -ml-[0.02em] text-cream">
            <span class="sr-only">Noir, atelier kawowe przy ulicy Floriańskiej 28 w Krakowie</span>
            <NoirLogo class="hero-logo w-auto" decorative />
          </h1>
          <NuxtLink to="/rezerwacje" class="btn-primary mt-4 w-full md:hidden">Zarezerwuj stolik</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ADDRESS: one frame, three distances -->
    <div class="mt-24 md:mt-10">
      <AddressShowcase />
    </div>

    <!-- ON THE BAR: the live list -->
    <section class="shell mt-32 md:mt-48" aria-label="Micro-loty na barze">
      <BarList />
    </section>

    <!-- REGIONS: loose scatter -->
    <section class="shell mt-40 md:mt-56" aria-labelledby="regions-title">
      <h2 id="regions-title" v-reveal class="t-2">Regiony</h2>

      <div class="mt-12 grid grid-cols-12 gap-x-6 gap-y-[72px] md:gap-y-0">
        <NuxtLink
          v-for="(o, i) in ORIGINS"
          :key="o.slug"
          v-reveal
          :to="`/pochodzenie/${o.slug}`"
          class="group block"
          :class="placement(i)"
        >
          <p class="mb-3 text-[14px] text-cream-dim">{{ o.country }}, {{ o.region }}, {{ o.altitude }} n.p.m.</p>
          <div class="overflow-hidden bg-surface" :class="ratio(i)">
            <img
              :src="o.imageUrl"
              :alt="`${o.country}, region ${o.region}`"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </div>
          <p class="mt-4 flex items-baseline gap-3 text-cream">
            <span class="t-2 transition-colors group-hover:text-brass-light">{{ o.title }}</span>
            <svg class="shrink-0 transition-transform duration-300 group-hover:translate-x-1" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
          </p>
          <p class="mt-2 max-w-[48ch] text-[16px] leading-relaxed text-cream">{{ o.lead }}</p>
        </NuxtLink>

        <p v-reveal class="col-span-12 max-w-[24ch] font-serif text-[24px] font-light leading-snug text-cream md:col-span-5 md:col-start-2 md:row-start-3 md:self-center md:text-[clamp(26px,2.3vw,34px)]">
          Cztery regiony, nie czterdzieści. Każdą farmę znamy z nazwy.
        </p>
      </div>
    </section>

    <!-- WORKSHOPS: a field of brass -->
    <section class="mt-32 bg-brass py-24 text-espresso md:mt-44 md:py-32" aria-labelledby="workshops-title">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <h2 id="workshops-title" v-reveal class="t-1">Cupping przy Floriańskiej</h2>
          <p v-reveal="80" class="mt-6 max-w-[38ch] text-[18px] leading-relaxed">
            Siadamy przy jednym stole, osiem osób najwyżej. Pięć czarek, łyżka, karta do zabrania. Bez żargonu i bez ocen.
          </p>
          <img
            v-reveal="140"
            src="/images/found/cupping-stol.jpg"
            alt="Czarki z kawą ustawione w rzędzie do cuppingu"
            loading="lazy"
            class="mt-10 hidden aspect-[4/3] w-full max-w-[460px] object-cover lg:block"
          />
        </div>

        <div class="lg:col-span-7 lg:col-start-6">
          <ul class="flex flex-col gap-3">
            <li v-for="(ev, i) in featuredEvents" :key="ev.id" v-reveal="i * 80">
              <NuxtLink
                :to="{ path: '/rezerwacje', query: { warsztat: ev.id } }"
                class="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 bg-brass-light/50 p-6 transition-colors duration-300 hover:bg-brass-light sm:grid-cols-[96px_1fr_auto] sm:items-center md:p-8"
              >
                <span class="font-serif text-[56px] font-light leading-none">
                  {{ Number(formatEventDate(ev.date).day) }}
                  <span class="block font-sans text-[16px] font-normal leading-tight">{{ formatEventDate(ev.date).month }}, {{ formatEventDate(ev.date).weekday }}</span>
                </span>
                <span>
                  <h3 class="t-2">{{ ev.title }}</h3>
                  <span class="mt-2 block text-[16px]">{{ ev.tag }}, {{ ev.startTime }}–{{ ev.endTime }}, prowadzi {{ ev.instructor }}</span>
                </span>
                <span class="col-span-2 flex items-center justify-between gap-6 sm:col-span-1 sm:flex-col sm:items-end sm:gap-1">
                  <span class="t-2 leading-none">{{ ev.price }} zł</span>
                  <span class="text-[16px]" :class="ev.spotsLeft <= 2 ? 'font-medium' : ''">
                    {{ ev.spotsLeft === 1 ? 'zostało 1 miejsce' : `${ev.spotsLeft} z ${ev.spotsTotal} miejsc wolnych` }}
                  </span>
                </span>
              </NuxtLink>
            </li>
          </ul>
          <NuxtLink to="/warsztaty" class="btn-dark mt-8">
            Wszystkie terminy ({{ events.all.length }})
            <svg class="btn-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- GALLERY: drag row -->
    <div class="mt-40 md:mt-56">
      <DragGallery />
    </div>

    <!-- VISIT: card on a photograph -->
    <section class="relative mt-40 md:mt-56 md:min-h-[100svh]" aria-labelledby="visit-title">
      <div class="relative h-[70svh] overflow-hidden md:absolute md:inset-0 md:h-auto">
        <img
          src="/images/found/brama-ulica.jpg"
          alt="Ulica Floriańska w ciągu dnia, na jej końcu Brama Floriańska"
          loading="lazy"
          class="drift h-full w-full object-cover object-[center_40%]"
        />
      </div>

      <div class="relative px-4 md:absolute md:right-[60px] md:top-[60px] md:px-0">
        <div v-reveal class="-mt-20 bg-paper p-8 text-espresso md:mt-0 md:w-[420px]">
          <h2 id="visit-title" class="t-2">Floriańska 28</h2>
          <p class="mt-4 text-[16px] leading-relaxed">
            ul. Floriańska 28, 31-021 Kraków<br>kilka minut od Bramy Floriańskiej
          </p>

          <dl class="mt-6 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 text-[16px]">
            <dt>Poniedziałek–piątek</dt><dd class="tabular-nums">8:00–21:00</dd>
            <dt>Sobota i niedziela</dt><dd class="tabular-nums">9:00–22:00</dd>
          </dl>

          <h3 class="mt-7 text-[16px] font-medium">Sale do rezerwacji</h3>
          <dl class="mt-2 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 text-[16px]">
            <template v-for="s in spaces" :key="s.name">
              <dt>{{ s.name }}</dt><dd class="tabular-nums">do {{ s.max }} osób</dd>
            </template>
          </dl>

          <p class="mt-6 text-[16px]">
            <a href="tel:+48124317709" class="underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso">+48 12 431 77 09</a>
          </p>

          <NuxtLink to="/rezerwacje" class="btn-dark mt-7 !min-h-[52px] w-full">Zarezerwuj stolik</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ORIGINS } from '~/data/origins'

useSeoMeta({
  title: 'Noir · atelier kawowe, Floriańska 28, Kraków',
  description: 'Atelier kawowe przy Floriańskiej 28 w Krakowie. Sześć micro-lotów z kartami cuppingowymi, cupping w małych grupach i cztery sale do rezerwacji.',
  ogTitle: 'Noir · Floriańska 28, Kraków',
  ogDescription: 'Micro-loty, cupping w małych grupach i cztery prywatne sale na Drodze Królewskiej.',
  ogImage: '/images/found/florianska-noc.jpg',
})

const events = useEvents()
const featuredEvents = events.all.slice(0, 3)

const spaces = [
  { name: 'Salon degustacyjny',  max: 6 },
  { name: 'Gabinet szachowy',    max: 4 },
  { name: 'Loża przy palenisku', max: 8 },
  { name: 'Bar',                 max: 2 },
]

// Scatter placements on the 12-column grid: left 3:2, right 4:5 (overlapping), inset 16:9, then left again
function placement(i: number) {
  return [
    'col-span-12 md:col-span-6 md:row-start-1',
    'col-span-10 col-start-3 md:col-span-4 md:col-start-9 md:row-start-1 md:mt-[14vh]',
    'col-span-11 md:col-span-7 md:col-start-3 md:row-start-2 md:mt-[16vh]',
    'col-span-12 md:col-span-4 md:col-start-9 md:row-start-3 md:-mt-[4vh]',
  ][i]
}

function ratio(i: number) {
  return ['aspect-[3/2]', 'aspect-[4/5]', 'aspect-[16/9]', 'aspect-[4/5]'][i]
}

// Opening hours line, filled in on the client so the server markup stays stable
const openNow = ref('')
onMounted(() => {
  const now = new Date()
  const day = now.getDay()
  const [open, close] = day === 0 || day === 6 ? [9, 22] : [8, 21]
  const h = now.getHours() + now.getMinutes() / 60
  openNow.value = h >= open && h < close ? `Dziś otwarte do ${close}:00.` : `Otwieramy o ${open}:00.`
})
</script>

<style scoped>
/* Signature move: the wordmark settles a few percent as the first screen leaves */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .wordmark {
      transform-origin: left bottom;
      animation: settle linear both;
      animation-timeline: scroll(root);
      animation-range: 0 100svh;
    }

    .hero-photo {
      animation: hero-drift linear both;
      animation-timeline: scroll(root);
      animation-range: 0 100svh;
    }
  }
}

/* The wordmark keeps the size the typeset name had: 0.72 of the old font size (viewBox height / em) */
.hero-logo {
  height: max(calc(var(--t-mark) * 0.72), 27vw);
}

@keyframes settle {
  from { scale: 1; }
  to   { scale: 0.93; }
}

@keyframes hero-drift {
  from { transform: scale(1.06); }
  to   { transform: scale(1) translateY(4%); }
}
</style>
