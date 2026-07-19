const CACHE_NAME = 'who-ai-shell-32e04c06b077f0a6'
const SHELL_PATHS = [
  './', './index.html', './app.js', './app-core.js', './src/style.css', './favicon.svg', './site.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './og-image.png',
    './src/locales/catalog/en.js',
  './src/locales/catalog/es.js',
  './src/locales/catalog/it.js',
  './src/locales/catalog/ja.js',
  './src/locales/catalog/ko.js',
  './src/locales/catalog/zh-Hans.js',
  './src/locales/en.js',
  './src/locales/es.js',
  './src/locales/it.js',
  './src/locales/ja.js',
  './src/locales/ko.js',
  './src/locales/ru.js',
  './src/locales/zh-Hans.js',
]
const scopeUrl = (path) => new URL(path, self.registration.scope).toString()
const SHELL_URLS = new Set(SHELL_PATHS.map(scopeUrl))
const isStaticAsset = (url) => SHELL_URLS.has(url.href) || /\/assets\//.test(url.pathname)

async function precacheShell() {
  const cache = await caches.open(CACHE_NAME)
  try {
    for (const path of SHELL_PATHS) {
      const request = new Request(scopeUrl(path), { cache: 'reload' })
      const response = await fetch(request)
      if (!response.ok || response.type === 'opaque') throw new Error(`Cannot cache ${path}`)
      await cache.put(request, response.clone())
    }
  } catch (error) {
    await caches.delete(CACHE_NAME)
    throw error
  }
}

self.addEventListener('install', (event) => event.waitUntil(precacheShell()))
self.addEventListener('activate', (event) => event.waitUntil((async () => {
  const names = await caches.keys()
  await Promise.all(names.filter((name) => name.startsWith('who-ai-shell-') && name !== CACHE_NAME).map((name) => caches.delete(name)))
  await self.clients.claim()
})()))
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

async function cachedShell(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  const update = fetch(new Request(request, { cache: 'no-cache' })).then(async (response) => {
    if (response.ok && response.type !== 'opaque') await cache.put(request, response.clone())
    return response
  })
  if (cached) return { response: cached, update }
  return { response: await update, update: Promise.resolve() }
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.search || !isStaticAsset(url)) return
  event.respondWith((async () => {
    try {
      const { response, update } = await cachedShell(request)
      event.waitUntil(update.catch(() => undefined))
      return response
    } catch {
      if (request.mode === 'navigate') return (await caches.open(CACHE_NAME)).match(scopeUrl('./index.html'))
      return new Response('Offline', { status: 503, statusText: 'Offline' })
    }
  })())
})
