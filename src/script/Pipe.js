




class Pipe extends Rectangle {

    // 继承祖级类。如果有值就传入super内，如果不知道值(没有值)则在constructor内传入祖级调用值。
    constructor(height, top, xSpeed, dom) {

        // 继承祖级框架，并传入需要的值
        super(52, height, pipeLeft, top, xSpeed, 0, dom);
    }



    // 预先调用：水管移动到游戏面板左侧以外，均调用这里的动画效果。
    onMove() {
        // 如果水管的left值小于水管的宽度就清除水管dom元素。
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}



// 重新定义类，创建上下水管
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);// 生成0 ~ 9的概念随机数
}
class createPipe {
    constructor(xSpeed) {// 这里传入水管移动速度的参数

        // middleHeight ~ upHeight，计算出上水管的高度。upDom ~ upPipe，创建新的div并且添加类名。

        this.middleHeight = 150;// 两管之间的距离
        this.minHeight = 80;// 最小的管道高度
        // 最大高度 = 大地top值(已减去大地的高度) - 中间值 - 最小值
        this.maxHeight = landtop - this.middleHeight - this.minHeight;
        // 上水管的高度由getRandom随机数去生成最大值和最小值之间
        const upHeight = getRandom(this.minHeight, this.maxHeight);
        const upDom = document.createElement('div');// 为移动的水管创建一个新的div
        upDom.className = 'pipe Up';// 给新创建的div添加类名。
        this.upPipe = new Pipe(upHeight, 0, xSpeed, upDom);// 上水管，new Pipe指向第8行



        // downHeight ~ downTop，计算下水管的高度。downDom ~ downPipe，创建新的div并且添加类名。

        // 下水管的高度 = 大地的top值 - 中间值 - 上水管的高度
        const downHeight = landtop - this.middleHeight - upHeight;
        // 下水管的bottom坐标 = 大地的top值 - 下水管的高度
        const downTop = landtop - downHeight;
        const downDom = document.createElement('div');
        downDom.className = 'pipe Down'
        this.downPipe = new Pipe(downHeight, downTop, xSpeed, downDom);// 下水管，new Pipe指向第8行



        // 将新创建好的水管插入到dom中
        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }


    // 动画渲染
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }


    // 没有用的水管
    get useLess(){

        // 上水管left值 < 上水管宽度时
        return this.upPipe.left < -this.upPipe.width;
    }
}



// 生产水管
class producePipe {
    constructor(xSpeed) {
        this.xSpeed = xSpeed;// 速度值
        this.record = [];// 记录生产值(默认值为1)
        this.timer = null;// 计时器
    }

    // 开始生产
    startProduce() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.record.push(new createPipe(this.xSpeed));// 将创建好的新水管添加到数组内记录
            
            // 清除溢出的水管
            for (let i = 0; i < this.record.length; i++) {
                const removePipe = this.record[i];

                // 需要被清除的水管如果它的值等于useLess里面的判断结果就执行下面代码。 useLess指向76行
                if (removePipe.useLess) {
                    this.record.splice(i, 1);// 删除数组里面不需要的值，splice用于添加或删除
                    i--;
                }
            }
        }, 1500);// 每隔1.5秒移动一次
    }



    // 结束生产
    stopProduce() {
        clearInterval(this.timer);
        this.time = null;
    }
}



//  测试运行的代码
// let pair = new producePipe(-100);// 创建一对新的水管(-100 对映 xSpeed)
// pair.startProduce();// 对水管开始生产


// setInterval(() => {
//     pair.record.forEach(e => {// 不断生产的水管记录到数组里，然后遍历数组，e对应索引(每个水管的本身)。
//         e.onMove(16 / 1000)// 对每个水管进行渲染， 16 / 1000对应 duration。（渲染指向69行）
//     })
// }, 16)