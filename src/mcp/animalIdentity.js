// Локальный MCP-слой: каталог и правила генерации не зависят от интерфейса.
const species = [
  ['лисица', 'land'], ['волк', 'land'], ['рысь', 'land'], ['медведь', 'big'], ['енот', 'land'], ['выдра', 'sea'], ['бобр', 'land'], ['барсук', 'land'], ['куница', 'land'], ['соболь', 'land'], ['росомаха', 'big'], ['ласка', 'land'], ['хорёк', 'land'], ['норка', 'sea'], ['скунс', 'land'],
  ['панда', 'big'], ['коала', 'land'], ['вомбат', 'land'], ['кенгуру', 'land'], ['валлаби', 'land'], ['квокка', 'land'], ['капибара', 'land'], ['шиншилла', 'land'], ['кролик', 'land'], ['заяц', 'land'], ['белка', 'land'], ['бурундук', 'land'], ['сурок', 'land'], ['ёж', 'spiky'], ['летучая мышь', 'bird'],
  ['ленивец', 'land'], ['муравьед', 'land'], ['броненосец', 'spiky'], ['тапир', 'big'], ['жираф', 'big'], ['зебра', 'big'], ['слон', 'big'], ['носорог', 'big'], ['бегемот', 'big'], ['верблюд', 'big'], ['лама', 'big'], ['альпака', 'big'], ['як', 'big'], ['олень', 'big'], ['лось', 'big'], ['бизон', 'big'],
  ['тигр', 'big'], ['лев', 'big'], ['гепард', 'big'], ['леопард', 'big'], ['тюлень', 'sea'], ['дельфин', 'sea'], ['косатка', 'sea'], ['белуха', 'sea'], ['нарвал', 'sea'], ['кит', 'sea'], ['акула', 'sea'], ['осьминог', 'sea'], ['кальмар', 'sea'], ['краб', 'sea'], ['морской конёк', 'sea'], ['черепаха', 'reptile'],
  ['лягушка', 'reptile'], ['аксолотль', 'reptile'], ['геккон', 'reptile'], ['хамелеон', 'reptile'], ['крокодил', 'reptile'], ['змея', 'reptile'], ['сова', 'bird'], ['орёл', 'bird'], ['сокол', 'bird'], ['попугай', 'bird'], ['пингвин', 'bird'], ['фламинго', 'bird'], ['павлин', 'bird'],
]
const realms = [
  { label: 'из леса', scene: 'forest' }, { label: 'из тумана', scene: 'mist' },
  { label: 'из созвездий', scene: 'cosmos' }, { label: 'из морской пены', scene: 'water' },
]
const iconTypeBySpecies = {
  'лисица': 'canine', 'волк': 'canine', 'рысь': 'feline', 'медведь': 'bear', 'енот': 'raccoon', 'выдра': 'otter', 'бобр': 'beaver', 'барсук': 'mustelid', 'куница': 'mustelid', 'соболь': 'mustelid', 'росомаха': 'mustelid', 'ласка': 'mustelid', 'хорёк': 'mustelid', 'норка': 'otter', 'скунс': 'skunk',
  'панда': 'panda', 'коала': 'koala', 'вомбат': 'marsupial', 'кенгуру': 'marsupial', 'валлаби': 'marsupial', 'квокка': 'marsupial', 'капибара': 'rodent', 'шиншилла': 'rodent', 'кролик': 'rabbit', 'заяц': 'rabbit', 'белка': 'rodent', 'бурундук': 'rodent', 'сурок': 'rodent', 'ёж': 'hedgehog', 'летучая мышь': 'bat',
  'ленивец': 'sloth', 'муравьед': 'anteater', 'броненосец': 'armadillo', 'тапир': 'hoofed', 'жираф': 'giraffe', 'зебра': 'zebra', 'слон': 'elephant', 'носорог': 'rhino', 'бегемот': 'hippo', 'верблюд': 'camel', 'лама': 'camelid', 'альпака': 'camelid', 'як': 'bovine', 'олень': 'deer', 'лось': 'deer', 'бизон': 'bovine',
  'тигр': 'bigcat', 'лев': 'lion', 'гепард': 'bigcat', 'леопард': 'bigcat', 'тюлень': 'pinniped', 'дельфин': 'cetacean', 'косатка': 'cetacean', 'белуха': 'cetacean', 'нарвал': 'narwhal', 'кит': 'cetacean', 'акула': 'shark', 'осьминог': 'octopus', 'кальмар': 'cephalopod', 'краб': 'crab', 'морской конёк': 'seahorse', 'черепаха': 'turtle',
  'лягушка': 'frog', 'аксолотль': 'axolotl', 'геккон': 'lizard', 'хамелеон': 'chameleon', 'крокодил': 'croc', 'змея': 'snake', 'сова': 'owl', 'орёл': 'raptor', 'сокол': 'raptor', 'попугай': 'parrot', 'пингвин': 'penguin', 'фламинго': 'flamingo', 'павлин': 'peacock',
}
const sceneForAnimal = (kind, realmScene) => {
  if (realmScene === 'cosmos' || realmScene === 'mist') return realmScene
  if (kind === 'sea') return 'water'
  if (kind === 'bird') return realmScene === 'water' ? 'water' : 'forest'
  if (kind === 'reptile') return realmScene === 'water' ? 'water' : 'forest'
  return realmScene === 'water' ? 'water' : 'forest'
}
const baseColors = [['алый', 4], ['коралловый', 12], ['персиковый', 24], ['янтарный', 38], ['лимонный', 53], ['оливковый', 73], ['мятный', 145], ['изумрудный', 160], ['бирюзовый', 178], ['лазурный', 195], ['небесный', 208], ['сапфировый', 222], ['индиго', 240], ['аметистовый', 266], ['сиреневый', 280], ['лавандовый', 292], ['малиновый', 330], ['розовый', 344], ['пудровый', 355], ['шоколадный', 24], ['песочный', 42], ['карамельный', 31], ['дымчатый', 220], ['графитовый', 230], ['серебряный', 210], ['золотой', 45], ['медный', 18], ['кофейный', 29], ['нефритовый', 155], ['арктический', 190]]
const colorMoods = ['светлый', 'искрящийся', 'туманный', 'лунный', 'сочный', 'бархатный', 'утренний', 'глубокий', 'неоновый', 'тихий']
const adjectiveRoots = ['искристый', 'нежный', 'смелый', 'мечтательный', 'ловкий', 'легендарный', 'солнечный', 'бархатный', 'шустрый', 'добрый', 'внимательный', 'игривый', 'свободный', 'уютный', 'задорный', 'мудрый', 'счастливый', 'пушистый', 'отважный', 'спокойный', 'светлый', 'быстрый', 'волшебный', 'тёплый', 'звонкий', 'яркий', 'чуткий', 'весёлый', 'таинственный', 'необыкновенный']
const intensifiers = ['по-настоящему', 'слегка', 'особенно', 'безумно', 'невероятно', 'тихо', 'очень', 'по-доброму', 'искренне', 'бесконечно']
const verbs = ['находит', 'подсвечивает', 'берегёт', 'запускает', 'собирает', 'превращает', 'замечает', 'рисует', 'обнимает', 'придумывает', 'дарит', 'ловит', 'усиливает', 'открывает', 'создаёт']
const themes = ['радость', 'маленькие чудеса', 'светлые совпадения', 'улыбки', 'внутренний ритм', 'новые маршруты', 'вдохновение', 'смелые мысли', 'уютные истории', 'праздничный настрой', 'искры', 'мягкий свет', 'игру', 'гармонию', 'удачные приключения', 'свой характер', 'тепло', 'хорошие новости', 'воображение', 'свободу']
const dailyForecasts = [
  'Лёгким и любопытным: одно небольшое действие запустит приятную цепочку.',
  'Внимательным к деталям: удачная подсказка окажется совсем рядом.',
  'Дружеским: смело напиши человеку, о котором сегодня подумал(а).',
  'Смелым: маленькая решительность принесёт большой внутренний плюс.',
  'Ясным: выбери главное и спокойно отпусти остальное.',
  'Изобретательным: случайная идея окажется полезнее, чем кажется.',
  'Счастливо-неторопливым: хороший ритм притянет совпадения.',
  'Уютно-продуктивным: делай по одному делу, но с удовольствием.',
  'Искренним: сегодня особенно легко говорить о важном.',
  'Исследовательским: неожиданный вопрос приведёт к открытию.',
  'Тёплым: короткий разговор способен по-настоящему вдохновить.',
  'Игровым: несерьёзный подход поможет решить серьёзную задачу.',
  'Заботливым: маленькая пауза подарит большую идею.',
  'Свободным: поменяй привычный маршрут и впусти новое.',
  'Музыкальным: вдохновение спряталось в звуке, цвете или разговоре.',
  'Завершающим: одно давнее «потом» сегодня легко превратить в «сделано».',
  'Добрым: твой первый шаг будет замечен и поддержан.',
  'Собранным: спокойный фокус сделает важное проще.',
  'Светлым: простая радость — вкус, солнце или любимая песня — станет главной.',
  'Решительным: не ищи идеальный момент, создай его.',
  'Красивым: добавь одну яркую деталь, и пространство ответит.',
  'Практично-волшебным: получится совместить полезное и приятное.',
  'Новостным: будь на связи — мир готов поделиться хорошим.',
  'Фантазийным: воображение сегодня станет практическим инструментом.',
  'Встречным: новая тропинка или разговор подарят нужное знакомство.',
  'Бережным: выбирай свой темп, и энергии хватит на всё важное.',
  'Солнечным: повод улыбнуться появится именно тогда, когда его не ждёшь.',
  'Уверенным: первая спокойная мысль окажется верной.',
  'Вдохновляющим: сделай что-то чуть красивее, чем нужно.',
  'Удачным: наведи порядок в одной мелочи — и откроется новая дверь.',
]

