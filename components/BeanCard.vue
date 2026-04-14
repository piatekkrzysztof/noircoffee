<template>
  <div
    class="relative overflow-hidden cursor-none"
    style="background:#1a1009;border:1px solid rgba(196,150,58,.08);padding:22px;transition:border-color .3s,transform .3s,box-shadow .3s"
    @mouseenter="h=true" @mouseleave="h=false"
    :style="h?'border-color:rgba(196,150,58,.25);transform:translateX(4px);box-shadow:-4px 0 20px rgba(196,150,58,.05)':''"
  >
    <div class="absolute left-0 top-0 bottom-0 w-[2px] transition-transform duration-400" style="background:linear-gradient(to bottom,transparent,#C4963A,transparent);transform-origin:center" :style="{transform:h?'scaleY(1)':'scaleY(0)'}" />
    <div class="flex justify-between items-start mb-3.5">
      <div>
        <div class="font-serif font-light" style="font-size:20px;color:#EFD9BC">{{ bean.name }}</div>
        <div class="font-sans text-[8px] tracking-[3px] uppercase mt-1" style="color:#C4963A">{{ bean.origin }}</div>
      </div>
      <div class="text-right">
        <div class="font-serif font-light" style="font-size:28px;color:#C4963A;line-height:1">{{ bean.scaScore }}</div>
        <div class="font-sans font-extralight text-[10px] tracking-[1px]" style="color:#5a4935">SCA Score</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px 20px;margin-bottom:14px">
      <div v-for="[label,val] in bars" :key="String(label)" class="flex items-center gap-2">
        <span class="font-sans text-[9px] tracking-[1px]" style="color:#5a4935;width:48px">{{ label }}</span>
        <div style="flex:1;height:1px;background:rgba(46,33,24,.8);overflow:visible;position:relative">
          <div style="height:100%;background:linear-gradient(to right,#6b4e1a,#C4963A);transition:width .5s cubic-bezier(.23,1,.32,1);box-shadow:0 0 4px rgba(196,150,58,.3)" :style="{width:(Number(val)*10)+'%'}" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-1.5 mb-3">
      <span v-for="tag in bean.tasting" :key="tag" class="font-sans text-[8px] tracking-[1px] uppercase px-2 py-0.5" style="border:1px solid rgba(196,150,58,.2);color:#6b4e1a">{{ tag }}</span>
    </div>
    <p class="font-serif italic leading-relaxed pt-3" style="font-size:13px;color:#a8927a;border-top:1px solid rgba(196,150,58,.06)">{{ bean.description }}</p>
    <div class="flex justify-between items-center mt-4 pt-3" style="border-top:1px solid rgba(196,150,58,.06)">
      <span class="font-serif font-light" style="font-size:18px;color:#C4963A">{{ bean.price }} <small class="font-sans font-extralight text-[12px]" style="color:#5a4935">zł / 100g</small></span>
      <NuxtLink to="/preorder">
        <button class="font-sans text-[9px] tracking-[2px] uppercase px-4 py-2 relative overflow-hidden" style="border:1px solid rgba(196,150,58,.28);color:#C4963A;background:transparent;cursor:none">
          <span class="btn-fill-b" /><span class="relative z-10">Zamów</span>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CoffeeBean } from '~/types'
const props = defineProps<{ bean: CoffeeBean }>()
const h = ref(false)
const bars = computed(()=>[
  ['Czekolada', props.bean.flavorProfile.chocolate],
  ['Cytrus',    props.bean.flavorProfile.citrus],
  ['Ferment',   props.bean.flavorProfile.ferment],
  ['Floral',    props.bean.flavorProfile.floral],
])
</script>

<style scoped>
.btn-fill-b{position:absolute;inset:0;background:#C4963A;transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.23,1,.32,1)}
button:hover .btn-fill-b{transform:scaleX(1)}
button:hover span[class="relative z-10"]{color:#080503}
</style>
