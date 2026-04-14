<template>
  <div class="group overflow-hidden cursor-none" style="background:#110b06;position:relative" @mouseenter="h=true" @mouseleave="h=false">
    <div style="height:240px;overflow:hidden;position:relative">
      <img
        v-if="origin.imageUrl" :src="origin.imageUrl" :alt="origin.country"
        class="w-full h-full object-cover block"
        style="transition:transform .7s cubic-bezier(.23,1,.32,1),filter .4s"
        :style="h?'transform:scale(1.06);filter:brightness(.82) saturate(.92)':'transform:scale(1);filter:brightness(.65) saturate(.72)'"
        onerror="this.parentElement.style.background='#1a1009'"
      />
      <div v-else style="width:100%;height:100%;background:#1a1009" />
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(17,11,6,.9) 0%,transparent 50%)" />
    </div>
    <div style="padding:28px;position:relative">
      <div class="absolute font-serif font-light select-none" style="font-size:72px;line-height:1;color:rgba(196,150,58,.06);top:12px;right:20px;pointer-events:none">{{ origin.id }}</div>
      <div class="font-sans text-[8px] tracking-[4px] uppercase mb-2.5" style="color:#C4963A">{{ origin.country }} — {{ origin.region }}</div>
      <h3 class="font-serif font-light mb-2.5" style="font-size:22px;color:#EFD9BC;line-height:1.2">{{ origin.title }}</h3>
      <p class="font-serif font-light leading-relaxed" style="font-size:14px;color:#a8927a">{{ origin.body }}</p>
      <div class="flex gap-7 mt-5 pt-5" style="border-top:1px solid rgba(196,150,58,.08)">
        <div>
          <small class="block font-sans text-[8px] tracking-[2px] uppercase mb-1" style="color:#5a4935">Wysokość</small>
          <strong class="font-serif font-light" style="font-size:17px;color:#C4963A">{{ origin.altitude }}</strong>
        </div>
        <div>
          <small class="block font-sans text-[8px] tracking-[2px] uppercase mb-1" style="color:#5a4935">Przetwarzanie</small>
          <strong class="font-serif font-light" style="font-size:17px;color:#C4963A">{{ origin.processing }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OriginStory } from '~/types'
defineProps<{ origin: OriginStory }>()
const h = ref(false)
</script>
