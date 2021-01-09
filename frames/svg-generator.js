const fs = require('fs')
const lib = require('./lib')

const framesFile = fs.readFileSync('angklung-frames.txt', 'utf8')
const colorsFile = fs.readFileSync('angklung-colors.txt', 'utf8')

const frames = lib.extractFrames(framesFile)
const colors = lib.extractColors(colorsFile)

console.log(frames.length)
console.log(colors.length)
