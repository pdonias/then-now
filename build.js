const handlebars = require('handlebars')
const fs = require('node:fs')
const path = require('node:path')

const imgFiles = {}
fs.readdirSync('./img').forEach(file => {
  const { name: id } = path.parse(file)
  imgFiles[id] = file
})

const pictures = Object.keys(imgFiles)
  .filter(id => !id.endsWith('_now') && (id + '_now') in imgFiles)
  .map(id => ({ then: imgFiles[id], now: imgFiles[id + '_now'] }))

fs.mkdirSync('./dist/img', { recursive: true })

fs.readdirSync('./img').forEach(file => {
  fs.copyFileSync(`./img/${file}`, `./dist/img/${file}`)
})

const template = handlebars.compile(fs.readFileSync('./index.hbs', 'utf-8'))
fs.writeFileSync('./dist/index.html', template({ pictures }))

console.log(`Built dist/index.html with ${pictures.length} pictures`)
