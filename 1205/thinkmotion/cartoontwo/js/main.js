var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var bg = new Image();
var water = new Image();
var grass = new Image();
var snow = new Image();
var icebar = new Image();

var grassPos = {
  x: canvas.width*0.6,
  y: canvas.height*0.718
}

var waterPos = {
  x: 600,
  y: 478
} 


var snowPos = {
  x: 500, 
  y: 50
}

var lastTime = 0,
    paused = true,
    isDrag = false,
    drop = false,
    isSnowflake = false,
    isDragSnow = false,
    test = false,
    isOver= false,
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



function drawIce() {

 
  canvas.ctx.drawImage(icebar, 545, 70);
  canvas.ctx.drawImage(snow, snowPos.x, snowPos.y);
  //改了与冰棒之间的间距
}



//实例化分形
var koch =  new Koch(canvas);
var kochsnowflake = new Kochsnowflake(canvas);

var kochmvcopy = {
  x:100,
  y:0
};

var kochmv = {
  x:100,
  y:0
};


var kochsnowflakemv = {
  x:200,
  y:0
};

var kochsnowflakemvcopy = {
  x:400,
  y:0
};



//koch通过x坐标控制动画
function updateKochPos () {

  if (kochmv.x > canvas.width || kochmv.x < 0) {
    exp = -exp;
  }
  kochmv.x += exp;
}

function updateKochSnowflakePos () {
  
  if (kochsnowflakemv.y > canvas.height || kochsnowflakemv.y < 0) {
    exp = -exp;
  }

  kochsnowflakemv.y += exp;

}


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



      drawWater();
      drawGrass();
      if(isOver) {
        grass.src= "images/grass3.png";
        drawGrass();
      } else {
        grass.src= "images/grass.png";
        drawGrass();
      }


      if(waterPos.y < canvas.height*0.4){
        water.src = "images/snowflake.png";
        isSnowflake = true;
        drawIce();
        koch.update(kochmvcopy);
        //koch雪花没有问题
        if(isDragSnow || !isDrag && test ) {
          kochsnowflake.update(snowPos);
        }
        drawWater();
      } else {
        updateKochPos();
        koch.update(kochmv);
      }
  }

  requestNextAnimationFrame(kochTest);
}


// function draw 



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

  var dx2 = mouseX - snowPos.x;
  var dy2 = mouseY - snowPos.y;
  if (dx2 <= snow.width && dx2 >= 0 && dy2 <= snow.height && dy2 >= 0){
    isDragSnow = true;
  }
}


function handleMousedrag(e) {

  var mouseX,
      mouseY;
  if (isDrag) {
    
    mouseX = parseInt(e.clientX- 8);
    mouseY = parseInt(e.clientY- 8);

    
    waterPos.x = mouseX;
    waterPos.y = mouseY;

    paused = false;
  }

  if (isDragSnow) {
    isDrag = false;
    mouseX = parseInt(e.clientX- 8);
    mouseY = parseInt(e.clientY- 8);

    snowPos.x = mouseX;

    var snowSlideWidth = 545 + icebar.width-20;
    if (snowPos.x > snowSlideWidth) {
      snowPos.x = snowSlideWidth;
      console.log(snowPos.x);
    } else if(snowPos.x <= 500) {
      snowPos.x = 500;
    // snowPos.y = mouseY;
    }
    else {
      paused = false;
    }
   
  }
}

canvas.onmousedown = function(e) {
  //点击拖拽

  handleMouseclick(e);
  handleMousedown(e);
  handleGrassclick(e);
}

canvas.onmouseout = function(e) {
  isDrag = false;
  isDragSnow = false;
  test = true;
}

canvas.onmouseup = function() {
  isDrag = false;
  isDragSnow = false;
  test = true;
}


canvas.onmousemove = function(e) {
  handleMousedrag(e);
  handleGrassmove(e);
}

function handleGrassmove(e) {
  var mouseX,
      mouseY;
  mouseX = parseInt(e.clientX- 8);
  mouseY = parseInt(e.clientY- 8);

  var dx = mouseX - grassPos.x;
  var dy = mouseY - grassPos.y;

  if (dx <= grass.width && dx >= 0 && dy <= grass.height && dy >= 0){
    
    isOver = true;
    paused = false;
    
  } else {
    isOver = false;
  }
}

function handleGrassclick(e) {
  if(isOver) {
    window.location.href="../cartoonthree/tree.html";
  }
}

//初始化

bg.src = "images/window6.png";
water.src = "images/waterswitch.png";
grass.src = "images/grass.png";
snow.src = "images/snowflake.png";
icebar.src = "images/snowhot.png";

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






