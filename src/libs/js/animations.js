import anime from 'animejs/lib/anime.es.js'

/**
 * Animation presets for scroll-triggered animations using anime.js
 */
const ANIMATION_PRESETS = {
  'fade-in': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    duration: 1000,
    delay,
    easing: 'easeOutCubic',
  }),
  'fade-up': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateY: [60, 0],
    duration: 1000,
    delay,
    easing: 'easeOutCubic',
  }),
  'fade-down': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateY: [-40, 0],
    duration: 900,
    delay,
    easing: 'easeOutCubic',
  }),
  'fade-left': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateX: [60, 0],
    duration: 900,
    delay,
    easing: 'easeOutCubic',
  }),
  'fade-right': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateX: [-60, 0],
    duration: 900,
    delay,
    easing: 'easeOutCubic',
  }),
  'zoom-in': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    scale: [0.85, 1],
    duration: 800,
    delay,
    easing: 'easeOutBack',
  }),
  'zoom-out': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    scale: [1.15, 1],
    duration: 800,
    delay,
    easing: 'easeOutCubic',
  }),
  'slide-up': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateY: [100, 0],
    duration: 1100,
    delay,
    easing: 'easeOutQuart',
  }),
  'rotate-in': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    rotate: [-8, 0],
    scale: [0.9, 1],
    duration: 900,
    delay,
    easing: 'easeOutBack',
  }),
  'stagger-children': (el, delay) => ({
    targets: el.children,
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 800,
    delay: anime.stagger(120, { start: delay }),
    easing: 'easeOutCubic',
  }),
  'scale-bounce': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    scale: [0, 1],
    duration: 1000,
    delay,
    easing: 'easeOutElastic(1, .6)',
  }),
  'text-reveal': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1200,
    delay,
    easing: 'easeOutQuint',
  }),
  'float-up': (el, delay) => ({
    targets: el,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1400,
    delay,
    easing: 'easeOutSine',
  }),
}

/**
 * Set initial hidden state for animated elements
 */
function setInitialState(el, animType) {
  el.style.opacity = '0'

  switch (animType) {
    case 'fade-up':
    case 'slide-up':
      el.style.transform = 'translateY(60px)'
      break
    case 'fade-down':
      el.style.transform = 'translateY(-40px)'
      break
    case 'fade-left':
      el.style.transform = 'translateX(60px)'
      break
    case 'fade-right':
      el.style.transform = 'translateX(-60px)'
      break
    case 'zoom-in':
      el.style.transform = 'scale(0.85)'
      break
    case 'zoom-out':
      el.style.transform = 'scale(1.15)'
      break
    case 'rotate-in':
      el.style.transform = 'rotate(-8deg) scale(0.9)'
      break
    case 'scale-bounce':
      el.style.transform = 'scale(0)'
      break
    case 'stagger-children':
      Array.from(el.children).forEach((child) => {
        child.style.opacity = '0'
        child.style.transform = 'translateY(40px)'
      })
      el.style.opacity = '1'
      break
    default:
      break
  }
}

/**
 * Initialize scroll-triggered animations using IntersectionObserver + anime.js
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const animType = el.dataset.animate
          const delay = parseInt(el.dataset.animateDelay || '0')

          const preset = ANIMATION_PRESETS[animType]
          if (preset) {
            anime(preset(el, delay))
          }

          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )

  animatedElements.forEach((el) => {
    setInitialState(el, el.dataset.animate)
    observer.observe(el)
  })
}

/**
 * Animate the invitation opening → content reveal transition
 */
export function animateInvitationOpen() {
  const invitation = document.getElementById('invitation')
  const content = document.getElementById('content')

  if (!invitation || !content) return

  // Fade out invitation with elegant scale
  const tl = anime.timeline({ easing: 'easeInOutQuart' })

  tl.add({
    targets: invitation,
    opacity: [1, 0],
    scale: [1, 1.05],
    filter: ['blur(0px)', 'blur(8px)'],
    duration: 700,
    complete: () => {
      invitation.remove()
      content.classList.remove('hidden')

      // Animate content entrance
      anime({
        targets: content,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutCubic',
        complete: () => {
          // Re-init scroll animations for newly visible content
          initScrollAnimations()
        },
      })
    },
  })
}

