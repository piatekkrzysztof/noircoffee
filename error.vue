<template>
  <div>
    <NoirNav />
    <main id="main" class="relative isolate flex min-h-[100dvh] items-center overflow-hidden">
      <div
        class="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-serif font-light leading-none text-brass/[0.06]"
        style="font-size:clamp(220px,48vw,680px)"
        aria-hidden="true"
      >
        {{ is404 ? '404' : error?.statusCode }}
      </div>
      <div class="shell py-32">
        <h1 class="t-1 max-w-[14ch]">
          {{ is404 ? 'Ta filiżanka' : 'Ekspres' }} <em class="italic text-brass">{{ is404 ? 'jest pusta' : 'odmówił współpracy' }}</em>
        </h1>
        <p class="lede mt-8">{{ is404 ? 'Strona nie istnieje. ' : '' }}
          {{ is404
            ? 'Adres mógł się zmienić albo nigdy nie istniał. Wróć na stronę główną albo sprawdź, która kawa pasuje do Ciebie.'
            : 'Nie udało się wczytać strony. Spróbuj ponownie za chwilę.' }}
        </p>
        <div class="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
          <button type="button" class="btn-primary" @click="clearError({ redirect: '/' })">Strona główna</button>
          <button type="button" class="link-arrow" @click="clearError({ redirect: '/smaki' })">Odkryj smaki</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)

useSeoMeta({ title: () => (is404.value ? 'Nie znaleziono · Noir Kraków' : 'Błąd · Noir Kraków') })
</script>
