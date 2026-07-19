import { animals, animalSvg, generateAnimalIdentity, generateIdentityFromIds, validateCatalog } from './mcp/animalIdentity.js'
import { setupI18n } from './i18n.js'
import { localizeIdentity } from './catalogI18n.js'

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
const floatingFeedback = document.querySelector('#floating-feedback')
const sharePreviewOrigin = document.querySelector('meta[name="share-preview-origin"]')?.content.trim()
const i18n = setupI18n()
const text = (key, fallback) => i18n.t(key, fallback)
const interpolate = (template, values = {}) => Object.entries(values).reduce((value, [name, replacement]) => value.replaceAll(`{${name}}`, replacement), template)
const dynamicText = (key, fallback, values = {}) => interpolate(i18n.dynamic(key, fallback), values)
let seed = 0
let lastQuery = ''
let searching = false
let currentIdentity = null
let currentCatalog = null
let floatingFeedbackTimer = 0
let sharing = false

function showFloatingFeedback(message, source) {
  floatingFeedback.textContent = message
  const rect = source.getBoundingClientRect()
  const left = Math.max(16, Math.min(window.innerWidth - 16, rect.left + rect.width / 2))
  const top = Math.max(18, rect.top)
  floatingFeedback.style.left = `${left}px`
  floatingFeedback.style.top = `${top}px`
  window.clearTimeout(floatingFeedbackTimer)
  floatingFeedback.hidden = false
  requestAnimationFrame(() => floatingFeedback.classList.add('is-visible'))
  floatingFeedbackTimer = window.setTimeout(() => {
    floatingFeedback.classList.remove('is-visible')
    window.setTimeout(() => { floatingFeedback.hidden = true }, 180)
  }, 3_000)
}

function registerOfflineShell() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return
  const update = (registration) => registration.update().catch(() => undefined)
  navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' })
    .then((registration) => {
      window.addEventListener('online', () => update(registration))
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') update(registration) })
    })
    .catch(() => undefined)
}
window.addEventListener('load', registerOfflineShell, { once: true })

