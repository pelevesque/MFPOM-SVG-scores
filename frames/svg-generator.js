const fs = require('fs')

fs.readFile('angklung.txt', 'utf8', function read(err, file) {
  if (err) throw err
  process(file)
})

function process(file) {
  const frames = extractFrames(file)
  console.log(frames.length)
}

function extractFrames(file) {
  const frames = []
  let frame = []
  const lines = file.split(/\r?\n/)
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
