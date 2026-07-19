import { readdir, readFile } from 'node:fs/promises'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root), 'utf8')
const expectedLanguages = ['ru', 'en', 'es', 'it', 'ko', 'ja', 'zh-Hans']
const html = await read('index.html')
const i18n = await read('src/i18n.js')
const localeFiles = (await readdir(new URL('../src/locales/', import.meta.url), { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
  .map((entry) => entry.name.replace(/\.js$/, ''))
  .sort()

ensure(JSON.stringify(localeFiles) === JSON.stringify([...expectedLanguages].sort()), 'Набор отдельных локалей не совпадает с поддерживаемыми языками.')
const uiKeys = [...html.matchAll(/data-i18n(?:-placeholder|-aria-label|-content)?="([^"]+)"/g)].map((match) => match[1])
const runtimeKeys = ['scan.searching', 'scan.searchingOne', 'scan.searchingTwo', 'scan.searchingThree', 'scan.found', 'share.text', 'share.title', 'feedback.shareSuccess', 'feedback.shareCopied', 'feedback.shareError', 'feedback.promptCopied', 'feedback.promptError']
const keys = new Set([...uiKeys, ...runtimeKeys])

for (const language of expectedLanguages) {
  const source = await read(`src/locales/${language}.js`)
  ensure(source.includes(`locales.${language}`) || source.includes(`locales['${language}']`), `Локаль ${language} не зарегистрирована отдельно.`)
  for (const key of keys) ensure(source.includes(`'${key}'`), `В локали ${language} нет ключа ${key}.`)
}

ensure(i18n.includes("location.protocol") || i18n.includes("script.src = `./src/locales/${language}.js`"), 'Локали должны загружаться отдельными файлами без запроса пользовательского текста.')
ensure(i18n.includes('localStorage') && i18n.includes("document.documentElement.lang"), 'Переключатель языка не сохраняет выбор или не меняет язык документа.')
console.log(`i18n проверено: ${expectedLanguages.length} отдельных локалей, ${keys.size} UI- и рабочих ключей, мгновенное переключение и доступные подписи на месте.`)
