<template>
  <header class="pt-[calc(var(--nav-h)+72px)] md:pt-[calc(var(--nav-h)+112px)]">
    <div class="shell grid gap-8 pb-14 md:pb-20 lg:grid-cols-12 lg:items-end lg:gap-6">
      <h1 class="t-1 fade-up lg:col-span-7">
        <slot name="title" />
      </h1>
      <div class="lg:col-span-4 lg:col-start-9">
        <p v-if="$slots.lede" class="lede fade-up fade-up-delay-1">
          <slot name="lede" />
        </p>
        <div v-if="$slots.action" class="mt-6 fade-up fade-up-delay-2">
          <slot name="action" />
        </div>
      </div>
    </div>

    <div v-if="image" class="h-[38svh] overflow-hidden md:h-[52svh]">
      <img :src="image" :alt="imageAlt" class="drift h-full w-full object-cover" :style="{ objectPosition: focus ?? 'center' }" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ image?: string; imageAlt?: string; focus?: string }>()
</script>
