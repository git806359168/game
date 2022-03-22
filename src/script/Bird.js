/*
    querySelector       （DOM对象）该方法返回文档中匹配指定 CSS 选择器的一个元素。
    getComputedStyle    （Win对象）方法用于获取指定元素的 CSS 样式。获取的样式是元素在浏览器中最终渲染效果的样式。
    parseFloat          （js全局属性/函数）函数可解析一个字符串，并返回一个浮点数。该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。
    clientWidth         获取div元素的宽度，包含内边距（padding）。
*/
const birdDom = document.querySelector('.bird');// 获取小鸟的dom
const gameDom = document.querySelector('.game');// 获取游戏可视区的dom
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);
const gameTop = gameDom.clientHeight;
const pipeLeft = gameDom.clientWidth;

class Bird extends Rectangle {

    // 继承、传参。如果有值就传入super内，如果不知道值(没有值)则在constructor内传入祖级调用值。
    constructor() {

        // 继承祖级框架，并传入需要的值
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);

        // 小鸟向下掉落的速度值，单位：像素/秒。(指向41行)
        this.g = 1000;

        // 动画效果：游戏可视区高度 - 大地 - 小鸟 = 小鸟可活动空间值
        this.maxY = gameTop - landHeight - birdHeight + 3;

        // 小鸟扇动翅膀
        this.state = 1; // 用于记录翅膀状态(1~3种状态)
        this.timer = null// 用于开始煽动翅膀的计时器
    }



    // 重新构造move方法
    move(duration){

        // 把index.js的move属性调用过来继承给super元素父级的move，相当于这个move拥有了祖级move的所有属性。
        super.move(duration);

        // 小鸟移动值 * 时间 = 纵坐标最新位置
        this.ySpeed += this.g * duration;
    }



    // 重新构造render方法
    render(){

        // 继承
        super.render();

        // 获取鸟的三种状态，$里面表示的是索引值
        this.dom.className = `bird swing${this.state}`;
    }



    // 预先调用：在移动后未落地或者没撞柱子之前，均调用这里的动画效果。
    onMove(){
        // 往上走为负数(值越小)，往下走为正数(值越大)。
        if (this.top < 0) {
            this.top = 0;
        }else if(this.top > this.maxY){
            // 如果小鸟移动的坐标超出可活动空间就让小鸟停留在可活动空间的最大值
            this.top = this.maxY;
        }
    }



    // 向上跳事件
    fly(){
        this.ySpeed = -350;
    }



    // 小鸟扇动翅膀 - 开始
    startSwing(){
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.state ++;
            if (this.state === 4) {
                this.state = 1;
            }
            this.render;// 重新渲染
        }, 240)
    }
    // 结束
    stopSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }
}



//  测试运行的代码
// let bird = new Bird();
// bird.startSwing();


// // 每隔16毫秒执行一次move
// setInterval(() => {
//     bird.move(16 / 1000);// 这里的单位是“ 秒 ”，所以需要除以1000并等于“ 毫秒 ”单位。
// }, 16);