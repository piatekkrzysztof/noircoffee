// composables/useReservation.ts — mock wersja (bez Supabase)
import type { Booking } from '~/types'

export function useReservation() {
  const loading = ref(false)
  const status  = ref<{ ok: boolean; message: string } | null>(null)

  async function submit(booking: Booking) {
    loading.value = true
    status.value  = null

    // Walidacja
    const required: (keyof Booking)[] = ['name', 'email', 'phone', 'date', 'time', 'guests', 'space']
    for (const field of required) {
      if (!booking[field]) {
        status.value = { ok: false, message: `✕ Wypełnij pole: ${field}.` }
        loading.value = false
        return
      }
    }

    // Symulacja wysyłki (portfolio mock)
    await new Promise(r => setTimeout(r, 1200))

    status.value = {
      ok: true,
      message: '✓ Rezerwacja przyjęta. Potwierdzenie zostało wysłane na Twój e-mail. Do zobaczenia w Noir!',
    }

    loading.value = false
  }

  return { loading, status, submit }
}
