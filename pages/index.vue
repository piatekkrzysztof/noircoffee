<template>
  <!-- HERO -->
  <section class="relative flex items-center justify-center overflow-hidden" style="min-height:100vh;padding:100px 48px 80px">
    <div id="hero-parallax" class="absolute inset-0 bg-cover bg-center will-change-transform" style="background-image:url('/images/hero.jpg')" />
    <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(8,5,3,.9) 0%,rgba(8,5,3,.5) 55%,rgba(8,5,3,.72) 100%)" />
    <div class="hero-grid" />
    <div class="orb" style="width:400px;height:400px;background:radial-gradient(circle,rgba(196,150,58,.07) 0%,transparent 70%);top:-10%;right:-5%;animation-delay:0s" />
    <div class="orb" style="width:300px;height:300px;background:radial-gradient(circle,rgba(139,58,42,.08) 0%,transparent 70%);bottom:10%;left:-5%;animation-delay:-7s" />

    <div class="relative z-10 max-w-3xl mx-auto text-center">
      <!-- Eyebrow -->
      <div class="flex items-center justify-center gap-5 mb-8" style="opacity:0;animation:fadeUp .8s .2s ease forwards">
        <span style="width:56px;height:1px;background:linear-gradient(to right,transparent,#C4963A)" />
        <span class="font-sans font-extralight text-[9px] tracking-[6px] uppercase" style="color:#C4963A">Atelier Sensoryczne · Kraków · od 2019</span>
        <span style="width:56px;height:1px;background:linear-gradient(to left,transparent,#C4963A)" />
      </div>

      <!-- Title with word reveal -->
      <h1 class="font-serif font-light leading-[.88]" style="font-size:clamp(48px,7.5vw,96px);letter-spacing:-1px">
        <span style="display:block;overflow:hidden">
          <span class="title-word" style="animation-delay:.4s;color:#EFD9BC">Gdzie&nbsp;</span>
          <span class="title-word" style="animation-delay:.55s;color:#EFD9BC">kawa</span>
        </span>
        <span style="display:block;overflow:hidden;margin-top:4px">
          <span class="title-word" style="animation-delay:.7s;color:#EFD9BC">staje&nbsp;</span>
          <span class="title-word" style="animation-delay:.82s;color:#EFD9BC">się&nbsp;</span>
          <span class="title-word font-serif italic" style="animation-delay:.94s;color:#C4963A">rytuałem</span>
        </span>
      </h1>

      <p class="font-serif italic leading-relaxed max-w-md mx-auto" style="font-size:clamp(14px,1.8vw,17px);color:#a8927a;margin:28px auto 48px;opacity:0;animation:fadeUp .8s 1s ease forwards">
        Przestrzeń dla tych, którzy wiedzą, że smak to filozofia. Micro-loty, warsztaty cuppingowe i rezerwacje prywatne.
      </p>

      <div class="flex gap-4 justify-center flex-wrap mag-wrap" style="opacity:0;animation:fadeUp .8s 1.2s ease forwards">
        <NuxtLink to="/smaki">
          <button class="mag-btn font-sans font-light text-[10px] tracking-[3px] uppercase px-10 py-4 relative overflow-hidden" style="background:#C4963A;border:none;cursor:none">
            <span class="relative z-10" style="color:#080503">Odkryj smaki</span>
          </button>
        </NuxtLink>
        <NuxtLink to="/rezerwacje">
          <button class="mag-btn font-sans font-light text-[10px] tracking-[3px] uppercase px-10 py-4" style="background:transparent;color:#EFD9BC;border:1px solid rgba(239,217,188,.22);cursor:none">
            Zarezerwuj stolik
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style="opacity:0;animation:fadeUp .8s 1.6s ease forwards">
      <div style="width:1px;height:48px;background:rgba(196,150,58,.15);overflow:hidden;position:relative">
        <div style="width:100%;height:50%;background:#C4963A;animation:scrollPulse 2s ease-in-out infinite" />
      </div>
      <span class="font-sans font-extralight text-[8px] tracking-[4px] uppercase" style="color:#5a4935">Przewiń</span>
    </div>
  </section>

  <!-- MARQUEE STRIP -->
  <div style="background:#C4963A;overflow:hidden;padding:12px 0;border-top:1px solid rgba(0,0,0,.2);border-bottom:1px solid rgba(0,0,0,.2)">
    <div style="display:flex;width:max-content;animation:marqueeScroll 22s linear infinite">
      <span v-for="item in marqueeItems" :key="item" class="font-serif font-light italic" style="font-size:16px;color:#080503;white-space:nowrap;padding:0 32px;letter-spacing:2px">{{ item }}</span>
      <span v-for="item in marqueeItems" :key="'b'+item" class="font-serif font-light italic" style="font-size:16px;color:#080503;white-space:nowrap;padding:0 32px;letter-spacing:2px">{{ item }}</span>
    </div>
  </div>

  <!-- EVENTS TEASER -->
  <section style="padding:88px 48px;background:#080503">
    <div class="reveal s-label">/ Najbliższe warsztaty</div>
    <h2 class="reveal delay-1 font-serif font-light" style="font-size:clamp(32px,4.5vw,52px);margin-top:8px;color:#EFD9BC">
      Kalendarium <em class="italic" style="color:#C4963A">sensoryczne</em>
    </h2>
    <div class="reveal delay-2" style="width:56px;height:1px;background:#6b4e1a;margin:28px 0" />
    <div class="reveal delay-3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(196,150,58,.08)">
      <EventCard v-for="ev in featuredEvents" :key="ev.id" :event="ev" />
    </div>
    <div class="reveal delay-4" style="text-align:center;margin-top:36px">
      <NuxtLink to="/warsztaty">
        <button class="font-sans font-light text-[10px] tracking-[3px] uppercase px-8 py-3 relative overflow-hidden" style="background:transparent;color:#EFD9BC;border:1px solid rgba(239,217,188,.2);cursor:none">
          Wszystkie warsztaty
        </button>
      </NuxtLink>
    </div>
  </section>

  <!-- ORIGINS TEASER -->
  <section style="padding:88px 48px;background:#110b06">
    <div class="reveal s-label">/ Pochodzenie kawy</div>
    <h2 class="reveal delay-1 font-serif font-light" style="font-size:clamp(32px,4.5vw,52px);margin-top:8px;color:#EFD9BC">
      Skąd pochodzi<br><em class="italic" style="color:#C4963A">Twoja kawa</em>
    </h2>
    <div class="reveal delay-2" style="width:56px;height:1px;background:#6b4e1a;margin:28px 0" />
    <div class="reveal delay-3" style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(196,150,58,.08)">
      <OriginCard v-for="o in featuredOrigins" :key="o.id" :origin="o" />
    </div>
    <div class="reveal delay-4" style="text-align:center;margin-top:36px">
      <NuxtLink to="/pochodzenie">
        <button class="font-sans font-light text-[10px] tracking-[3px] uppercase px-8 py-3" style="background:transparent;color:#EFD9BC;border:1px solid rgba(239,217,188,.2);cursor:none">
          Wszystkie originy
        </button>
      </NuxtLink>
    </div>
  </section>

  <NewsletterBlock />
