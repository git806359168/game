/*
    querySelector       （DOM对象）该方法返回文档中匹配指定 CSS 选择器的一个元素。
    getComputedStyle    （Win对象）方法用于获取指定元素的 CSS 样式。获取的样式是元素在浏览器中最终渲染效果的样式。
    parseFloat          （js全局属性/函数）函数可解析一个字符串，并返回一个浮点数。该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。
*/
const skyDom = document.querySelector('.sky');
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

class Sky extends Rectangle {

    // 继承，传参
    constructor(xSpeed) {
        super(skyWidth, skyHeight, 0, 0, xSpeed, 0, skyDom);// 继承父类属性，并传入需要的值
    }

    // 预先调用：在移动后未落地或者没撞柱子之前，均调用这里的动画效果。
    onMove(){
        // 当图片向左移动的距离(负数)小于等于图片负值除以2时，让图片重新归位。
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}



//  测试运行的代码
// let sky = new Sky(-40);// 这里的参数传给constructor

// // 每隔16毫秒移动一次
// setInterval(() => {
//     sky.move(16 / 1000);// 这里的单位是“ 秒 ”，所以需要除以1000并等于“ 毫秒 ”单位。
// }, 16);