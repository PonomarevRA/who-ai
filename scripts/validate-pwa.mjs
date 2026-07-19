import { readdir, readFile } from 'node:fs/promises'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root))
const findLocaleFiles = async (directory = 'src/locales') => {
  const entries = await readdir(new URL(`../${directory}/`, import.meta.url), { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`
    if (entry.isDirectory()) return findLocaleFiles(path)
    return entry.isFile() && /\.(?:js|json)$/.test(entry.name) ? [path] : []
  }))
  return files.flat().sort()
}
const localeFiles = await findLocaleFiles()
const [manifest, worker, main, icon192, icon512, appleIcon] = await Promise.all([
  read('site.webmanifest').then(String), read('sw.js').then(String), read('src/main.js').then(String), read('icons/icon-192.png'), read('icons/icon-512.png'), read('icons/apple-touch-icon.png'),
])

ensure(manifest.includes('"display": "standalone"') && manifest.includes('"start_url": "./"') && manifest.includes('"purpose": "any maskable"'), 'Manifest не готов к установке PWA.')
for (const icon of [icon192, icon512, appleIcon]) ensure(icon[0] === 137 && icon[1] === 80, 'Одна из PWA-иконок не является PNG.')
ensure(/who-ai-shell-[0-9a-f]{16}/.test(worker), 'Service Worker не содержит revision кэша.')
ensure(worker.includes("'./app-core.js'"), 'Service Worker не кэширует отложенный основной JavaScript.')
ensure(worker.includes("url.search || !isStaticAsset(url)") && !worker.includes('mc.yandex.ru') && !worker.includes('share?'), 'Service Worker может кэшировать внешние запросы или параметры.')
ensure(!/addEventListener\('install'[\s\S]{0,300}skipWaiting/.test(worker), 'Новый Service Worker не должен принудительно прерывать открытую сессию.')
ensure(main.includes("location.protocol === 'file:'") && main.includes("navigator.serviceWorker.register('./sw.js'"), 'Регистрация Service Worker не безопасна для file:// или отсутствует.')
ensure(localeFiles.length > 0, 'Для офлайн-версии не найдены отдельные файлы локалей.')
for (const file of localeFiles) ensure(worker.includes(`./${file}`), `Локаль ${file} не добавлена в офлайн-кэш PWA.`)

console.log(`PWA проверено: версионированный локальный кэш, локалей: ${localeFiles.length}; иконки и безопасная регистрация готовы.`)
