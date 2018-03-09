import Rect from './rect'
import Food from './food'
import DataBus from '../databus'

let databus = new DataBus()

const DIFFPX = 15

export default class Snake {
    constructor(ctx) {

        this.snakeArray = databus.snake

        //画出2个方块，设置成灰色
        for (var i = 0; i < 2; i++) {
            var rect = new Rect(i * 15, 0, 15, 15, "gray")
            this.snakeArray.splice(0, 0, rect)
        }

        this.head = this.snakeArray[0]
        this.head.color = 'red'

        //给定初始位置向右
        this.direction = 39

        // 触摸的初始位置
        this.touchX = 0
        this.touchY = 0

        // 初始化事件监听
        this.initEvent()

        // ctx
        this.ctx = ctx
    }

    //画蛇的方法
    snakeDraw() {
        for (var i = 0; i < this.snakeArray.length; i++) {
            this.snakeArray[i].rectDraw(this.ctx)
        }
    }

    snakeMove() {
        //此处是核心部分，蛇的 移动方式
        //1、画一个灰色的方块，位置与蛇头重叠
        //2、将这个方块插到数组中蛇头后面一个的位置
        //3、砍去末尾的方块
        //4、将蛇头向设定方向移动一格
        var rect = new Rect(this.head.x, this.head.y, this.head.w, this.head.h, "gray")
        this.snakeArray.splice(1, 0, rect)
            //判断是否吃到食物
            //吃到则食物重新给位置，不砍去最后一节，即蛇变长
            //没吃到则末尾砍掉一节，即蛇长度不变
        if (this.isEat()) {
            databus.score++
                databus.foodRect = new Food().foodPos()
            databus.foodRect.rectDraw(this.ctx)
        } else {
            this.snakeArray.pop()
        }
        //设置蛇头的运动方向，37 左，38 上，39 右，40 下
        switch (this.direction) {
            case 37:
                this.head.x -= this.head.w
                break
            case 38:
                this.head.y -= this.head.h
                break
            case 39:
                this.head.x += this.head.w
                break
            case 40:
                this.head.y += this.head.h
                break
            default:
                break
        }
        // gameover判定
        // 撞墙
        if (this.head.x >= databus.canvas.width || this.head.x < 0 || this.head.y >= databus.canvas.height || this.head.y < 0) {
            databus.gameOver = true
        }
        // 撞自己，循环从1开始，避开蛇头与蛇头比较的情况
        for (var i = 1; i < this.snakeArray.length; i++) {
            if (this.snakeArray[i].x == this.head.x && this.snakeArray[i].y == this.head.y) {
                databus.gameOver = true
            }
        }
    }

    /**
     * 玩家响应手指的触摸事件
     */
    initEvent() {
        var self = this

        wx.onTouchStart((e) => {

            let x = e.touches[0].clientX
            let y = e.touches[0].clientY

            self.touchX = x
            self.touchY = y
        })

        wx.onTouchEnd((e) => {

            let x = e.changedTouches[0].clientX
            let y = e.changedTouches[0].clientY

            let diffX = x - self.touchX
            let diffY = y - self.touchY

            if (diffX <= -DIFFPX && Math.abs(diffX) >= Math.abs(diffY)) {

                if (self.direction !== 39) {
                    self.direction = 37
                }
            } else if (diffX >= DIFFPX && Math.abs(diffX) >= Math.abs(diffY)) {

                if (self.direction !== 37) {
                    self.direction = 39
                }
            } else if (diffY <= -DIFFPX && Math.abs(diffY) > Math.abs(diffX)) {

                if (self.direction !== 40) {
                    self.direction = 38
                }
            } else if (diffY >= DIFFPX && Math.abs(diffY) > Math.abs(diffX)) {

                if (self.direction !== 38) {
                    self.direction = 40
                }
            }
        })
    }

    //判定吃到食物，即蛇头坐标与食物坐标重合
    isEat() {
        if (this.head.x == databus.foodRect.x && this.head.y == databus.foodRect.y) {
            return true
        } else {
            return false
        }
    }
}
