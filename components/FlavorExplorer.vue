<template>
  <div class="grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
    <!-- Controls -->
    <div class="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
      <div v-reveal class="bg-surface p-6 sm:p-8">
        <div class="flex items-center justify-between">
          <h2 class="t-2">Twój profil</h2>
          <button type="button" class="min-h-[44px] px-2 text-[16px] text-cream-dim transition-colors hover:text-brass-light" @click="reset">
            Wyzeruj
          </button>
        </div>

        <div class="mx-auto mt-2 max-w-[320px]">
          <FlavorRadar :values="values" :compare="best?.flavorProfile" :axes="axes" />
        </div>

        <div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Gotowe profile">
          <button
            v-for="p in presets"
            :key="p.label"
            type="button"
            class="chip"
            :aria-pressed="isPreset(p)"
            @click="applyPreset(p)"
          >
            {{ p.label }}
          </button>
        </div>

        <div class="mt-8 flex flex-col gap-6">
          <div v-for="axis in axes" :key="axis.id">
            <div class="flex items-baseline justify-between">
              <label :for="`axis-${axis.id}`" class="text-[16px] font-medium text-cream">{{ axis.label }}</label>
              <span class="text-[16px] tabular-nums text-brass-light">{{ values[axis.id] }} z 10</span>
            </div>
            <div class="relative">
              <div class="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 bg-surface3" aria-hidden="true" />
              <div
                class="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 bg-brass"
                :style="{ width: (values[axis.id] * 10) + '%' }"
                aria-hidden="true"
              />
              <input
                :id="`axis-${axis.id}`"
                v-model.number="values[axis.id]"
                type="range"
                min="0"
                max="10"
                step="1"
                :aria-describedby="`axis-${axis.id}-note`"
              />
            </div>
            <p :id="`axis-${axis.id}-note`" class="text-[14px] leading-relaxed text-cream-dim">{{ axis.note }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div>
      <p v-reveal="80" class="t-2 mb-8" aria-live="polite">
        {{ matched.length }} {{ beanWord }} pasuje do Twojego profilu
      </p>

      <TransitionGroup tag="div" name="list" class="relative flex flex-col gap-10">
        <BeanCard
          v-for="(bean, i) in matched"
          :key="bean.id"
          :bean="bean"
          :match="matchPercent(bean.diff)"
          :best="i === 0"
        />
      </TransitionGroup>

      <div v-if="matched.length === 0" class="bg-surface px-8 py-16 text-center">
        <p class="t-2">Żadne ziarno nie trafia w ten profil.</p>
        <p class="mx-auto mt-3 max-w-[40ch] text-[16px] leading-relaxed text-cream-dim">
          Skrajne wartości na wszystkich osiach naraz rzadko idą w parze. Złagodź jedną z nut albo zacznij od gotowego profilu.
        </p>
        <button type="button" class="btn-primary mt-8" @click="reset">Wróć do profilu wyważonego</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlavorProfile } from '~/types'
import { BEANS } from '~/data/beans'

const axes = [
  { id: 'chocolate', label: 'Czekolada', note: 'Od mlecznej po gorzką: masa kakaowa, pralinki, trufle.' },
  { id: 'citrus',    label: 'Cytrus',    note: 'Limonka, bergamotka, yuzu. Jasna, świeża kwasowość.' },
  { id: 'ferment',   label: 'Ferment',   note: 'Wino, kombucha, tropiki. Efekt obróbki anaerobic.' },
  { id: 'floral',    label: 'Kwiaty',    note: 'Jaśmin, hibiskus, róża. Delikatne aromaty kwiatowe.' },
] as const

const presets: { label: string; profile: FlavorProfile }[] = [
  { label: 'Czekoladowo', profile: { chocolate: 9, citrus: 2, ferment: 3, floral: 2 } },
  { label: 'Owocowo',     profile: { chocolate: 6, citrus: 5, ferment: 9, floral: 4 } },
  { label: 'Kwiatowo',    profile: { chocolate: 2, citrus: 7, ferment: 3, floral: 9 } },
]

const { values, matched } = useFlavorFilter(BEANS)

const best = computed(() => matched.value[0])

const beanWord = computed(() => {
  const n = matched.value.length
  if (n === 1) return 'ziarno'
  if (n >= 2 && n <= 4) return 'ziarna'
  return 'ziaren'
})

// diff ranges 0..40 (4 axes x 10)
function matchPercent(diff: number) {
  return Math.round(100 - (diff / 40) * 100)
}

function applyPreset(p: { profile: FlavorProfile }) {
  Object.assign(values, p.profile)
}

function isPreset(p: { profile: FlavorProfile }) {
  return (Object.keys(p.profile) as (keyof FlavorProfile)[]).every(k => values[k] === p.profile[k])
}

function reset() {
  Object.assign(values, { chocolate: 5, citrus: 5, ferment: 5, floral: 5 })
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.list-leave-active {
  position: absolute;
  inset-inline: 0;
}
</style>
