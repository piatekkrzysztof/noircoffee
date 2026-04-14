// types/index.ts

export interface FlavorProfile {
  chocolate: number   // 0–10
  citrus: number      // 0–10
  ferment: number     // 0–10
  floral: number      // 0–10
}

export interface CoffeeBean {
  id: string
  name: string
  origin: string
  country: string
  region: string
  altitude: string
  processing: 'Washed' | 'Natural' | 'Honey' | 'Anaerobic' | 'Anaerobic Honey'
  variety: string
  roast: 'Light' | 'Light-Medium' | 'Medium'
  scaScore: number
  flavorProfile: FlavorProfile
  description: string
  tasting: string[]    // e.g. ['jaśmin', 'bergamotka', 'biała herbata']
  imageUrl?: string
  price: number        // PLN / 100g
  inStock: boolean
}

export interface Event {
  id: string
  title: string
  tag: 'Cupping' | 'Masterclass' | 'Warsztat' | 'Wykład' | 'Prywatny'
  date: string         // ISO date string
  startTime: string
  endTime: string
  price: number
  spotsTotal: number
  spotsLeft: number
  description: string
  imageUrl?: string
  instructor?: string
}

export interface Booking {
  id?: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  space: 'Salon Degustacyjny' | 'Gabinet Szachowy' | 'Loża przy Palenisku' | 'Bar Barista'
  notes?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  createdAt?: string
}

export interface PreorderItem {
  id?: string
  packageId: 'odkrywca' | 'kolekcjoner' | 'koneser'
  name: string
  email: string
  phone: string
  pickupDate?: string
  delivery: boolean
  deliveryAddress?: string
  notes?: string
  status?: 'pending' | 'ready' | 'completed'
  createdAt?: string
}

export interface NewsletterSubscriber {
  id?: string
  email: string
  subscribedAt?: string
}

export interface OriginStory {
  id: string
  country: string
  region: string
  title: string
  body: string
  altitude: string
  processing: string
  imageUrl?: string
  slug: string
}

export interface Package {
  id: 'odkrywca' | 'kolekcjoner' | 'koneser'
  size: string
  name: string
  weight: string
  price: number
  badge?: string
  includes: string[]
  pickup: boolean
}
