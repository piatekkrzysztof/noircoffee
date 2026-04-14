<template>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;margin-top:64px">
    <div>
      <p class="font-serif leading-relaxed" style="font-size:15px;color:#a8927a;margin-bottom:40px">
        Przesuń suwaki, aby odkryć ziarno rezonujące z Twoim podniebieniem. Każda oś reprezentuje intensywność nuty sensorycznej w skali 0–10.
      </p>
      <div v-for="axis in axes" :key="axis.id" style="margin-bottom:32px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">
          <span class="font-sans font-normal text-[11px] tracking-[2px] uppercase" style="color:#EFD9BC">{{ axis.label }}</span>
          <span class="font-serif font-light" style="font-size:26px;color:#C4963A;line-height:1">{{ values[axis.id] }}</span>
        </div>
        <div style="position:relative;padding:10px 0">
          <div style="position:absolute;top:50%;left:0;right:0;height:1px;background:rgba(34,21,9,.9);transform:translateY(-50%)" />
          <div style="position:absolute;top:50%;left:0;height:1px;background:#C4963A;transform:translateY(-50%);transition:width .06s;box-shadow:0 0 6px rgba(196,150,58,.4)" :style="{width:(values[axis.id]*10)+'%'}" />
          <input type="range" min="0" max="10" step="1" :value="values[axis.id]" style="position:relative;z-index:2;width:100%;height:20px;background:transparent;-webkit-appearance:none;cursor:none" @input="onSlider(axis.id,+($event.target as HTMLInputElement).value)" />
        </div>
        <p class="font-serif italic" style="font-size:13px;color:#5a4935;margin-top:8px;line-height:1.5">{{ axis.note }}</p>
      </div>
      <div style="margin-top:28px;padding:14px 20px;border:1px solid rgba(196,150,58,.15);background:rgba(196,150,58,.03);position:relative;overflow:hidden;font-family:'Jost',sans-serif;font-size:10px;letter-spacing:2px;color:#a8927a">
        <div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:#C4963A" />
        Wyświetlam <span style="color:#C4963A;font-weight:400">{{ matched.length }}</span> ziaren pasujących do Twojego profilu
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <BeanCard v-for="bean in matched" :key="bean.id" :bean="bean" />
      <div v-if="matched.length===0" style="padding:40px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;color:#5a4935">
        Brak ziaren dla tego profilu.<br><em>Poszerz zakresy smaków.</em>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CoffeeBean } from '~/types'

const axes = [
  { id:'chocolate', label:'Czekolada', note:'Od mlecznej po gorzką — ciemna masa kakaowa, pralinki, trufle' },
  { id:'citrus',    label:'Cytrus',    note:'Limonka, bergamotka, yuzu — jasna i świeża kwasowość' },
  { id:'ferment',   label:'Ferment',   note:'Wino, kombucha, tropikalna złożoność — anaerobic processing' },
  { id:'floral',    label:'Floral',    note:'Jaśmin, hibiskus, róża — delikatne aromaty kwiatowe' },
] as const

const values = reactive<Record<string,number>>({ chocolate:5, citrus:5, ferment:5, floral:5 })
function onSlider(id:string, val:number){ values[id]=val }

const BEANS: CoffeeBean[] = [
  { id:'1', name:'Yirgacheffe Konga', origin:'Etiopia · Yirgacheffe', country:'Etiopia', region:'Yirgacheffe', altitude:'1900–2200m', processing:'Washed', variety:'Heirloom', roast:'Light', scaScore:92, price:89, inStock:true, flavorProfile:{chocolate:2,citrus:8,ferment:3,floral:9}, tasting:['jaśmin','bergamotka','biała herbata'], description:'Jasna, kwiatowa, jak wiosenne łąki. Bergamotka i biała herbata przeplatają się z nutą jaśminu.' },
  { id:'2', name:'Huila Natural', origin:'Kolumbia · Huila', country:'Kolumbia', region:'Huila', altitude:'1500–2000m', processing:'Natural', variety:'Caturra', roast:'Light-Medium', scaScore:90, price:79, inStock:true, flavorProfile:{chocolate:6,citrus:4,ferment:8,floral:4}, tasting:['ananas','passion fruit','śliwka'], description:'Tropikalne owoce, fermentacyjna złożoność. Ananas, passion fruit i ciemna śliwka.' },
  { id:'3', name:'Fazenda Santa Ines', origin:'Brazylia · Sul de Minas', country:'Brazylia', region:'Sul de Minas', altitude:'1100–1400m', processing:'Natural', variety:'Bourbon', roast:'Medium', scaScore:88, price:64, inStock:true, flavorProfile:{chocolate:9,citrus:2,ferment:4,floral:2}, tasting:['gorzka czekolada','laskowy orzech','trzcina'], description:'Gorzka czekolada, laskowe orzechy, trzcina cukrowa. Ciało jak aksamit.' },
  { id:'4', name:'Gesha Boji', origin:'Etiopia · Jimma', country:'Etiopia', region:'Jimma', altitude:'2000–2300m', processing:'Washed', variety:'Gesha', roast:'Light', scaScore:94, price:149, inStock:true, flavorProfile:{chocolate:3,citrus:6,ferment:5,floral:10}, tasting:['magnolia','fiołek','Earl Grey'], description:'Legendarny gesha. Magnolia, fiołek, herbata Earl Grey. Absolutna rzadkość.' },
  { id:'5', name:'Anaerobic Honey', origin:'Gwatemala · Huehuetenango', country:'Gwatemala', region:'Huehuetenango', altitude:'1800–2100m', processing:'Anaerobic Honey', variety:'Bourbon', roast:'Light-Medium', scaScore:91, price:94, inStock:true, flavorProfile:{chocolate:7,citrus:5,ferment:9,floral:5}, tasting:['wino','malina','kakao'], description:'Anaerobic honey. Wino musujące, czerwone owoce, delikatna kakao.' },
  { id:'6', name:'Washed Bourbon', origin:'Rwanda · Nyamasheke', country:'Rwanda', region:'Nyamasheke', altitude:'1700–2000m', processing:'Washed', variety:'Bourbon', roast:'Light', scaScore:89, price:74, inStock:true, flavorProfile:{chocolate:4,citrus:7,ferment:3,floral:7}, tasting:['porzeczka','hibiskus','rumianek'], description:'Czerwona porzeczka, hibiskus, herbata rumiankowa. Czysta i precyzyjna.' },
]

const matched = computed(()=>
  BEANS.map(b=>({...b, diff:Math.abs(b.flavorProfile.chocolate-values.chocolate)+Math.abs(b.flavorProfile.citrus-values.citrus)+Math.abs(b.flavorProfile.ferment-values.ferment)+Math.abs(b.flavorProfile.floral-values.floral)}))
    .filter(b=>b.diff<=12).sort((a,b)=>a.diff-b.diff)
)
</script>
