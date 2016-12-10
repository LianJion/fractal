var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var bg = new Image();
var water = new Image();
var grass = new Image();

var grassPos = {
  x: canvas.width*0.6,
  y: canvas.height*0.718
}

var waterPos = {
  x: 600,
  y: 478
} 

var lastTime = 0,
    paused = true,
    isDrag = false,
    drop = false,
    isSnowflake = false,
    exp = 20;
 


function drawBg() {
  console.log(bg.width);
	ctx.drawImage(bg, 0, 0, canvas.width,canvas.height);
}

function drawWater() {
  ctx.drawImage(water, waterPos.x, waterPos.y, water.width, water.height);
}

function drawGrass() {
  ctx.drawImage(grass, grassPos.x, grassPos.y, grass.width, grass.height);
}


//koch通过x坐标控制动画
function updateKochPos () {

  if (kochmv.x > canvas.width || kochmv.x < 0) {
    exp = -exp;
  }
  kochmv.x += exp;
}


//实例化分形
var koch =  new Koch(canvas);

var kochmvcopy = {
  x:100,
  y:0
};

var kochmv = {
  x:100,
  y:0
};

function calculateFps(now) {
   var fps = 1000 / (now - lastTime);
   lastTime = now;
   return fps; 
}




function kochTest(time) {
  fps = calculateFps(time);
  if (!paused) {
      canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
      drawBg();
      if(waterPos.y < canvas.height*0.4){
        water.src = "images/snowflake.png";
        isSnowflake = true;
        drawWater();
      }
      drawWater();
      drawGrass();
      updateKochPos();
      koch.update(kochmv);
    
  }

  requestNextAnimationFrame(kochTest);
}


function draw 



function handleMouseclick(e) {
  var mouseX,
      mouseY;
  mouseX = parseInt(e.clientX- 8);
  mouseY = parseInt(e.clientY- 8);

  var dx = mouseX - waterPos.x;
  var dy = mouseY - waterPos.y;
  if (dx <= water.width && dx >= 0 && dy <= water.height && dy >= 0){
    
    // drop = false;

    water.isClick = false;
    console.log('water.isClick:' + water.isClick);
    water.isClick = water.isClick ? false : true;
    if (water.isClick){
        paused = paused ? false : true;
        water.isClick = false;
    }
  }
}



function handleMousedown(e) {
  var mouseX,
      mouseY;
  mouseX = parseInt(e.clientX- 8);
  mouseY = parseInt(e.clientY- 8);

  var dx = mouseX - waterPos.x;
  var dy = mouseY - waterPos.y;

  if (dx <= water.width && dx >= 0 && dy <= water.height && dy >= 0){
    
    isDrag = true;
    console.log(isDrag);
  }
}


function handleMousedrag(e) {
  if (isDrag) {
    var mouseX,
        mouseY;
    mouseX = parseInt(e.clientX- 8);
    mouseY = parseInt(e.clientY- 8);

    
    waterPos.x = mouseX;
    waterPos.y = mouseY;

    paused = false;
  }
}

canvas.onmousedown = function(e) {
  //点击拖拽

  handleMouseclick(e);
  handleMousedown(e);
}

canvas.onmouseout = function(e) {
  isDrag = false;
}

canvas.onmouseup = function() {
  isDrag = false;
}


canvas.onmousemove = function(e) {
  handleMousedrag(e);
}

//初始化

bg.src = "images/window6.png";
water.src = "images/waterswitch.png";
grass.src = "images/grass.png";

window.onload = function () {
	drawBg();
  koch.update(kochmv);
  drawWater();
  drawGrass();
  // paused = false;
}

window.onresize = function () {
  resizeCanvas(); 
  drawBg();
  koch.update(kochmv);
  drawWater();
  drawGrass();
}

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
 

requestNextAnimationFrame(kochTest);






