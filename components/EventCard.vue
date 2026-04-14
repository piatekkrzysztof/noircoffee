<template>
  <div
    class="group relative overflow-hidden cursor-none"
    style="background:#080503;padding:28px;transition:background .3s"
    @mouseenter="h=true" @mouseleave="h=false"
    :style="h?'background:#110b06':''"
  >
    <div class="absolute inset-0 transition-opacity duration-300" style="background:linear-gradient(135deg,rgba(196,150,58,.04) 0%,transparent 60%)" :style="{opacity:h?1:0}" />
    <div class="font-serif font-light" style="font-size:42px;color:#C4963A;line-height:1;margin-bottom:2px">{{ day }}</div>
    <div class="font-sans font-extralight text-[8px] tracking-[4px] uppercase" style="color:#5a4935;margin-bottom:20px">{{ monthYear }}</div>
    <div class="inline-block font-sans text-[8px] tracking-[2px] uppercase px-2 py-1 mb-3" style="border:1px solid rgba(196,150,58,.28);color:#C4963A">{{ event.tag }}</div>
    <div class="font-serif font-light leading-tight mb-2.5" style="font-size:18px;color:#EFD9BC">{{ event.title }}</div>
    <div class="font-sans text-[11px] leading-relaxed" style="color:#5a4935">{{ event.startTime }}–{{ event.endTime }}<br>{{ event.price }} zł / os.</div>
    <div class="flex justify-between items-center mt-4 pt-4 relative z-10" style="border-top:1px solid rgba(196,150,58,.08)">
      <span class="font-sans text-[9px] tracking-[1px] uppercase" style="color:#5a4935">
        Miejsca: <span style="color:#C4963A;font-weight:400">{{ event.spotsLeft }}/{{ event.spotsTotal }}</span>
      </span>
      <NuxtLink to="/rezerwacje">
        <button class="font-sans text-[8px] tracking-[2px] uppercase px-3.5 py-2 relative overflow-hidden" style="background:transparent;border:1px solid rgba(196,150,58,.28);color:#C4963A;cursor:none">
          <span class="btn-fill-ev" />
          <span class="relative z-10">Zapisz się</span>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types'
const props = defineProps<{ event: Event }>()
const h = ref(false)
const day = computed(() => new Date(props.event.date).getDate().toString().padStart(2,'0'))
const monthYear = computed(() => new Date(props.event.date).toLocaleDateString('pl-PL',{month:'short',year:'numeric'}).toUpperCase())
</script>

<style scoped>
.btn-fill-ev{position:absolute;inset:0;background:#C4963A;transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.23,1,.32,1)}
button:hover .btn-fill-ev{transform:scaleX(1)}
button:hover span[class="relative z-10"]{color:#080503}
</style>
