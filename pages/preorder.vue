<template>
  <section class="px-12 py-20" style="background:#241a12;padding-top:108px">
    <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">/ Preorder & Odbiór</div>
    <h1 class="font-serif font-light text-cream" style="font-size:clamp(32px,4.5vw,56px)">
      Zamów <em class="italic text-brass">swój micro-lot</em>
    </h1>
    <div class="w-14 h-px my-7" style="background:#8a6924" />
    <p class="font-serif text-[15px] text-cream-dim leading-relaxed mb-12 max-w-md">
      Wybierz paczkę, odbierz osobiście lub zamów dostawę.
      Każda zawiera kartę sensoryczną i brewing guide.
    </p>

    <div class="grid gap-5" style="grid-template-columns:repeat(3,1fr)">
      <div
        v-for="(pkg, i) in packages" :key="pkg.id"
        class="relative p-7 transition-all duration-250 cursor-pointer"
        :style="`background:#130c08; border:${selectedPkg===i ? '2px solid #C4963A' : '1px solid rgba(196,150,58,.12)'}; transform:${selectedPkg===i ? 'translateY(-4px)' : 'none'}`"
        @click="selectedPkg = i"
      >
        <div v-if="pkg.badge"
          class="absolute top-0 right-5 font-sans text-[8px] tracking-[2px] uppercase px-3 py-1"
          style="background:#C4963A;color:#0b0704;transform:translateY(-50%)">
          {{ pkg.badge }}
        </div>
        <div class="font-sans text-[8px] tracking-[3px] uppercase text-brass mb-1.5">{{ pkg.size }}</div>
        <div class="font-serif text-[22px] font-light text-cream mb-1.5">{{ pkg.name }}</div>
        <div class="font-serif text-[13px] italic text-cream-faint mb-5">{{ pkg.weight }}</div>
        <div class="font-serif font-light text-brass mb-0" style="font-size:32px;line-height:1">
          {{ pkg.price }}<small class="font-sans font-extralight text-cream-faint" style="font-size:13px"> zł</small>
        </div>
        <ul class="mt-5 pt-5 list-none flex flex-col gap-1.5" style="border-top:1px solid rgba(196,150,58,.1)">
          <li v-for="inc in pkg.includes" :key="inc" class="font-sans text-[11px] text-cream-faint leading-relaxed">
            {{ inc }}
          </li>
        </ul>
        <div class="mt-5 flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full" style="background:#C4963A" />
          <span class="font-sans text-[9px] tracking-[1px] text-brass">Odbiór osobisty dostępny</span>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <button
        class="font-sans font-normal text-[10px] tracking-[3px] uppercase px-14 py-4 transition-colors duration-200"
        style="background:#C4963A;color:#0b0704;border:none;cursor:pointer"
        :disabled="loading"
        @click="submitOrder"
      >
        {{ loading ? 'Przetwarzanie...' : 'Zamów wybrany pakiet' }}
      </button>

      <Transition name="fade">
        <div v-if="status"
          class="mt-4 px-4 py-3.5 font-sans text-[11px] tracking-[1px] max-w-md mx-auto text-left"
          :style="status.ok
            ? 'background:rgba(196,150,58,.08);border:1px solid rgba(196,150,58,.28);color:#C4963A'
            : 'background:rgba(139,58,42,.12);border:1px solid rgba(139,58,42,.35);color:#d4856e'">
          {{ status.message }}
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Preorder · Noir Kraków',
  description: 'Zamów swój micro-lot z odbiorem osobistym lub dostawą.',
})

const selectedPkg = ref(1)
const loading     = ref(false)
const status      = ref<{ ok: boolean; message: string } | null>(null)

const packages = [
  { id:'odkrywca',    size:'Starter',    name:'Odkrywca',    weight:'150g ziaren', price:89,  badge:undefined,   includes:['• 1 single origin micro-lot','• Karta sensoryczna','• Brewing guide PDF'] },
  { id:'kolekcjoner', size:'Bestseller', name:'Kolekcjoner', weight:'250g ziaren', price:149, badge:'Popularne', includes:['• 2 single origin micro-loty','• Karty sensoryczne','• Brewing guide PDF','• Konsultacja z barista'] },
  { id:'koneser',     size:'Premium',    name:'Koneser',     weight:'500g ziaren', price:269, badge:'Limited',   includes:['• 3 premium micro-loty','• Cupping session dla 2 os.','• Branded grinder bag','• Subskrypcja miesięczna'] },
]

async function submitOrder() {
  loading.value = true
  status.value  = null
  const pkg = packages[selectedPkg.value]

  // Portfolio mock
  await new Promise(r => setTimeout(r, 1000))

  status.value = {
    ok: true,
    message: `✓ Preorder pakietu „${pkg.name}" (${pkg.price} zł) potwierdzony. Skontaktujemy się celem ustalenia odbioru.`,
  }
  loading.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
