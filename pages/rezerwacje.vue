<template>
  <!-- HERO -->
  <div class="relative overflow-hidden flex items-end" style="height:42vh;min-height:280px;padding:40px 48px">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image:url('/images/pour.jpg');filter:brightness(.38)" />
    <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(28,19,13,1) 0%,rgba(28,19,13,.2) 100%)" />
    <div class="relative z-10">
      <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">/ Rezerwacje</div>
      <h1 class="font-serif font-light text-cream" style="font-size:clamp(32px,5vw,64px)">
        Zarezerwuj <em class="italic text-brass">swój rytuał</em>
      </h1>
    </div>
  </div>

  <section class="px-12 py-20" style="background:#1c130d">
    <div class="grid gap-16" style="grid-template-columns:1fr 1fr">
      <div>
        <p class="font-serif text-[15px] text-cream-dim leading-[1.85] mb-7">
          Noir oferuje prywatne przestrzenie dla osób poszukujących skupienia.
          Zarezerwuj stolik w salonie degustacyjnym, gabinecie szachowym lub loży przy palenisku.
        </p>

        <div class="flex flex-col gap-3.5 mb-8">
          <div v-for="feat in features" :key="feat" class="flex gap-3.5 items-start">
            <div class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style="background:#C4963A" />
            <p class="font-sans text-[12px] text-cream-dim leading-relaxed">{{ feat }}</p>
          </div>
        </div>

        <div class="p-6 mb-8" style="border:1px solid rgba(196,150,58,.15);background:rgba(196,150,58,.03)">
          <div class="font-sans font-extralight text-[9px] tracking-[4px] uppercase text-brass mb-2">Godziny otwarcia</div>
          <p class="font-serif text-[15px] text-cream-dim leading-loose">
            Pon–Pt: 8:00–21:00<br>Sob–Nd: 9:00–22:00
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div v-for="space in spaces" :key="space.name" class="p-4" style="border:1px solid rgba(196,150,58,.12);background:#130c08">
            <div class="font-sans text-[9px] tracking-[2px] uppercase text-brass mb-1">{{ space.capacity }}</div>
            <div class="font-serif text-[14px] font-light text-cream">{{ space.name }}</div>
          </div>
        </div>
      </div>
      <div><ReservationForm /></div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rezerwacje · Noir Kraków',
  description: 'Zarezerwuj stolik w Noir — atelier sensorycznym w Krakowie.',
})

const features = [
  'Cupping menu — przewodnik po profilu sensorycznym wybranego origin',
  'Brewing masterclass dla grup do 6 osób',
  'Dedykowany kawer oprowadza przez świat micro-lotów',
  'Preorder wybranego ziarna z odbiorem lub dostawą',
]

const spaces = [
  { name: 'Salon Degustacyjny',  capacity: 'do 6 osób' },
  { name: 'Gabinet Szachowy',    capacity: 'do 4 osób' },
  { name: 'Loża przy Palenisku', capacity: 'do 8 osób' },
  { name: 'Bar Barista',         capacity: 'do 2 osób' },
]
</script>
