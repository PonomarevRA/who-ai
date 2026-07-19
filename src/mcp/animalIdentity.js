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
const baseColors = [
  ['алый', 4], ['коралловый', 12], ['персиковый', 24, -12, 8], ['янтарный', 38], ['лимонный', 53], ['оливковый', 73, -20, -7], ['мятный', 145], ['изумрудный', 160, 4, -5], ['бирюзовый', 178], ['лазурный', 195], ['небесный', 208, -10, 6], ['сапфировый', 222, 6, -5], ['индиго', 240, 4, -9], ['аметистовый', 266], ['сиреневый', 280, -12, 6], ['лавандовый', 292, -18, 9], ['малиновый', 330], ['розовый', 344, -10, 7], ['пудровый', 355, -28, 12], ['шоколадный', 24, -24, -12], ['песочный', 42, -24, 9], ['карамельный', 31, -12, -3], ['дымчатый', 220, -34, 4], ['графитовый', 230, -48, -14], ['серебряный', 210, -52, 15], ['золотой', 45, 4, -1], ['медный', 18, -9, -7], ['кофейный', 29, -30, -16], ['нефритовый', 155, -5, -4], ['арктический', 190, -34, 14],
]
const colorMoods = [
  ['светлый', -2, 58, 76], ['искрящийся', 0, 88, 66], ['туманный', 2, 30, 70], ['лунный', -3, 45, 80], ['сочный', 3, 84, 56], ['бархатный', -1, 56, 42], ['утренний', 4, 68, 67], ['глубокий', 0, 70, 31], ['неоновый', 2, 96, 55], ['тихий', -4, 28, 54],
]
const adjectiveRoots = ['искристый', 'нежный', 'смелый', 'мечтательный', 'ловкий', 'легендарный', 'солнечный', 'бархатный', 'шустрый', 'добрый', 'внимательный', 'игривый', 'свободный', 'уютный', 'задорный', 'мудрый', 'счастливый', 'пушистый', 'отважный', 'спокойный', 'светлый', 'быстрый', 'волшебный', 'тёплый', 'звонкий', 'яркий', 'чуткий', 'весёлый', 'таинственный', 'необыкновенный']
const intensifiers = ['по-настоящему', 'слегка', 'особенно', 'безумно', 'невероятно', 'тихо', 'очень', 'по-доброму', 'искренне', 'бесконечно']
const verbs = ['находит', 'подсвечивает', 'берегёт', 'запускает', 'собирает', 'превращает', 'замечает', 'рисует', 'обнимает', 'придумывает', 'дарит', 'ловит', 'усиливает', 'открывает', 'создаёт']
const themes = ['радость', 'маленькие чудеса', 'светлые совпадения', 'улыбки', 'внутренний ритм', 'новые маршруты', 'вдохновение', 'смелые мысли', 'уютные истории', 'праздничный настрой', 'искры', 'мягкий свет', 'игру', 'гармонию', 'удачные приключения', 'свой характер', 'тепло', 'хорошие новости', 'воображение', 'свободу']
// Прогноз собирается из трёх независимых частей: 30 × 30 × 30 = 27 000 добрых вариантов.
const forecastMoods = [
  'Сегодня в тебе больше спокойной смелости.', 'День начинается с лёгкого любопытства.', 'Твоя внимательность особенно кстати.', 'Внутри есть запас тёплой энергии.', 'Сегодня хорошо слышно собственный ритм.', 'Настроение просит немного игры.', 'Ты можешь позволить себе быть гибким.', 'В воздухе чувствуется тихий азарт.', 'У тебя есть право выбирать темп.', 'Сегодня особенно ценны простые радости.',
  'Внутренний компас настроен на новое.', 'День располагает к мягкой решительности.', 'В тебе просыпается творческая искра.', 'Спокойствие может стать твоей суперсилой.', 'Сегодня хочется замечать хорошие детали.', 'Ты открыт неожиданным, но приятным поворотам.', 'День подходит для бережной смелости.', 'Твоя лёгкость заразительна.', 'Сегодня важно доверять первому доброму импульсу.', 'В тебе достаточно устойчивости для перемен.',
  'Настрой — собранный, но без лишней строгости.', 'Сегодня можно смотреть на привычное свежее.', 'Удачный момент, чтобы прислушаться к себе.', 'День несёт немного солнечного упрямства.', 'Внутри достаточно места для вдохновения.', 'Твоя доброжелательность заметна без слов.', 'Сегодня хочется двигаться от интереса.', 'В тебе есть спокойная уверенность.', 'День подходит для маленьких открытий.', 'Твой настрой умеет находить светлые стороны.',
]
const forecastActions = [
  'Начни с одного небольшого дела, которое давно ждало внимания.', 'Добавь в расписание короткую паузу для себя.', 'Скажи «да» идее, которая кажется любопытной.', 'Выбери маршрут чуть необычнее привычного.', 'Поделись добрым словом с тем, о ком вспомнишь.', 'Разреши себе сделать первый шаг без идеального плана.', 'Наведи порядок в одном маленьком уголке.', 'Отметь три вещи, за которые хочется поблагодарить день.', 'Сделай что-то привычное немного по-новому.', 'Оставь место для случайной приятности.',
  'Задай вопрос, который давно хотел задать.', 'Собери вокруг себя больше любимых мелочей.', 'Удели время тому, что возвращает интерес.', 'Выбери задачу, после которой станет легче дышать.', 'Позволь себе ненадолго отключиться от суеты.', 'Заметь одну красивую деталь по пути.', 'Поддержи свою идею хотя бы десятью минутами внимания.', 'Сделай паузу перед важным ответом.', 'Попробуй посмотреть на ситуацию с другой стороны.', 'Отложи лишнее и оставь главное.',
  'Поделись находкой, которая тебя улыбнула.', 'Дай себе право передумать, если так честнее.', 'Внеси в день немного движения или музыки.', 'Выбери разговор, после которого станет теплее.', 'Сохрани один момент дня в заметках или на фото.', 'Сделай полезное дело в своём темпе.', 'Найди повод сказать себе «спасибо».', 'Начни с самого лёгкого шага и посмотри, что будет дальше.', 'Доверься любопытству в безопасной мелочи.', 'Оставь в конце дня время для спокойного выдоха.',
]
const forecastFinals = [
  'Пусть к вечеру останется чувство: день прожит не зря.', 'А дальше пусть всё сложится в твоём собственном ритме.', 'Даже маленький шаг сегодня может стать хорошим знаком.', 'Сохрани эту лёгкость — она тебе идёт.', 'Пусть в дне найдётся место для приятного сюрприза.', 'Главное — не торопить хорошие перемены.', 'Пусть день подарит хотя бы одну искреннюю улыбку.', 'Вечером можно будет поблагодарить себя за внимание к себе.', 'Твой сегодняшний выбор достоин бережного отношения.', 'Пусть хорошее проявится в самых простых вещах.',
  'И пусть рядом окажется немного больше тепла.', 'Сегодня достаточно быть собой — этого уже немало.', 'Пусть финал дня будет мягким и уютным.', 'Любая маленькая радость сегодня считается.', 'Держи курс на то, что действительно важно тебе.', 'Пусть день оставит после себя красивую историю.', 'Не обязательно успеть всё, чтобы почувствовать движение.', 'Пусть в нужный момент найдутся верные слова.', 'Твоя внимательность может сделать день особенным.', 'Пусть будет больше поводов улыбнуться без причины.',
  'Оставь немного места для хорошего совпадения.', 'Пусть день напомнит: у тебя всё получается по-своему.', 'Тепло, которое ты отдашь, может вернуться неожиданно.', 'Пусть конец дня принесёт приятное чувство завершённости.', 'Сегодня можно не искать идеал, а замечать живое.', 'Пусть рядом окажутся люди и мысли, которые поддерживают.', 'Дай хорошему случиться без лишних ожиданий.', 'Пусть этот день добавит тебе уверенности на завтра.', 'Самое ценное сегодня — сохранить контакт с собой.', 'Пусть вечер встретит тебя спокойствием и лёгкой гордостью.',
]

