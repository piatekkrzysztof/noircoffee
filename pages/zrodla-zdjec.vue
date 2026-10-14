<template>
  <div>
    <PageIntro>
      <template #title>Źródła zdjęć</template>
      <template #lede>
        Zdjęcia ulicy Floriańskiej, cuppingu i kawowca oraz film z palarni pochodzą z Wikimedia Commons i są używane na licencjach Creative Commons. Pozostałe zdjęcia pochodzą z Pixabay.
      </template>
    </PageIntro>

    <section class="shell pb-8">
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(c, i) in CREDITS" :key="c.file" v-reveal="(i % 3) * 70" class="bg-surface">
          <video
            v-if="c.file.endsWith('.webm')"
            :src="c.file"
            :poster="c.file.replace('.webm', '-poster.jpg')"
            muted
            playsinline
            preload="none"
            class="aspect-[3/2] w-full object-cover"
            :aria-label="c.title"
          />
          <img v-else :src="c.file" :alt="c.title" loading="lazy" class="aspect-[3/2] w-full object-cover" />
          <p class="p-5 text-[16px] leading-relaxed text-cream">
            <a :href="c.page" class="underline decoration-cream/30 underline-offset-4 hover:decoration-brass" rel="noopener" target="_blank">„{{ c.title }}”</a>,
            {{ c.creator }},
            <a :href="c.licenseUrl" class="text-cream-dim underline decoration-cream/30 underline-offset-4 hover:decoration-brass" rel="noopener" target="_blank">{{ c.license }}</a>
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CREDITS } from '~/data/credits'

useSeoMeta({
  title: 'Źródła zdjęć · Noir Kraków',
  description: 'Autorzy i licencje zdjęć oraz filmu użytych na stronie Noir Coffee Atelier.',
  robots: 'noindex, follow',
})
</script>
