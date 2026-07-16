import { animals, animalSvg, generateAnimalIdentity, generateIdentityFromIds, validateCatalog } from './mcp/animalIdentity.js'

const form = document.querySelector('#animal-form')
const query = document.querySelector('#query')
const submit = form.querySelector('button')
const result = document.querySelector('#result')
const stage = document.querySelector('#stage')
const stageAnimal = document.querySelector('#stage-animal')
const scanStatus = document.querySelector('#scan-status')
const animalName = document.querySelector('#animal-name')
const animalSlogan = document.querySelector('#animal-slogan')
const colorSlogan = document.querySelector('#color-slogan')
const adjectiveSlogan = document.querySelector('#adjective-slogan')
const dayForecast = document.querySelector('#day-forecast')
const adjectiveTag = document.querySelector('#adjective-tag')
const colorTag = document.querySelector('#color-tag')
const animalTag = document.querySelector('#animal-tag')
const stageCaption = document.querySelector('#stage-caption')
const again = document.querySelector('#again')
const share = document.querySelector('#share')
const page = document.querySelector('.page-shell')
const themeButtons = document.querySelectorAll('[data-theme-button]')
const copyButtons = document.querySelectorAll('[data-copy-prompt]')
const copyFeedback = document.querySelector('#copy-feedback')
let seed = 0
let lastQuery = ''
let searching = false
let currentIdentity = null

// Метрика получает только имена UI-событий — никогда текст поля, ссылки или результат генерации.
function trackMetric(goal) {
  if (typeof window.ym === 'function') window.ym(110799755, 'reachGoal', goal)
}

if (!validateCatalog()) throw new Error('Каталог зверей не прошёл проверку.')
const renderSvg = (svg) => { stageAnimal.innerHTML = svg }
const idleIdentity = generateAnimalIdentity('первый луч')
currentIdentity = idleIdentity
stage.style.setProperty('--accent', idleIdentity.color.hex)
page.dataset.scene = idleIdentity.animal.scene
renderSvg(idleIdentity.svg)

function showAnimal(value, variation = 0) {
  const identity = generateAnimalIdentity(value, variation)
  identity.variation = variation
  showIdentity(identity)
}

function showIdentity(identity) {
  currentIdentity = identity
  animalName.textContent = identity.fullName
  adjectiveTag.textContent = identity.adjective.name
  colorTag.textContent = identity.color.name
  colorTag.style.setProperty('--tag-color', identity.color.hex)
  animalTag.textContent = identity.animal.name
  animalSlogan.textContent = identity.animal.slogan
  colorSlogan.textContent = identity.color.slogan
  adjectiveSlogan.textContent = identity.adjective.slogan
  dayForecast.textContent = identity.dayForecast
  stage.style.setProperty('--accent', identity.color.hex)
  page.dataset.scene = identity.animal.scene
  renderSvg(identity.svg)
  stageCaption.textContent = identity.animal.slogan
  result.hidden = false
  result.classList.remove('is-visible')
  requestAnimationFrame(() => result.classList.add('is-visible'))
}

function scan(value) {
  if (searching) return
  searching = true; result.hidden = true; stage.classList.add('is-searching')
  form.setAttribute('aria-busy', 'true'); submit.disabled = true; submit.firstElementChild.textContent = 'ищем…'
  const frames = ['Сверяем следы…', 'Сканируем характер…', 'Ловим твой цвет…']; let tick = 0
  const spinner = window.setInterval(() => {
    const candidate = animals[Math.floor(Math.random() * animals.length)]
    const color = generateAnimalIdentity(`${value}-${tick}`, tick).color
    stage.style.setProperty('--accent', color.hex); page.dataset.scene = candidate.scene; renderSvg(animalSvg(candidate, color)); scanStatus.textContent = frames[tick % frames.length]; tick += 1
  }, 120)
  window.setTimeout(() => {
    window.clearInterval(spinner); stage.classList.remove('is-searching'); scanStatus.textContent = 'Нашли!'
    showAnimal(value, seed); form.removeAttribute('aria-busy'); submit.disabled = false; submit.firstElementChild.textContent = 'найти меня'; searching = false
  }, 1450)
}

