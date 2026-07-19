import { stat } from 'node:fs/promises'

const ensure = (condition, message) => { if (!condition) throw new Error(message) }
const root = new URL('../', import.meta.url)
const [loader, core] = await Promise.all(['app.js', 'app-core.js'].map((file) => stat(new URL(file, root))))

ensure(loader.size < 1_024, 'Начальный загрузчик слишком тяжёлый: первый экран должен начинаться с лёгкого файла.')
ensure(core.size < 85_000, 'Основной JavaScript не стал компактнее 85 КБ.')
console.log(`JavaScript упакован: загрузчик ${loader.size} Б, отложенный код ${core.size} Б.`)
