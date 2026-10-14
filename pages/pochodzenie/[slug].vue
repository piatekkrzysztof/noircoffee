<template>
  <article v-if="origin">
    <!-- Hero: the region's photograph, its name beneath like on the home page -->
    <header class="flex min-h-[100svh] flex-col">
      <div class="h-[52svh] overflow-hidden md:h-[60svh]">
        <img :src="origin.imageUrl" :alt="`${origin.country}, region ${origin.region}`" class="h-full w-full object-cover" />
      </div>
      <div class="shell flex flex-1 flex-col justify-between gap-8 pb-6 pt-6">
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <p class="max-w-[46ch] text-[18px] leading-relaxed text-cream fade-up">
            {{ origin.region }}, {{ origin.altitude }} n.p.m. {{ origin.lead }}
          </p>
          <div class="hidden shrink-0 flex-wrap items-center gap-x-6 gap-y-3 fade-up fade-up-delay-1 md:flex">
            <NuxtLink to="/pochodzenie" class="link-arrow">
              <svg class="rotate-180" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
              Wszystkie regiony
            </NuxtLink>
            <a href="#na-barze" class="btn-primary hidden md:inline-flex">Ziarna z tego regionu</a>
          </div>
        </div>
        <div class="fade-up fade-up-delay-2">
          <h1 class="t-mark -ml-[0.04em] text-cream" style="font-size:clamp(88px,15vw,240px)">{{ origin.country }}</h1>
          <div class="mt-4 flex flex-col gap-4 md:hidden">
            <a href="#na-barze" class="btn-primary w-full">Ziarna z tego regionu</a>
            <NuxtLink to="/pochodzenie" class="link-arrow">
              <svg class="rotate-180" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
              Wszystkie regiony
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Body -->
    <section class="shell grid gap-16 py-24 md:py-32 lg:grid-cols-12 lg:gap-6">
      <aside v-reveal class="lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:col-span-4 lg:self-start">
        <div class="bg-paper p-7 text-espresso">
          <h2 class="t-2">{{ origin.title }}</h2>
          <dl class="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[16px]">
            <template v-for="fact in facts" :key="fact.label">
              <dt>{{ fact.label }}</dt>
              <dd class="text-right">{{ fact.value }}</dd>
            </template>
          </dl>
          <p class="mt-5 text-[16px]">W filiżance: {{ origin.notes.join(', ') }}.</p>
        </div>
      </aside>

      <div class="lg:col-span-7 lg:col-start-6">
        <div class="origin-prose max-w-[62ch]">
          <!-- eslint-disable-next-line vue/no-v-html -- static, trusted copy from data/origins.ts -->
          <p v-for="(p, i) in origin.body" :key="i" v-reveal="i * 80" v-html="p" />
        </div>

        <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <NuxtLink to="/smaki" class="btn-primary">
            Znajdź swój profil smakowy
            <svg class="btn-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
          </NuxtLink>
          <NuxtLink to="/warsztaty" class="link-arrow">Najbliższe cuppingi</NuxtLink>
        </div>
      </div>
    </section>

    <!-- On the bar from this region -->
    <section id="na-barze" class="shell scroll-mt-[calc(var(--nav-h)+16px)]" aria-labelledby="bar-title">
      <h2 id="bar-title" v-reveal class="t-1">Z tego regionu na barze</h2>
      <div class="mt-10 grid gap-3 md:grid-cols-2">
        <NuxtLink
          v-for="(bean, i) in beans"
          :key="bean.id"
          v-reveal="i * 90"
          to="/smaki"
          class="group grid grid-cols-[120px_1fr] gap-5 bg-surface p-5 transition-colors hover:bg-surface2 sm:grid-cols-[160px_1fr]"
        >
          <img :src="bean.imageUrl" :alt="bean.imageAlt" loading="lazy" class="aspect-[4/5] w-full object-cover" />
          <div>
            <h3 class="t-2 transition-colors group-hover:text-brass-light">{{ bean.name }}</h3>
            <p class="mt-2 text-[16px] text-cream-dim">{{ bean.processing }}, odmiana {{ bean.variety }}, {{ bean.scaScore }} punktów SCA.</p>
            <p class="mt-3 text-[16px]">W filiżance: {{ bean.tasting.join(', ') }}.</p>
            <p class="mt-3 text-[18px] font-medium text-brass-light">{{ bean.price }} zł za 100 g</p>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-24 grid gap-3 md:grid-cols-12">
        <figure v-reveal class="md:col-span-5">
          <img src="/images/found/cupping-stol.jpg" alt="Rząd czarek z kawą przygotowanych do cuppingu" loading="lazy" class="aspect-[4/5] w-full object-cover" />
          <figcaption class="mt-3 text-[16px] text-cream-dim">Każdy nowy worek przechodzi cupping, zanim trafi na bar.</figcaption>
        </figure>
        <figure v-reveal="100" class="md:col-span-7 md:mt-32">
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
          <figcaption class="mt-3 text-[16px] text-cream-dim">Palimy małymi partiami, żeby nie przykryć tego, co dał region.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Next region -->
    <NuxtLink v-if="next" :to="`/pochodzenie/${next.slug}`" class="group mt-32 grid bg-surface md:mt-44 md:grid-cols-2">
      <div class="shell flex items-end justify-between gap-6 py-16 md:py-24">
        <p class="t-1 transition-colors group-hover:text-brass-light">
          <span class="text-cream-dim">Dalej:</span> {{ next.country }}
        </p>
        <span class="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface3 text-cream transition-[background-color,color,transform] duration-300 group-hover:-rotate-45 group-hover:bg-brass group-hover:text-espresso" aria-hidden="true">
          <svg width="16" height="12" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
        </span>
      </div>
      <div class="hidden overflow-hidden md:block">
        <img :src="next.imageUrl" :alt="`${next.country}, region ${next.region}`" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import { ORIGINS } from '~/data/origins'
import { BEANS } from '~/data/beans'

const route = useRoute()
const slug = route.params.slug as string

const origin = computed(() => ORIGINS.find(o => o.slug === slug))

if (!origin.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono regionu', fatal: true })
}

const beans = computed(() => BEANS.filter(b => b.country === origin.value?.country))

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

const next = computed(() => {
  const i = ORIGINS.findIndex(o => o.slug === slug)
  return ORIGINS[(i + 1) % ORIGINS.length]
})

const facts = computed(() => [
  { label: 'Kraj',     value: origin.value!.country },
  { label: 'Region',   value: origin.value!.region },
  { label: 'Wysokość', value: `${origin.value!.altitude} n.p.m.` },
  { label: 'Obróbka',  value: origin.value!.processing },
])

useSeoMeta({
  title: () => `${origin.value?.country} · Pochodzenie · Noir Kraków`,
  description: () => origin.value?.lead,
  ogImage: () => origin.value?.imageUrl,
})
</script>

<style scoped>
.origin-prose :deep(p) {
  font-size: 18px;
  line-height: 1.7;
  color: var(--cr);
  margin-bottom: 1.3em;
}

.origin-prose :deep(strong) {
  font-weight: 500;
}

.origin-prose :deep(em) {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.15em;
  color: var(--br-l);
}
</style>
