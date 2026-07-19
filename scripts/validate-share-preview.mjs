import { readFile } from 'node:fs/promises'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import { appResultUrl, previewIdentityFromUrl, previewPage, previewSvg } from '../src/share/preview.js'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const preview = previewIdentityFromUrl('https://preview.example/share?a=animal-1&c=color-1&v=0&secret=Рома')

ensure(preview, 'Worker не распознаёт публичные ID результата.')
ensure(preview.params.toString() === 'a=animal-1&c=color-1&v=0', 'В ссылке превью должны оставаться только ID результата.')
const targetUrl = appResultUrl('https://fun-who-ai.twc1.net', preview.params)
const page = previewPage({ identity: preview.identity, params: preview.params, appOrigin: 'https://fun-who-ai.twc1.net', workerOrigin: 'https://preview.example' })
ensure(page.includes('property="og:image"') && page.includes('image/png'), 'Не собраны Open Graph-метаданные PNG-превью.')
ensure(page.includes(targetUrl.replaceAll('&', '&amp;')) && !page.includes('Рома') && !page.includes('secret='), 'В превью или ссылку попал пользовательский ввод.')
ensure(page.includes('name="robots" content="noindex,follow"') && page.includes('rel="canonical" href="https://fun-who-ai.twc1.net/"'), 'Ссылки с результатами не должны создавать поисковые дубли.')

await initWasm(await readFile(new URL('../node_modules/@resvg/resvg-wasm/index_bg.wasm', import.meta.url)))
const png = new Resvg(previewSvg(preview.identity)).render().asPng()
ensure(png[0] === 137 && png[1] === 80 && png.length > 1000, 'SVG не конвертируется в PNG для превью.')

console.log('Превью проверено: только публичные ID, корректные OG-теги и PNG из SVG.')
