



// 创建类
class Game {
    constructor() {
        this.sky = new Sky(-60);
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pairPipe = new producePipe(-100);// 生产水管
        this.timer = null;
        this.gameEnd = false;// 记录游戏结束状态
    }



    // 开始运动
    start() {
        if (this.timer) {
            return
        }

        // 小鸟碰撞判断1：如果gameEnd的记录值为true就执行下面代码
        if (this.gameEnd) {
            // window.location 对象用于获得当前页面的地址 (URL)，reload()方法用于刷新当前文档。
            window.location.reload()
        }
        this.pairPipe.startProduce();// 开始生产
        this.bird.startSwing();// 小鸟扇翅膀
        this.timer = setInterval(() => {
            this.sky.move(16 / 1000);// 这里的单位为秒，所以需要除以1000
            this.land.move(16 / 1000);
            this.bird.move(16 / 1000);
            this.pairPipe.record.forEach(pipes => {// 循环数组内的水管总数
                pipes.move(16 / 1000);
            });

            // 小鸟碰撞判断：如果接收到isGameEnd函数的结果就停止游戏，并给gameEnd记录值赋予true
            if (this.isGameEnd()) {
                this.stop();
                this.gameEnd = true;
            }
        }, 16);// 单位毫秒(1.6秒)
    }



    // 小鸟碰撞判断3。 rec1表示小鸟和上水管，rec2表示小鸟和下水管
    isHit(rec1, rec2) {
        /*  横坐标中心点计算法则：两个矩形的中心点的“ 横 ”向距离是否小于矩形“ 宽 ”度之和的一半。
            纵坐标中心点计算法则：两个矩形的中心点的“ 纵 ”向距离是否小于矩形“ 高 ”度之和的一半。
            Math.abs求出绝对值 */
        let centerX1 = rec1.left + rec1.width / 2;// 小鸟的left值 + 上水管的宽度
        let centerY1 = rec1.top + rec1.height / 2;
        let centerX2 = rec2.left + rec2.width / 2;// 小鸟的left值 + 下水管的宽度
        let centerY2 = rec2.top + rec2.height / 2;
        let disX = Math.abs(centerX1 - centerX2);// 上水管 - 下水管
        let disY = Math.abs(centerY1 - centerY2);
        if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
            return true;
        }
        return false;
    }



    // 小鸟碰撞判断2
    isGameEnd() {

        // 落地判断
        if (this.bird.top === this.bird.maxY) {
            return true;// 如果小鸟落地了就执行true(true指向40行)
        }

        // 撞水管判断
        for (let i = 0; i < this.pairPipe.record.length; i++) {
            const allPipe = this.pairPipe.record[i];// 循环数组拿到所有的水管

            // 使用isHit判断：小鸟和上水管的碰撞值 || 小鸟和下水管碰撞的值
            if (this.isHit(this.bird, allPipe.upPipe) || this.isHit(this.bird, allPipe.downPipe)) {
                return true;
            }
        }
        return false;
    }



    // 停止运动
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.pairPipe.record = null; 
    }



    // 事件
    keyEvent() {
        window.onkeydown = (e) => {
            // 开始与停止。e.key用于记录键盘所有点击事件
            if (e.key === 'Enter') {// 事件监听到回车键便开始游戏，如果没有开启计时器便停止游戏。
                if (this.timer) {
                    this.stop();// 停止
                } else {
                    this.start();// 开始
                }
            }
            // 飞
            if (e.key === ' ') {
                this.bird.fly();
            }
        }
    }
}

let g = new Game();
g.keyEvent();