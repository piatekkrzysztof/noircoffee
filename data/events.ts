// data/events.ts
// Workshop calendar.

import type { Event } from '~/types'

export const EVENTS: Event[] = [
  { id: '1', title: 'Etiopia przy jednym stole', tag: 'Cupping', date: '2026-10-23', startTime: '14:00', endTime: '17:00', price: 220, spotsTotal: 8, spotsLeft: 3, instructor: 'Marta Wilczyńska', description: 'Pięć etiopskich kaw obok siebie, od Yirgacheffe po Jimmę. Nauczysz się odróżniać je po zapachu, zanim spróbujesz.' },
  { id: '2', title: 'Trzy metody, jedna kawa', tag: 'Masterclass', date: '2026-11-06', startTime: '18:00', endTime: '21:00', price: 280, spotsTotal: 10, spotsLeft: 6, instructor: 'Oskar Bednarek', description: 'V60, Chemex i AeroPress z tym samym ziarnem. Zobaczysz, jak metoda zmienia smak, i wyjdziesz z przepisem na swoją kawę w domu.' },
  { id: '3', title: 'Kolumbia czy Rwanda? Na ślepo', tag: 'Prywatny', date: '2026-11-14', startTime: '19:00', endTime: '22:00', price: 350, spotsTotal: 6, spotsLeft: 1, instructor: 'Marta Wilczyńska', description: 'Cztery kawy bez etykiet. Zgadujesz, skąd pochodzą, a potem razem sprawdzamy karty.' },
  { id: '4', title: 'Fermentacja bez powietrza', tag: 'Warsztat', date: '2026-11-27', startTime: '17:00', endTime: '20:00', price: 240, spotsTotal: 12, spotsLeft: 7, instructor: 'Kenji Amari', description: 'Skąd w kawie smak wina i malin. Trzy kawy fermentowane beztlenowo i jedna klasyczna dla porównania.' },
  { id: '5', title: 'Gesha z trzech zbiorów', tag: 'Cupping', date: '2026-12-05', startTime: '15:00', endTime: '18:00', price: 390, spotsTotal: 8, spotsLeft: 2, instructor: 'Oskar Bednarek', description: 'Gesha z Etiopii i Panamy z trzech kolejnych lat. Takiego porównania nie zrobisz w domu.' },
  { id: '6', title: 'Skąd kawa bierze smak', tag: 'Wykład', date: '2026-12-12', startTime: '18:30', endTime: '20:30', price: 180, spotsTotal: 20, spotsLeft: 11, instructor: 'Kenji Amari', description: 'Godzina o glebie, wysokości i odmianie, a potem degustacja czterech kaw, które to pokazują.' },
]
