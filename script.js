// ── Shared data ───────────────────────────────────────────────────
const DATA = {
  name: 'Jerico P. Jacob',
  email: 'xiaoliners@gmail.com',
  location: 'Pangasinan, Philippines',
  linkedin: 'https://linkedin.com/in/jericojacob',
  github: 'https://github.com/xiaoliners-maker',
  instagram: 'https://instagram.com/xiaokinggg_',
  facebook: 'https://facebook.com',
}

// ── Footer year ───────────────────────────────────────────────────
document.getElementById('footerYear').textContent = new Date().getFullYear()

// ── Theme toggle ──────────────────────────────────────────────────
const html = document.documentElement
const themeToggle = document.getElementById('themeToggle')
const savedTheme = localStorage.getItem('theme') || 'dark'
html.setAttribute('data-theme', savedTheme)
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
})

// ── Sticky nav ────────────────────────────────────────────────────
const nav = document.getElementById('stickyNav')
let lastY = 0, scrollTimer = null
const FOLD = 80, THRESHOLD = 10, AUTO_REVEAL = 1200
window.addEventListener('scroll', () => {
  const y = window.scrollY
  const delta = y - lastY
  nav.classList.toggle('scrolled', y > FOLD)
  if (Math.abs(delta) > THRESHOLD) {
    nav.classList.toggle('nav-hidden', delta > 0 && y > FOLD)
    if (delta < 0) nav.classList.remove('nav-hidden')
  }
  lastY = y
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => nav.classList.remove('nav-hidden'), AUTO_REVEAL)
}, { passive: true })

// ── Active section dots ───────────────────────────────────────────
const sectionIds = ['about','experience','tech','projects','certifications','recommendations','contact','gallery']
const dots = {}
sectionIds.forEach(id => dots[id] = document.querySelector(`.nav-dot[data-section="${id}"]`))
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Object.values(dots).forEach(d => d && d.classList.remove('active'))
      dots[e.target.id] && dots[e.target.id].classList.add('active')
    }
  })
}, { rootMargin: '-40% 0px -55% 0px' })
sectionIds.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })

// ── Reveal on scroll ──────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) } })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

// ── Tech chip hover ───────────────────────────────────────────────
document.querySelectorAll('.tech-chip').forEach(chip => {
  const color = chip.dataset.color || '#94a3b8'
  chip.addEventListener('mouseenter', () => {
    chip.style.borderColor = color + '55'
    chip.style.background  = color + '10'
    chip.style.color       = color
  })
  chip.addEventListener('mouseleave', () => {
    chip.style.borderColor = ''
    chip.style.background  = ''
    chip.style.color       = ''
  })
})

