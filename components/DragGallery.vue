<template>
  <section aria-labelledby="gallery-title">
    <div class="shell flex items-baseline justify-between gap-6">
      <h2 id="gallery-title" class="t-2">Wokół Floriańskiej</h2>
      <p class="text-[16px] text-cream-dim">6 zdjęć i film, przeciągnij w bok</p>
    </div>

    <div
      ref="row"
      class="row mt-8 flex h-[62svh] gap-2 overflow-x-auto pl-5 pr-5 md:h-[68svh] md:gap-3 md:pl-[6vw]"
      :class="{ 'cursor-grabbing': dragging, 'cursor-grab': !dragging }"
      tabindex="0"
      aria-label="Galeria zdjęć, przewijana w poziomie"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
      @pointerleave="onUp"
    >
      <!-- tall -->
      <figure class="module aspect-[3/4] h-full">
        <img src="/images/found/brama-noc.jpg" alt="Brama Floriańska nocą, oświetlona baszta na końcu ulicy" loading="lazy" draggable="false" class="h-full w-full object-cover" />
      </figure>

      <!-- stacked pair -->
      <div class="module flex h-full w-[64vw] flex-col gap-2 md:w-[calc(68svh*4/3/2)] md:gap-3">
        <img src="/images/found/portal-3.jpg" alt="Renesansowy portal kamienicy przy Floriańskiej 3" loading="lazy" draggable="false" class="min-h-0 w-full flex-1 object-cover" />
        <img src="/images/found/portal-39.jpg" alt="Wejście do kamienicy przy Floriańskiej 39" loading="lazy" draggable="false" class="min-h-0 w-full flex-1 object-cover object-bottom" />
      </div>

      <!-- wide: the moving picture -->
      <figure class="module aspect-[16/10] h-full">
        <video
          ref="video"
          class="h-full w-full object-cover"
          src="/images/found/palarnia.webm"
          poster="/images/found/palarnia-poster.jpg"
          muted
          loop
          playsinline
          preload="none"
          aria-label="Świeżo palone ziarna mieszane w bębnie chłodzącym palarni"
        />
      </figure>

      <!-- tall -->
      <figure class="module aspect-[3/4] h-full">
        <img src="/images/found/florianska-mariacki.jpg" alt="Ulica Floriańska z widokiem na wieże Kościoła Mariackiego" loading="lazy" draggable="false" class="h-full w-full object-cover" />
      </figure>

      <!-- tall -->
      <figure class="module aspect-[3/4] h-full">
        <img src="/images/pour.jpg" alt="Mleko wlewane do filiżanki czarnej kawy" loading="lazy" draggable="false" class="h-full w-full object-cover" />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
const row = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const dragging = ref(false)
let startX = 0
let startScroll = 0
let observer: IntersectionObserver | null = null

function onDown(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !row.value) return
  dragging.value = true
  startX = e.clientX
  startScroll = row.value.scrollLeft
}

function onMove(e: PointerEvent) {
  if (!dragging.value || !row.value) return
  row.value.scrollLeft = startScroll - (e.clientX - startX)
}

function onUp() {
  dragging.value = false
}

onMounted(() => {
  // The loop plays only while it is on screen, and never with reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !video.value) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) video.value?.play().catch(() => {})
    else video.value?.pause()
  }, { threshold: 0.3 })
  observer.observe(video.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.row {
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  user-select: none;
}

.row::-webkit-scrollbar {
  display: none;
}

.module {
  flex: none;
  margin: 0;
  scroll-snap-align: start;
  overflow: hidden;
  background: #1a120c;
}

.module img,
.module video {
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.module:hover img,
.module:hover video {
  transform: scale(1.03);
}

@media (max-width: 767px) {
  .module.aspect-\[3\/4\] { width: 72vw; height: auto; align-self: stretch; aspect-ratio: auto; }
  .module.aspect-\[16\/10\] { width: 88vw; height: 60%; align-self: center; aspect-ratio: auto; }
}
</style>
