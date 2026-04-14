<template>
  <div id="noir-cursor" class="noir-cursor" />
  <div id="noir-cursor-ring" class="noir-cursor-ring" />

  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-[68px]"
    style="border-bottom:1px solid rgba(196,150,58,.1); background:rgba(8,5,3,.92); backdrop-filter:blur(16px)"
  >
    <NuxtLink to="/" class="flex flex-col leading-none" style="text-decoration:none;cursor:none">
      <span class="font-serif text-xl font-light tracking-[4px] uppercase" style="color:#C4963A">Noir</span>
      <span class="font-sans font-extralight text-[8px] tracking-[5px] uppercase mt-0.5" style="color:#5a4935">Kraków Coffee Atelier</span>
    </NuxtLink>

    <ul class="hidden md:flex gap-0 list-none">
      <li v-for="link in links" :key="link.to" class="relative">
        <NuxtLink
          :to="link.to"
          class="font-sans font-light text-[10px] tracking-[3px] uppercase px-5 py-2 block transition-colors duration-250"
          style="text-decoration:none;color:#a8927a;cursor:none;position:relative"
          active-class="active-nav"
        >
          {{ link.label }}
          <span class="nav-ul" />
        </NuxtLink>
      </li>
    </ul>

    <NuxtLink to="/rezerwacje" style="text-decoration:none">
      <button class="nav-btn-main font-sans font-light text-[10px] tracking-[3px] uppercase px-5 py-2.5 relative overflow-hidden" style="border:1px solid #C4963A;cursor:none">
        <span class="nav-btn-fill" />
        <span class="relative z-10" style="color:#C4963A">Rezerwuj stolik</span>
      </button>
    </NuxtLink>

    <button class="md:hidden ml-4" style="cursor:none" @click="open = !open">
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <line x1="0" y1="1" x2="22" y2="1" stroke="#a8927a" stroke-width="1.5"/>
        <line x1="0" y1="8" x2="22" y2="8" stroke="#a8927a" stroke-width="1.5"/>
        <line x1="0" y1="15" x2="22" y2="15" stroke="#a8927a" stroke-width="1.5"/>
      </svg>
    </button>

    <Transition name="slide">
      <div v-if="open" class="absolute top-[68px] left-0 right-0 py-6 px-8 flex flex-col gap-3"
        style="background:#080503;border-bottom:1px solid rgba(196,150,58,.1)">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to"
          class="font-sans text-[11px] tracking-[3px] uppercase py-2"
          style="border-bottom:1px solid #221509;color:#a8927a;text-decoration:none;cursor:none"
          @click="open=false">{{ l.label }}</NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const open = ref(false)
const links = [
  { to:'/',             label:'Główna' },
  { to:'/smaki',        label:'Odkryj smaki' },
  { to:'/pochodzenie',  label:'Pochodzenie' },
  { to:'/warsztaty',    label:'Warsztaty' },
  { to:'/preorder',     label:'Preorder' },
]

onMounted(() => {
  const cur  = document.getElementById('noir-cursor')
  const ring = document.getElementById('noir-cursor-ring')
  if (!cur || !ring) return
  let mx=0,my=0,rx=0,ry=0
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY
    cur.style.left=mx+'px'; cur.style.top=my+'px'
  })
  const lerp = () => {
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12
    ring.style.left=Math.round(rx)+'px'
    ring.style.top=Math.round(ry)+'px'
    requestAnimationFrame(lerp)
  }
  lerp()
  document.querySelectorAll('button,a,input,select,textarea').forEach(el => {
    el.addEventListener('mouseenter',()=>{cur.style.cssText+=';width:48px;height:48px;opacity:.12';ring.style.cssText+=';width:60px;height:60px'})
    el.addEventListener('mouseleave',()=>{cur.style.cssText+=';width:8px;height:8px;opacity:1';ring.style.cssText+=';width:32px;height:32px'})
  })
  // Parallax
  const hbg = document.getElementById('hero-parallax')
  if (hbg) {
    window.addEventListener('scroll',()=>{
      hbg.style.transform=`translateY(${window.scrollY*.35}px)`
    },{passive:true})
  }
  // Magnetic buttons
  document.querySelectorAll('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e: any) => {
      const r = btn.getBoundingClientRect()
      const x = e.clientX - r.left - r.width/2
      const y = e.clientY - r.top - r.height/2
      ;(btn as HTMLElement).style.transform = `translate(${x*.18}px,${y*.25}px)`
    })
    btn.addEventListener('mouseleave', () => { (btn as HTMLElement).style.transform = '' })
  })
  // Intersection Observer
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)} })
  },{threshold:.12})
  document.querySelectorAll('.reveal,.reveal-left').forEach(el=>io.observe(el))
})
</script>

<style scoped>
.nav-ul{position:absolute;bottom:0;left:18px;right:18px;height:1px;background:#C4963A;transform:scaleX(0);transform-origin:left;transition:transform .3s ease;display:block}
a:hover .nav-ul{transform:scaleX(1)}
.nav-btn-fill{position:absolute;inset:0;background:#C4963A;transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.23,1,.32,1)}
button:hover .nav-btn-fill{transform:scaleX(1)}
button:hover span[style*="color:#C4963A"]{color:#080503 !important}
.slide-enter-active,.slide-leave-active{transition:opacity .2s ease,transform .2s ease}
.slide-enter-from,.slide-leave-to{opacity:0;transform:translateY(-8px)}
</style>
