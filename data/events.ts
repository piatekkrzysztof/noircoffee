// data/events.ts
// Workshop calendar.

import type { Event } from '~/types'

export const EVENTS: Event[] = [
  { id: '1', title: 'Wulkan i aromat: kawy z Etiopii', tag: 'Cupping', date: '2026-10-23', startTime: '14:00', endTime: '17:00', price: 220, spotsTotal: 8, spotsLeft: 3, instructor: 'Marta Wilczyńska', description: 'Pięć etiopskich micro-lotów na jednym stole. Od mapy regionów po filiżankę.' },
  { id: '2', title: 'Brewing methods deep dive', tag: 'Masterclass', date: '2026-11-06', startTime: '18:00', endTime: '21:00', price: 280, spotsTotal: 10, spotsLeft: 6, instructor: 'Oskar Bednarek', description: 'V60, Chemex i AeroPress obok siebie. Ta sama kawa, trzy różne filiżanki.' },
  { id: '3', title: 'Kolumbia kontra Rwanda: blind cupping', tag: 'Prywatny', date: '2026-11-14', startTime: '19:00', endTime: '22:00', price: 350, spotsTotal: 6, spotsLeft: 1, instructor: 'Marta Wilczyńska', description: 'Cztery ziarna, dwa kontynenty, zero podpowiedzi.' },
  { id: '4', title: 'Fermentation lab: anaerobic', tag: 'Warsztat', date: '2026-11-27', startTime: '17:00', endTime: '20:00', price: 240, spotsTotal: 12, spotsLeft: 7, instructor: 'Kenji Amari', description: 'Jak fermentacja beztlenowa zmienia smak. Degustacja trzech anaerobic micro-lotów.' },
  { id: '5', title: 'Gesha vertical tasting', tag: 'Cupping', date: '2026-12-05', startTime: '15:00', endTime: '18:00', price: 390, spotsTotal: 8, spotsLeft: 2, instructor: 'Oskar Bednarek', description: 'Trzy roczniki Geshy z Etiopii i Panamy. Rzadka okazja, żeby spróbować ich obok siebie.' },
  { id: '6', title: 'Terroir a smak: skąd bierze się profil', tag: 'Wykład', date: '2026-12-12', startTime: '18:30', endTime: '20:30', price: 180, spotsTotal: 20, spotsLeft: 11, instructor: 'Kenji Amari', description: 'Wykład z degustacją: jak gleba, klimat i odmiana kształtują filiżankę.' },
]
