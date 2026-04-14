// composables/useFlavorFilter.ts
import type { CoffeeBean } from '~/types'

export function useFlavorFilter(beans: CoffeeBean[]) {
  const values = reactive({
    chocolate: 5,
    citrus:    5,
    ferment:   5,
    floral:    5,
  })

  const matched = computed(() =>
    beans
      .map(b => ({
        ...b,
        diff:
          Math.abs(b.flavorProfile.chocolate - values.chocolate) +
          Math.abs(b.flavorProfile.citrus    - values.citrus)    +
          Math.abs(b.flavorProfile.ferment   - values.ferment)   +
          Math.abs(b.flavorProfile.floral    - values.floral),
      }))
      .filter(b => b.diff <= 12)
      .sort((a, b) => a.diff - b.diff)
  )

  return { values, matched }
}
