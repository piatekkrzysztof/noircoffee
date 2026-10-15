<template>
  <!-- Ink follows currentColor; the bean is always brass. Paths come from data/logo.ts (public/brand/*.svg). -->
  <svg
    v-if="variant === 'wordmark'"
    :viewBox="LOGO.wordmark.viewBox"
    class="block"
    role="img"
    :aria-label="label"
    :aria-hidden="decorative || undefined"
  >
    <path fill="currentColor" :d="LOGO.wordmark.ink" />
    <path fill="#C4963A" fill-rule="evenodd" :d="LOGO.wordmark.bean" />
  </svg>

  <svg
    v-else-if="variant === 'mark'"
    :viewBox="LOGO.mark.viewBox"
    class="block"
    role="img"
    :aria-label="label"
    :aria-hidden="decorative || undefined"
  >
    <path fill="#C4963A" fill-rule="evenodd" :d="LOGO.mark.shape" />
  </svg>

  <svg
    v-else
    :viewBox="LOGO.seal.viewBox"
    class="block"
    role="img"
    :aria-label="label"
    :aria-hidden="decorative || undefined"
  >
    <path fill="currentColor" :d="LOGO.seal.ink" />
    <path :fill="beanColor ?? '#C4963A'" fill-rule="evenodd" :d="LOGO.seal.bean" />
  </svg>
</template>

<script setup lang="ts">
import { LOGO } from '~/data/logo'

withDefaults(defineProps<{
  variant?: 'wordmark' | 'mark' | 'seal'
  label?: string
  decorative?: boolean
  beanColor?: string
}>(), {
  variant: 'wordmark',
  label: 'Noir',
  decorative: false,
})
</script>
