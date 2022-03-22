




const landDom = document.querySelector('.land');
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landtop = parseFloat(landStyle.top)

class Land extends Rectangle {
    constructor(xSpeed) {
        super(landWidth, landHeight, 0, landtop, xSpeed, 0, landDom);
    }
    onMove(){
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}



//  测试运行的代码
// let land = new Land(-50);

// setInterval(() => {
//     land.move(16 / 1000)
// }, 16);