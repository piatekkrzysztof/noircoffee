<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Imię i nazwisko</label>
        <input v-model="form.name" class="noir-input" type="text" placeholder="Jan Kowalski" required />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Telefon</label>
        <input v-model="form.phone" class="noir-input" type="tel" placeholder="+48 000 000 000" required />
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">E-mail</label>
      <input v-model="form.email" class="noir-input" type="email" placeholder="jan@example.com" required />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div class="flex flex-col gap-2">
        <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Data</label>
        <input v-model="form.date" class="noir-input" type="date" :min="today" required />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Godzina</label>
        <select v-model="form.time" class="noir-input" required>
          <option value="">Wybierz...</option>
          <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div class="flex flex-col gap-2">
        <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Liczba osób</label>
        <select v-model="form.guests" class="noir-input" required>
          <option value="">Wybierz...</option>
          <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Przestrzeń</label>
        <select v-model="form.space" class="noir-input" required>
          <option value="">Wybierz...</option>
          <option v-for="s in spaces" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <label class="font-sans text-[8px] tracking-[3px] uppercase text-cream-faint">Uwagi specjalne</label>
      <textarea v-model="form.notes" class="noir-input resize-y min-h-[76px]"
        placeholder="Alergie, preferencje, specjalne okazje..." />
    </div>

    <button
      type="submit"
      class="w-full mt-5 py-4 font-sans font-normal text-[10px] tracking-[3px] uppercase transition-colors duration-200"
      style="background:#C4963A; color:#0b0704; border:none; cursor:pointer"
      :disabled="loading"
      :style="loading ? 'opacity:0.5;cursor:not-allowed' : ''"
    >
      {{ loading ? 'Wysyłanie...' : 'Wyślij Rezerwację' }}
    </button>

    <Transition name="fade">
      <div
        v-if="status"
        class="mt-4 px-4 py-3.5 font-sans text-[11px] tracking-[1px]"
        :style="status.ok
          ? 'background:rgba(196,150,58,.08);border:1px solid rgba(196,150,58,.28);color:#C4963A'
          : 'background:rgba(139,58,42,.12);border:1px solid rgba(139,58,42,.35);color:#d4856e'"
      >
        {{ status.message }}
      </div>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import type { Booking } from '~/types'

const today     = new Date().toISOString().split('T')[0]
const timeSlots = ['10:00','11:00','12:00','14:00','16:00','18:00','20:00']
const spaces    = ['Salon Degustacyjny','Gabinet Szachowy','Loża przy Palenisku','Bar Barista']

const form = reactive<Partial<Booking>>({
  name: '', email: '', phone: '',
  date: '', time: '', guests: undefined,
  space: undefined, notes: '',
})

const loading = ref(false)
const status  = ref<{ ok: boolean; message: string } | null>(null)

async function submit() {
  loading.value = true
  status.value  = null

  // Portfolio mock — symulacja 1.2s opóźnienia
  await new Promise(r => setTimeout(r, 1200))

  status.value = {
    ok: true,
    message: '✓ Rezerwacja przyjęta. Potwierdzenie zostało wysłane na Twój e-mail. Do zobaczenia w Noir!',
  }

  loading.value = false

  // Reset
  Object.assign(form, { name:'', email:'', phone:'', date:'', time:'', guests:undefined, space:undefined, notes:'' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