const hslToHex = (h, s, l) => {
  s /= 100; l /= 100
  const k = (n) => (n + h / 30) % 12; const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return `#${[f(0), f(8), f(4)].map((v) => Math.round(255 * v).toString(16).padStart(2, '0')).join('')}`
}
const makeSlogan = (kind, name, index) => {
  const subjects = { animal: 'Твой зверь', color: 'Твой цвет', adjective: 'Твоя суперсила' }
  return `${subjects[kind]} «${name}» ${verbs[Math.floor(index / themes.length) % verbs.length]} ${themes[index % themes.length]}.`
}
const shape = (kind) => ({
  bird: '<path d="M45 70c8-27 30-36 38-23 8-13 30-4 38 23-12 12-52 12-76 0Z"/><path d="m64 66 7 8 7-8M95 66l-7 8-7-8" class="line"/>',
  sea: '<path d="M42 79c15-32 54-32 76 0-18 21-58 21-76 0Z"/><path d="m42 79-13-14 5 22 12-8M118 79l13-14-5 22-12-8"/><circle cx="72" cy="77" r="3" class="dot"/><circle cx="94" cy="77" r="3" class="dot"/>',
  reptile: '<path d="M42 84c0-27 16-42 38-42s38 15 38 42c-13 13-63 13-76 0Z"/><path d="M55 55 42 42m63 13 13-13" class="line"/><circle cx="67" cy="73" r="3" class="dot"/><circle cx="93" cy="73" r="3" class="dot"/>',
  spiky: '<path d="M39 84c5-29 17-43 41-43s36 14 41 43c-21 15-61 15-82 0Z"/><path d="m46 53 8-17 8 15 10-19 9 19 11-17 7 19 12-12" class="line"/><circle cx="67" cy="75" r="3" class="dot"/><circle cx="93" cy="75" r="3" class="dot"/>',
  big: '<path d="M39 84c0-31 16-46 41-46s41 15 41 46c-18 15-64 15-82 0Z"/><path d="M55 55 46 36 67 48M105 55l9-19-21 12" class="line"/><circle cx="67" cy="73" r="3" class="dot"/><circle cx="93" cy="73" r="3" class="dot"/><path d="M78 84h5" class="line"/>',
  land: '<path d="M42 84c0-29 15-45 38-45s38 16 38 45c-16 15-60 15-76 0Z"/><path d="M56 55 49 34l18 15M104 55l7-21-18 15" class="line"/><circle cx="67" cy="74" r="3" class="dot"/><circle cx="93" cy="74" r="3" class="dot"/><path d="M76 84q4 4 8 0" class="line"/>',
}[kind] || '')

