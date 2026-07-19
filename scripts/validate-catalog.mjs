import { adjectives, animals, animalSvg, colors, getDailyForecast, validateCatalog } from '../src/mcp/animalIdentity.js'

const all = [...animals, ...colors, ...adjectives]
const ensure = (condition, message) => { if (!condition) throw new Error(message) }

ensure(validateCatalog(), 'В одном из каталогов нет ровно 300 уникальных записей и слоганов.')
ensure(new Set(all.map((item) => item.slogan)).size === 900, 'Слоганы должны быть уникальны во всём каталоге.')
ensure(colors.every(({ hex }) => /^#[0-9a-f]{6}$/i.test(hex)), 'Найден неверный HEX-цвет.')
ensure(new Set(colors.map(({ hex }) => hex)).size === 300, 'У каждого из 300 цветов должен быть свой HEX-код.')

const moodNames = ['светлый', 'искрящийся', 'туманный', 'лунный', 'сочный', 'бархатный', 'утренний', 'глубокий', 'неоновый', 'тихий']
const expectedBaseHues = new Map([
  ['алый', 4], ['коралловый', 12], ['персиковый', 24], ['янтарный', 38], ['лимонный', 53], ['оливковый', 73], ['мятный', 145], ['изумрудный', 160], ['бирюзовый', 178], ['лазурный', 195], ['небесный', 208], ['сапфировый', 222], ['индиго', 240], ['аметистовый', 266], ['сиреневый', 280], ['лавандовый', 292], ['малиновый', 330], ['розовый', 344], ['пудровый', 355], ['шоколадный', 24], ['песочный', 42], ['карамельный', 31], ['дымчатый', 220], ['графитовый', 230], ['серебряный', 210], ['золотой', 45], ['медный', 18], ['кофейный', 29], ['нефритовый', 155], ['арктический', 190],
])
const hexToHsl = (hex) => {
  const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const max = Math.max(...rgb); const min = Math.min(...rgb); const delta = max - min
  const lightness = (max + min) / 2
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  let hue = 0
  if (delta !== 0) {
    if (max === rgb[0]) hue = 60 * (((rgb[1] - rgb[2]) / delta) % 6)
    else if (max === rgb[1]) hue = 60 * ((rgb[2] - rgb[0]) / delta + 2)
    else hue = 60 * ((rgb[0] - rgb[1]) / delta + 4)
  }
  return { hue: (hue + 360) % 360, saturation: saturation * 100, lightness: lightness * 100 }
}
const hueDistance = (first, second) => Math.min(Math.abs(first - second), 360 - Math.abs(first - second))
const paletteGroups = new Map()
for (const color of colors) {
  const mood = moodNames.find((item) => color.name.startsWith(`${item} `))
  const base = color.name.slice(mood.length + 1)
  const hsl = hexToHsl(color.hex)
  ensure(expectedBaseHues.has(base), `Неизвестная базовая палитра: ${base}`)
  if (hsl.saturation >= 12) ensure(hueDistance(hsl.hue, expectedBaseHues.get(base)) <= 12, `Оттенок «${color.name}» ушёл от базового цвета.`)
  paletteGroups.set(base, { ...(paletteGroups.get(base) || {}), [mood]: hsl })
}
for (const [base, moods] of paletteGroups) {
  ensure(moods.светлый.lightness > moods.бархатный.lightness && moods.светлый.lightness > moods.глубокий.lightness, `Светлый ${base} должен быть светлее бархатного и глубокого.`)
  ensure(moods.глубокий.lightness < moods.бархатный.lightness, `Глубокий ${base} должен быть самым тёмным вариантом.`)
  ensure(moods.искрящийся.saturation > moods.туманный.saturation, `Искрящийся ${base} должен быть насыщеннее туманного.`)
  ensure(moods.неоновый.saturation > moods.тихий.saturation, `Неоновый ${base} должен быть насыщеннее тихого.`)
}

const morningForecast = getDailyForecast('Рома', new Date('2026-07-17T09:00:00+03:00'))
const eveningForecast = getDailyForecast('Рома', new Date('2026-07-17T17:00:00+03:00'))
ensure(morningForecast === getDailyForecast('Рома', new Date('2026-07-17T09:00:00+03:00')), 'Прогноз должен быть стабильным в пределах даты и периода.')
ensure(morningForecast !== eveningForecast, 'Прогноз должен меняться после 16:00.')
ensure(morningForecast.split(/(?<=\.) /).length === 3, 'Прогноз должен состоять из трёх предложений.')
const forecastVariants = new Set(Array.from({ length: 300 }, (_, index) => getDailyForecast(`герой-${index}`, new Date('2026-07-17T09:00:00+03:00'))))
ensure(forecastVariants.size >= 280, 'Нужно больше разнообразных составных прогнозов.')

const isSafeSvg = (svg) => !/undefined|null|NaN|\[object Object\]|<script|<animate|onload=|onclick=/i.test(svg)
const anatomyOf = (svg) => [...svg.matchAll(/data-anatomy="([^"]+)"/g)].map(([, name]) => name)
const uniqueSpecies = [...new Map(animals.map((animal) => [animal.speciesName, animal])).values()]

ensure(uniqueSpecies.length === 75, 'Ожидалось 75 самостоятельных видов животных.')
const speciesFingerprints = uniqueSpecies.map((animal) => anatomyOf(animalSvg(animal, colors[0])).join('|'))
ensure(speciesFingerprints.every((fingerprint) => fingerprint.split('|').length >= 5), 'У каждого вида должны быть минимум пять анатомических деталей.')
ensure(new Set(speciesFingerprints).size === 75, 'Анатомический профиль каждого вида должен быть уникальным.')

const requiredDetails = new Map([
  ['тапир', ['muzzle-tapir-trunk']], ['жираф', ['append-ossicones', 'body-giraffe-neck', 'mark-giraffe-patches']], ['слон', ['muzzle-trunk', 'append-elephant-tusks']], ['носорог', ['append-rhino-horn']], ['кенгуру', ['append-kangaroo-tail']], ['бизон', ['body-bison-hump']],
  ['дельфин', ['body-dolphin-rostrum']], ['кит', ['body-whale-flukes']], ['акула', ['body-shark-profile']], ['белуха', ['head-beluga-melon']], ['краб', ['body-crab-eyestalks']], ['черепаха', ['body-turtle-scutes']],
  ['крокодил', ['body-croc-teeth']], ['змея', ['body-snake-tongue']], ['сова', ['face-owl-discs']], ['фламинго', ['body-flamingo-neck']], ['павлин', ['body-peacock-fan']],
])
for (const [speciesName, required] of requiredDetails) {
  const animal = uniqueSpecies.find((item) => item.speciesName === speciesName)
  const details = anatomyOf(animalSvg(animal, colors[0]))
  ensure(required.every((detail) => details.includes(detail)), `У «${speciesName}» нет обязательной анатомической детали.`)
}

for (const animal of uniqueSpecies) {
  const svg = animalSvg(animal, colors[0])
  ensure(svg.includes('class="animal-svg"') && svg.includes('data-motion="body"'), `Нет базовой анимационной разметки: ${animal.speciesName}`)
  ensure(svg.includes('data-motion="glow"') && svg.includes('data-layer="scene"'), `Нет свечения или сцены: ${animal.speciesName}`)
  if (['land', 'big', 'spiky', 'reptile', 'bird'].includes(animal.kind)) ensure(svg.includes('data-motion="eyes"'), `Нет анимации глаз: ${animal.speciesName}`)
  if (animal.kind === 'bird') ensure(svg.includes('data-motion="wings"') || (animal.speciesName === 'пингвин' && svg.includes('data-motion="water-part"')), `Нет анимации крыльев: ${animal.speciesName}`)
}

for (const animal of animals) {
  for (const color of colors) {
    const svg = animalSvg(animal, color)
    const gradientId = `gradient-${animal.id}-${color.id}`
    ensure(svg.startsWith('<svg ') && svg.endsWith('</svg>'), `Некорректная SVG-оболочка: ${animal.id}/${color.id}`)
    ensure(svg.includes('viewBox="0 0 160 130"') && svg.includes('role="img"'), `Нет доступной структуры SVG: ${animal.id}/${color.id}`)
    ensure(svg.includes(`aria-labelledby="title-${animal.id}-${color.id}"`) && svg.includes(`<title id="title-${animal.id}-${color.id}">${animal.name}`), `SVG-иконка не подписана: ${animal.id}/${color.id}`)
    ensure(svg.includes(`data-icon-type="${animal.iconType}"`) && svg.includes(`data-scene="${animal.scene}"`), `Нет метаданных иконки: ${animal.id}/${color.id}`)
    ensure(svg.includes(`<linearGradient id="${gradientId}"`) && svg.includes(`url(#${gradientId})`), `Сломана заливка SVG: ${animal.id}/${color.id}`)
    ensure(svg.includes(color.hex), `Цвет SVG не совпадает с результатом: ${animal.id}/${color.id}`)
    ensure(anatomyOf(svg).length >= 5 && svg.includes('.line{fill:none') && svg.indexOf('data-layer="behind"') < svg.indexOf('data-layer="base"') && svg.indexOf('data-layer="base"') < svg.indexOf('data-layer="markings"') && svg.indexOf('data-layer="markings"') < svg.indexOf('data-layer="face"') && isSafeSvg(svg), `Некорректная анатомия или разметка: ${animal.id}/${color.id}`)
  }
}
ensure(new Set(animals.map((animal, index) => animalSvg(animal, colors[index]))).size === 300, 'Для каждого звериного образа должна собираться отдельная SVG-иконка.')

console.log('Каталог проверен: 300 животных, 75 уникальных анатомических профилей с 5+ деталями, 90 000 SVG-пар, 300 уникальных цветов, 300 прилагательных, 900 уникальных слоганов.')
