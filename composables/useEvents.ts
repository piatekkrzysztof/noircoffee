// composables/useEvents.ts
// Single source for the workshop calendar (data/events.ts).

import type { Event } from '~/types'
import { EVENTS } from '~/data/events'

export function useEvents() {
  const all = EVENTS.slice().sort((a, b) => a.date.localeCompare(b.date))
  const tags = [...new Set(all.map(e => e.tag))]
  return { all, tags }
}

export function formatEventDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`)
  return {
    day:     d.getDate().toString().padStart(2, '0'),
    month:   d.toLocaleDateString('pl-PL', { month: 'short' }).replace('.', ''),
    weekday: d.toLocaleDateString('pl-PL', { weekday: 'short' }).replace('.', ''),
    year:    d.getFullYear(),
  }
}
