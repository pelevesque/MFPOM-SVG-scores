const NEWLINE = /\r?\n/

// these functions have no side-effects
module.exports = {
  extractFrames: function (file) {
    const frames = []
    let frame = []
    const lines = file.split(NEWLINE)
    lines.forEach(line => {
      if ( // ignore non functional lines
        line.length > 0 &&
        line.charAt(0) !== '-' &&
        line.charAt(0) !== '@'
      ) {
        if (line.charAt(0) === '#') {
          if (frame.length > 0) { // don't reset for first frame
            frames.push(frame)
            frame = []
          }
        } else {
          frame.push(line)
        }
      }
    })
    frames.push(frame)
    return frames
  },
  extractColors: function (file) {
    const colors = []
    const lines = file.split(NEWLINE)
    lines.forEach(line => {
      if (line.charAt(0) === '#') {
        colors.push(line.substr(1, 6))
      }
    })
    return colors
  },
  extractConfig: function (file) {
    const config = {}
    const lines = file.split(NEWLINE)
    lines.forEach(line => {
      if (
        line.length > 0 &&
        line.charAt(0) !== '-'
      ) {
        const parts = line.trim().split(' ')
        config[parts[0]] = parts[parts.length - 1]
      }
    })
    return config
  },
  createSVG: function(body, width, height, backgroundColor) {
    let svg = ''
    svg += '<!DOCTYPE svg\n'
    svg += '  PUBLIC "-//W3C//DTD SVG 1.1//EN"\n'
    svg += '  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"\n'
    svg += '>\n'
    svg += '<svg\n'
    svg += `  width="${width}"\n`
    svg += `  height="${height}"\n`
    svg += `  style="background-color:${backgroundColor}"\n`
    svg += '  xmlns="http://www.w3.org/2000/svg"\n'
    svg += '>\n'
    svg += body
    svg += '</svg>\n'
    return svg
  }
}
