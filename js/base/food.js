import Rect from './rect'
import DataBus from '../databus'

let databus = new DataBus()

export default class Food{
	constructor (){

		this.isOnSnake = true

		this.snake = databus.snake

	}

	getNumberInRange (min, max){
		var range = max - min
        var r = Math.random()
        return Math.round(r * range + min)
	}

	//设置食物出现的随机位置
	foodPos (){
        this.isOnSnake = true

		while (this.isOnSnake) {
            //执行后先将判定条件设置为false，如果判定不重合，则不会再执行下列语句
            this.isOnSnake = false
            var indexX = this.getNumberInRange(0, databus.canvas.width / 15 - 1)
            var indexY = this.getNumberInRange(0, databus.canvas.height / 15 - 1)
            var rect = new Rect(indexX * 15, indexY * 15, 15, 15, "green")
            for (var i = 0; i < this.snake.length; i++) {
                if (this.snake[i].x == rect.x && this.snake[i].y == rect.y) {
                    //如果判定重合，将其设置为true，使随机数重给
                    this.isOnSnake = true
                    break
                }
            }
        }

        return rect
	}
}