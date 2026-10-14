<template>
  <svg :viewBox="`${-padX} 0 ${size + padX * 2} ${size}`" class="h-auto w-full" role="img" :aria-label="label">
    <!-- rings -->
    <polygon
      v-for="r in [0.25, 0.5, 0.75, 1]"
      :key="r"
      :points="ring(r)"
      fill="none"
      stroke="rgba(196,150,58,.14)"
      stroke-width="1"
    />
    <!-- spokes -->
    <line
      v-for="(a, i) in angles"
      :key="`s${i}`"
      :x1="c" :y1="c"
      :x2="c + Math.cos(a) * radius" :y2="c + Math.sin(a) * radius"
      stroke="rgba(196,150,58,.14)"
      stroke-width="1"
    />

    <!-- comparison (best match) -->
    <polygon
      v-if="compare"
      :points="shape(compare)"
      fill="none"
      stroke="#F0E0C8"
      stroke-opacity=".55"
      stroke-width="1"
      stroke-dasharray="3 4"
    />

    <!-- user profile -->
    <polygon
      :points="shape(values)"
      fill="rgba(196,150,58,.18)"
      stroke="#C4963A"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <circle
      v-for="(p, i) in points(values)"
      :key="`p${i}`"
      :cx="p[0]" :cy="p[1]" r="3.5"
      fill="#C4963A"
    />

    <!-- labels -->
    <text
      v-for="(axis, i) in axes"
      :key="axis.id"
      :x="c + Math.cos(angles[i]) * (radius + 22)"
      :y="c + Math.sin(angles[i]) * (radius + 22) + 4"
      :text-anchor="anchor(i)"
      class="fill-cream-dim text-[14px]"
    >
      {{ axis.label }}
    </text>
  </svg>
</template>

<script setup lang="ts">
import type { FlavorProfile } from '~/types'

const props = defineProps<{
  values: FlavorProfile
  compare?: FlavorProfile
  axes: readonly { id: keyof FlavorProfile; label: string }[]
}>()

const size = 320
const padX = 48 // room for the side labels
const c = size / 2
const radius = 108
const angles = computed(() => props.axes.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / props.axes.length))

const label = computed(() =>
  'Twój profil: ' + props.axes.map(a => `${a.label} ${props.values[a.id]}`).join(', '),
)

function points(v: FlavorProfile) {
  return props.axes.map((axis, i) => {
    const r = (v[axis.id] / 10) * radius
    return [c + Math.cos(angles.value[i]) * r, c + Math.sin(angles.value[i]) * r]
  })
}

function shape(v: FlavorProfile) {
  return points(v).map(p => p.join(',')).join(' ')
}

function ring(scale: number) {
  return angles.value.map(a => `${c + Math.cos(a) * radius * scale},${c + Math.sin(a) * radius * scale}`).join(' ')
}

function anchor(i: number) {
  const x = Math.cos(angles.value[i])
  if (Math.abs(x) < 0.1) return 'middle'
  return x > 0 ? 'start' : 'end'
}
</script>
