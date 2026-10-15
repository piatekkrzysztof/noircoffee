// plugins/reveal.ts
// v-reveal: fades an element in when it enters the viewport.
// Optional value = delay in ms, e.g. v-reveal="120".

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  function getObserver() {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              // An attribute, not a class: Vue rewrites className when a bound :class changes
              entry.target.setAttribute('data-shown', '')
              observer?.unobserve(entry.target)
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
    }
    return observer
  }

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    // A data attribute (not class/style) so the server markup hydrates without mismatches
    getSSRProps() {
      return { 'data-reveal': '' }
    },
    mounted(el, binding) {
      el.setAttribute('data-reveal', '')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })
})
