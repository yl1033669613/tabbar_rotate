export default class Rect {
    constructor(x, y, w, h, color) {

        this.w = w
        this.h = h

        this.x = x
        this.y = y

        this.color = color
    }

    rectDraw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.fill()
        ctx.stroke()
        ctx.strokeStyle = '#ffffff'
    }
}
