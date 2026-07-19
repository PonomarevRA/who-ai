const supportedLanguages = new Set(['ru', 'en', 'es', 'it', 'ko', 'ja', 'zh-Hans'])
const languageAliases = { zh: 'zh-Hans', 'zh-cn': 'zh-Hans', 'zh-sg': 'zh-Hans' }
const storageKey = 'who-ai.language'
const localeCache = new Map()
const catalogCache = new Map()

const readValue = (object, path) => object?.[path] ?? path.split('.').reduce((value, key) => value?.[key], object)
const normalizeLanguage = (value) => {
  const language = String(value || '').replace('_', '-').trim()
  const lower = language.toLowerCase()
  if (supportedLanguages.has(language)) return language
  if (languageAliases[lower]) return languageAliases[lower]
  const base = lower.split('-')[0]
  return supportedLanguages.has(base) ? base : null
}

function storedLanguage() {
  try { return normalizeLanguage(localStorage.getItem(storageKey)) } catch { return null }
}

function browserLanguage() {
  return navigator.languages?.map(normalizeLanguage).find(Boolean) || normalizeLanguage(navigator.language)
}

function loadLocale(language) {
  if (localeCache.has(language)) return localeCache.get(language)
  const loading = new Promise((resolve, reject) => {
    window.WhoAiLocales = window.WhoAiLocales || {}
    if (window.WhoAiLocales[language]) { resolve(window.WhoAiLocales[language]); return }
    const script = document.createElement('script')
    script.src = `./src/locales/${language}.js`
    script.async = true
    script.onload = () => window.WhoAiLocales[language] ? resolve(window.WhoAiLocales[language]) : reject(new Error('Locale did not register'))
    script.onerror = () => reject(new Error('Locale could not be loaded'))
    document.head.append(script)
  })
  localeCache.set(language, loading)
  return loading
}

function loadCatalog(language) {
  if (language === 'ru') return Promise.resolve(null)
  if (catalogCache.has(language)) return catalogCache.get(language)
  const loading = new Promise((resolve, reject) => {
    window.WhoAiCatalogLocales = window.WhoAiCatalogLocales || {}
    if (window.WhoAiCatalogLocales[language]) { resolve(window.WhoAiCatalogLocales[language]); return }
    const script = document.createElement('script')
    script.src = `./src/locales/catalog/${language}.js`
    script.async = true
    script.onload = () => window.WhoAiCatalogLocales[language] ? resolve(window.WhoAiCatalogLocales[language]) : reject(new Error('Catalog locale did not register'))
    script.onerror = () => reject(new Error('Catalog locale could not be loaded'))
    document.head.append(script)
  })
  catalogCache.set(language, loading)
  return loading
}

export function setupI18n() {
  const select = document.querySelector('#language-select')
  const status = document.querySelector('#language-status')
  let currentLocale = null
  let currentLanguage = 'ru'

  const t = (key, fallback = '') => readValue(currentLocale?.strings, key) || fallback
  const dynamic = (key, fallback = '') => readValue(currentLocale?.dynamic, key) || fallback

  const applyText = () => {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const translated = t(element.dataset.i18n)
      if (translated) element.textContent = translated
    })
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const translated = t(element.dataset.i18nPlaceholder)
      if (translated) element.placeholder = translated
    })
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      const translated = t(element.dataset.i18nAriaLabel)
      if (translated) element.setAttribute('aria-label', translated)
    })
    document.querySelectorAll('[data-i18n-content]').forEach((element) => {
      const translated = t(element.dataset.i18nContent)
      if (translated) element.setAttribute('content', translated)
    })
    document.documentElement.lang = currentLocale?.htmlLang || currentLanguage
    document.title = t('meta.title', currentLocale?.title || document.title)
  }

  const selectLanguage = async (requestedLanguage, { announce = true } = {}) => {
    const language = normalizeLanguage(requestedLanguage) || 'ru'
    if (select) { select.disabled = true; select.setAttribute('aria-busy', 'true') }
    try {
      const [locale, catalog] = await Promise.all([loadLocale(language), loadCatalog(language)])
      currentLocale = locale
      currentLanguage = language
      applyText()
      if (select) select.value = language
      try { localStorage.setItem(storageKey, language) } catch { /* A language can still be used without storage. */ }
      if (announce && status) status.textContent = dynamic('languageChanged', '')
      window.dispatchEvent(new CustomEvent('who-ai:locale-change', { detail: { language, locale, catalog } }))
    } catch {
      if (status) status.textContent = dynamic('languageLoadError', 'Language could not be changed.')
      if (select) select.value = currentLanguage
    } finally {
      if (select) { select.disabled = false; select.removeAttribute('aria-busy') }
    }
  }

  if (select) select.addEventListener('change', () => selectLanguage(select.value))
  const initialLanguage = storedLanguage() || browserLanguage() || 'ru'
  selectLanguage(initialLanguage, { announce: false })

  return { t, dynamic, get language() { return currentLanguage }, get locale() { return currentLocale }, selectLanguage }
}
