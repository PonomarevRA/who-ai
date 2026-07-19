import { readFile, writeFile } from 'node:fs/promises'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import { generateAnimalIdentity } from '../src/mcp/animalIdentity.js'
import { previewSvg } from '../src/share/preview.js'

await initWasm(await readFile(new URL('../node_modules/@resvg/resvg-wasm/index_bg.wasm', import.meta.url)))
const identity = generateAnimalIdentity('кто ты')
await writeFile(new URL('../og-image.png', import.meta.url), new Resvg(previewSvg(identity)).render().asPng())
console.log('Создана OG-картинка главной страницы.')
