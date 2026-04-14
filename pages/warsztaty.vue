<template>
  <section class="px-12 py-20" style="background:#0b0704;padding-top:108px">
    <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">/ Warsztaty & Degustacje</div>
    <h1 class="font-serif font-light text-cream" style="font-size:clamp(32px,4.5vw,56px)">
      Kalendarium <em class="italic text-brass">sensoryczne</em>
    </h1>
    <div class="w-14 h-px my-7" style="background:#8a6924" />

    <!-- Filtry -->
    <div class="flex gap-3 mb-10 flex-wrap">
      <button
        v-for="tag in ['Wszystkie', ...tags]" :key="tag"
        class="font-sans text-[9px] tracking-[2px] uppercase px-4 py-2 transition-all duration-200 cursor-pointer"
        :style="activeTag === tag
          ? 'background:#C4963A;color:#0b0704;border:1px solid #C4963A'
          : 'background:transparent;color:#b8a48e;border:1px solid rgba(196,150,58,.25)'"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div class="grid gap-px" style="grid-template-columns:repeat(3,1fr);background:rgba(196,150,58,.1)">
      <EventCard v-for="ev in filteredEvents" :key="ev.id" :event="ev" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

useSeoMeta({
  title: 'Warsztaty · Noir Kraków',
  description: 'Warsztaty cuppingowe, brewing masterclassy i degustacje w Krakowie.',
})

const tags = ['Cupping', 'Masterclass', 'Warsztat', 'Wykład', 'Prywatny']
const activeTag = ref('Wszystkie')

const allEvents: Event[] = [
  { id:'1', title:'Wulkan & Aromat: Kawa z Etiopii',     tag:'Cupping',    date:'2025-05-14', startTime:'14:00', endTime:'17:00', price:220, spotsTotal:8,  spotsLeft:3, description:'Immersyjne spotkanie z etiopską kawą — od mapy po filiżankę.' },
  { id:'2', title:'Brewing Methods Deep Dive',            tag:'Masterclass', date:'2025-05-21', startTime:'18:00', endTime:'21:00', price:280, spotsTotal:10, spotsLeft:5, description:'V60, Chemex, AeroPress — pełna analiza metod parzenia.' },
  { id:'3', title:'Kolumbia vs Rwanda: Blind Cupping',   tag:'Prywatny',    date:'2025-05-28', startTime:'19:00', endTime:'22:00', price:350, spotsTotal:6,  spotsLeft:1, description:'Cztery ziarna, dwa kontynenty, zero podpowiedzi.' },
  { id:'4', title:'Fermentation Lab — Anaerobic',        tag:'Warsztat',    date:'2025-06-04', startTime:'17:00', endTime:'20:00', price:240, spotsTotal:12, spotsLeft:7, description:'Nauka o fermentacji beztlenowej i jej wpływie na smak.' },
  { id:'5', title:'Gesha Vertical Tasting',              tag:'Cupping',    date:'2025-06-11', startTime:'15:00', endTime:'18:00', price:390, spotsTotal:8,  spotsLeft:2, description:'Trzy roczniki Geshy z Etiopii — rzadkość absolutna.' },
  { id:'6', title:'Terroir a smak: nauka o origin',      tag:'Wykład',     date:'2025-06-18', startTime:'18:30', endTime:'20:30', price:180, spotsTotal:20, spotsLeft:9, description:'Jak gleba, klimat i odmiana kształtują profil smakowy kawy.' },
]

const filteredEvents = computed(() =>
  activeTag.value === 'Wszystkie' ? allEvents : allEvents.filter(e => e.tag === activeTag.value)
)
</script>