const hslToHex = (h, s, l) => {
  s /= 100; l /= 100
  const k = (n) => (n + h / 30) % 12; const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return `#${[f(0), f(8), f(4)].map((v) => Math.round(255 * v).toString(16).padStart(2, '0')).join('')}`
}
const usedColorHexes = new Set()
const uniqueColorHex = (hue, saturation, lightness) => {
  let attempt = 0
  let hex = ''
  do {
    hex = hslToHex((hue + attempt * 3) % 360, Math.max(8, Math.min(96, saturation + attempt * 2)), Math.max(22, Math.min(84, lightness + attempt)))
    attempt += 1
  } while (usedColorHexes.has(hex))
  usedColorHexes.add(hex)
  return hex
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

// Модульная анатомия: профиль вида собирается из ушей, морды, окраса и характерной детали.
const anatomyBlocks = {
  'ears-fox': '<path d="M54 55 47 27l20 20m39 8 7-28-20 20" class="line"/>', 'ears-wolf': '<path d="M53 57 43 24l25 22m39 11 10-33-25 22" class="line"/>', 'ears-pointed': '<path d="M55 56 48 31l18 18m39 7 7-25-18 18" class="line"/>', 'ears-tufted': '<path d="m54 53-8-23 11 8m42 15 8-23-11 8" class="line"/>', 'ears-round': '<circle cx="53" cy="53" r="10"/><circle cx="107" cy="53" r="10"/>', 'ears-long': '<path d="M58 55V22m12 31V20m20 33V20m12 35V22" class="line"/>', 'ears-wide': '<path d="M57 58 42 39m61 19 15-19" class="line"/>', 'ears-bat': '<path d="m57 56-11-25 21 16m36 9 11-25-21 16" class="line"/>',
  'muzzle-fox': '<path d="M70 77 80 86l10-9-10-7Z" fill="#fff9f2"/><path d="M66 82h-16m44 0h16" class="line"/>', 'muzzle-wolf': '<path d="M64 77h32l-7 13H71Z" fill="#fff9f2"/><path d="M76 82h8" stroke="#292334" stroke-width="5"/>', 'muzzle-short': '<ellipse cx="80" cy="81" rx="14" ry="10" fill="#fff9f2"/><circle cx="80" cy="79" r="3" fill="#292334"/>', 'muzzle-long': '<path d="M72 76h31l-11 13H72Z" fill="#fff9f2"/>', 'muzzle-square': '<path d="M63 74h34v18H63Z" fill="#fff9f2"/><path d="M71 83v8m10-8v8" class="line"/>', 'muzzle-rodent': '<path d="M69 78h22v14H69Z" fill="#fff9f2"/><path d="M76 82v9m8-9v9" class="line"/>', 'muzzle-trunk': '<path d="M74 77v26q6 9 12 0V77" fill="#fff9f2" stroke="#292334" stroke-width="4"/>', 'muzzle-beak-hook': '<path d="M78 75h22l-12 9 5 9-15-7Z" fill="#f8d56f" stroke="#292334" stroke-width="3"/>', 'muzzle-beak-curve': '<path d="M80 75q24-4 10 17l-10-5Z" fill="#f8d56f" stroke="#292334" stroke-width="3"/>',
  'mark-mask': '<path d="M52 67q28-15 56 0l-6 15q-22 8-44 0Z" fill="#292334" opacity=".75"/>', 'mark-badger': '<path d="M76 47h8v38h-8Z" fill="#fff9f2"/>', 'mark-bib': '<path d="M72 88h16l-8 14Z" fill="#fff9f2"/>', 'mark-stripes': '<path d="m58 55 8 34m9-40 7 44m11-44 7 40" class="line"/>', 'mark-cheetah': '<path d="M63 67 69 83m28-16-6 16" class="line"/>', 'mark-rosettes': '<circle cx="61" cy="67" r="5" fill="none" class="line"/><circle cx="99" cy="67" r="5" fill="none" class="line"/><circle cx="80" cy="54" r="4" fill="none" class="line"/>', 'mark-mane': '<circle cx="80" cy="68" r="42" fill="none" stroke="#292334" stroke-width="7"/>', 'mark-spots': '<circle cx="60" cy="63" r="3"/><circle cx="76" cy="55" r="3"/><circle cx="98" cy="65" r="3"/>', 'mark-zebra': '<path d="m57 51 8 42m8-48 8 51m10-51 8 47" class="line"/>', 'mark-panda': '<ellipse cx="64" cy="69" rx="8" ry="10" fill="#292334"/><ellipse cx="96" cy="69" rx="8" ry="10" fill="#292334"/>', 'mark-orca': '<path d="M58 69q10-13 18 0-9 9-18 0Z" fill="#fff9f2"/>', 'mark-belly': '<path d="M64 66q16-11 32 0v27q-16 9-32 0Z" fill="#fff9f2"/>',
  'append-bushy-tail': '<path d="M112 86q29-5 22 17-13 13-29-5" class="line"/>', 'append-flat-tail': '<path d="M81 93q20 11 32 2l-2 13q-20 5-30-4Z"/>', 'append-antlers': '<path d="m58 56-12-22m16 15-4-22m40 29 12-22m-16 15 4-22" class="line"/>', 'append-moose-antlers': '<path d="m58 56-15-20 16 5-5-14m44 29 15-20-16 5 5-14" class="line"/>', 'append-horns': '<path d="M58 57 43 43m59 14 15-14" class="line"/>', 'append-fin': '<path d="M80 49 91 30l7 22"/>', 'append-flippers': '<path d="m52 86-17 8 8 9m65-17 17 8-8 9" class="line"/>', 'append-tusk': '<path d="m81 56 11-31 5 34" class="line"/>', 'append-tentacles': '<path d="M58 87q-12 16-20 3m31-2q-8 17-16 7m38-7q8 17 16 7m-38-7q12 16 20 3" class="line"/>', 'append-claws': '<path d="m59 91-4 12m12-11-2 12m26-12 2 12m8-13 4 12" class="line"/>', 'append-wings': '<path d="M50 69 28 56l8 25m74-12 22-13-8 25" class="line"/>', 'append-long-leg': '<path d="M89 88v24h13" class="line"/>', 'append-curl-tail': '<path d="M101 81q23 12 6 27-13 8-17-4" class="line"/>',
  'body-shell': '<path d="M57 72q23-18 46 0v20q-23 12-46 0Z" fill="none" class="line"/><path d="M80 56v37M61 81h38" class="line"/>', 'body-armored': '<path d="M52 62q28-19 56 0M50 72q30-18 60 0M52 82q28-15 56 0" class="line"/>', 'body-humps': '<path d="M59 55q9-20 21 0 12-20 21 0" class="line"/>', 'body-hippo-fold': '<path d="M56 72q24 9 48 0m-43 14q19 8 38 0" class="line"/>', 'body-gills': '<path d="m55 70-8 7m12-1-8 7m57-13 8 7m-12-1 8 7" class="line"/>', 'body-spines': '<path d="m47 59 7-25 8 20 9-27 9 26 10-26 8 27 10-20 6 25" class="line"/>', 'body-pouch': '<path d="M64 89q16 10 32 0" class="line"/>', 'body-fountain': '<path d="M78 47q2-14-7-20m10 20q3-15 11-20" class="line"/>',
  'face-eyes-predator': '<path d="M56 69q9-8 17 0-8 8-17 0Zm31 0q9-8 17 0-8 8-17 0Z" fill="#fff9f2"/><circle cx="65" cy="69" r="3" class="dot"/><circle cx="95" cy="69" r="3" class="dot"/>', 'face-eyes-round': '<circle cx="64" cy="68" r="9" fill="#fff9f2"/><circle cx="96" cy="68" r="9" fill="#fff9f2"/><circle cx="64" cy="68" r="4" class="dot"/><circle cx="96" cy="68" r="4" class="dot"/>', 'face-eyes-side': '<ellipse cx="58" cy="68" rx="7" ry="9" fill="#fff9f2"/><ellipse cx="102" cy="68" rx="7" ry="9" fill="#fff9f2"/><circle cx="59" cy="68" r="3" class="dot"/><circle cx="101" cy="68" r="3" class="dot"/>', 'face-nose-triangle': '<path d="M75 78h10l-5 6Z" fill="#292334" stroke="none"/>', 'face-nose-broad': '<path d="M71 78q9-6 18 0v7q-9 5-18 0Z" fill="#292334" stroke="none"/>', 'face-whiskers': '<path d="M70 82 48 78m22 10-22 5m42-11 22-4m-22 10 22 5" class="line"/>', 'face-paws': '<path d="M57 91q3 7 9 0m8 3q3 7 8 0m8 0q3 7 8 0m8-3q3 7 9 0" class="line"/>', 'face-bird': '<path d="M58 68q7-7 14 0m16 0q7-7 14 0" class="line"/><circle cx="65" cy="69" r="3" class="dot"/><circle cx="95" cy="69" r="3" class="dot"/>', 'face-bird-brow': '<path d="M55 61q10-10 20-3m10 0q10-7 20 3" class="line"/>', 'face-bird-feet': '<path d="m67 90-5 11m5-11 5 11m16-11-5 11m5-11 5 11" class="line"/>', 'face-aqua': '<circle cx="66" cy="73" r="4" fill="#fff9f2"/><circle cx="66" cy="73" r="2" class="dot"/><path d="M78 85q9 6 18 0" class="line"/>', 'face-aqua-bubbles': '<circle cx="106" cy="62" r="3" fill="#fff9f2"/><circle cx="114" cy="53" r="2" fill="#fff9f2"/>', 'body-aqua-belly': '<path d="M61 84q19 14 38 0" fill="#fff9f2" opacity=".7" class="line"/>', 'face-amphibian': '<circle cx="62" cy="60" r="10" fill="#fff9f2"/><circle cx="98" cy="60" r="10" fill="#fff9f2"/><circle cx="62" cy="60" r="4" class="dot"/><circle cx="98" cy="60" r="4" class="dot"/>', 'face-reptile': '<path d="M57 66q8-7 16 0m14 0q8-7 16 0" class="line"/><circle cx="65" cy="67" r="2" class="dot"/><circle cx="95" cy="67" r="2" class="dot"/>', 'face-reptile-scales': '<path d="M57 78q7-7 14 0m9 0q7-7 14 0m-28 9q7-7 14 0" class="line"/>', 'face-reptile-toes': '<path d="m57 91-6 8m10-7-2 9m40-9 6 8m-10-7 2 9" class="line"/>',
  'muzzle-tapir-trunk': '<path d="M72 77q17-6 20 6l-4 17q-8 7-13-2l2-11-8-3Z" fill="#fff9f2" class="line"/>', 'append-elephant-tusks': '<path d="m69 82-8 18 14-12m17-6 8 18-14-12" fill="#fff9f2" class="line"/>', 'append-ossicones': '<path d="M62 52V31m36 21V31" class="line"/><circle cx="62" cy="28" r="4"/><circle cx="98" cy="28" r="4"/>', 'append-rhino-horn': '<path d="m78 60 10-25 7 27" fill="#fff9f2" class="line"/>', 'append-kangaroo-tail': '<path d="M104 87q34 2 27 24-15 9-31-8" class="line"/>', 'append-walla-tail': '<path d="M104 88q28 4 21 21-13 7-27-8" class="line"/>', 'append-fox-tail-tip': '<path d="M113 87q25-4 21 16-12 11-24-3" fill="#fff9f2" class="line"/>', 'body-giraffe-neck': '<path d="M66 88V38h28v50" fill="none" class="line"/>', 'body-bison-hump': '<path d="M52 58q11-28 32-10 19-18 28 10" class="line"/>', 'body-yak-fringe': '<path d="m57 51 4 14 5-16 5 16 5-18 5 18 5-16 5 16 5-14" class="line"/>', 'mark-giraffe-patches': '<path d="M67 50h10v11H66Zm19 5h10v11H85ZM70 70h11v12H68Zm18 5h10v10H87Z" fill="#292334" opacity=".46" stroke="none"/>', 'mark-zebra-dense': '<path d="m54 51 7 42m7-48 7 52m8-52 7 52m8-47 7 42" class="line"/>', 'body-hippo-mouth': '<path d="M57 82q23 18 46 0M68 88q12 7 24 0" class="line"/>',
  'body-dolphin-rostrum': '<path d="M48 75 24 82l24 8" fill="#fff9f2" class="line"/><path d="m84 48 12-18 8 22" class="line"/>', 'body-shark-profile': '<path d="M42 79 22 66l8 24m67-39 13-24 8 28m-6 30 20-12-8 24" class="line"/>', 'body-whale-flukes': '<path d="M108 86q18 11 23-2m-23 2q-10 15-21 4" class="line"/>', 'head-beluga-melon': '<path d="M57 57q23-28 48 0" fill="#fff9f2" opacity=".75" class="line"/>', 'body-octopus-suckers': '<path d="m54 92 6 5m8-7 6 6m12-6 6 6m8-9 6 5" class="line"/>', 'body-crab-eyestalks': '<path d="M65 64V51m30 13V51" class="line"/><circle cx="65" cy="49" r="4"/><circle cx="95" cy="49" r="4"/>', 'body-seahorse-crown': '<path d="m68 56 4-13 5 8 5-13 5 13 5-8 4 13" class="line"/>', 'body-turtle-scutes': '<path d="M80 58v35M62 75h36m-30-11 24 22m0-22L68 86" class="line"/>',
  'body-croc-teeth': '<path d="m62 88 4 7 4-7 4 7 4-7 4 7 4-7 4 7 4-7" fill="#fff9f2" class="line"/>', 'body-snake-tongue': '<path d="m80 86v12m0 0-5 5m5-5 5 5" class="line"/>', 'face-axolotl': '<path d="M68 80q12 9 24 0" class="line"/><circle cx="65" cy="69" r="3" class="dot"/><circle cx="95" cy="69" r="3" class="dot"/>', 'face-gecko-lids': '<path d="M55 64q10-10 19 0m12 0q10-10 19 0" class="line"/>', 'face-chameleon-turret': '<circle cx="62" cy="63" r="10" fill="#fff9f2"/><circle cx="98" cy="63" r="10" fill="#fff9f2"/><circle cx="62" cy="63" r="3" class="dot"/><circle cx="98" cy="63" r="3" class="dot"/>',
  'face-owl-discs': '<circle cx="63" cy="68" r="15" fill="#fff9f2" opacity=".78"/><circle cx="97" cy="68" r="15" fill="#fff9f2" opacity=".78"/><circle cx="63" cy="68" r="5" class="dot"/><circle cx="97" cy="68" r="5" class="dot"/>', 'body-falcon-marks': '<path d="m57 63 9 8m37-8-9 8" class="line"/>', 'body-parrot-tail': '<path d="M101 84q19 14 6 29l-13-18" class="line"/>', 'body-flamingo-neck': '<path d="M72 54q-16-20 5-31 22-8 20 18" fill="none" class="line"/>', 'body-peacock-fan': '<path d="M48 78q-20-31 5-40m10 37q-15-39 12-44m5 44q0-42 20-44m-5 44q15-39 39-26" class="line"/><circle cx="48" cy="38" r="4"/><circle cx="76" cy="30" r="4"/><circle cx="104" cy="36" r="4"/><circle cx="126" cy="49" r="4"/>',
}
const speciesProfiles = {
  'лисица': ['ears-fox', 'muzzle-fox', 'append-bushy-tail'], 'волк': ['ears-wolf', 'muzzle-wolf', 'mark-spots'], 'рысь': ['ears-tufted', 'muzzle-short', 'append-bushy-tail'], 'медведь': ['ears-round', 'muzzle-short', 'append-claws'], 'енот': ['ears-round', 'mark-mask', 'muzzle-short'], 'выдра': ['ears-round', 'muzzle-short', 'append-flippers'], 'бобр': ['ears-round', 'muzzle-rodent', 'append-flat-tail'], 'барсук': ['ears-round', 'mark-badger', 'muzzle-long'], 'куница': ['ears-pointed', 'mark-bib', 'append-bushy-tail'], 'соболь': ['ears-round', 'mark-bib', 'append-bushy-tail'], 'росомаха': ['ears-round', 'mark-mask', 'append-claws'], 'ласка': ['ears-pointed', 'muzzle-long', 'append-bushy-tail'], 'хорёк': ['ears-round', 'mark-mask', 'muzzle-long'], 'норка': ['ears-round', 'mark-bib', 'append-flippers'], 'скунс': ['ears-round', 'mark-badger', 'append-bushy-tail'],
  'панда': ['ears-round', 'mark-panda', 'muzzle-short'], 'коала': ['ears-wide', 'muzzle-short', 'append-claws'], 'вомбат': ['ears-round', 'muzzle-square', 'append-claws'], 'кенгуру': ['ears-long', 'muzzle-long', 'body-pouch', 'append-kangaroo-tail'], 'валлаби': ['ears-long', 'muzzle-short', 'body-pouch', 'append-walla-tail'], 'квокка': ['ears-round', 'muzzle-short', 'body-pouch'], 'капибара': ['ears-round', 'muzzle-square', 'append-flippers'], 'шиншилла': ['ears-wide', 'muzzle-rodent', 'append-bushy-tail'], 'кролик': ['ears-long', 'muzzle-rodent', 'append-bushy-tail'], 'заяц': ['ears-long', 'muzzle-long', 'append-bushy-tail'], 'белка': ['ears-pointed', 'muzzle-rodent', 'append-bushy-tail'], 'бурундук': ['ears-pointed', 'muzzle-rodent', 'mark-stripes'], 'сурок': ['ears-round', 'muzzle-rodent', 'append-claws'], 'ёж': ['ears-round', 'muzzle-long', 'body-spines'], 'летучая мышь': ['ears-bat', 'muzzle-short', 'append-wings'],
  'ленивец': ['ears-round', 'mark-mask', 'muzzle-short', 'append-claws'], 'муравьед': ['ears-round', 'muzzle-long', 'append-bushy-tail'], 'броненосец': ['ears-round', 'muzzle-long', 'body-armored'], 'тапир': ['ears-round', 'muzzle-tapir-trunk', 'append-bushy-tail'], 'жираф': ['ears-wide', 'append-ossicones', 'body-giraffe-neck', 'mark-giraffe-patches'], 'зебра': ['ears-pointed', 'mark-zebra-dense', 'append-bushy-tail'], 'слон': ['ears-wide', 'muzzle-trunk', 'append-elephant-tusks'], 'носорог': ['ears-round', 'muzzle-short', 'append-rhino-horn'], 'бегемот': ['ears-round', 'muzzle-square', 'body-hippo-fold', 'body-hippo-mouth', 'append-flippers'], 'верблюд': ['ears-round', 'muzzle-long', 'body-humps'], 'лама': ['ears-long', 'muzzle-long', 'mark-bib'], 'альпака': ['ears-long', 'muzzle-short', 'mark-spots'], 'як': ['ears-round', 'append-horns', 'body-yak-fringe', 'mark-bib'], 'олень': ['ears-pointed', 'append-antlers', 'muzzle-short'], 'лось': ['ears-wide', 'append-moose-antlers', 'muzzle-long'], 'бизон': ['ears-round', 'append-horns', 'body-bison-hump', 'mark-mane'],
  'тигр': ['ears-round', 'mark-stripes', 'muzzle-short'], 'лев': ['ears-round', 'mark-mane', 'muzzle-short'], 'гепард': ['ears-round', 'mark-cheetah', 'mark-spots'], 'леопард': ['ears-round', 'mark-rosettes', 'muzzle-short'], 'тюлень': ['muzzle-short', 'mark-belly', 'append-flippers'], 'дельфин': ['muzzle-long', 'body-dolphin-rostrum', 'append-flippers'], 'косатка': ['muzzle-long', 'append-fin', 'mark-orca', 'body-whale-flukes'], 'белуха': ['muzzle-short', 'head-beluga-melon', 'body-fountain', 'append-flippers'], 'нарвал': ['muzzle-long', 'append-tusk', 'append-flippers'], 'кит': ['muzzle-long', 'body-fountain', 'body-whale-flukes', 'append-flippers'], 'акула': ['muzzle-long', 'body-shark-profile', 'body-gills'], 'осьминог': ['muzzle-short', 'append-tentacles', 'body-octopus-suckers'], 'кальмар': ['muzzle-long', 'append-tentacles', 'append-fin'], 'краб': ['muzzle-short', 'body-crab-eyestalks', 'body-shell', 'append-claws'], 'морской конёк': ['muzzle-long', 'body-seahorse-crown', 'append-curl-tail', 'append-fin'], 'черепаха': ['muzzle-short', 'body-shell', 'body-turtle-scutes'],
  'лягушка': ['face-amphibian', 'muzzle-short', 'append-long-leg', 'append-flippers'], 'аксолотль': ['face-axolotl', 'ears-wide', 'body-gills', 'muzzle-short'], 'геккон': ['face-gecko-lids', 'append-claws', 'append-curl-tail'], 'хамелеон': ['face-chameleon-turret', 'body-spines', 'append-curl-tail'], 'крокодил': ['muzzle-long', 'body-spines', 'body-croc-teeth', 'mark-stripes'], 'змея': ['face-reptile', 'muzzle-long', 'append-curl-tail', 'body-snake-tongue', 'mark-stripes'], 'сова': ['ears-tufted', 'face-owl-discs', 'muzzle-beak-hook', 'append-wings'], 'орёл': ['muzzle-beak-hook', 'face-bird', 'append-wings'], 'сокол': ['ears-pointed', 'muzzle-beak-hook', 'body-falcon-marks', 'append-wings'], 'попугай': ['muzzle-beak-curve', 'face-bird', 'body-parrot-tail', 'append-wings'], 'пингвин': ['muzzle-beak-hook', 'face-bird', 'mark-belly', 'append-flippers'], 'фламинго': ['muzzle-beak-curve', 'body-flamingo-neck', 'append-long-leg', 'append-wings'], 'павлин': ['body-peacock-fan', 'append-wings', 'mark-spots'],
}
const kindDetailBlocks = {
  land: ['face-eyes-predator', 'face-nose-triangle', 'face-whiskers', 'face-paws'],
  big: ['face-eyes-predator', 'face-nose-broad', 'face-paws'],
  sea: ['face-aqua', 'face-aqua-bubbles', 'body-aqua-belly'],
  bird: ['face-bird', 'face-bird-brow', 'face-bird-feet'],
  reptile: ['face-reptile', 'face-reptile-scales', 'face-reptile-toes'],
  spiky: ['face-eyes-round', 'face-nose-triangle'],
}
const anatomyBlockNames = (animal) => [...(speciesProfiles[animal.speciesName] || []), ...(kindDetailBlocks[animal.kind] || [])]
const anatomyLayer = (block) => {
  if (/^append-(bushy|flat|antlers|moose|horns|fin|flippers|tusk|tentacles|wings|long|curl|kangaroo|walla|fox)/.test(block)) return 'behind'
  if (/^(mark-|body-)/.test(block)) return 'markings'
  if (/^(muzzle-|face-)/.test(block)) return 'face'
  return 'base'
}
const motionClass = (block) => {
  if (/^ears-/.test(block)) return 'motion-ears'
  if (/whiskers/.test(block)) return 'motion-whiskers'
  if (/paws|claws|long-leg|feet|toes/.test(block)) return 'motion-paws'
  if (/bushy-tail|flat-tail|curl-tail|kangaroo-tail|walla-tail|fox-tail|parrot-tail/.test(block)) return 'motion-tail'
  if (/wings|peacock-fan/.test(block)) return 'motion-wings'
  if (/fin|flippers|tentacles|aqua-bubbles|whale-flukes|dolphin-rostrum|shark-profile/.test(block)) return 'motion-water-part'
  if (/^face-(eyes|owl|amphibian|aqua|bird|reptile|axolotl|gecko|chameleon)/.test(block)) return 'motion-eyes'
  return ''
}
const motionAttributes = (block) => {
  const className = motionClass(block)
  return className ? `class="${className}" data-motion="${className.slice(7)}"` : ''
}
const composeAnatomy = (animal, layer) => anatomyBlockNames(animal)
  .filter((block) => anatomyLayer(block) === layer)
  .map((block) => `<g data-anatomy="${block}" ${motionAttributes(block)}>${anatomyBlocks[block]}</g>`).join('')
const sceneSvg = (scene, color) => ({
  forest: `<path d="M5 118 32 68l26 50m-20 0 30-70 31 70m-15 0 35-56 34 56" fill="${color.hex}" opacity=".16"/><path d="M0 118h160" stroke="${color.hex}" stroke-width="5"/>`,
  mist: `<path d="M0 94q22-24 46 0 23-27 48 0 24-25 66 0v36H0Z" fill="${color.hex}" opacity=".14"/><path d="M12 48h38m40 8h50M6 65h28" stroke="${color.hex}" stroke-width="5" stroke-linecap="round" opacity=".32"/>`,
  cosmos: `<circle cx="25" cy="30" r="3" fill="${color.hex}"/><circle cx="48" cy="15" r="5" fill="${color.hex}"/><circle cx="126" cy="32" r="4" fill="${color.hex}"/><path d="m18 48 8 8m0-8-8 8m105-32 9 9m0-9-9 9" stroke="${color.hex}" stroke-width="3"/>`,
  water: `<path d="M0 105q20-12 40 0t40 0 40 0 40 0v25H0Z" fill="${color.hex}" opacity=".17"/><path d="M5 96q16-11 32 0t32 0 32 0 32 0 32 0" fill="none" stroke="${color.hex}" stroke-width="4"/>`,
}[scene])

export const animals = species.flatMap(([speciesName, kind]) => realms.map((realm) => ({
  name: `${speciesName} ${realm.label}`, speciesName, kind, iconType: iconTypeBySpecies[speciesName], scene: sceneForAnimal(kind, realm.scene), realm: realm.label,
}))).map((animal, index) => ({ id: `animal-${index + 1}`, ...animal, slogan: makeSlogan('animal', animal.name, index) }))
export const colors = baseColors.flatMap(([base, hue, saturationBias = 0, lightnessBias = 0], baseIndex) => colorMoods.map(([mood, hueShift, saturation, lightness], moodIndex) => {
  const index = baseIndex * colorMoods.length + moodIndex; const name = `${mood} ${base}`
  return { id: `color-${index + 1}`, name, hex: uniqueColorHex(hue + hueShift, saturation + saturationBias, lightness + lightnessBias), slogan: makeSlogan('color', name, index) }
}))
export const adjectives = adjectiveRoots.flatMap((root, rootIndex) => intensifiers.map((intensifier, intensifierIndex) => {
  const index = rootIndex * intensifiers.length + intensifierIndex; const name = `${intensifier} ${root}`
  return { id: `adjective-${index + 1}`, name, slogan: makeSlogan('adjective', name, index) }
}))
export function animalSvg(animal, color, label = animal.name) {
  const secondary = hslToHex((parseInt(color.hex.slice(1, 3), 16) + 120) % 360, 76, 63)
  const gradientId = `gradient-${animal.id}-${color.id}`
  const titleId = `title-${animal.id}-${color.id}`
  const anatomy = (layer) => composeAnatomy(animal, layer)
  return `<svg xmlns="http://www.w3.org/2000/svg" class="animal-svg" viewBox="0 0 160 130" role="img" aria-labelledby="${titleId}" data-kind="${animal.kind}" data-icon-type="${animal.iconType}" data-scene="${animal.scene}"><title id="${titleId}">${label} — ${animal.scene}</title><style>.line{fill:none;stroke:#292334;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}.dot{fill:#292334;stroke:none}</style><defs><linearGradient id="${gradientId}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${color.hex}"/><stop offset="1" stop-color="${secondary}"/></linearGradient></defs><g data-layer="scene" data-motion="scene-wave" class="motion-scene motion-scene--${animal.scene}">${sceneSvg(animal.scene, color)}</g><circle class="motion-glow" data-motion="glow" cx="80" cy="67" r="54" fill="url(#${gradientId})" opacity=".22"/><g data-layer="behind" class="motion-color" fill="url(#${gradientId})" stroke="#292334" stroke-width="4" stroke-linejoin="round">${anatomy('behind')}</g><g data-layer="base" class="motion-body motion-color" data-motion="body" fill="url(#${gradientId})" stroke="#292334" stroke-width="4" stroke-linejoin="round">${shape(animal.kind)}${features[animal.iconType] || ''}${anatomy('base')}</g><g data-layer="markings" class="motion-color" fill="url(#${gradientId})" stroke="#292334" stroke-width="4" stroke-linejoin="round">${anatomy('markings')}</g><g data-layer="face" fill="url(#${gradientId})" stroke="#292334" stroke-width="4" stroke-linejoin="round">${anatomy('face')}</g><g class="line"><path d="M68 91q12 8 24 0"/></g></svg>`
}
const hash = (value) => [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0)
const pick = (list, value) => list[Math.abs(value) % list.length]
export function getDailyForecastParts(input = '', date = new Date()) {
  const dateKey = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow' }).format(date)
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow', hour: '2-digit', hourCycle: 'h23',
  }).format(date))
  const period = hour < 16 ? 0 : 1
  const forecastHash = Math.abs(hash(`${input.trim()}|${dateKey}|${period}`))
  return { mood: Math.abs(hash(`${forecastHash}|mood`)) % forecastMoods.length, action: Math.abs(hash(`${forecastHash}|action`)) % forecastActions.length, final: Math.abs(hash(`${forecastHash}|final`)) % forecastFinals.length }
}
export function getDailyForecast(input = '', date = new Date()) {
  const parts = getDailyForecastParts(input, date)
  return [forecastMoods[parts.mood], forecastActions[parts.action], forecastFinals[parts.final]].join(' ')
}
export function generateAnimalIdentity(input = '', variation = 0) {
  const query = input.trim() || 'неизвестный герой'
  const monthKey = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit' }).format(new Date())
  const identityHash = hash(`${query}|${monthKey}`)
  const variationHash = hash(`${query}|${monthKey}|${variation}`)
  const animal = pick(animals, identityHash); const color = pick(colors, identityHash >> 3); const adjective = pick(adjectives, variationHash >> 6)
  return { query, forecastKey: query, animal, color, adjective, fullName: `${adjective.name} ${color.name} ${animal.name}`, svg: animalSvg(animal, color), dayForecast: getDailyForecast(query) }
}
export function generateIdentityFromIds(animalId, colorId, variation = 0) {
  const animal = animals.find((item) => item.id === animalId)
  const color = colors.find((item) => item.id === colorId)
  if (!animal || !color) return null
  const adjective = pick(adjectives, hash(`${animal.id}|${color.id}|${variation}`) >> 6)
  const query = 'твой образ'
  const forecastKey = `${animal.id}|${color.id}`
  return { query, forecastKey, animal, color, adjective, fullName: `${adjective.name} ${color.name} ${animal.name}`, svg: animalSvg(animal, color), dayForecast: getDailyForecast(forecastKey), variation }
}
export function validateCatalog() {
  const catalog = [animals, colors, adjectives]
  return catalog.every((items) => items.length === 300 && new Set(items.map((item) => item.id)).size === 300 && new Set(items.map((item) => item.slogan)).size === 300)
    && animals.every((animal) => animal.iconType && animal.scene && features[animal.iconType] && anatomyBlockNames(animal).length >= 5 && anatomyBlockNames(animal).every((block) => anatomyBlocks[block]))
}