form.addEventListener('submit', (event) => { event.preventDefault(); lastQuery = query.value; seed = 0; scan(lastQuery) })
again.addEventListener('click', () => { seed += 1; scan(lastQuery || query.value) })
share.addEventListener('click', async () => {
  trackMetric('share_click')
  const params = new URLSearchParams({ a: currentIdentity.animal.id, c: currentIdentity.color.id, v: String(currentIdentity.variation || 0) })
  const shareUrl = `${location.href.split('#')[0].split('?')[0]}#${params.toString()}`
  try {
    await navigator.clipboard.writeText(shareUrl)
    copyFeedback.textContent = 'Ссылка на образ скопирована — в ней нет введённого текста.'
  } catch {
    copyFeedback.textContent = 'Не удалось скопировать ссылку автоматически.'
  }
})

const sceneDescriptions = {
  forest: 'сказочный лес с высокими деревьями и мягким светом между кронами',
  water: 'сверкающая вода, волны и воздушные брызги',
  cosmos: 'глубокий космос, звёздная пыль и сияющие созвездия',
  mist: 'таинственный туман, мягкие силуэты холмов и лунное свечение',
}
const imageStyles = {
  pastel: 'мягкая пастельная 3D-иллюстрация, сахарный космос, сиреневые и персиковые переливы, округлые дружелюбные формы, деликатное студийное освещение',
  neon: 'контрастная неоновая иллюстрация, дикий сафари-футуризм, тёмный индиго-фон, лаймовое и коралловое свечение, чёткие графичные контуры',
}

function imagePrompt(identity, style) {
  return `Создай квадратную иллюстрацию 1:1. Главный персонаж — ${identity.animal.name}, образ: «${identity.fullName}». Окрас и главный акцент: ${identity.color.name} (${identity.color.hex}); животное должно быть окрашено именно этим цветом с живым градиентом. Фон: ${sceneDescriptions[identity.animal.scene]}. Характер персонажа: ${identity.adjective.name}. Сюжетное описание: ${identity.animal.slogan} ${identity.color.slogan} ${identity.adjective.slogan} Сегодняшнее настроение: ${identity.dayForecast} Стиль: ${imageStyles[style]}. Животное крупно в центре, выразительная поза, чистая композиция, без надписей, логотипов и рамок.`
}

let themeMode = 'auto'
function getAutoTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'neon'
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'pastel'
  const hour = new Date().getHours()
  return hour >= 19 || hour < 7 ? 'neon' : 'pastel'
}

function setTheme(mode) {
  themeMode = mode
  const appliedTheme = mode === 'auto' ? getAutoTheme() : mode
  page.dataset.theme = appliedTheme
  document.querySelector('meta[name="theme-color"]').content = appliedTheme === 'neon' ? '#121021' : '#f5f0ff'
  themeButtons.forEach((button) => {
    const active = button.dataset.themeButton === mode
    button.classList.toggle('is-active', active)
    button.setAttribute('aria-pressed', String(active))
  })
}

themeButtons.forEach((button) => button.addEventListener('click', () => setTheme(button.dataset.themeButton)))
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (themeMode === 'auto') setTheme('auto') })
window.setInterval(() => { if (themeMode === 'auto') setTheme('auto') }, 60_000)
setTheme('auto')
copyButtons.forEach((button) => button.addEventListener('click', async () => {
  trackMetric(`copy_ai_${button.dataset.copyPrompt}`)
  const prompt = imagePrompt(currentIdentity, button.dataset.copyPrompt)
  try {
    await navigator.clipboard.writeText(prompt)
    copyFeedback.textContent = 'Промпт скопирован.'
  } catch {
    copyFeedback.textContent = 'Не удалось скопировать автоматически — откройте сайт по HTTPS или localhost.'
  }
}))

const sharedParams = new URLSearchParams(location.hash.slice(1))
const sharedIdentity = generateIdentityFromIds(sharedParams.get('a'), sharedParams.get('c'), Number(sharedParams.get('v')) || 0)
if (sharedIdentity) showIdentity(sharedIdentity)
