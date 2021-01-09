const fs = require('fs')
const NEWLINE = /\r?\n/

const framesFile = fs.readFileSync('angklung-frames.txt', 'utf8')
const colorsFile = fs.readFileSync('angklung-colors.txt', 'utf8')

const frames = extractFrames(framesFile)
const colors = extractColors(colorsFile)

console.log(frames.length)
console.log(colors.length)

function extractFrames(file) {
  const frames = []
  let frame = []
  const lines = file.split(NEWLINE)
  lines.forEach(line => {
    if (
      line.length > 0 &&
      line.charAt(0) !== '-' &&
      line.charAt(0) !== '@'
    ) {
      if (line.charAt(0) === '#') {
        if (frame.length > 0) {
          frames.push(frame)
        } else {
          frame = []
        }
      } else {
        frame.push(line)
      }
    }
  })
  frames.push(frame)
  return frames
}

function extractColors(file) {
  const colors = []
  const lines = file.split(NEWLINE)
  lines.forEach(line => {
    if (line.charAt(0) === '#') {
      colors.push(line.substr(1, 6))
    }
  })
  return colors
}