// Метрика получает только имена UI-событий — никогда текст поля, ссылки или результат генерации.
function trackMetric(goal, params) {
  if (typeof window.ym === 'function') window.ym(110799755, 'reachGoal', goal, params)
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

function renderIdentityText(identity) {
  const localized = localizeIdentity(identity, currentCatalog)
  animalName.textContent = localized.fullName
  adjectiveTag.textContent = localized.adjectiveName
  colorTag.textContent = localized.colorName
  colorTag.style.setProperty('--tag-color', identity.color.hex)
  animalTag.textContent = localized.animalName
  animalSlogan.textContent = localized.animalSlogan
  colorSlogan.textContent = localized.colorSlogan
  adjectiveSlogan.textContent = localized.adjectiveSlogan
  dayForecast.textContent = localized.dayForecast
  stageCaption.textContent = localized.animalSlogan
  return localized
}

function showIdentity(identity) {
  currentIdentity = identity
  trackMetric('identity_result', {
    animal_id: identity.animal.id,
    animal: identity.animal.name,
    color_id: identity.color.id,
    color: identity.color.name,
    adjective_id: identity.adjective.id,
    adjective: identity.adjective.name,
  })
  const localized = renderIdentityText(identity)
  stage.style.setProperty('--accent', identity.color.hex)
  page.dataset.scene = identity.animal.scene
  renderSvg(localized.svg)
  stage.classList.remove('is-revealing')
  requestAnimationFrame(() => stage.classList.add('is-revealing'))
  result.hidden = false
  result.classList.remove('is-visible')
  requestAnimationFrame(() => result.classList.add('is-visible'))
}

window.addEventListener('who-ai:locale-change', (event) => {
  currentCatalog = event.detail.catalog
  if (currentIdentity) renderSvg(renderIdentityText(currentIdentity).svg)
})

function scan(value) {
  if (searching) return
  searching = true; result.hidden = true; stage.classList.add('is-searching')
  form.setAttribute('aria-busy', 'true'); submit.disabled = true; submit.firstElementChild.textContent = text('scan.searching', 'ищем…')
  const frames = [text('scan.searchingOne', 'Сверяем следы…'), text('scan.searchingTwo', 'Сканируем характер…'), text('scan.searchingThree', 'Ловим твой цвет…')]; let tick = 0
  const spinner = window.setInterval(() => {
    const candidate = animals[Math.floor(Math.random() * animals.length)]
    const color = generateAnimalIdentity(`${value}-${tick}`, tick).color
    stage.style.setProperty('--accent', color.hex); page.dataset.scene = candidate.scene; renderSvg(animalSvg(candidate, color)); scanStatus.textContent = frames[tick % frames.length]; tick += 1
  }, 120)
  window.setTimeout(() => {
    window.clearInterval(spinner); stage.classList.remove('is-searching'); scanStatus.textContent = text('scan.found', 'Нашли!')
    showAnimal(value, seed); form.removeAttribute('aria-busy'); submit.disabled = false; submit.firstElementChild.textContent = text('search.submit', 'найти меня'); searching = false
  }, 1450)
}

form.addEventListener('submit', (event) => { event.preventDefault(); lastQuery = query.value; seed = 0; scan(lastQuery) })
again.addEventListener('click', () => { seed += 1; scan(lastQuery || query.value) })
async function shareCurrentIdentity(event) {
  if (sharing) return
  sharing = true
  const source = event?.currentTarget || share
  trackMetric('share_open')
  const params = new URLSearchParams({ a: currentIdentity.animal.id, c: currentIdentity.color.id, v: String(currentIdentity.variation || 0) })
  const fallbackUrl = `${location.href.split('#')[0].split('?')[0]}#${params.toString()}`
  const shareUrl = sharePreviewOrigin ? `${sharePreviewOrigin.replace(/\/$/, '')}/share?${params.toString()}` : fallbackUrl
  const localized = localizeIdentity(currentIdentity, currentCatalog)
  const shareText = text('share.text', `Я — ${localized.fullName} 🐾 А кто ты?`).replace('{identity}', localized.fullName)
  const isMobile = navigator.maxTouchPoints > 0 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  try {
    if (isMobile && navigator.share) {
      await navigator.share({ title: text('share.title', 'Кто ты сегодня?'), text: shareText, url: shareUrl })
      trackMetric('share_success')
      showFloatingFeedback(text('feedback.shareSuccess', 'Готово! Отправь другу — пусть узнает своего зверя.'), source)
      return
    }
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
    trackMetric('share_copy_fallback')
    showFloatingFeedback(text('feedback.shareCopied', 'Готово! Текст и ссылка скопированы — отправь другу.'), source)
  } catch (error) {
    if (error.name !== 'AbortError') showFloatingFeedback(text('feedback.shareError', 'Не удалось поделиться автоматически.'), source)
  } finally {
    sharing = false
  }
}

share.addEventListener('click', shareCurrentIdentity)
stageAnimal.addEventListener('click', shareCurrentIdentity)
stageAnimal.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  shareCurrentIdentity(event)
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
  const localized = localizeIdentity(identity, currentCatalog)
  const fallback = 'Создай квадратную иллюстрацию 1:1. Главный персонаж — {animal}, образ: «{identity}». Окрас и главный акцент: {color} ({hex}); животное должно быть окрашено именно этим цветом с живым градиентом. Фон: {scene}. Характер персонажа: {adjective}. Сюжетное описание: {animalSlogan} {colorSlogan} {adjectiveSlogan} Сегодняшнее настроение: {forecast} Стиль: {style}. Животное крупно в центре, выразительная поза, чистая композиция, без надписей, логотипов и рамок.'
  return dynamicText('imagePrompt', fallback, {
    animal: localized.animalName,
    identity: localized.fullName,
    color: localized.colorName,
    hex: identity.color.hex,
    scene: i18n.dynamic(`scene.${identity.animal.scene}`, sceneDescriptions[identity.animal.scene]),
    adjective: localized.adjectiveName,
    animalSlogan: localized.animalSlogan,
    colorSlogan: localized.colorSlogan,
    adjectiveSlogan: localized.adjectiveSlogan,
    forecast: localized.dayForecast,
    style: i18n.dynamic(`style.${style}`, imageStyles[style]),
  })
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
copyButtons.forEach((button) => button.addEventListener('click', async (event) => {
  trackMetric(`copy_ai_${button.dataset.copyPrompt}`)
  const prompt = imagePrompt(currentIdentity, button.dataset.copyPrompt)
  try {
    await navigator.clipboard.writeText(prompt)
    showFloatingFeedback(text('feedback.promptCopied', 'Промпт скопирован.'), event.currentTarget)
  } catch {
    showFloatingFeedback(text('feedback.promptError', 'Не удалось скопировать автоматически — откройте сайт по HTTPS или localhost.'), event.currentTarget)
  }
}))

const sharedParams = new URLSearchParams(location.hash.slice(1))
const sharedIdentity = generateIdentityFromIds(sharedParams.get('a'), sharedParams.get('c'), Number(sharedParams.get('v')) || 0)
if (sharedIdentity) showIdentity(sharedIdentity)