// ── Project hover tint ────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  const hue = getComputedStyle(card).getPropertyValue('--hue').trim()
  if (!hue) return
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = `hsla(${hue},50%,60%,0.3)`
    card.style.background  = `hsla(${hue},40%,60%,0.04)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = ''
    card.style.background  = ''
  })
})

// ── Project filter ────────────────────────────────────────────────
const filterAll = document.getElementById('filterAll')
const filterFeatured = document.getElementById('filterFeatured')
const allCards = document.querySelectorAll('.project-card')
filterAll.addEventListener('click', () => {
  filterAll.classList.add('active')
  filterFeatured.classList.remove('active')
  allCards.forEach(c => c.style.display = '')
})
filterFeatured.addEventListener('click', () => {
  filterFeatured.classList.add('active')
  filterAll.classList.remove('active')
  allCards.forEach(c => {
    c.style.display = c.dataset.featured === 'true' ? '' : 'none'
  })
})

// ── Chatbot ───────────────────────────────────────────────────────
const FAQ = [
  { patterns: ['hire','available','open to work','job','freelance','work with','opportunity','contract'],
    answer: `Yes! Jerico is currently open to freelance and full-time opportunities. Reach out at ${DATA.email} or LinkedIn: ${DATA.linkedin}` },
  { patterns: ['tech','stack','technolog','language','framework','tools','skill'],
    answer: `Jerico's stack:\nFrontend: JavaScript, HTML, CSS, React, Tailwind CSS\nBackend: MySQL, PHP, Laravel\nTools: Git, GitHub Actions, VS Code` },
  { patterns: ['project','built','portfolio','made','created'],
    answer: `Jerico's projects:\n• Responsive Portfolio Website — React + Tailwind\n• Inventory Management System — C# + MS Access\n• Shoe E-commerce Platform — JS/HTML/CSS\n• School Portal & Enrollment System — PHP + MySQL` },
  { patterns: ['experience','background','career','history','worked','company'],
    answer: `• Frontend Developer at Freelance (2026–Present)\n• Junior Web Developer at Freelance (2023)\n• BS IT at University of Eastern Pangasinan (2022-2026)\n• Hello World! 👋 — Wrote first line of code (2018)` },
  { patterns: ['contact','reach','email','message','talk','connect','touch'],
    answer: `• Email: ${DATA.email}\n• LinkedIn: ${DATA.linkedin}\n• GitHub: ${DATA.github}\n• Instagram: ${DATA.instagram}` },
  { patterns: ['instagram','ig','insta'], answer: `Follow Jerico on Instagram:\n${DATA.instagram}` },
  { patterns: ['facebook','fb'],          answer: `Find Jerico on Facebook:\n${DATA.facebook}` },
  { patterns: ['linkedin'],               answer: `Connect on LinkedIn:\n${DATA.linkedin}` },
  { patterns: ['github','repo','code'],   answer: `GitHub:\n${DATA.github}` },
  { patterns: ['social','media','follow','profiles'], answer: `• LinkedIn: ${DATA.linkedin}\n• GitHub: ${DATA.github}\n• Instagram: ${DATA.instagram}\n• Facebook: ${DATA.facebook}` },
  { patterns: ['location','based','from','where','philippine'], answer: `Jerico is based in ${DATA.location}.` },
  { patterns: ['education','study','school','university','uep'], answer: `Jerico studied BS Information Technology at the University of Eastern Pangasinan (2022-2026).` },
  { patterns: ['who','about','yourself','tell me','introduce','bio'], answer: `Jerico is a Frontend/Web Developer from Pangasinan, Philippines. He specializes in building modern web apps with JavaScript, TypeScript, React, and modern frameworks. Currently diving deeper into AI integration and building intelligent applications.` },
  { patterns: ['role','title','developer','what do you do'], answer: `Jerico is a Frontend Developer and Web Developer specializing in modern web applications.` },
  { patterns: ['react','next','javascript','typescript','tailwind'], answer: `Yes! Jerico works with React, JavaScript, TypeScript, and Tailwind CSS for frontend development.` },
  { patterns: ['php','laravel','backend','database','mysql'], answer: `Jerico also does backend work with PHP, Laravel, and MySQL.` },
  { patterns: ['hello','hi','hey','sup','good morning','good afternoon'], answer: `Hi there! 👋 I'm Jerico's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch!` },
  { patterns: ['thanks','thank you','appreciate'], answer: `You're welcome! Feel free to ask anything else, or reach out to Jerico at ${DATA.email}.` },
]
const FALLBACK = `I'm not sure about that. You can reach Jerico directly at ${DATA.email} or on LinkedIn: ${DATA.linkedin}`

function getResponse(input) {
  const lower = input.toLowerCase()
  for (const faq of FAQ) {
    if (faq.patterns.some(p => lower.includes(p))) return faq.answer
  }
  return FALLBACK
}

const chatFab      = document.getElementById('chatFab')
const chatWindow   = document.getElementById('chatWindow')
const chatClose    = document.getElementById('chatClose')
const chatMessages = document.getElementById('chatMessages')
const chatInput    = document.getElementById('chatInput')
const chatSend     = document.getElementById('chatSend')
const chatSuggestions = document.getElementById('chatSuggestions')
const chatBadge    = document.getElementById('chatBadge')

let chatOpen = false, chatTyping = false, chatMsgCount = 0

function addMessage(content, role) {
  chatMsgCount++
  if (chatMsgCount > 1) chatSuggestions.style.display = 'none'

  const row = document.createElement('div')
  row.className = `chat-bubble-row ${role}`

  if (role === 'bot') {
    const av = document.createElement('div')
    av.className = 'bubble-avatar'
    av.textContent = 'JJ'
    row.appendChild(av)
  }

  const bubble = document.createElement('div')
  bubble.className = `bubble ${role}`
  bubble.textContent = content
  row.appendChild(bubble)
  chatMessages.appendChild(row)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function showTyping() {
  const row = document.createElement('div')
  row.className = 'chat-bubble-row bot'
  row.id = 'typingRow'
  const av = document.createElement('div')
  av.className = 'bubble-avatar'
  av.textContent = 'JJ'
  const b = document.createElement('div')
  b.className = 'bubble bot'
  b.style.padding = '0'
  b.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>'
  row.appendChild(av)
  row.appendChild(b)
  chatMessages.appendChild(row)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function removeTyping() {
  const el = document.getElementById('typingRow')
  if (el) el.remove()
}

function sendMessage(text) {
  const userText = (text || chatInput.value).trim()
  if (!userText || chatTyping) return
  chatInput.value = ''
  chatInput.style.height = 'auto'
  chatSend.disabled = true
  chatTyping = true
  addMessage(userText, 'user')
  showTyping()
  setTimeout(() => {
    removeTyping()
    const answer = getResponse(userText)
    addMessage(answer, 'bot')
    chatTyping = false
    if (!chatOpen) { chatBadge.classList.add('show') }
  }, 400 + Math.random() * 400)
}

function toggleChat(open) {
  chatOpen = open
  chatFab.classList.toggle('open', open)
  chatWindow.classList.toggle('open', open)
  if (open) {
    chatBadge.classList.remove('show')
    chatFab.innerHTML = open
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    setTimeout(() => chatInput.focus(), 200)
  } else {
    chatFab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  }
}

// Init greeting
addMessage(`Hi! 👋 I'm Jerico's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch!`, 'bot')

chatFab.addEventListener('click', () => toggleChat(!chatOpen))
chatClose.addEventListener('click', () => toggleChat(false))
chatSend.addEventListener('click', () => sendMessage())
chatInput.addEventListener('input', () => {
  chatSend.disabled = !chatInput.value.trim()
  chatInput.style.height = 'auto'
  chatInput.style.height = Math.min(chatInput.scrollHeight, 96) + 'px'
})
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
})
document.querySelectorAll('.suggestion-chip').forEach(chip => {
  chip.addEventListener('click', () => sendMessage(chip.dataset.q))
})

