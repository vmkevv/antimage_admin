function Circle(context, WIDTH, HEIGHT, DRAW_INTERVAL) {
  this.settings = {
    ttl: 8000, xmax: 5, ymax: 2, rmax: 10, rt: 1, xdef: 960, ydef: 540, xdrift: 4, ydrift: 4, random: true, blink: true
  }

  this.reset = function () {
    this.x = (this.settings.random ? WIDTH * Math.random() : this.settings.xdef)
    this.y = (this.settings.random ? HEIGHT * Math.random() : this.settings.ydef)
    this.r = ((this.settings.rmax - 1) * Math.random()) + 1
    this.dx = (Math.random() * this.settings.xmax) * (Math.random() < 0.5 ? -1 : 1)
    this.dy = (Math.random() * this.settings.ymax) * (Math.random() < 0.5 ? -1 : 1)
    this.hl = (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax)
    this.rt = Math.random() * this.hl
    this.settings.rt = Math.random() + 1
    this.stop = Math.random() * 0.2 + 0.4
    this.settings.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1)
    this.settings.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1)
  }

  this.fade = function () {
    this.rt += this.settings.rt
  }

  this.draw = function () {
    if (this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
      this.settings.rt = this.settings.rt * -1
    } else if (this.rt >= this.hl) {
      this.reset()
    }

    const newo = 1 - (this.rt / this.hl)
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    context.closePath()

    const cr = this.r * newo
    const gradient = context.createRadialGradient(
      this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr)
    )
    gradient.addColorStop(0.0, `rgba(255, 255, 255, ${newo})`)
    gradient.addColorStop(this.stop, `rgba(77, 101, 181, ${newo * 0.6})`)
    gradient.addColorStop(1.0, 'rgba(77,101,181,0)')
    context.fillStyle = gradient // eslint-disable-line
    context.fill()
  }

  this.move = function () {
    this.x += (this.rt / this.hl) * this.dx
    this.y += (this.rt / this.hl) * this.dy
    if (this.x > WIDTH || this.x < 0) this.dx *= -1
    if (this.y > HEIGHT || this.y < 0) this.dy *= -1
  }

  this.getX = function () { return this.x }
  this.getY = function () { return this.y }
}
export default Circle
