const express = require('express')
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

const app = express()

app.get('/', (req, res) => {
  const template = handlebars.compile(fs.readFileSync('./index.hbs', 'utf-8'))
  res.end(template({ pictures }))
})

app.use('/img', express.static('img'))

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

