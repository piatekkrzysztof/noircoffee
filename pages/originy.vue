<template>
  <section class="px-12 py-20" style="background:#130c08;padding-top:108px">
    <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">/ Origin Stories</div>
    <h1 class="font-serif font-light text-cream" style="font-size:clamp(32px,4.5vw,56px)">
      Skąd pochodzi<br><em class="italic text-brass">Twoja kawa</em>
    </h1>
    <div class="w-14 h-px my-7" style="background:#8a6924" />

    <div class="grid gap-px" style="grid-template-columns:1fr 1fr;background:rgba(196,150,58,.1)">
      <!-- Nuxt Content: reads from content/origins/*.md -->
      <ContentList path="/origins" v-slot="{ list }">
        <OriginCard
          v-for="origin in list"
          :key="origin._path"
          :origin="{
            id: origin._path,
            slug: origin._path,
            country: origin.country,
            region: origin.region,
            title: origin.title,
            body: origin.description,
            altitude: origin.altitude,
            processing: origin.processing,
            imageUrl: origin.imageUrl,
          }"
        />
      </ContentList>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Originy · Noir Kraków',
  description: 'Poznaj historię i terroir każdego micro-lotu z Noir Coffee Atelier.',
})
</script>
