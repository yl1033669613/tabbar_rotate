let instance
    /**
     * 全局状态管理器
     */
export default class DataBus {
    constructor() {
        if (instance)
            return instance

        this.canvas = {}

        instance = this

        this.reset()
    }

    reset() {
        // requestAnimationFrame 实现 计数
        this.frames = 0
        // score
        this.score = 1
        // snake arr
        this.snake = []
        // food obj
        this.foodRect = {}
        // game syb
        this.gameOver = false
    }
}
