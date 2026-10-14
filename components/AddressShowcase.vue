<template>
  <!-- One frame, three distances: the doorway of a Floriańska townhouse, closer at every step -->
  <section ref="root" class="relative md:h-[190vh]" :class="{ 'is-armed': armed }" aria-labelledby="address-title">
    <div class="shell flex flex-col items-center justify-center py-28 md:sticky md:top-0 md:h-[100svh] md:py-0">
      <h2 id="address-title" class="sr-only">Każda kawa ma swój adres</h2>
      <p class="t-1 relative z-raised text-center" aria-hidden="true">Każda kawa</p>

      <div class="relative mt-4">
        <div class="aspect-[4/5] w-[70vw] overflow-hidden bg-surface md:w-[30vw] md:max-w-[460px]">
          <img
            src="/images/found/portal-37.jpg"
            alt="Kamienica przy ulicy Floriańskiej 37 w Krakowie: drewniane drzwi pod półkolistym oknem"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-700 ease-out"
            :style="{ transform: `scale(${stages[stage].scale})`, transformOrigin: stages[stage].origin }"
          />
        </div>

        <p
          class="caption absolute left-[calc(100%+48px)] top-0 hidden w-[28ch] text-[18px] leading-relaxed text-cream lg:block"
          :class="{ 'is-on': stage >= 2 }"
        >
          Na Floriańskiej każda kamienica ma numer i historię. Na każdym worku, który do nas trafia, jest nazwa farmy, wysokość uprawy i data zbioru. Kawy bez adresu nie kupujemy.
        </p>
      </div>

      <p
        class="t-1 half-2 relative z-raised mt-3 text-center"
        :class="{ 'is-on': stage >= 1 }"
        aria-hidden="true"
      >
        ma swój <em class="italic text-brass">adres</em>
      </p>

      <p class="mt-6 max-w-[34ch] text-center text-[18px] leading-relaxed text-cream lg:hidden">
        Na Floriańskiej każda kamienica ma numer i historię. Na każdym worku, który do nas trafia, jest nazwa farmy, wysokość uprawy i data zbioru. Kawy bez adresu nie kupujemy.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const stages = [
  { scale: 1,   origin: '50% 50%' },
  { scale: 1.8, origin: '50% 62%' }, // the door
  { scale: 3.2, origin: '50% 46%' }, // the fan window above it
]

const root = ref<HTMLElement | null>(null)
const stage = ref(0)
const armed = ref(false)
let frame = 0

// Stage follows how far the pinned section has been scrolled through
function update() {
  frame = 0
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  const travel = rect.height - window.innerHeight
  const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
  stage.value = progress < 0.25 ? 0 : progress < 0.7 ? 1 : 2
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  const desktop = window.matchMedia('(min-width: 768px)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Without the pinned stage (phone, reduced motion) the whole sentence and caption stay visible
  if (!desktop || reduced) {
    stage.value = desktop ? 0 : 1
    return
  }
  armed.value = true
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<style scoped>
/* Hidden parts only once the script has armed the stage, so nothing is lost without JS */
.is-armed .half-2,
.is-armed .caption {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-armed .half-2.is-on,
.is-armed .caption.is-on {
  opacity: 1;
  transform: none;
}
</style>
