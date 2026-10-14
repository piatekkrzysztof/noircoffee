<template>
  <div>
    <PageIntro>
      <template #title>
        Znajdź swój<br><em class="italic text-brass">profil smakowy</em>
      </template>
      <template #lede>
        Ustaw cztery suwaki tak, jak lubisz pić kawę. Pokażemy micro-loty z baru przy Floriańskiej, które najbliżej trafiają w Twój profil. Przerywana linia na wykresie to najlepsze z nich.
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
  description: 'Odkryj swój profil smakowy i znajdź idealne ziarno kawy.',
})
</script>
