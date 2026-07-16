import { adjectives, animals, animalSvg, colors, validateCatalog } from '../src/mcp/animalIdentity.js'

const all = [...animals, ...colors, ...adjectives]
const ensure = (condition, message) => { if (!condition) throw new Error(message) }

ensure(validateCatalog(), 'В одном из каталогов нет ровно 300 уникальных записей и слоганов.')
ensure(new Set(all.map((item) => item.slogan)).size === 900, 'Слоганы должны быть уникальны во всём каталоге.')
ensure(colors.every(({ hex }) => /^#[0-9a-f]{6}$/i.test(hex)), 'Найден неверный HEX-цвет.')
ensure(animals.every((animal, index) => animalSvg(animal, colors[index]).includes(`aria-label="${animal.name}"`)), 'SVG-иконка не подписана названием животного.')
ensure(new Set(animals.map((animal, index) => animalSvg(animal, colors[index]))).size === 300, 'Для каждого звериного образа должна собираться отдельная SVG-иконка.')
ensure(animals.every((animal, index) => animalSvg(animal, colors[index]).includes(colors[index].hex)), 'Цвет SVG не совпадает с цветом результата.')

console.log('Каталог проверен: 300 животных и отдельных SVG, 300 цветов, 300 прилагательных, 900 уникальных слоганов.')
