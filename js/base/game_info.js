import DataBus from '../databus'

let databus = new DataBus()

export default class gameInfo {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
    }

    renderInfoPlate() {
        var ctx = this.ctx
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0,0,0,.5)'
        ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.rect(this.canvas.width / 2 - 30, this.canvas.height / 2 - 20, 60, 40)
        ctx.fill()
        ctx.fillStyle = 'white'
        ctx.font = "12px Arial"
        ctx.textAlign = 'center'
        ctx.fillText('重新开始', this.canvas.width / 2, this.canvas.height / 2 + 3)

        // render score
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.font = "28px Arial"
        ctx.textAlign = 'center'
        ctx.fillText('共吃掉' + databus.score + '颗豆子', this.canvas.width / 2, 100)

        // 按钮位置
        this.btnArea = {
            startX: this.canvas.width / 2 - 30,
            startY: this.canvas.height / 2 - 20,
            endX: this.canvas.width / 2 + 30,
            endY: this.canvas.height / 2 + 20
        }
    }

    renderGameFirstBegin() {
        var ctx = this.ctx
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0,0,0,.5)'
        ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        ctx.fill()
        ctx.fillStyle = 'white'
        ctx.font = "25px Arial"
        ctx.textAlign = 'center'
        ctx.fillText('轻触屏幕开始', this.canvas.width / 2, this.canvas.height / 2)
        ctx.font = "15px Arial"
        ctx.fillText('贪吃蛇', this.canvas.width / 2, this.canvas.height - 20)
    }
}
