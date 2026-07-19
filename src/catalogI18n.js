import { animalSvg, getDailyForecastParts } from './mcp/animalIdentity.js'

const interpolate = (template, values) => Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template)
const itemIndex = (item) => Number(item.id.split('-')[1]) - 1
const slogan = (catalog, template, name, index) => interpolate(template, {
  name,
  verb: catalog.verbs[Math.floor(index / catalog.themes.length) % catalog.verbs.length],
  theme: catalog.themes[index % catalog.themes.length],
})

export function validateCatalogLocale(catalog) {
  if (!catalog) return true
  const expected = [
    ['species', 75], ['realms', 4], ['baseColors', 30], ['colorMoods', 10], ['adjectiveRoots', 30], ['intensifiers', 10],
    ['verbs', 15], ['themes', 20], ['forecastMoods', 30], ['forecastActions', 30], ['forecastFinals', 30],
  ]
  return expected.every(([key, length]) => Array.isArray(catalog[key]) && catalog[key].length === length)
    && ['animalName', 'colorName', 'adjectiveName', 'animalSlogan', 'colorSlogan', 'adjectiveSlogan', 'forecast', 'fullName'].every((key) => typeof catalog.templates?.[key] === 'string')
}

export function localizeIdentity(identity, catalog) {
  if (!catalog || !validateCatalogLocale(catalog)) return {
    animalName: identity.animal.name,
    colorName: identity.color.name,
    adjectiveName: identity.adjective.name,
    animalSlogan: identity.animal.slogan,
    colorSlogan: identity.color.slogan,
    adjectiveSlogan: identity.adjective.slogan,
    fullName: identity.fullName,
    dayForecast: identity.dayForecast,
    svg: identity.svg,
  }

  const animalIndex = itemIndex(identity.animal)
  const colorIndex = itemIndex(identity.color)
  const adjectiveIndex = itemIndex(identity.adjective)
  const animalName = interpolate(catalog.templates.animalName, {
    species: catalog.species[Math.floor(animalIndex / catalog.realms.length)],
    realm: catalog.realms[animalIndex % catalog.realms.length],
  })
  const colorName = interpolate(catalog.templates.colorName, {
    base: catalog.baseColors[Math.floor(colorIndex / catalog.colorMoods.length)],
    mood: catalog.colorMoods[colorIndex % catalog.colorMoods.length],
  })
  const adjectiveName = interpolate(catalog.templates.adjectiveName, {
    root: catalog.adjectiveRoots[Math.floor(adjectiveIndex / catalog.intensifiers.length)],
    intensifier: catalog.intensifiers[adjectiveIndex % catalog.intensifiers.length],
  })
  const forecastParts = getDailyForecastParts(identity.forecastKey || identity.query)
  const dayForecast = interpolate(catalog.templates.forecast, {
    mood: catalog.forecastMoods[forecastParts.mood],
    action: catalog.forecastActions[forecastParts.action],
    final: catalog.forecastFinals[forecastParts.final],
  })
  return {
    animalName,
    colorName,
    adjectiveName,
    animalSlogan: slogan(catalog, catalog.templates.animalSlogan, animalName, animalIndex),
    colorSlogan: slogan(catalog, catalog.templates.colorSlogan, colorName, colorIndex),
    adjectiveSlogan: slogan(catalog, catalog.templates.adjectiveSlogan, adjectiveName, adjectiveIndex),
    fullName: interpolate(catalog.templates.fullName, { adjective: adjectiveName, color: colorName, animal: animalName }),
    dayForecast,
    svg: animalSvg(identity.animal, identity.color, animalName),
  }
}
