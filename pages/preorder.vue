<template>
  <div>
    <PageIntro image="/images/hero.jpg" image-alt="Palone ziarna kawy w metalowej puszce" focus="center 45%">
      <template #title>
        Kawa z Floriańskiej <em class="italic text-brass">do domu</em>
      </template>
      <template #lede>
        Wybierz pakiet, a upalimy ziarna pod Twoje zamówienie. Odbierzesz je przy Floriańskiej po trzech dniach albo przywiezie je kurier. W każdej paczce jest karta cuppingowa i przepis na parzenie.
      </template>
      <template #action>
        <a href="#pakiety" class="btn-primary md:hidden">Wybierz pakiet</a>
      </template>
    </PageIntro>

    <section class="shell pb-8 pt-16 md:pt-24">
      <!-- Packages -->
      <fieldset id="pakiety" class="scroll-mt-[calc(var(--nav-h)+16px)]">
        <legend class="t-2 mb-8">Wybierz pakiet</legend>
        <div class="grid gap-3 md:grid-cols-3">
          <label
            v-for="(pkg, i) in packages"
            :key="pkg.id"
            v-reveal="i * 90"
            class="flex cursor-pointer flex-col p-7 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brass"
            :class="selectedId === pkg.id ? 'bg-brass text-espresso' : 'bg-surface text-cream hover:bg-surface2'"
          >
            <input v-model="selectedId" type="radio" name="package" :value="pkg.id" class="sr-only" />

            <img :src="photos[pkg.id].src" :alt="photos[pkg.id].alt" loading="lazy" class="-mx-7 -mt-7 mb-7 aspect-[3/2] w-[calc(100%+3.5rem)] max-w-none object-cover" />
            <span class="t-1 leading-none">{{ pkg.name }}</span>
            <span class="mt-3 text-[16px]">{{ pkg.weight }}<template v-if="pkg.badge">, {{ pkg.badge }}</template><template v-if="selectedId === pkg.id">. Wybrany</template></span>

            <span class="mt-8 font-serif text-[56px] font-light leading-none tabular-nums">{{ pkg.price }} zł</span>

            <ul class="mt-8 flex flex-1 flex-col gap-2">
              <li v-for="inc in pkg.includes" :key="inc" class="text-[16px] leading-snug">{{ inc }}</li>
            </ul>
          </label>
        </div>
      </fieldset>

      <!-- Details + summary -->
      <div class="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-6">
        <form id="preorder-form" class="lg:col-span-7" novalidate @submit.prevent="submitOrder">
          <fieldset class="flex flex-col gap-5">
            <legend class="t-2 mb-8">Twoje dane</legend>

            <div class="grid gap-5 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <label for="po-name" class="label">Imię i nazwisko</label>
                <input id="po-name" v-model="form.name" class="noir-input" autocomplete="name" placeholder="Zofia Wrona" :aria-invalid="!!errors.name" @input="errors.name = ''" />
                <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
              </div>
              <div class="flex flex-col gap-2">
                <label for="po-phone" class="label">Telefon</label>
                <input id="po-phone" v-model="form.phone" class="noir-input" type="tel" autocomplete="tel" placeholder="+48 604 218 395" :aria-invalid="!!errors.phone" @input="errors.phone = ''" />
                <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="po-email" class="label">E-mail</label>
              <input id="po-email" v-model="form.email" class="noir-input" type="email" autocomplete="email" placeholder="zofia.wrona@poczta.pl" :aria-invalid="!!errors.email" @input="errors.email = ''" />
              <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
            </div>

            <div class="mt-4" role="radiogroup" aria-label="Sposób odbioru">
              <p class="label mb-2">Odbiór</p>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="opt in [{ v: false, l: 'Osobiście, Floriańska 28' }, { v: true, l: 'Kurier, +14 zł' }]"
                  :key="opt.l"
                  type="button"
                  role="radio"
                  :aria-checked="form.delivery === opt.v"
                  class="chip justify-center !text-[16px]"
                  :aria-pressed="form.delivery === opt.v"
                  @click="form.delivery = opt.v"
                >
                  {{ opt.l }}
                </button>
              </div>
            </div>

            <Transition name="fade">
              <div v-if="form.delivery" class="flex flex-col gap-2">
                <label for="po-address" class="label">Adres dostawy</label>
                <input id="po-address" v-model="form.address" class="noir-input" autocomplete="street-address" placeholder="ul. Długa 41/3, 31-147 Kraków" :aria-invalid="!!errors.address" @input="errors.address = ''" />
                <p v-if="errors.address" class="field-error">{{ errors.address }}</p>
              </div>
            </Transition>
          </fieldset>
        </form>

        <!-- Summary, set like a receipt -->
        <aside class="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:col-span-4 lg:col-start-9 lg:self-start">
          <div class="bg-paper p-7 text-espresso">
            <h2 class="t-2">Podsumowanie</h2>
            <p class="mt-5 flex items-baseline justify-between gap-4">
              <span class="text-[16px] font-medium">Razem</span>
              <span class="font-serif text-[56px] font-light leading-none tabular-nums">{{ total }} zł</span>
            </p>
            <p class="mt-4 text-[16px] leading-relaxed">
              Pakiet {{ selected.name }}, {{ selected.weight }}: {{ selected.price }} zł.
              {{ form.delivery ? 'Kurier: 14 zł.' : 'Odbiór osobisty przy Floriańskiej, bez dopłaty.' }}
            </p>

            <button type="submit" form="preorder-form" class="btn-dark mt-7 !min-h-[52px] w-full" :disabled="loading">
              {{ loading ? 'Wysyłam zamówienie' : 'Złóż preorder' }}
            </button>
            <p class="mt-4 text-[14px] leading-relaxed">
              Płacisz przy odbiorze. Paczka jest gotowa w ciągu 3 dni roboczych od palenia.
            </p>

            <div aria-live="polite">
              <Transition name="fade">
                <p v-if="status" class="mt-5 bg-espresso px-4 py-3.5 text-[16px] leading-relaxed text-cream">
                  {{ status }}
                </p>
              </Transition>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Package } from '~/types'

