<template>
  <section class="px-12 py-20" style="background:#130c08;padding-top:108px">
    <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">/ Odkryj smaki</div>
    <h1 class="font-serif font-light text-cream" style="font-size:clamp(32px,4.5vw,56px)">
      Znajdź swój<br><em class="italic text-brass">profil smakowy</em>
    </h1>
    <div class="w-14 h-px my-7" style="background:#8a6924" />
    <FlavorExplorer />
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Odkryj smaki · Noir Kraków',
  description: 'Odkryj swój profil smakowy i znajdź idealne ziarno kawy.',
})
</script>
