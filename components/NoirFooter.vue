<template>
  <footer
    class="flex flex-wrap justify-between items-center gap-5 px-12 py-10"
    style="background:#0b0704; border-top:1px solid rgba(196,150,58,.1)"
  >
    <div class="font-serif font-light text-base tracking-[3px] uppercase text-brass">Noir · Kraków</div>
    <div class="flex gap-7">
      <NuxtLink v-for="l in links" :key="l.to" :to="l.to"
        class="font-sans text-[9px] tracking-[2px] uppercase text-cream-faint no-underline transition-colors hover:text-brass"
        style="text-decoration:none">
        {{ l.label }}
      </NuxtLink>
    </div>
    <div class="font-sans text-[10px] tracking-[2px] text-cream-faint">
      ul. Floriańska 28, Kraków · +48 12 000 0000
    </div>
  </footer>
</template>

<script setup lang="ts">
const links = [
  { to: '/',            label: 'Główna' },
  { to: '/smaki',       label: 'Odkryj smaki' },
  { to: '/warsztaty',   label: 'Warsztaty' },
  { to: '/rezerwacje',  label: 'Kontakt' },
]
</script>