useSeoMeta({
  title: 'Preorder · Noir Kraków',
  description: 'Kawa z baru Noir do domu: pakiety od 150 do 500 g, palone pod zamówienie, z odbiorem przy Floriańskiej 28 albo kurierem.',
})

const packages: Package[] = [
  { id: 'odkrywca',    size: 'Starter', name: 'Odkrywca',    weight: '150 g ziaren', price: 89,  pickup: true, includes: ['1 kawa z jednej farmy', 'Karta cuppingowa', 'Przepis na parzenie (PDF)'] },
  { id: 'kolekcjoner', size: 'Bestseller', name: 'Kolekcjoner', weight: '250 g ziaren', price: 149, pickup: true, badge: 'wybierany najczęściej', includes: ['2 kawy z różnych farm', 'Karty cuppingowe', 'Przepis na parzenie (PDF)', '15 minut konsultacji z baristą'] },
  { id: 'koneser',     size: 'Premium', name: 'Koneser',     weight: '500 g ziaren', price: 269, pickup: true, badge: 'limitowany', includes: ['3 najwyżej oceniane kawy z baru', 'Cupping dla 2 osób', 'Woreczek na zmieloną kawę', 'Subskrypcja na kolejny miesiąc'] },
]

const selectedId = ref<Package['id']>('kolekcjoner')

const photos: Record<Package['id'], { src: string; alt: string }> = {
  odkrywca:    { src: '/images/found/owoce-kawowca.jpg', alt: 'Dojrzałe czerwone owoce kawowca na gałązce' },
  kolekcjoner: { src: '/images/found/palarnia-poster.jpg', alt: 'Świeżo palone ziarna stygną w bębnie palarni' },
  koneser:     { src: '/images/found/cupping-stol.jpg', alt: 'Rząd czarek z kawą przygotowanych do cuppingu' },
}
const selected = computed(() => packages.find(p => p.id === selectedId.value)!)

const form = reactive({ name: '', email: '', phone: '', delivery: false, address: '' })
const errors = reactive({ name: '', email: '', phone: '', address: '' })
const total = computed(() => selected.value.price + (form.delivery ? 14 : 0))

const loading = ref(false)
const status  = ref('')

function validate() {
  errors.name    = form.name.trim().length < 3 ? 'Podaj imię i nazwisko.' : ''
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : 'Wpisz adres w formacie ty@przyklad.pl.'
  errors.phone   = form.phone.replace(/\D/g, '').length < 9 ? 'Numer powinien mieć co najmniej 9 cyfr.' : ''
  errors.address = form.delivery && form.address.trim().length < 8 ? 'Podaj ulicę, numer i kod pocztowy.' : ''
  return !Object.values(errors).some(Boolean)
}

async function submitOrder() {
  status.value = ''
  if (!validate()) return
  loading.value = true

  // Portfolio mock
  await new Promise(r => setTimeout(r, 1000))

  status.value = `Preorder pakietu ${selected.value.name} (${total.value} zł) przyjęty. Napiszemy na ${form.email}, gdy kawa będzie gotowa.`
  loading.value = false
  Object.assign(form, { name: '', email: '', phone: '', address: '' })
}
</script>
