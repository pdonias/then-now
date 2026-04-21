const handlebars = require('handlebars')
const fs = require('node:fs')
const { pictures } = require('./pictures')

fs.mkdirSync('./dist/img', { recursive: true })

fs.readdirSync('./img').forEach(file => {
  fs.copyFileSync(`./img/${file}`, `./dist/img/${file}`)
})

if (fs.existsSync('./CNAME')) {
  fs.copyFileSync('./CNAME', './dist/CNAME')
}

const template = handlebars.compile(fs.readFileSync('./index.hbs', 'utf-8'))
fs.writeFileSync('./dist/index.html', template({ pictures }))

console.log(`Built dist/index.html with ${pictures.length} pictures`)
