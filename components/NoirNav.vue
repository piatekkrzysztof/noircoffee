<template>
  <header
    class="fixed inset-x-0 top-0 z-nav transition-colors duration-300"
    :class="overPhoto ? 'bg-transparent' : 'bg-espresso'"
  >
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-overlay focus:bg-brass focus:px-4 focus:py-2 focus:text-espresso"
    >
      Przejdź do treści
    </a>

    <!-- Neutral scrim behind the links while they sit on the hero photograph (taste-skill-ignore: scrim over a photo) -->
    <div
      class="nav-scrim pointer-events-none absolute inset-x-0 top-0 h-32 transition-opacity duration-300"
      :class="overPhoto ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    />

    <nav class="shell relative flex h-[var(--nav-h)] items-center justify-between gap-6" aria-label="Główna nawigacja">
      <NuxtLink
        to="/"
        class="text-cream transition-[color,opacity] duration-300 hover:text-brass-light"
        :class="overPhoto ? 'pointer-events-none opacity-0' : 'opacity-100'"
        :tabindex="overPhoto ? -1 : undefined"
        aria-label="Noir, strona główna"
      >
        <NoirLogo class="h-[30px] w-auto" decorative />
      </NuxtLink>

      <div class="flex items-center gap-2">
        <ul class="hidden items-center lg:flex">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="nav-link block px-4 py-3 text-[16px] text-cream transition-colors duration-200 hover:text-brass-light"
              active-class="is-active"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink v-if="!overPhoto" to="/rezerwacje" class="btn-primary ml-3 hidden !min-h-[44px] !px-5 md:inline-flex">
          Zarezerwuj stolik
        </NuxtLink>

        <button
          type="button"
          class="min-h-[44px] px-3 text-[16px] font-medium text-cream lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          @click="mobileOpen = !mobileOpen"
        >
          {{ mobileOpen ? 'Zamknij' : 'Menu' }}
        </button>
      </div>
    </nav>

    <!-- Mobile menu, teleported so it is not clipped by the header -->
    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="mobileOpen"
          id="mobile-menu"
          class="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-overlay flex flex-col justify-between overflow-y-auto bg-espresso px-5 pb-10 pt-4 sm:px-8 lg:hidden"
        >
          <ul class="flex flex-col gap-1">
            <li v-for="link in [{ to: '/', label: 'Strona główna' }, ...links]" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="block py-3 font-serif text-[44px] font-light leading-none text-cream transition-colors hover:text-brass-light"
                @click="mobileOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-10 flex flex-col gap-5">
            <NuxtLink to="/rezerwacje" class="btn-primary w-full" @click="mobileOpen = false">
              Zarezerwuj stolik
            </NuxtLink>
            <p class="text-[16px] text-cream-dim">ul. Floriańska 28, Kraków · +48 12 431 77 09</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

// On the home page the bar sits on the hero photograph until the reader scrolls
const overPhoto = computed(() => route.path === '/' && !scrolled.value && !mobileOpen.value)

const links = [
  { to: '/smaki',       label: 'Odkryj smaki' },
  { to: '/pochodzenie', label: 'Pochodzenie' },
  { to: '/warsztaty',   label: 'Warsztaty' },
  { to: '/preorder',    label: 'Preorder' },
]

function onScroll() {
  scrolled.value = window.scrollY > window.innerHeight * 0.5
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileOpen.value = false
}

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  onScroll()
})

watch(mobileOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.nav-scrim {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent); /* taste-skill-ignore: neutral scrim over the hero photo */
}

.nav-link.is-active {
  color: var(--br-l);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
