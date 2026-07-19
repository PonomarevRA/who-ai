import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import { animalSvg, generateAnimalIdentity } from '../src/mcp/animalIdentity.js'

const root = new URL('../', import.meta.url)
const read = (file) => readFile(new URL(file, root))
const identity = generateAnimalIdentity('первый луч')
const encode = (value) => btoa(Array.from(new TextEncoder().encode(value), (byte) => String.fromCharCode(byte)).join(''))
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512"><defs><linearGradient id="b" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#9c72ed"/><stop offset="1" stop-color="#5df4dc"/></linearGradient></defs><rect width="512" height="512" rx="116" fill="url(#b)"/><circle cx="256" cy="236" r="184" fill="#fff" opacity=".24"/><image href="data:image/svg+xml;base64,${encode(animalSvg(identity.animal, identity.color))}" x="76" y="74" width="360" height="320" preserveAspectRatio="xMidYMid meet"/></svg>`

await initWasm(await read('node_modules/@resvg/resvg-wasm/index_bg.wasm'))
for (const [file, size] of [['icons/icon-192.png', 192], ['icons/icon-512.png', 512], ['icons/apple-touch-icon.png', 180]]) {
  await writeFile(new URL(file, root), new Resvg(iconSvg(size)).render().asPng())
}

const findLocaleFiles = async (directory = 'src/locales') => {
  const entries = await readdir(new URL(`${directory}/`, root), { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`
    if (entry.isDirectory()) return findLocaleFiles(path)
    return entry.isFile() && /\.(?:js|json)$/.test(entry.name) ? [path] : []
  }))
  return files.flat().sort()
}
const localeFiles = await findLocaleFiles()
const revisionFiles = ['index.html', 'app.js', 'app-core.js', 'src/style.css', 'favicon.svg', 'site.webmanifest', 'og-image.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', ...localeFiles]
const revision = createHash('sha256')
for (const file of revisionFiles) revision.update(await read(file))
const template = (await read('src/pwa/service-worker.template.js')).toString()
await writeFile(
  new URL('sw.js', root),
  template
    .replace('__CACHE_VERSION__', revision.digest('hex').slice(0, 16))
    .replace('__LOCALE_PATHS__', localeFiles.map((file) => `  './${file}',`).join('\n')),
)
console.log(`Созданы PWA-иконки и версионированный Service Worker; локалей в офлайн-кэше: ${localeFiles.length}.`)
