/*
    将所有物体看成对象，根据对象的共同点进行共同开发，避免了多次开发共同属性。
    类型特点：矩形类，可移动。
    属性：  width       宽度    
            height      高度
            left        横坐标
            top         纵坐标
            xSpeed      横向速度，正数向右移动，负数向左移动，单位(像素/秒)
            ySpeed      纵向速度，正数向下移动，负数向上移动，单位(像素/秒)
            dom         对应的DOM对象。
*/
class Rectangle {

    // constructor：是数组的属性，返回对象的构造函数。其返回值是对函数的引用，而不是函数的名称
    constructor(width, height, left, top, xSpeed, ySpeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    // 通过dom赋值
    render(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left+ 'px';
        this.dom.style.top = this.top + 'px';
    }

    // 按照矩形的速度和指定的时间移动矩形，duration表示单位(秒)
    move(duration){
        const xDis = this.xSpeed * duration;// 横向移动的速度值 * 每秒 = 移动的距离
        const yDis = this.ySpeed * duration;
        this.left = this.left + xDis;// 原来的位置 + 移动的距离 = 当前位置的新坐标位置
        this.top = this.top + yDis;

        // 预先调用：移动开始后，子级元素内拥有该动画函数就先执行它。
        if (this.onMove) {
            this.onMove();
        }

        this.render();// 渲染调用
    }
}