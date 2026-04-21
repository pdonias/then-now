const express = require('express')
const handlebars = require('handlebars')
const fs = require('node:fs')
const { pictures } = require('./pictures')

const app = express()

app.get('/', (req, res) => {
  const template = handlebars.compile(fs.readFileSync('./index.hbs', 'utf-8'))
  res.end(template({ pictures }))
})

app.use('/img', express.static('img'))

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

