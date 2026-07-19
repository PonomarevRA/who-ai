import { readFile } from 'node:fs/promises'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root), 'utf8')
const [guide, html, main] = await Promise.all(['llms.txt', 'index.html', 'src/main.js'].map(read))

for (const phrase of [
  'https://fun-who-ai.twc1.net/', 'найти меня', 'ещё вариант', 'сахарный космос', 'неоновый сафари',
  '#a=animal-id&c=color-id&v=0', 'Русский', 'English', 'Español', 'Italiano', '한국어', '日本語', '中文',
  'HTTPS', 'file://', 'введённое слово', 'Не называйте результат', 'клавиатуры', 'семь языков', 'нет отдельной картинки',
]) ensure(guide.includes(phrase), `В подсказке для ИИ нет важного пункта: ${phrase}`)

ensure(html.includes('href="./llms.txt"') && html.includes('title="Инструкция для ИИ-ассистентов"'), 'Главная страница не ссылается на инструкцию для ИИ.')
ensure(main.includes("const sharedParams = new URLSearchParams(location.hash.slice(1))"), 'Инструкция о hash-ссылке не соответствует реализации.')
console.log('Подсказка для ИИ проверена: сценарий страницы, языки, приватность, доступность, PWA и hash-ссылки описаны.')
