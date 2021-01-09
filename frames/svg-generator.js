const fs = require('fs')
const NEWLINE = /\r?\n/

fs.readFile('angklung.txt', 'utf8', function read(err, file) {
  if (err) throw err
  processFrames(file)
})

function processFrames(file) {
  const frames = extractFrames(file)
  console.log(frames.length)
}

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

fs.readFile('angklung-colours.txt', 'utf8', function read(err, file) {
  if (err) throw err
  processColours(file)
})

function processColours(file) {
  const colours = extractColours(file)
  console.log(colours.length)
}

function extractColours(file) {
  const colours = []
  const lines = file.split(NEWLINE)
  lines.forEach(line => {
    if (line.charAt(0) === '#') {
      colours.push(line.substring(1))
    }
  })
  return colours
}