// Детали делают силуэт узнаваемым: ушки лисицы, клюв совы, рог нарвала и т.д.
const features = {
  canine: '<path d="M50 63h13m34 0h13" class="line"/><path d="M61 88l-10 5m48-5 10 5" class="line"/>', feline: '<path d="M50 48l9 8m51-8-9 8" class="line"/><path d="M50 82h18m24 0h18" class="line"/>', bear: '<circle cx="55" cy="49" r="8"/><circle cx="105" cy="49" r="8"/>', raccoon: '<path d="M52 68q28-15 56 0l-6 15q-22 9-44 0Z" fill="#292334" opacity=".8"/>', otter: '<path d="M48 82h19m26 0h19M77 88h6" class="line"/>', beaver: '<path d="M69 87v10m8-10v10m8-10v10m8-10v10" class="line"/>', mustelid: '<path d="M53 81h18m18 0h18" class="line"/>', skunk: '<path d="M79 43v31" stroke="#fff" stroke-width="7"/>', panda: '<path d="M57 64q10-9 17 3M86 67q7-12 17-3" fill="#292334" opacity=".85"/>', koala: '<circle cx="52" cy="56" r="13"/><circle cx="108" cy="56" r="13"/><path d="M76 78h8" stroke="#292334" stroke-width="7"/>', marsupial: '<path d="M61 89q19 10 38 0" class="line"/>', rodent: '<path d="M72 87v9m8-9v9" class="line"/>', rabbit: '<path d="M58 54V27m9 27V27M93 54V27m9 27V27" class="line"/>', hedgehog: '<path d="m43 60 8-24 7 19 9-25 8 24 10-24 7 25 11-19 5 24" class="line"/>', bat: '<path d="M47 66q-11-16-20-3 13 12 22 8m64-5q11-16 20-3-13 12-22 8" class="line"/>', sloth: '<path d="M57 72q9 8 18 0m10 0q9 8 18 0" class="line"/>', anteater: '<path d="M74 80h23l-7 10H74"/>', armadillo: '<path d="M51 61q29-17 58 0M50 70q30-17 60 0" class="line"/>', hoofed: '<path d="M56 48l7-15m34 15 7-15" class="line"/>', giraffe: '<path d="M57 52V28m46 24V28" class="line"/><circle cx="57" cy="25" r="4"/><circle cx="103" cy="25" r="4"/>', zebra: '<path d="m57 56 8 30m7-37 8 41m9-41 8 37" class="line"/>', elephant: '<path d="M76 80v23q4 6 8 0V80" class="line"/><path d="M52 60q-10 8-3 20m59-20q10 8 3 20" class="line"/>', rhino: '<path d="m80 57 8-19 8 19"/>', hippo: '<path d="M57 59v-11m46 11V48" class="line"/>', camel: '<path d="M60 54q9-19 20 0 11-19 20 0" class="line"/>', camelid: '<path d="M58 47v-18m44 18V29" class="line"/>', bovine: '<path d="M57 56 43 45m60 11 14-11" class="line"/>', deer: '<path d="m58 55-10-19m14 13-7-22m43 28 10-19m-14 13 7-22" class="line"/>', bigcat: '<path d="M57 57q23 11 46 0M55 68q25 11 50 0" class="line"/>', lion: '<circle cx="80" cy="68" r="40" fill="none" stroke="#292334" stroke-width="7"/>', pinniped: '<path d="M50 84h20m20 0h20" class="line"/>', cetacean: '<path d="M75 57q5-11 10 0" class="line"/>', narwhal: '<path d="m80 55 10-26 5 29" class="line"/>', shark: '<path d="m80 48 10 15H70Z"/>', octopus: '<path d="M58 88q-9 14-17 2m29-2q-6 15-15 6m35-6q6 15 15 6m-35-6q9 14 17 2" class="line"/>', cephalopod: '<path d="M59 88q-5 14-12 6m24-6q-4 15-10 7m28-7q4 15 10 7m-22-7q5 14 12 6" class="line"/>', crab: '<path d="m53 71-15-12m17 21-18 4m68-13 15-12m-17 21 18 4" class="line"/>', seahorse: '<path d="M91 66q17 21-2 35-14 7-18-7" class="line"/>', turtle: '<path d="M58 61q22-15 44 0v27q-22 12-44 0Z" fill="none" class="line"/>', frog: '<circle cx="62" cy="57" r="9"/><circle cx="98" cy="57" r="9"/>', axolotl: '<path d="m54 62-15-8m17 16-17 4m65-12 15-8m-17 16 17 4" class="line"/>', lizard: '<path d="M58 87q-13 7-22-2m66 2q13 7 22-2" class="line"/>', chameleon: '<path d="M94 82q14 4 6 16-8 8-14 0" class="line"/>', croc: '<path d="M55 83h50l-8 10H63Z" class="line"/>', snake: '<path d="M57 58q23-24 46 0M57 79q23 24 46 0" class="line"/>', owl: '<path d="M54 66q13-14 26 0 13-14 26 0" class="line"/>', raptor: '<path d="m77 79 3 12 7-12"/>', parrot: '<path d="M92 74q18 5 5 21" class="line"/>', penguin: '<path d="M64 59q16-9 32 0v31q-16 8-32 0Z" fill="#fff"/>', flamingo: '<path d="M82 51q17 2 11 20-7 19-1 30" class="line"/>', peacock: '<path d="M51 61q-10-21 6-25m10 20q-5-25 10-26m7 26q5-25 20-26m-3 30q15-21 25-10" class="line"/>',
}
const sceneSvg = (scene, color) => ({
  forest: `<path d="M5 118 32 68l26 50m-20 0 30-70 31 70m-15 0 35-56 34 56" fill="${color.hex}" opacity=".16"/><path d="M0 118h160" stroke="${color.hex}" stroke-width="5"/>`,
  mist: `<path d="M0 94q22-24 46 0 23-27 48 0 24-25 66 0v36H0Z" fill="${color.hex}" opacity=".14"/><path d="M12 48h38m40 8h50M6 65h28" stroke="${color.hex}" stroke-width="5" stroke-linecap="round" opacity=".32"/>`,
  cosmos: `<circle cx="25" cy="30" r="3" fill="${color.hex}"/><circle cx="48" cy="15" r="5" fill="${color.hex}"/><circle cx="126" cy="32" r="4" fill="${color.hex}"/><path d="m18 48 8 8m0-8-8 8m105-32 9 9m0-9-9 9" stroke="${color.hex}" stroke-width="3"/>`,
  water: `<path d="M0 105q20-12 40 0t40 0 40 0 40 0v25H0Z" fill="${color.hex}" opacity=".17"/><path d="M5 96q16-11 32 0t32 0 32 0 32 0 32 0" fill="none" stroke="${color.hex}" stroke-width="4"/>`,
}[scene])

