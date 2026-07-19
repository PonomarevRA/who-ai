import { readFile } from 'node:fs/promises'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root), 'utf8')
const [html, robots, sitemap, manifest] = await Promise.all(['index.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest'].map(read))

ensure(html.includes('<link rel="canonical" href="https://fun-who-ai.twc1.net/"'), 'Нет канонического URL.')
ensure(html.includes('name="robots" content="index, follow, max-image-preview:large"'), 'Нет разрешения индексации и предпросмотра изображений.')
ensure(html.includes('property="og:image" content="https://fun-who-ai.twc1.net/og-image.png"'), 'Нет постоянной OG-картинки.')
ensure(html.includes('FAQPage') && html.includes('Как найти своего зверька?') && html.includes('Частые вопросы'), 'Нет статичного полезного контента и FAQ.')
ensure(!html.includes('генератор аватаров') && !html.includes('SVG-аватар') && !html.includes('хеш от слова'), 'В описании или FAQ остались сложные технические слова.')
ensure(robots.includes('Allow: /') && robots.includes('Sitemap: https://fun-who-ai.twc1.net/sitemap.xml'), 'robots.txt не открывает каноническую страницу.')
ensure(sitemap.includes('<loc>https://fun-who-ai.twc1.net/</loc>') && !sitemap.includes('#'), 'Sitemap содержит некорректный URL.')
ensure(manifest.includes('"name": "Кто ты?'), 'Нет web manifest.')

console.log('SEO проверено: canonical, сниппет, robots, sitemap, manifest и статичный контент на месте.')