</template>

<script setup lang="ts">
import type { Event, OriginStory } from '~/types'

useSeoMeta({
  title: 'Noir · Kraków Coffee Atelier',
  description: 'Atelier sensoryczne. Micro-loty, warsztaty cuppingowe i rezerwacje prywatne w Krakowie.',
})

const marqueeItems = [
  'Etiopia · Yirgacheffe','Kolumbia · Huila','Gwatemala · Huehuetenango',
  'Rwanda · Nyamasheke','Brazylia · Sul de Minas','Gesha · Jimma',
  'Specialty Coffee · SCA','Washed · Natural · Anaerobic',
]

const featuredEvents: Event[] = [
  { id:'1', title:'Wulkan & Aromat: Kawa z Etiopii',   tag:'Cupping',    date:'2025-05-14', startTime:'14:00', endTime:'17:00', price:220, spotsTotal:8,  spotsLeft:3, description:'' },
  { id:'2', title:'Brewing Methods Deep Dive',          tag:'Masterclass', date:'2025-05-21', startTime:'18:00', endTime:'21:00', price:280, spotsTotal:10, spotsLeft:5, description:'' },
  { id:'3', title:'Kolumbia vs Rwanda: Blind Cupping', tag:'Prywatny',    date:'2025-05-28', startTime:'19:00', endTime:'22:00', price:350, spotsTotal:6,  spotsLeft:1, description:'' },
]

const featuredOrigins: OriginStory[] = [
  { id:'01', slug:'etiopia',  country:'Etiopia',  region:'Yirgacheffe', title:'Kolebka kawy',        body:'Yirgacheffe to święta ziemia każdego coffee geeka. Na wysokości 1900–2200 m n.p.m., dojrzewają ziarna o profilu, który zmienił świat.',           altitude:'1900–2200m', processing:'Washed',       imageUrl:'/images/ethiopia.jpg' },
  { id:'02', slug:'kolumbia', country:'Kolumbia', region:'Huila',       title:'Kraj mikroklimatów',   body:'Dolina rzeki Magdalena kryje tysiące małych ferm, gdzie każda rodzina uprawia swoją własną historię smakową.',                                  altitude:'1500–2000m', processing:'Natural/Honey', imageUrl:'/images/colombia.jpg' },
]
</script>

<style>
@keyframes scrollPulse{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}
@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.s-label{font-family:'Jost',sans-serif;font-weight:200;font-size:9px;letter-spacing:6px;text-transform:uppercase;color:#C4963A;margin-bottom:14px}
</style>
