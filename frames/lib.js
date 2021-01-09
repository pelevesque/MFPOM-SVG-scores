const NEWLINE = /\r?\n/

module.exports = {
  extractFrames: function (file) {
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
  }
}
