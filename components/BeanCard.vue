<template>
  <!-- The best match is set as a paper cupping card; the rest sit on the dark surface -->
  <article
    v-reveal
    class="group grid gap-6 p-5 transition-colors duration-300 sm:grid-cols-[180px_1fr] sm:p-6"
    :class="best ? 'bg-paper text-espresso' : 'bg-surface text-cream hover:bg-surface2'"
  >
    <div class="aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
      <img
        :src="bean.imageUrl"
        :alt="bean.imageAlt"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>

    <div class="flex flex-col">
      <div class="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <h3 class="t-2">{{ bean.name }}</h3>
        <p class="text-right">
          <span class="font-serif text-[44px] font-light leading-none tabular-nums">{{ match }}%</span>
          <span class="block text-[14px]">{{ best ? 'najlepsze dopasowanie' : 'dopasowania' }}</span>
        </p>
      </div>

      <p class="mt-1 text-[16px]" :class="best ? '' : 'text-cream-dim'">
        {{ bean.origin }}, {{ bean.processing.toLowerCase() }}, odmiana {{ bean.variety }}, {{ bean.altitude }}. {{ bean.scaScore }} punktów SCA.
      </p>

      <p class="mt-4 max-w-[60ch] text-[16px] leading-relaxed">{{ bean.description }}</p>

      <dl class="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        <div v-for="row in flavorRows" :key="row.label">
          <div class="flex justify-between text-[14px]">
            <dt>{{ row.label }}</dt>
            <dd class="tabular-nums">{{ row.value }}/10</dd>
          </div>
          <div class="mt-1 h-1.5" :class="best ? 'bg-espresso/15' : 'bg-surface3'" aria-hidden="true">
            <div class="h-full transition-[width] duration-500 ease-out" :class="best ? 'bg-espresso' : 'bg-brass'" :style="{ width: (row.value * 10) + '%' }" />
          </div>
        </div>
      </dl>

      <div class="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
        <p class="text-[16px]">W filiżance: {{ bean.tasting.join(', ') }}</p>
        <div class="flex items-center gap-5">
          <span class="text-[18px] font-medium">{{ bean.price }} zł za 100 g</span>
          <NuxtLink to="/preorder" :class="best ? 'btn-dark' : 'btn-primary'" class="!min-h-[44px]" :aria-label="`Zamów ${bean.name}`">
            Zamów
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CoffeeBean } from '~/types'

const props = defineProps<{ bean: CoffeeBean; match: number; best?: boolean }>()

const flavorRows = computed(() => [
  { label: 'Czekolada', value: props.bean.flavorProfile.chocolate },
  { label: 'Cytrus',    value: props.bean.flavorProfile.citrus },
  { label: 'Ferment',   value: props.bean.flavorProfile.ferment },
  { label: 'Kwiaty',    value: props.bean.flavorProfile.floral },
])
</script>
