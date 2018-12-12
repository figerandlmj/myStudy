// var sheep = document.getElementsByClassName('sheep')[0];
// var num = 0;//小羊自动计数
// var sheepWidth = sheep.offsetWidth;//小羊宽度
// var cot = 0;//小羊移动偏移量
// var speed = 10;//小羊移动速度
// //小羊自动 改变小羊背景图片的位置
// var sheepAnimate = setInterval(function() {
//     num += sheepWidth;
//     if(num == sheepWidth * 8) {
//         num = 0;
//     }
//     sheep.style.backgroundPosition = -num + 'px 0px';
// }, 100);
//
// //小羊移动
// var sheepRun = setInterval(function() {
//     cot = sheep.offsetLeft - speed;
//     if(cot <= -164) {
//         clearInterval(sheepRun);
//         clearInterval(sheepAnimate);
//         console.log('stop');
//     }
//     sheep.style.left = cot + 'px';
// }, 100);

(function() {
    var obj = {
        frequency: 70,//小羊自动和移动的频率
        stage: document.getElementsByClassName('stage')[0],
        num: 0,//小羊自动计数
        cot: 0,//小羊移动偏移量
        speed: 7,//小羊移动速度
        maxSheepNum: 8//小羊最大数量
    };
    //小羊工厂
    function Sheep(data) {
        this.sheep = document.createElement('div');
        this.sheep.className = 'sheep';
        this.stage = data.stage;
        this.stage.appendChild(this.sheep);
        this.frequencyNum = Math.floor(Math.random() * data.frequency) + 30;//30-100
        this.sheepWidth = this.sheep.offsetWidth;
        this.cot = data.cot;
        this.num = data.num;
        this.speed = data.speed;
        this.top = 0;
    }
    init();
    function init() {
        createSheep();
    }
    //创建小羊
    function createSheep() {
        var timer = setInterval(function() {
            var sheepNum = obj.stage.children.length;
            console.log(sheepNum);
            if(sheepNum > obj.maxSheepNum - 1){
                return false;
            }
            var newSheep = new Sheep(obj);
            sheepRun(newSheep);
        }, 1000);
    }
    //小羊运动
    function sheepRun(newS) {
        //小羊自动
        var sheepAnimate = setInterval(function() {
            newS.num += newS.sheepWidth;
            if(newS.num == newS.sheepWidth * 8) {
                newS.num = 0;
            }
            newS.sheep.style.backgroundPosition = -newS.num + 'px ' + newS.top + 'px';
        }, newS.frequencyNum);

        //小羊移动
        var sheepRun = setInterval(function() {
            newS.cot = newS.sheep.offsetLeft - newS.speed;
            if(newS.cot <= -newS.sheepWidth) {
                clearInterval(sheepRun);
                clearInterval(sheepAnimate);
                newS.stage.removeChild(newS.sheep);
                console.log('stop');
            }
            newS.sheep.style.left = newS.cot + 'px';
        }, newS.frequencyNum);

        //小羊拖拽
        newS.sheep.addEventListener('mousedown', function(e) {
            var event = e || event;
            newS.top = -128;
            newS.speed = 0;
            newS.x = event.pageX;
            newS.y = event.pageY;
            document.addEventListener('mousemove', mouseM);
            function mouseM(e) {
                var event = e || event;
                newS.sheep.style.left = newS.sheep.offsetLeft + (event.pageX - newS.x) + 'px';
                newS.sheep.style.top = newS.sheep.offsetTop + (event.pageY - newS.y) + 'px';
                newS.x = event.pageX;
                newS.y = event.pageY;
            }
            newS.sheep.addEventListener('mouseup', function() {
                newS.top = 0;
                newS.speed = obj.speed;
                document.removeEventListener('mousemove', mouseM);
            })
        })
    }
})();