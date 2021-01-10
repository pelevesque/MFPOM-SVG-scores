const fs = require('fs')
const lib = require('./lib')

const framesFile = fs.readFileSync('gong-kebyar-frames.txt', 'utf8')
const colorsFile = fs.readFileSync('gong-kebyar-colors.txt', 'utf8')

const frames = lib.extractFrames(framesFile)
const colors = lib.extractColors(colorsFile)

// finish the algo, and add some controls via the command line via params.
// be able to generate 1 frame, all frames, or a test with some of the most
// - important frames.

// variables (put these into a config file)
const cw = 1600 // canvas width
const ch = 900  // canvas height
const cBackgroundColor = '#000000' // canvas background color
const rw = 90  // rectangle width
const rh = 40   // rectangle height
const rsw = 2   // rectangle spacer width
const rsh = 2   // rectangle spacer height

// move this to lib and make it a function without any side effects
// perhaps calculations of pw and ph can be isolated
function renderFrameToSVG(frame) {
  let svg = ''
  const pw = (cw - ((frame[0].length * rw) + ((frame[0].length - 1) * rsw))) / 2 // padding width
  const ph = (ch - ((frame.length * rh) + ((frame.length - 1) * rsh))) / 2 // padding height
  // The pw can change, but not the ph
  let y = ph
  frame.forEach(block => {
    let x = pw
    for (let i = 0; i < block.length; i++) {
      if (block.charAt(i) !== '.') {
        const c = colors[block.charAt(i)]
        svg += `  <rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="#${c}" />\n`
      }
      x += rw + rsw
    }
    y += rh + rsh
  })
  return svg
}

const svg = lib.createSVG(renderFrameToSVG(frames[25]), cw, ch, cBackgroundColor)

fs.writeFile('test.svg', svg, (err) => {
  if (err) throw err
})
