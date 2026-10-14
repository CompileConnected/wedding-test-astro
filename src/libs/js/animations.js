import { animate, createTimeline, stagger } from 'animejs'

// A single reveal lifecycle: content is registered only after the invitation opens.
const revealSelector = '[data-animate], .profile-img-animate, .gallery-item, .animate-line'
const active = new Set()
const pending = new Set()
const registered = new WeakSet()
let revealObserver
let ambientObserver
let preference
let initialized = false
let opening = false
let finishOpening
let entrance

const reducedMotion = () => preference?.matches ?? false
const restore = (el) => {
  el.style.removeProperty('opacity')
  el.style.removeProperty('transform')
  el.style.removeProperty('will-change')
}

function reveal(el, delay = 0) {
  pending.delete(el)
  if (reducedMotion()) return restore(el)

  const type = el.dataset.animate
  let motion = { translateY: [24, 0] }
  let duration = 800
  let ease = 'outQuint'
  if (type === 'fade-in') motion = {}
  if (type === 'fade-down') motion = { translateY: [-20, 0] }
  if (type === 'fade-left') motion = { translateX: [28, 0] }
  if (type === 'fade-right') motion = { translateX: [-28, 0] }
  if (type === 'zoom-in') motion = { scale: [0.94, 1], translateY: [12, 0] }
  if (type === 'zoom-out') motion = { scale: [1.045, 1] }
  if (type === 'rotate-in') motion = { rotate: [-3, 0], translateY: [24, 0] }
  if (type === 'scale-bounce') {
    motion = { scale: [0.88, 1], translateY: [12, 0] }
    ease = 'outBack(1.35)'
  }
  if (type === 'text-reveal') motion = { translateY: [30, 0], rotate: [-1, 0] }
  if (el.matches('.profile-img-animate')) {
    motion = { translateY: [36, 0], scale: [0.94, 1], rotate: [-2, 0] }
    duration = 1100
  }
  if (el.matches('.gallery-item')) {
    const index = [...el.parentElement.children].indexOf(el)
    motion = { translateY: [32, 0], scale: [0.96, 1], rotate: [index % 2 ? 1.5 : -1.5, 0] }
    duration = 900
  }
  if (el.matches('.animate-line')) {
    motion = { scaleX: [0, 1] }
    duration = 1000
  }

  el.style.willChange = 'transform, opacity'
  const animation = animate(el, {
    ...motion, opacity: [0, 1], duration, delay, ease,
    onComplete: () => {
      restore(el)
      active.delete(animation)
    },
  })
  active.add(animation)
}

function prepareContent() {
  const content = document.getElementById('content')
  if (!content || reducedMotion() || !('IntersectionObserver' in window)) return

  revealObserver ??= new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
    // Stagger only the current viewport batch, including the actual responsive gallery rows.
    const rhythm = stagger(65, { start: 30 })
    visible.forEach((entry, index) => {
      revealObserver.unobserve(entry.target)
      const authoredDelay = Number(entry.target.dataset.animateDelay) || 0
      const delay = Math.min(authoredDelay * 0.3, 150) + Math.min(rhythm(entry.target, index, visible.length), 195)
      reveal(entry.target, delay)
    })
  }, { threshold: 0.06, rootMargin: '0px 0px 24px 0px' })

  content.querySelectorAll(revealSelector).forEach((el) => {
    if (registered.has(el)) return
    registered.add(el)
    // Animate the details, not both a large container and its descendants.
    if (el.querySelector(revealSelector)) return
    pending.add(el)
    el.style.opacity = '0'
    revealObserver.observe(el)
  })

  ambientObserver ??= new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      target.classList.toggle('motion-in-view', isIntersecting)
    })
  })
  content.querySelectorAll('.pulse-diamond, .ambient-float').forEach((el) => ambientObserver.observe(el))
}

function settleMotion() {
  entrance?.complete()
  finishOpening?.()
  revealObserver?.disconnect()
  ambientObserver?.disconnect()
  for (const animation of [...active]) animation.complete()
  pending.forEach(restore)
  pending.clear()
  document.querySelectorAll('.motion-in-view').forEach((el) => el.classList.remove('motion-in-view'))
}

export function animateInvitationOpen() {
  if (!initialized) initAllAnimations()
  const invitation = document.getElementById('invitation')
  const content = document.getElementById('content')
  if (!invitation || !content || opening) return
  opening = true
  entrance?.complete()

  const button = invitation.querySelector('button')
  if (button) button.disabled = true
  const previousOverflow = document.body.style.overflow
  const bounds = invitation.getBoundingClientRect()
  // Keep the cover in place while the first section appears beneath it.
  Object.assign(invitation.style, {
    position: 'fixed', top: `${bounds.top}px`, left: `${bounds.left}px`,
    width: `${bounds.width}px`, height: `${bounds.height}px`, zIndex: '40',
    pointerEvents: 'none', overflow: 'hidden',
  })
  document.body.style.overflow = 'hidden'
  prepareContent()
  content.classList.remove('hidden')
  content.inert = true

  finishOpening = () => {
    invitation.remove()
    content.inert = false
    document.body.style.overflow = previousOverflow
    const heading = content.querySelector('h2')
    const focusTarget = document.getElementById('home') || heading
    focusTarget?.setAttribute('tabindex', '-1')
    focusTarget?.focus({ preventScroll: true })
    finishOpening = undefined
  }
  if (reducedMotion()) return finishOpening()

  invitation.style.willChange = 'transform, opacity'
  const copy = invitation.querySelector('[data-cover-copy]')
  const transition = createTimeline({ onComplete: () => {
    finishOpening?.()
    active.delete(transition)
  } })
  active.add(transition)
  if (copy) transition.add(copy, { translateY: [0, -26], opacity: [1, 0], duration: 360, ease: 'inCubic' }, 0)
  transition.add(invitation, {
    translateY: [0, -28], scale: [1, 1.025], opacity: [1, 0],
    duration: 800, ease: 'inOutCubic',
  }, 100)
}

export function initAllAnimations() {
  if (initialized) return
  initialized = true
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', () => {
    if (reducedMotion()) settleMotion()
  })
  const syncVisibility = () => document.documentElement.classList.toggle('motion-tab-hidden', document.hidden)
  document.addEventListener('visibilitychange', syncVisibility)
  syncVisibility()

  const cover = document.querySelector('[data-cover-image]')
  const details = [...document.querySelectorAll('[data-cover-detail]')]
  const rule = document.querySelector('[data-cover-rule]')
  if (!cover || reducedMotion()) return
  const targets = [cover, ...details, ...(rule ? [rule] : [])]
  targets.forEach((el) => { el.style.willChange = 'transform, opacity' })
  entrance = createTimeline({ onComplete: () => targets.forEach(restore) })
  // The photograph stays visible from first paint; only its framing slowly settles.
  entrance.add(cover, { scale: [1.055, 1], duration: 1800, ease: 'outCubic' }, 0)
  entrance.add(details, {
    opacity: [0, 1], translateY: [22, 0], duration: 850,
    delay: stagger(130), ease: 'outQuint',
  }, 100)
  if (rule) entrance.add(rule, { scaleX: [0, 1], opacity: [0, 1], duration: 1100, ease: 'outQuint' }, 180)
}
