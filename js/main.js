import Snake from './base/snake'
import Food from './base/food'
import DataBus from './databus'
import GameInfo from './base/game_info'

let databus = new DataBus()

databus.canvas = wx.createCanvas()

let ctx = databus.canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {

        this.gameInfo = new GameInfo(ctx, databus.canvas)

        this.performance()

        this.showGameInfo()

        this.backGameFrameRecovery()
    }

    // 游戏开始
    start() {
        wx.offTouchStart()

        this.Snake = new Snake(ctx)
        this.Food = new Food()

        // 获取食物位置
        databus.foodRect = this.Food.foodPos()
            // 绘制蛇
        this.Snake.snakeDraw()
            // 绘制食物
        databus.foodRect.rectDraw(ctx)

        // 帧循环 实现
        // wx.setPreferredFramesPerSecond(6) 暂时不支持设置帧数
        requestAnimationFrame((ID) => {
            this.loop()
        })
    }

    // loop 帧循环
    loop() {
        databus.frames++
            if (databus.frames % 6 === 0) {
                ctx.clearRect(0, 0, databus.canvas.width, databus.canvas.height)

                databus.foodRect.rectDraw(ctx)
                this.Snake.snakeMove()
                this.Snake.snakeDraw()
                    // 判断游戏是否结束
                if (databus.gameOver) {
                    this.showGameInfo()
                    return
                }
            }
        requestAnimationFrame((ID) => {
            this.loop()
        })
    }

    showGameInfo() {
        if (databus.gameOver) {
            this.gameInfo.renderInfoPlate()
            wx.onTouchStart((e) => {
                let x = e.touches[0].clientX
                let y = e.touches[0].clientY

                let area = this.gameInfo.btnArea

                if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
                    // 重置全局状态
                    databus.reset()
                        // 重启游戏
                    this.start()
                }
            })
        } else {
            this.gameInfo.renderGameFirstBegin()
            wx.onTouchStart((e) => {
                databus.reset()
                this.start()
            })
        }
    }

    // 退出再次进入后画面恢复
    backGameFrameRecovery() {
        let self = this
        wx.onShow((res) => {
            if (databus.gameOver) {
                this.Snake.snakeDraw()
                databus.foodRect.rectDraw(ctx)
                self.gameInfo.renderInfoPlate()
            } else {
                self.gameInfo.renderGameFirstBegin()
            }
        })
    }

    // 性能
    performance() {
        wx.triggerGC()
    }
}
