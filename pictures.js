const fs = require('node:fs')
const path = require('node:path')

const SEED = 42

function seededScore(str) {
  let h = SEED
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0
  }
  return h
}

const imgFiles = {}
fs.readdirSync('./img').forEach(file => {
  const { name: id } = path.parse(file)
  imgFiles[id] = file
})

const pictures = Object.keys(imgFiles)
  .filter(id => !id.endsWith('_now') && (id + '_now') in imgFiles)
  .sort((a, b) => seededScore(a) - seededScore(b))
  .map(id => ({ then: imgFiles[id], now: imgFiles[id + '_now'] }))

module.exports = { pictures }
