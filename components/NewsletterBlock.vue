<template>
  <div class="py-18 px-12 text-center" style="background:#1c130d;border-top:1px solid rgba(196,150,58,.12);padding:72px 48px">
    <div class="max-w-xl mx-auto">
      <div class="font-sans font-extralight text-[9px] tracking-[6px] uppercase text-brass mb-3">Newsletter</div>
      <h2 class="font-serif font-light text-cream mb-3" style="font-size:clamp(26px,3.5vw,44px)">
        Bądź <em class="italic text-brass">pierwszy</em><br>wśród degustatorów
      </h2>
      <p class="font-serif italic text-cream-dim mt-3 mb-9" style="font-size:14px">
        Nowe micro-loty, warsztaty i ekskluzywne preordery. Bez spamu.
      </p>

      <div class="flex">
        <input
          v-model="email"
          type="email"
          placeholder="twoj@email.com"
          class="flex-1 font-sans font-light text-[13px] text-cream outline-none px-5 py-3.5"
          style="background:#130c08;border:1px solid rgba(196,150,58,.18);border-right:none"
          @keyup.enter="submit"
        />
        <button
          class="font-sans font-normal text-[10px] tracking-[2px] uppercase px-7 py-3.5 transition-colors duration-200 whitespace-nowrap"
          style="background:#C4963A;color:#0b0704;border:none;cursor:pointer"
          :disabled="loading"
          @click="submit"
        >
          {{ loading ? '...' : 'Zapisz się' }}
        </button>
      </div>

      <Transition name="fade">
        <p v-if="message" class="mt-4 font-sans text-[11px] tracking-[1px]"
          :style="success ? 'color:#C4963A' : 'color:#d4856e'">
          {{ message }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const email   = ref('')
const loading = ref(false)
const message = ref('')
const success = ref(false)

async function submit() {
  if (!email.value || !email.value.includes('@')) {
    message.value = 'Podaj prawidłowy adres e-mail.'
    success.value = false
    return
  }
  loading.value = true
  message.value = ''

  // Portfolio mock
  await new Promise(r => setTimeout(r, 800))

  message.value = '✓ Witamy w kręgu wtajemniczonych. Pierwszy e-mail już w drodze.'
  success.value = true
  email.value   = ''
  loading.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
