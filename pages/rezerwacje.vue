<template>
  <div>
    <!-- HERO: the street, the title beneath it -->
    <header class="pt-[var(--nav-h)]">
      <div class="h-[40svh] overflow-hidden md:h-[48svh]">
        <img src="/images/found/florianska-mariacki.jpg" alt="Ulica Floriańska z widokiem na wieże Kościoła Mariackiego" class="h-full w-full object-cover object-[center_35%]" />
      </div>
      <div class="shell grid gap-6 pb-6 pt-10 md:grid-cols-12 md:items-end">
        <h1 class="t-1 fade-up md:col-span-7">Zarezerwuj <em class="italic text-brass">stolik</em></h1>
        <div class="md:col-span-4 md:col-start-9">
          <p class="lede fade-up fade-up-delay-1">
            Cztery sale, od baru dla dwojga po lożę przy palenisku dla ośmiu osób. Na każdą rezerwację odpowiadamy w ciągu dwóch godzin w czasie otwarcia.
          </p>
          <a href="#formularz" class="btn-primary mt-6 fade-up fade-up-delay-2 md:hidden">Przejdź do formularza</a>
        </div>
      </div>
    </header>

    <!-- CONTENT -->
    <section class="shell grid gap-16 pb-8 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-6">
      <!-- Info -->
      <div class="lg:col-span-5">
        <h2 v-reveal class="t-2">Co dostajesz przy stoliku</h2>
        <ul class="mt-6 flex flex-col gap-4">
          <li v-for="(feat, i) in features" :key="feat" v-reveal="i * 70" class="flex gap-4 text-[18px] leading-relaxed text-cream">
            <span class="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden="true" />
            {{ feat }}
          </li>
        </ul>

        <div v-reveal class="mt-12 bg-surface p-7">
          <dl class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[18px] text-cream">
            <dt>Poniedziałek–piątek</dt><dd class="text-right tabular-nums">8:00–21:00</dd>
            <dt>Sobota i niedziela</dt><dd class="text-right tabular-nums">9:00–22:00</dd>
          </dl>
          <p class="mt-5 text-[18px] text-cream">
            Wolisz zadzwonić? <a href="tel:+48124317709" class="underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass-light">+48 12 431 77 09</a>
          </p>
        </div>

        <div class="mt-12 grid grid-cols-5 gap-3">
          <img v-reveal src="/images/pour.jpg" alt="Mleko wlewane do filiżanki czarnej kawy" loading="lazy" class="col-span-3 aspect-[3/4] w-full object-cover" />
          <div class="col-span-2 flex flex-col gap-3">
            <img v-reveal="90" src="/images/found/brama-noc.jpg" alt="Brama Floriańska nocą" loading="lazy" class="aspect-[3/4] w-full object-cover" />
            <img v-reveal="160" src="/images/found/portal-3.jpg" alt="Renesansowy portal kamienicy przy Floriańskiej 3" loading="lazy" class="aspect-square w-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Form -->
      <div id="formularz" v-reveal class="scroll-mt-[calc(var(--nav-h)+16px)] bg-surface p-6 sm:p-10 lg:col-span-6 lg:col-start-7 lg:self-start">
        <h2 class="t-2 mb-8">Formularz rezerwacji</h2>
        <ReservationForm />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rezerwacje · Noir Kraków',
  description: 'Zarezerwuj stolik w Noir przy Floriańskiej 28 w Krakowie: bar, gabinet szachowy, salon degustacyjny albo loża przy palenisku.',
})

const features = [
  'Barista przy stoliku, który opowie o każdej kawie i pomoże wybrać',
  'Trzy kawy obok siebie na próbę, zanim zdecydujesz się na jedną',
  'Pokaz parzenia dla grup do sześciu osób',
  'Ziarna, które Ci zasmakują, zamówisz od razu do domu',
]
</script>
