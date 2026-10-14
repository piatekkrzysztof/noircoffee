<template>
  <article v-reveal class="group grid gap-5 bg-surface p-6 transition-colors duration-300 hover:bg-surface2 lg:grid-cols-[110px_1fr_200px_auto] lg:items-center lg:gap-8 md:p-8">
    <!-- Date -->
    <p class="flex items-baseline gap-3 lg:block">
      <span class="font-serif text-[56px] font-light leading-none text-brass-light">{{ Number(date.day) }}</span>
      <span class="text-[16px] text-cream-dim lg:mt-1 lg:block">{{ date.month }}, {{ date.weekday }}</span>
    </p>

    <!-- Title -->
    <div>
      <h3 class="t-2 transition-colors duration-300 group-hover:text-brass-light">{{ event.title }}</h3>
      <p class="mt-2 text-[16px] text-cream-dim">{{ event.tag }}, {{ event.startTime }}–{{ event.endTime }}<template v-if="event.instructor">, prowadzi {{ event.instructor }}</template></p>
      <p v-if="event.description" class="mt-2 max-w-[56ch] text-[16px] leading-relaxed text-cream">
        {{ event.description }}
      </p>
    </div>

    <!-- Spots -->
    <div>
      <p class="mb-2 text-[16px]" :class="low ? 'font-medium text-brass-light' : 'text-cream-dim'">{{ spotsLabel }}</p>
      <div class="flex gap-[3px]" aria-hidden="true">
        <span
          v-for="n in event.spotsTotal"
          :key="n"
          class="h-1.5 flex-1"
          :class="n <= event.spotsTotal - event.spotsLeft ? 'bg-surface3' : 'bg-brass'"
        />
      </div>
    </div>

    <!-- CTA -->
    <div class="flex items-center justify-between gap-6 lg:flex-col lg:items-end lg:gap-3">
      <span class="t-2 leading-none">{{ event.price }} zł</span>
      <NuxtLink
        :to="{ path: '/rezerwacje', query: { warsztat: event.id } }"
        class="btn-primary !min-h-[44px]"
        :aria-label="`Zapisz się: ${event.title}`"
      >
        Zapisz się
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

const props = defineProps<{ event: Event }>()

const date = computed(() => formatEventDate(props.event.date))
const low = computed(() => props.event.spotsLeft <= 2)
const spotsLabel = computed(() => {
  const { spotsLeft: n, spotsTotal: t } = props.event
  if (n === 1) return 'Zostało ostatnie miejsce'
  return `${n} z ${t} miejsc wolnych`
})
</script>
