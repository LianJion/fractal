var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/bg.png";

var watertest = false;
var water2Image = new Image();
water2Image.onload = function () {
  watertest = true; 
};
water2Image.src = "images/drop.png"


//stone => 分形
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
  stoneReady = true;
};
stoneImage.src = "images/stone.png";

var exp = 1;
//water img
var waterReady = false;
var waterimg = new Image();
waterimg.onload = function () {
  waterReady = true;
};
waterimg.src = "images/waterdrop.png";

var stone = {};
var waterdrop = {};

var reset = function () {
  stone.x = canvas.width/2 - 102;
  stone.y = canvas.height - 136;
  // Throw the monster somewhere on the screen randomly
  waterdrop.x = 32 + (Math.random() * (canvas.width - 64));
  waterdrop.y = 10 ;
};

//实现鼠标移动图像，点击图像
canvas.onmousedown = function(e){
  var x = e.clientX - waterdrop.x;
  var y = e.clientY - waterdrop.y;

  //判断鼠标是否点击在图像内
  if(e.clientX >= waterdrop.x + this.offsetLeft && e.clientX <= waterdrop.x + 43 + this.offsetLeft && e.clientY >= waterdrop.y + this.offsetTop && e.clientY <= waterdrop.y + 65 + this.offsetTop){
  
      document.onmousemove = function(e){
          ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
          
          //鼠标拖动时重绘黑色背景
          ctx.drawImage(waterimg, e.clientX-x, e.clientY-y);
         
          //记录矩形的位置
          waterdrop.x = e.clientX-x;
          waterdrop.y = e.clientY-y;
      };
      document.onmouseup = function(){
          document.onmousemove = null;
      };

      document.onclick = function(e){
          //动画要清除屏幕
          ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
          requestNextAnimationFrame(drop);
      }
  }
};


var drop = function () {
  
  waterdrop.y = waterdrop.y + exp*10;
  if (waterdrop.x <= (stone.x + 204) && stone.x <= (waterdrop.x + 43) && waterdrop.y <= (stone.y + 136) && stone.y <= (waterdrop.y + 65)
    ) {
      console.log(waterdrop.x);
      
      waterdrop.y = stone.y - 65 + 22;
     
  }
  ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  requestNextAnimationFrame(drop);
}



var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (waterReady) {
    ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  }

  if (stoneReady) {
    ctx.drawImage(stoneImage, stone.x, stone.y);
  }
};

var watercircle = function() {
  if (waterReady) {
    ctx.drawImage(water2Image, waterdrop.x, waterdrop.y);
  }
}
//我现在想实现的是水滴一碰到石头就破开，但是破开这个动画还蛮难实现的。先放一放，先整合科赫曲线。



// The main game loop
var main = function () {
  render();
  // Request to do this again ASAP
  window.requestNextAnimationFrame(main);
};



// Let's play this game!

reset();
main();


