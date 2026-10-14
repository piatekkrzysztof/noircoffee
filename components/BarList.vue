<template>
  <div class="grid gap-12 md:grid-cols-12 md:gap-8">
    <!-- Sticky photograph that follows the active micro-lot -->
    <div class="hidden md:col-span-5 md:block">
      <div class="sticky top-[12vh] aspect-[4/5] w-full overflow-hidden bg-surface">
        <img
          v-for="bean in BEANS"
          :key="bean.id"
          :src="bean.imageUrl"
          :alt="bean.id === shown.id ? bean.imageAlt : ''"
          :aria-hidden="bean.id !== shown.id"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out"
          :class="bean.id === shown.id ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'"
        />
      </div>
    </div>

    <div class="md:col-span-6 md:col-start-7">
      <h2 class="t-1">Na barze teraz</h2>
      <p class="mt-6 max-w-[46ch] text-[18px] leading-relaxed text-cream">
        Sześć micro-lotów, każdy z własną kartą cuppingową. Powiedz, co lubisz, a pokażemy, które ziarno parzyć.
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Co lubisz w kawie?">
        <span class="mr-2 text-[16px] text-cream-dim">Lubię</span>
        <button
          v-for="p in presets"
          :key="p.id"
          type="button"
          class="chip"
          :aria-pressed="preset === p.id"
          @click="choose(p.id)"
        >
          {{ p.label }}
        </button>
      </div>
      <p class="mt-4 min-h-[24px] text-[16px] text-cream-dim" aria-live="polite">
        <template v-if="preset">
          Najlepiej pasuje <span class="text-cream">{{ active.name }}</span>: {{ matchFor(active) }}% zgodności z Twoim profilem.
        </template>
      </p>

      <ul class="mt-8 flex flex-col" @mouseleave="previewId = null">
        <li v-for="bean in BEANS" :key="bean.id">
          <button
            type="button"
            class="group flex min-h-[64px] w-full items-baseline justify-between gap-6 py-3 text-left"
            :aria-expanded="bean.id === active.id"
            :aria-controls="`bean-${bean.id}`"
            @mouseenter="previewId = bean.id"
            @focus="activeId = bean.id"
            @click="activeId = bean.id"
          >
            <span
              class="t-2 transition-colors duration-300"
              :class="bean.id === active.id || bean.id === previewId ? 'text-cream' : 'text-cream-dim'"
            >
              {{ bean.name }}
            </span>
            <span class="shrink-0 text-[16px] tabular-nums" :class="bean.id === active.id ? 'text-brass-light' : 'text-cream-dim'">
              {{ bean.price }} zł / 100 g
            </span>
          </button>

          <!-- Cupping card -->
          <div
            :id="`bean-${bean.id}`"
            class="grid transition-[grid-template-rows,visibility] duration-500 ease-out"
            :class="bean.id === active.id ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'"
            :inert="bean.id !== active.id"
          >
            <div class="overflow-hidden">
              <div class="pb-6 pt-2">
                <img :src="bean.imageUrl" :alt="bean.imageAlt" loading="lazy" class="mb-4 aspect-[4/3] w-full object-cover md:hidden" />
                <article class="bg-paper p-6 text-espresso sm:p-7">
                  <p class="flex flex-wrap items-baseline gap-x-3">
                    <span class="font-serif text-[56px] font-light leading-none">{{ bean.scaScore }}</span>
                    <span class="text-[16px]">punktów na karcie cuppingowej SCA. {{ bean.origin }}, {{ bean.processing.toLowerCase() }}, odmiana {{ bean.variety }}, {{ bean.altitude }}.</span>
                  </p>
                  <p class="mt-5 max-w-[52ch] text-[16px] leading-relaxed">{{ bean.description }}</p>
                  <dl class="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                    <div v-for="row in rows(bean)" :key="row.label">
                      <div class="flex justify-between text-[14px]">
                        <dt>{{ row.label }}</dt>
                        <dd class="tabular-nums">{{ row.value }}/10</dd>
                      </div>
                      <div class="mt-1 h-1.5 bg-espresso/15" aria-hidden="true">
                        <div class="h-full bg-espresso" :style="{ width: row.value * 10 + '%' }" />
                      </div>
                    </div>
                  </dl>
                  <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <p class="text-[16px]">W filiżance: {{ bean.tasting.join(', ') }}</p>
                    <NuxtLink to="/preorder" class="btn-dark !min-h-[44px]">Zamów ziarno</NuxtLink>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <NuxtLink to="/smaki" class="link-arrow mt-8">
        Dopasuj dokładniej na czterech suwakach
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.2" /></svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CoffeeBean, FlavorProfile } from '~/types'
import { BEANS } from '~/data/beans'

const presets: { id: string; label: string; profile: FlavorProfile }[] = [
  { id: 'czekolada', label: 'czekoladę', profile: { chocolate: 9, citrus: 2, ferment: 3, floral: 2 } },
  { id: 'owoc',      label: 'owoc',      profile: { chocolate: 6, citrus: 5, ferment: 9, floral: 4 } },
  { id: 'kwiaty',    label: 'kwiaty',    profile: { chocolate: 2, citrus: 7, ferment: 3, floral: 10 } },
]

const activeId = ref('4')
const preset = ref<string | null>(null)
const active = computed(() => BEANS.find(b => b.id === activeId.value) ?? BEANS[0])

// Hovering a row previews its photograph; clicking or focusing opens its card
const previewId = ref<string | null>(null)
const shown = computed(() => BEANS.find(b => b.id === previewId.value) ?? active.value)

function diff(b: CoffeeBean, p: FlavorProfile) {
  const f = b.flavorProfile
  return Math.abs(f.chocolate - p.chocolate) + Math.abs(f.citrus - p.citrus)
    + Math.abs(f.ferment - p.ferment) + Math.abs(f.floral - p.floral)
}

function matchFor(b: CoffeeBean) {
  const p = presets.find(x => x.id === preset.value)
  return p ? Math.round(100 - (diff(b, p.profile) / 40) * 100) : 0
}

function choose(id: string) {
  preset.value = preset.value === id ? null : id
  const p = presets.find(x => x.id === preset.value)
  if (p) activeId.value = [...BEANS].sort((a, b) => diff(a, p.profile) - diff(b, p.profile))[0].id
}

function rows(b: CoffeeBean) {
  return [
    { label: 'Czekolada', value: b.flavorProfile.chocolate },
    { label: 'Cytrus',    value: b.flavorProfile.citrus },
    { label: 'Ferment',   value: b.flavorProfile.ferment },
    { label: 'Kwiaty',    value: b.flavorProfile.floral },
  ]
}
</script>
