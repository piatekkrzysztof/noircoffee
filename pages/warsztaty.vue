<template>
  <div>
    <PageIntro image="/images/found/cupping-stol.jpg" image-alt="Rząd czarek z kawą przygotowanych do cuppingu, w tle ceglana ściana" focus="center 60%">
      <template #title>
        Kalendarium <em class="italic text-brass">sensoryczne</em>
      </template>
      <template #lede>
        Cupping, masterclassy i wykłady w grupach do dwudziestu osób. W cenie degustacja, karta cuppingowa i kawa do zabrania.
      </template>
    </PageIntro>

    <section class="shell pb-8 pt-16 md:pt-24">
      <!-- Filters -->
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filtruj według rodzaju">
        <button
          v-for="tag in ['Wszystkie', ...tags]"
          :key="tag"
          type="button"
          class="chip"
          :aria-pressed="activeTag === tag"
          @click="activeTag = tag"
        >
          {{ tag }}
          <span class="tabular-nums opacity-70">{{ countFor(tag) }}</span>
        </button>
      </div>

      <div class="mt-10 flex flex-col gap-3">
        <TransitionGroup name="fade">
          <EventCard v-for="ev in filteredEvents" :key="ev.id" :event="ev" />
        </TransitionGroup>
      </div>

      <div v-if="filteredEvents.length === 0" class="bg-surface py-20 text-center">
        <p class="t-2">Brak terminów w tej kategorii.</p>
        <p class="mt-3 text-[16px] text-cream-dim">Zapisz się do listu ze stopki, damy znać o nowych datach.</p>
      </div>
    </section>

    <!-- What a cupping looks like -->
    <section class="shell mt-24 md:mt-32" aria-labelledby="how-title">
      <h2 id="how-title" v-reveal class="t-2">Jak wygląda cupping</h2>
      <div class="mt-8 grid gap-3 md:grid-cols-12">
        <figure v-reveal class="md:col-span-7 md:row-span-2">
          <video
            ref="clip"
            class="aspect-[16/10] w-full bg-surface object-cover"
            src="/images/found/palarnia.webm"
            poster="/images/found/palarnia-poster.jpg"
            muted
            loop
            playsinline
            preload="none"
            aria-label="Świeżo palone ziarna mieszane w bębnie chłodzącym palarni"
          />
          <figcaption class="mt-3 text-[16px] text-cream-dim">Zaczynamy od świeżo palonych ziaren. Palenie i odpoczynek zajmują pięć dni.</figcaption>
        </figure>
        <figure v-reveal="100" class="md:col-span-5 md:mt-24">
          <img src="/images/found/cupping-zblizenie.jpg" alt="Degustatorka wącha kawę nad czarką podczas cuppingu" loading="lazy" class="aspect-[4/5] w-full object-cover" />
          <figcaption class="mt-3 text-[16px] text-cream-dim">Najpierw zapach suchej kawy, potem po zalaniu, potem łyżka.</figcaption>
        </figure>
        <figure v-reveal="160" class="md:col-span-4 md:col-start-2 md:mt-10">
          <img src="/images/found/owoce-kawowca.jpg" alt="Dojrzałe czerwone owoce kawowca na gałązce" loading="lazy" class="aspect-[3/2] w-full object-cover" />
          <figcaption class="mt-3 text-[16px] text-cream-dim">Na koniec rozmawiamy o tym, skąd przyjechał owoc i kto go zebrał.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Private group -->
    <section class="mt-24 bg-brass py-20 text-espresso md:mt-32 md:py-28">
      <div class="shell grid gap-10 md:grid-cols-12 md:items-end md:gap-6">
        <div v-reveal class="md:col-span-7">
          <h2 class="t-1">Warsztat dla firmy albo <em class="italic">na urodziny</em></h2>
          <p class="mt-6 max-w-[48ch] text-[18px] leading-relaxed">
            Ustalamy termin, program i liczbę osób, do dwunastu. Cupping w grupie prywatnej zaczyna się od 180 zł za osobę, w Salonie degustacyjnym albo w Loży przy palenisku.
          </p>
        </div>
        <div v-reveal="100" class="md:col-span-4 md:col-start-9 md:justify-self-end">
          <NuxtLink to="/rezerwacje" class="btn-dark">
            Zapytaj o termin
            <svg class="btn-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Warsztaty · Noir Kraków',
  description: 'Warsztaty cuppingowe, brewing masterclassy i degustacje w Noir Coffee Atelier Kraków.',
})

const { all: allEvents, tags } = useEvents()

const activeTag = ref('Wszystkie')

const filteredEvents = computed(() =>
  activeTag.value === 'Wszystkie'
    ? allEvents
    : allEvents.filter(e => e.tag === activeTag.value),
)

function countFor(tag: string) {
  return tag === 'Wszystkie' ? allEvents.length : allEvents.filter(e => e.tag === tag).length
}

// The roastery loop plays only while visible, never with reduced motion
const clip = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null
onMounted(() => {
  if (!clip.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) clip.value?.play().catch(() => {})
    else clip.value?.pause()
  }, { threshold: 0.3 })
  observer.observe(clip.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>
