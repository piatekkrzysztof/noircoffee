<template>
  <div>
    <PageIntro>
      <template #title>
        Kawa pod <em class="italic text-brass">Twój smak</em>
      </template>
      <template #lede>
        Przesuń cztery suwaki tak, jak lubisz pić kawę: więcej czekolady, mniej kwasowości, odrobina kwiatów. Pokażemy, które z sześciu kaw na barze trafiają najbliżej i w ilu procentach.
      </template>
    </PageIntro>

    <section class="shell pb-32">
      <FlavorExplorer />
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Odkryj smaki · Noir Kraków',
  description: 'Przesuń cztery suwaki i zobacz, która z sześciu kaw z baru przy Floriańskiej pasuje do Twojego smaku.',
})
</script>
