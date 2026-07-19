import { animalSvg, generateIdentityFromIds } from '../mcp/animalIdentity.js'

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]))
const publicParams = (identity) => new URLSearchParams({ a: identity.animal.id, c: identity.color.id, v: String(identity.variation || 0) })
const withoutTrailingSlash = (origin) => origin.replace(/\/$/, '')

export function previewIdentityFromUrl(url) {
  const params = new URL(url).searchParams
  const identity = generateIdentityFromIds(params.get('a'), params.get('c'), Number(params.get('v')) || 0)
  return identity ? { identity, params: publicParams(identity) } : null
}

export function appResultUrl(appOrigin, params) {
  return `${withoutTrailingSlash(appOrigin)}/#${params.toString()}`
}

export function previewSvg(identity) {
  const sourceSvg = animalSvg(identity.animal, identity.color)
  const bytes = new TextEncoder().encode(sourceSvg)
  const encodedAnimal = btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
  const accent = identity.color.hex
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeHtml(identity.fullName)}"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#121021"/><stop offset="1" stop-color="${accent}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="25"/></filter></defs><rect width="1200" height="630" fill="url(#bg)"/><circle cx="220" cy="140" r="170" fill="${accent}" opacity=".42" filter="url(#glow)"/><circle cx="1020" cy="520" r="220" fill="#7ef9e8" opacity=".18" filter="url(#glow)"/><path d="M0 510Q170 430 340 510T680 510T1020 510T1200 510V630H0Z" fill="#121021" opacity=".42"/><image href="data:image/svg+xml;base64,${encodedAnimal}" x="330" y="20" width="540" height="560" preserveAspectRatio="xMidYMid meet"/><circle cx="80" cy="80" r="6" fill="#fff"/><circle cx="1080" cy="110" r="8" fill="#fff"/><circle cx="1020" cy="220" r="4" fill="#fff"/></svg>`
}

export function previewPage({ identity, params, appOrigin, workerOrigin }) {
  const title = `${identity.fullName} — Кто ты сегодня?`
  const description = `Твой образ: ${identity.fullName}. Узнай, какой зверь выпадет тебе.`
  const imageUrl = `${withoutTrailingSlash(workerOrigin)}/og.png?${params.toString()}`
  const resultUrl = appResultUrl(appOrigin, params)
  const canonicalUrl = `${withoutTrailingSlash(appOrigin)}/`
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="noindex,follow"><meta property="og:type" content="website"><meta property="og:site_name" content="Кто ты?"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="${escapeHtml(imageUrl)}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${escapeHtml(imageUrl)}"><link rel="canonical" href="${escapeHtml(canonicalUrl)}"></head><body><p>Открываем твой образ… <a href="${escapeHtml(resultUrl)}">Продолжить</a></p><script>location.replace(${JSON.stringify(resultUrl)})</script></body></html>`
}
