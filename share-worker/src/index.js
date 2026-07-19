import { Resvg, initWasm } from '@resvg/resvg-wasm'
import wasm from '@resvg/resvg-wasm/index_bg.wasm'
import { previewIdentityFromUrl, previewPage, previewSvg } from '../../src/share/preview.js'

let wasmReady
const initRenderer = () => {
  if (!wasmReady) wasmReady = initWasm(wasm)
  return wasmReady
}
const securityHeaders = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' }

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const preview = previewIdentityFromUrl(url)
    if (!preview) return new Response('Unknown animal or color ID.', { status: 404, headers: securityHeaders })

    const appOrigin = env.APP_ORIGIN || 'https://fun-who-ai.twc1.net'
    if (url.pathname === '/og.png') {
      await initRenderer()
      const png = new Resvg(previewSvg(preview.identity), { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
      return new Response(png, { headers: { ...securityHeaders, 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400, immutable', 'X-Robots-Tag': 'noindex, follow' } })
    }
    if (url.pathname === '/share') {
      return new Response(previewPage({ identity: preview.identity, params: preview.params, appOrigin, workerOrigin: url.origin }), {
        headers: { ...securityHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300', 'X-Robots-Tag': 'noindex, follow' },
      })
    }
    return new Response('Not found.', { status: 404, headers: securityHeaders })
  },
}