/**
 * Animate invitation page entrance (cover page)
 */
export function animateInvitationEntrance() {
  const tl = anime.timeline({ easing: 'easeOutCubic' })

  // Cover image subtle zoom
  const coverImg = document.querySelector('#invitation img')
  if (coverImg) {
    tl.add({
      targets: coverImg,
      scale: [1.1, 1],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutQuart',
    })
  }

  // Title text stagger
  const titleEl = document.querySelector('#invitation .satisfy.text-5xl')
  if (titleEl) {
    tl.add(
      {
        targets: titleEl,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        easing: 'easeOutQuint',
      },
      '-=1400'
    )
  }

  // "Dear" text and name
  const dearSection = document.querySelector('#invitation .text-center.mx-8')
  if (dearSection) {
    tl.add(
      {
        targets: dearSection,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      },
      '-=800'
    )
  }

  // Button entrance with bounce
  const openBtn = document.querySelector('#invitation button')
  if (openBtn) {
    tl.add(
      {
        targets: openBtn,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutBack',
      },
      '-=400'
    )
  }
}

/**
 * Floating ambient animation for decorative elements
 */
export function initAmbientAnimations() {
  // Floating glow blobs
  const blobs = document.querySelectorAll('.ambient-float')
  blobs.forEach((blob, i) => {
    anime({
      targets: blob,
      translateY: [0, -15, 0],
      translateX: [0, i % 2 === 0 ? 8 : -8, 0],
      opacity: [0.1, 0.2, 0.1],
      duration: 4000 + i * 500,
      easing: 'easeInOutSine',
      loop: true,
    })
  })

  // Pulsing decorative diamonds
  const diamonds = document.querySelectorAll('.pulse-diamond')
  diamonds.forEach((d, i) => {
    anime({
      targets: d,
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      duration: 2000 + i * 300,
      easing: 'easeInOutSine',
      loop: true,
    })
  })
}

/**
 * Text character stagger reveal for headings
 */
export function animateTextReveal(selector) {
  const el = document.querySelector(selector)
  if (!el) return

  const text = el.textContent
  el.innerHTML = ''
  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.opacity = '0'
    span.style.display = 'inline-block'
    el.appendChild(span)
  })

  anime({
    targets: el.querySelectorAll('span'),
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay: anime.stagger(40),
    easing: 'easeOutQuint',
  })
}

/**
 * Profile image reveal with elegant scale + border animation
 */
export function initProfileAnimations() {
  const profileImgs = document.querySelectorAll('.profile-img-animate')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutQuart',
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  profileImgs.forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'scale(0.8)'
    observer.observe(el)
  })
}

/**
 * Gallery items stagger entrance
 */
export function initGalleryAnimations() {
  const galleryContainer = document.querySelector('.gallery-animate')
  if (!galleryContainer) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: galleryContainer.querySelectorAll('.gallery-item'),
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 600,
            delay: anime.stagger(80, { grid: [3, 3], from: 'center' }),
            easing: 'easeOutCubic',
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  galleryContainer
    .querySelectorAll('.gallery-item')
    .forEach((item) => {
      item.style.opacity = '0'
      item.style.transform = 'scale(0.85)'
    })

  observer.observe(galleryContainer)
}

/**
 * Smooth counter animation (for countdown timers, etc.)
 */
export function animateCounter(el, target, duration = 2000) {
  const obj = { count: 0 }
  anime({
    targets: obj,
    count: target,
    duration,
    round: 1,
    easing: 'easeOutExpo',
    update: () => {
      el.textContent = obj.count
    },
  })
}

/**
 * Separator line draw animation
 */
export function initSeparatorAnimations() {
  const separators = document.querySelectorAll('.animate-line')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            scaleX: [0, 1],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuart',
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  separators.forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'scaleX(0)'
    observer.observe(el)
  })
}

/**
 * Master initialization - call this on page load
 */
export function initAllAnimations() {
  animateInvitationEntrance()
  initScrollAnimations()
  initAmbientAnimations()
  initProfileAnimations()
  initGalleryAnimations()
  initSeparatorAnimations()
}
