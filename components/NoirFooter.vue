<template>
  <footer class="bg-espresso pb-16 pt-32 md:pt-44">
    <!-- The back of a postcard sent from Floriańska -->
    <div class="shell">
      <div v-reveal class="relative mx-auto max-w-[1200px] text-espresso">
        <svg class="block h-[22px] w-full text-paper" viewBox="0 0 1200 22" preserveAspectRatio="none" aria-hidden="true">
          <path :d="scallops" fill="currentColor" />
        </svg>

        <div class="grid gap-14 bg-paper px-6 pb-8 pt-10 sm:px-10 md:grid-cols-2 md:gap-10 md:px-14 md:pt-14">
          <div>
            <h2 class="t-1 text-espresso">Do zobaczenia</h2>
            <p class="mt-6 max-w-[40ch] text-[18px] leading-relaxed text-espresso">
              Raz w miesiącu piszemy, jaka kawa przyjechała na Floriańską, kiedy są wolne miejsca na cupping i co można zamówić, zanim trafi na bar.
            </p>

            <form class="mt-8 max-w-[440px]" novalidate @submit.prevent="subscribe">
              <label for="footer-email" class="text-[16px] font-medium text-espresso">Twój e-mail</label>
              <div class="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-0">
                <input
                  id="footer-email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  placeholder="ty@przyklad.pl"
                  class="postcard-input min-h-[52px] flex-1 px-4 text-[16px]"
                  :aria-invalid="!!error"
                  aria-describedby="footer-email-msg"
                  @input="error = ''"
                />
                <button type="submit" class="btn-dark" :disabled="loading">
                  {{ loading ? 'Zapisuję' : 'Zapisz mnie' }}
                </button>
              </div>
              <p id="footer-email-msg" class="min-h-[24px] pt-2 text-[16px]" aria-live="polite">
                <span v-if="error" class="text-[#9a3b22]">{{ error }}</span>
                <span v-else-if="done">Zapisane. Pierwszy list przyjdzie w poniedziałek.</span>
              </p>
            </form>
          </div>

          <div class="relative md:pl-10">
            <!-- Stamp -->
            <img
              src="/images/found/brama-dzien.jpg"
              alt="Brama Floriańska w Krakowie"
              loading="lazy"
              width="88"
              height="117"
              class="stamp absolute right-0 top-0 aspect-[3/4] w-16 object-cover sm:w-[88px]"
            />
            <!-- Postmark: the Noir seal stamped half over the stamp -->
            <NoirLogo
              variant="seal"
              decorative
              bean-color="#0d0906"
              class="postmark pointer-events-none absolute right-5 top-12 w-24 text-espresso sm:right-8 sm:top-[60px] sm:w-28"
            />

            <address class="flex flex-col gap-3 pr-24 pt-2 text-[18px] not-italic leading-snug sm:pr-28">
              <a href="https://maps.google.com/?q=Floria%C5%84ska+28,+Krak%C3%B3w" class="postcard-link" rel="noopener" target="_blank">ul. Floriańska 28, 31-021 Kraków</a>
              <a href="tel:+48124317709" class="postcard-link">+48 12 431 77 09</a>
              <a href="mailto:atelier@noir-krakow.pl" class="postcard-link">atelier@noir-krakow.pl</a>
            </address>

            <dl class="mt-10 grid max-w-[320px] grid-cols-[1fr_auto] gap-x-6 gap-y-1 text-[16px]">
              <dt>Poniedziałek–piątek</dt><dd class="tabular-nums">8:00–21:00</dd>
              <dt>Sobota i niedziela</dt><dd class="tabular-nums">9:00–22:00</dd>
            </dl>

            <nav class="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[16px]" aria-label="Stopka">
              <NuxtLink v-for="l in footerLinks" :key="l.to" :to="l.to" class="postcard-link">{{ l.label }}</NuxtLink>
            </nav>
          </div>

          <p class="text-center text-[16px] md:col-span-2">
            © {{ year }} Noir, Floriańska 28, Kraków · projekt portfolio, rezerwacje i zamówienia działają demonstracyjnie ·
            <NuxtLink to="/zrodla-zdjec" class="postcard-link">Źródła zdjęć</NuxtLink>
          </p>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const footerLinks = [
  { to: '/smaki',       label: 'Odkryj smaki' },
  { to: '/pochodzenie', label: 'Pochodzenie' },
  { to: '/warsztaty',   label: 'Warsztaty' },
  { to: '/preorder',    label: 'Preorder' },
  { to: '/rezerwacje',  label: 'Rezerwacje' },
]

// Twelve semicircular scallops along the postcard's top edge
const scallops = (() => {
  const n = 12
  const w = 1200 / n
  let d = 'M0 22'
  for (let i = 0; i < n; i++) d += ` A${w / 2} 22 0 0 1 ${(i + 1) * w} 22`
  return d + ' Z'
})()

const email = ref('')
const error = ref('')
const done = ref(false)
const loading = ref(false)

async function subscribe() {
  done.value = false
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    error.value = 'Wpisz adres w formacie ty@przyklad.pl.'
    return
  }
  loading.value = true
  // Portfolio mock
  await new Promise(r => setTimeout(r, 700))
  loading.value = false
  done.value = true
  email.value = ''
}
</script>

<style scoped>
/* Form field keeps its own line (taste-skill-ignore) */
.postcard-input {
  background: #fbf4e8;
  border: 1px solid #b9a98f;
  color: #0d0906;
  outline: none;
}

.postcard-input:focus {
  border-color: #0d0906;
}

.postcard-input[aria-invalid='true'] {
  border-color: #9a3b22;
}

.postcard-link {
  color: #0d0906;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  transition: text-decoration-color 0.2s;
}

.postcard-link:hover {
  text-decoration-color: #0d0906;
}

.postmark {
  opacity: 0.55;
  transform: rotate(-14deg);
  mix-blend-mode: multiply;
}

.stamp {
  padding: 6px;
  background: #fbf4e8;
  transform: rotate(3deg);
}
</style>