// ── Gallery Slideshow ─────────────────────────────────────────────
;(function () {
  const track      = document.getElementById('galleryTrack')
  const viewport   = document.getElementById('galleryViewport')
  const dotsWrap   = document.getElementById('galleryDots')
  const thumbsWrap = document.getElementById('galleryThumbs')
  const counter    = document.getElementById('galleryCounter')
  const prevBtn    = document.getElementById('galleryPrev')
  const nextBtn    = document.getElementById('galleryNext')

  if (!track) return

  const slides = Array.from(track.querySelectorAll('.gallery-slide'))
  const thumbs = thumbsWrap ? Array.from(thumbsWrap.querySelectorAll('.gallery-thumb')) : []
  const total  = slides.length
  let current  = 0
  let autoTimer = null
  let isDragging = false
  let dragStartX = 0
  let dragDeltaX = 0

  // Build dot buttons
  slides.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '')
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1))
    dot.addEventListener('click', () => goTo(i))
    dotsWrap.appendChild(dot)
  })

  function getDots() { return Array.from(dotsWrap.querySelectorAll('.gallery-dot')) }

  function goTo(index, skipAuto) {
    current = (index + total) % total
    track.style.transform = 'translateX(-' + (current * 100) + '%)'
    counter.textContent = (current + 1) + ' / ' + total

    getDots().forEach((d, i) => d.classList.toggle('active', i === current))

    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === current)
    })
    if (thumbsWrap && thumbs[current]) {
      const thumb = thumbs[current]
      const stripWidth = thumbsWrap.offsetWidth
      const thumbLeft = thumb.offsetLeft
      const thumbWidth = thumb.offsetWidth
      const targetScroll = thumbLeft - (stripWidth / 2) + (thumbWidth / 2)
      thumbsWrap.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }

    if (!skipAuto) resetAuto()
  }

  function next() { goTo(current + 1) }
  function prev() { goTo(current - 1) }

  function resetAuto() {
    clearInterval(autoTimer)
    autoTimer = setInterval(next, 4500)
  }

  nextBtn && nextBtn.addEventListener('click', () => { next(); resetAuto() })
  prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAuto() })

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => goTo(Number(thumb.dataset.index)))
  })

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!viewport) return
    const rect = viewport.getBoundingClientRect()
    const inView = rect.top < window.innerHeight && rect.bottom > 0
    if (!inView) return
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft')  prev()
  })

  // Drag / swipe
  function onDragStart(x) {
    isDragging = true
    dragStartX = x
    dragDeltaX = 0
    track.style.transition = 'none'
    clearInterval(autoTimer)
  }
  function onDragMove(x) {
    if (!isDragging) return
    dragDeltaX = x - dragStartX
    track.style.transform = 'translateX(calc(-' + (current * 100) + '% + ' + dragDeltaX + 'px))'
  }
  function onDragEnd() {
    if (!isDragging) return
    isDragging = false
    track.style.transition = ''
    const threshold = viewport.offsetWidth * 0.2
    if (dragDeltaX < -threshold) next()
    else if (dragDeltaX > threshold) prev()
    else goTo(current, true)
    resetAuto()
  }

  viewport.addEventListener('mousedown',  e => onDragStart(e.clientX))
  viewport.addEventListener('mousemove',  e => onDragMove(e.clientX))
  viewport.addEventListener('mouseup',    onDragEnd)
  viewport.addEventListener('mouseleave', onDragEnd)
  viewport.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true })
  viewport.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true })
  viewport.addEventListener('touchend',   onDragEnd)

  // Pause on hover
  viewport.addEventListener('mouseenter', () => clearInterval(autoTimer))
  viewport.addEventListener('mouseleave', () => resetAuto())

  // Track in nav IntersectionObserver
  const galSection = document.getElementById('gallery')
  if (galSection && typeof io !== 'undefined') io.observe(galSection)

  goTo(0, true)
  resetAuto()

})()

