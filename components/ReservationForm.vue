<template>
  <form novalidate class="flex flex-col gap-5" @submit.prevent="submit">
    <!-- Linked workshop -->
    <div v-if="workshop" class="flex items-start justify-between gap-4 bg-brass px-5 py-5 text-espresso">
      <div>
        <p class="t-2">{{ workshop.title }}</p>
        <p class="mt-2 text-[16px] tabular-nums">Zapis na warsztat: {{ workshopDate }}, {{ workshop.startTime }}–{{ workshop.endTime }}, {{ workshop.price }} zł od osoby.</p>
      </div>
      <NuxtLink to="/rezerwacje" class="flex min-h-[44px] shrink-0 items-center px-2 text-[16px] underline underline-offset-4" aria-label="Usuń warsztat z rezerwacji">Usuń</NuxtLink>
    </div>

    <!-- Space -->
    <fieldset v-if="!workshop">
      <legend class="label mb-2">Sala</legend>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="s in spaces"
          :key="s.name"
          class="cursor-pointer px-4 py-4 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass"
          :class="form.space === s.name ? 'bg-brass text-espresso' : 'bg-surface2 text-cream hover:bg-surface3'"
        >
          <input v-model="form.space" type="radio" name="space" :value="s.name" class="sr-only" @change="errors.space = ''" />
          <span class="block font-serif text-[22px] leading-tight">{{ s.name }}</span>
          <span class="mt-1 block text-[14px]">{{ s.capacity }}</span>
        </label>
      </div>
      <p v-if="errors.space" class="field-error mt-2">{{ errors.space }}</p>
    </fieldset>

    <div class="grid gap-5 sm:grid-cols-2">
      <div class="flex flex-col gap-2">
        <label for="r-name" class="label">Imię i nazwisko</label>
        <input id="r-name" v-model="form.name" class="noir-input" autocomplete="name" placeholder="Zofia Wrona" :aria-invalid="!!errors.name" @input="errors.name = ''" />
        <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <label for="r-phone" class="label">Telefon</label>
        <input id="r-phone" v-model="form.phone" class="noir-input" type="tel" autocomplete="tel" placeholder="+48 604 218 395" :aria-invalid="!!errors.phone" @input="errors.phone = ''" />
        <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="r-email" class="label">E-mail</label>
      <input id="r-email" v-model="form.email" class="noir-input" type="email" autocomplete="email" placeholder="zofia.wrona@poczta.pl" :aria-invalid="!!errors.email" @input="errors.email = ''" />
      <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
    </div>

    <div class="grid gap-5 sm:grid-cols-3">
      <div v-if="!workshop" class="flex flex-col gap-2">
        <label for="r-date" class="label">Data</label>
        <input id="r-date" v-model="form.date" class="noir-input" type="date" :min="today" :aria-invalid="!!errors.date" @input="errors.date = ''" />
        <p v-if="errors.date" class="field-error">{{ errors.date }}</p>
      </div>
      <div v-if="!workshop" class="flex flex-col gap-2">
        <label for="r-time" class="label">Godzina</label>
        <select id="r-time" v-model="form.time" class="noir-input" :aria-invalid="!!errors.time" @change="errors.time = ''">
          <option value="" disabled>Wybierz</option>
          <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
        </select>
        <p v-if="errors.time" class="field-error">{{ errors.time }}</p>
      </div>
      <div class="flex flex-col gap-2" :class="workshop ? 'sm:col-span-3' : ''">
        <label for="r-guests" class="label">Liczba osób</label>
        <select id="r-guests" v-model.number="form.guests" class="noir-input">
          <option v-for="n in maxGuests" :key="n" :value="n">{{ n }} {{ n === 1 ? 'osoba' : n < 5 ? 'osoby' : 'osób' }}</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="r-notes" class="label">Uwagi <span class="text-cream-dim">(opcjonalnie)</span></label>
      <textarea id="r-notes" v-model="form.notes" class="noir-input min-h-[96px] resize-y" placeholder="Alergie, okazja, preferowane ziarno" />
    </div>

    <button type="submit" class="btn-primary mt-2 w-full" :disabled="loading">
      <span v-if="loading" class="h-3 w-3 animate-spin rounded-full border border-espresso/30 border-t-espresso" aria-hidden="true" />
      {{ loading ? 'Wysyłam rezerwację' : workshop ? 'Zapisz mnie na warsztat' : 'Wyślij rezerwację' }}
    </button>

    <div aria-live="polite">
      <Transition name="fade">
        <div v-if="status" class="bg-brass px-5 py-4 text-[16px] leading-relaxed text-espresso">
          {{ status }}
        </div>
      </Transition>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Booking } from '~/types'

const route = useRoute()
const { all: events } = useEvents()
const workshop = computed(() => events.find(e => e.id === route.query.warsztat))
const workshopDate = computed(() => {
  if (!workshop.value) return ''
  const d = formatEventDate(workshop.value.date)
  return `${d.weekday}, ${d.day} ${d.month}`
})

const today     = new Date().toISOString().split('T')[0]
const timeSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:00']
const spaces: { name: Booking['space']; capacity: string; max: number }[] = [
  { name: 'Salon Degustacyjny',  capacity: 'do 6 osób', max: 6 },
  { name: 'Gabinet Szachowy',    capacity: 'do 4 osób', max: 4 },
  { name: 'Loża przy Palenisku', capacity: 'do 8 osób', max: 8 },
  { name: 'Bar Barista',         capacity: 'do 2 osób', max: 2 },
]

const form = reactive({
  name: '', email: '', phone: '',
  date: '', time: '', guests: 2,
  space: '' as Booking['space'] | '', notes: '',
})
const errors = reactive({ name: '', email: '', phone: '', date: '', time: '', space: '' })

const maxGuests = computed(() => {
  if (workshop.value) return Math.min(workshop.value.spotsLeft, 4)
  return spaces.find(s => s.name === form.space)?.max ?? 8
})

watch(maxGuests, (max) => {
  if (form.guests > max) form.guests = max
}, { immediate: true })

const loading = ref(false)
const status  = ref('')

function validate() {
  errors.name  = form.name.trim().length < 3 ? 'Podaj imię i nazwisko.' : ''
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : 'Wpisz adres w formacie ty@przyklad.pl.'
  errors.phone = form.phone.replace(/\D/g, '').length < 9 ? 'Numer powinien mieć co najmniej 9 cyfr.' : ''
  if (!workshop.value) {
    errors.space = form.space ? '' : 'Wybierz jedną z przestrzeni.'
    errors.date  = form.date ? '' : 'Wybierz datę.'
    errors.time  = form.time ? '' : 'Wybierz godzinę.'
  }
  return !Object.values(errors).some(Boolean)
}

async function submit() {
  status.value = ''
  if (!validate()) return
  loading.value = true

  // Portfolio mock: 1.2 s delay instead of a real request
  await new Promise(r => setTimeout(r, 1200))

  status.value = workshop.value
    ? `Miejsce na „${workshop.value.title}” zarezerwowane dla ${form.guests} os. Szczegóły wysłaliśmy na ${form.email}.`
    : `Rezerwacja przyjęta: ${form.space}, ${form.date} o ${form.time}. Potwierdzenie wysłaliśmy na ${form.email}.`
  loading.value = false

  Object.assign(form, { name: '', email: '', phone: '', date: '', time: '', guests: 2, space: '', notes: '' })
}
</script>
