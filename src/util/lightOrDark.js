export default function lightOrDark(color) {
  if (color === 'rgba(0, 0, 0, 0)') {
    return 'light'
  }
  let r, g, b, hsp
  color = color.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  )
  r = color[1]
  g = color[2]
  b = color[3]
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
  return hsp > 127.5 ? 'light' : 'dark'
}
