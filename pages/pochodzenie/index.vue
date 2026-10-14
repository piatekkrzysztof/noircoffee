<template>
  <div>
    <PageIntro>
      <template #title>
        Skąd pochodzi <em class="italic text-brass">Twoja kawa</em>
      </template>
      <template #lede>
        Cztery regiony, cztery historie. Kupujemy bezpośrednio od farm i spółdzielni, więc przy każdym ziarnie wiemy, kto je zebrał i na jakiej wysokości.
      </template>
      <template #action>
        <NuxtLink to="/smaki" class="btn-primary">Znajdź swój profil smakowy</NuxtLink>
      </template>
    </PageIntro>

    <!-- One band per region, alternating ground and side -->
    <section>
      <NuxtLink
        v-for="(o, i) in ORIGINS"
        :key="o.slug"
        :to="`/pochodzenie/${o.slug}`"
        class="group block py-16 md:py-24"
        :class="i % 2 === 0 ? 'bg-surface' : 'bg-espresso'"
      >
        <div class="shell grid items-center gap-10 md:grid-cols-12 md:gap-6">
          <div v-reveal class="overflow-hidden md:col-span-7" :class="i % 2 === 1 ? 'md:order-2 md:col-start-6' : ''">
            <img
              :src="o.imageUrl"
              :alt="`${o.country}, region ${o.region}`"
              loading="lazy"
              class="aspect-[3/2] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </div>

          <div v-reveal="100" class="md:col-span-4" :class="i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'">
            <h2 class="t-1 transition-colors duration-300 group-hover:text-brass-light">{{ o.country }}</h2>
            <p class="t-2 mt-4 italic text-brass-light">{{ o.title }}</p>
            <p class="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-cream">{{ o.lead }}</p>
            <p class="mt-5 text-[16px] text-cream-dim">
              {{ o.region }}, {{ o.altitude }} n.p.m., obróbka {{ o.processing.toLowerCase() }}.
            </p>
            <span class="link-arrow mt-8">
              Czytaj historię
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
            </span>
          </div>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ORIGINS } from '~/data/origins'

useSeoMeta({
  title: 'Pochodzenie · Noir Kraków',
  description: 'Poznaj historię i terroir każdego micro-lotu z Noir Coffee Atelier.',
})
</script>
