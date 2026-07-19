import { readdir, readFile } from 'node:fs/promises'
import vm from 'node:vm'
import { animals, colors, adjectives, generateAnimalIdentity } from '../src/mcp/animalIdentity.js'
import { localizeIdentity, validateCatalogLocale } from '../src/catalogI18n.js'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root), 'utf8')
const expected = ['en', 'es', 'it', 'ko', 'ja', 'zh-Hans']
const files = (await readdir(new URL('../src/locales/catalog/', import.meta.url)))
  .filter((file) => file.endsWith('.js'))
  .map((file) => file.replace(/\.js$/, ''))
  .sort()
ensure(JSON.stringify(files) === JSON.stringify([...expected].sort()), 'Набор локализованных каталогов не совпадает с поддерживаемыми языками.')

for (const language of expected) {
  const context = { window: {} }
  vm.runInNewContext(await read(`src/locales/catalog/${language}.js`), context)
  const catalog = context.window.WhoAiCatalogLocales?.[language]
  ensure(validateCatalogLocale(catalog), `Каталог ${language} имеет неполную структуру.`)
  const animalNames = new Set()
  const colorNames = new Set()
  const adjectiveNames = new Set()
  const animalSlogans = new Set()
  const colorSlogans = new Set()
  const adjectiveSlogans = new Set()
  for (let index = 0; index < 300; index += 1) {
    const localized = localizeIdentity({ animal: animals[index], color: colors[index], adjective: adjectives[index], query: `catalog-${index}`, forecastKey: `catalog-${index}`, fullName: '', dayForecast: '', svg: '' }, catalog)
    for (const [key, value] of Object.entries(localized).filter(([key]) => key !== 'svg')) ensure(typeof value === 'string' && !value.includes('{'), `В каталоге ${language} остался шаблон без подстановки.`)
    animalNames.add(localized.animalName); colorNames.add(localized.colorName); adjectiveNames.add(localized.adjectiveName)
    animalSlogans.add(localized.animalSlogan); colorSlogans.add(localized.colorSlogan); adjectiveSlogans.add(localized.adjectiveSlogan)
  }
  ensure(animalNames.size === 300 && colorNames.size === 300 && adjectiveNames.size === 300, `В каталоге ${language} повторяются названия результатов.`)
  ensure(animalSlogans.size === 300 && colorSlogans.size === 300 && adjectiveSlogans.size === 300, `В каталоге ${language} повторяются слоганы.`)
  const preview = localizeIdentity(generateAnimalIdentity('локальный тест'), catalog)
  ensure(preview.dayForecast.length > 20 && preview.fullName.length > 3, `В каталоге ${language} не собирается реальный результат.`)
}
console.log(`Локализованные каталоги проверены: русский базовый и ${expected.length} отдельных языков, по 300 животных, цветов, прилагательных и слоганов.`)