export const animals = species.flatMap(([speciesName, kind]) => realms.map((realm) => ({
  name: `${speciesName} ${realm.label}`, speciesName, kind, iconType: iconTypeBySpecies[speciesName], scene: sceneForAnimal(kind, realm.scene), realm: realm.label,
}))).map((animal, index) => ({ id: `animal-${index + 1}`, ...animal, slogan: makeSlogan('animal', animal.name, index) }))
export const colors = baseColors.flatMap(([base, hue], baseIndex) => colorMoods.map((mood, moodIndex) => {
  const index = baseIndex * colorMoods.length + moodIndex; const name = `${mood} ${base}`
  return { id: `color-${index + 1}`, name, hex: hslToHex(hue, 52 + (moodIndex % 3) * 13, 42 + (moodIndex * 5) % 35), slogan: makeSlogan('color', name, index) }
}))
export const adjectives = adjectiveRoots.flatMap((root, rootIndex) => intensifiers.map((intensifier, intensifierIndex) => {
  const index = rootIndex * intensifiers.length + intensifierIndex; const name = `${intensifier} ${root}`
  return { id: `adjective-${index + 1}`, name, slogan: makeSlogan('adjective', name, index) }
}))
export function animalSvg(animal, color) {
  const secondary = hslToHex((parseInt(color.hex.slice(1, 3), 16) + 120) % 360, 76, 63)
  const gradientId = `gradient-${animal.id}-${color.id}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 130" role="img" aria-label="${animal.name}"><title>${animal.name} — ${animal.scene}</title><defs><linearGradient id="${gradientId}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${color.hex}"/><stop offset="1" stop-color="${secondary}"/></linearGradient></defs>${sceneSvg(animal.scene, color)}<circle cx="80" cy="67" r="54" fill="url(#${gradientId})" opacity=".22"/><g fill="url(#${gradientId})" stroke="#292334" stroke-width="4" stroke-linejoin="round">${shape(animal.kind)}${features[animal.iconType] || ''}</g><g class="line" fill="none" stroke="#292334" stroke-width="4" stroke-linecap="round"><path d="M68 91q12 8 24 0"/></g></svg>`
}
const hash = (value) => [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0)
const pick = (list, value) => list[Math.abs(value) % list.length]
export function getDailyForecast(input = '', date = new Date()) {
  const dateKey = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow' }).format(date)
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow', hour: '2-digit', hourCycle: 'h23',
  }).format(date))
  const period = hour < 16 ? 0 : 1
  const forecastHash = Math.abs(hash(`${input.trim()}|${dateKey}|${period}`))
  return dailyForecasts[forecastHash % dailyForecasts.length]
}
export function generateAnimalIdentity(input = '', variation = 0) {
  const query = input.trim() || 'неизвестный герой'
  const monthKey = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit' }).format(new Date())
  const identityHash = hash(`${query}|${monthKey}`)
  const variationHash = hash(`${query}|${monthKey}|${variation}`)
  const animal = pick(animals, identityHash); const color = pick(colors, identityHash >> 3); const adjective = pick(adjectives, variationHash >> 6)
  return { query, animal, color, adjective, fullName: `${adjective.name} ${color.name} ${animal.name}`, svg: animalSvg(animal, color), dayForecast: getDailyForecast(query) }
}
export function validateCatalog() {
  const catalog = [animals, colors, adjectives]
  return catalog.every((items) => items.length === 300 && new Set(items.map((item) => item.id)).size === 300 && new Set(items.map((item) => item.slogan)).size === 300)
    && animals.every((animal) => animal.iconType && animal.scene && features[animal.iconType])
}
