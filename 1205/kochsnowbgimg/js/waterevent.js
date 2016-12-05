var sky = new Image(),
    water = new Image(),
    tree = new Image(),
    nearTree = new Image(),
    grass = new Image(),
    grass2 = new Image(),
    paused = true,
    //动画控制参数
    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps=60,

    skyOffset = 0,
    grassOffset = 0,
    treeOffset = 0,
    nearTreeOffset = 0,
    dropWaterOffset = 0,

    //视差动画根据不同图层设置不同的速度（单位：像素/帧）
    TREE_VELOCITY = 20,
    FAST_TREE_VELOCITY = 40,
    SKY_VELOCITY = 8,
    GRASS_VELOCITY = 75;


var exp = 20;

//初始化坐标值
var kochsnowflakemv = {
  x:200,
  y:0
};

var kochsnowflakemvcopy = {
  x:400,
  y:0
};

var kochmvcopy = {
  x:100,
  y:0
};

var kochmv = {
  x:100,
  y:0
};

var pythagorasmv = {
  x:540,
  y:200,
};

var htreemv = {
   x:0,
   y:0,
};

//水滴
var waterdrop = {
  x:330,
  y:10
}



function calculateFps(now) {
   var fps = 1000 / (now - lastTime);
   lastTime = now;
   return fps; 
}



function drawBg () {
   canvas.ctx.save();

   skyOffset = skyOffset < canvas.width ?
               skyOffset + SKY_VELOCITY/fps : 0;

   grassOffset = grassOffset < canvas.width ?
                 grassOffset +  GRASS_VELOCITY/fps : 0;

   treeOffset = treeOffset < canvas.width ?
                treeOffset + TREE_VELOCITY/fps : 0;

   nearTreeOffset = nearTreeOffset < canvas.width ?
                    nearTreeOffset + FAST_TREE_VELOCITY/fps : 0;

   



   canvas.ctx.save();
     canvas.ctx.translate(-skyOffset, 0);
     canvas.ctx.drawImage(sky, 0, 0);
     canvas.ctx.drawImage(sky, sky.width-2, 0);
   canvas.ctx.restore();

   canvas.ctx.save();
     canvas.ctx.translate(-treeOffset, 0);
     //三棵树每棵树要画两遍
     canvas.ctx.drawImage(tree, 100, 240);
     canvas.ctx.drawImage(tree, canvas.width + 100, 240);
     canvas.ctx.drawImage(tree, 400, 240);
     canvas.ctx.drawImage(tree, canvas.width + 400, 240);
     canvas.ctx.drawImage(tree, 700, 240);
     canvas.ctx.drawImage(tree, canvas.width + 700, 240);
   canvas.ctx.restore();

   canvas.ctx.save();
   canvas.ctx.translate(-nearTreeOffset, 0);
   canvas.ctx.drawImage(nearTree, 250, 220);
   canvas.ctx.drawImage(nearTree, canvas.width + 250, 220);
   canvas.ctx.drawImage(nearTree, 800, 220);
   canvas.ctx.drawImage(nearTree, canvas.width + 800, 220);
   canvas.ctx.restore();

   canvas.ctx.save();
   canvas.ctx.translate(-grassOffset, 0);

   canvas.ctx.drawImage(grass, 0, canvas.height-grass.height);

   canvas.ctx.drawImage(grass, grass.width-5,
                     canvas.height-grass.height);

   canvas.ctx.drawImage(grass2, 0, canvas.height-grass2.height);

   canvas.ctx.drawImage(grass2, grass2.width,
                     canvas.height-grass2.height);
   canvas.ctx.restore();
}



function drawWater() {

  dropWaterOffset = dropWaterOffset < 215 ? dropWaterOffset + FAST_TREE_VELOCITY/fps : 215;
  if (dropWaterOffset < 215 ) {
    koch.update(kochmvcopy);
  } 
  canvas.ctx.save();
    canvas.ctx.translate(0, dropWaterOffset);
    // canvas.ctx.drawImage(water,waterdrop.x,waterdrop.y);
    canvas.ctx.drawImage(water,water.x,water.y);
     // canvas.ctx.drawImage(water,200,canvas.height-100);
  canvas.ctx.restore();
}




//实例化分形
var koch =  new Koch(canvas);
var pythagoras =  new Pythagoras(canvas);
var htree = new Htree(canvas);
var kochsnowflake = new KochSnowflake(canvas);
console.log(kochsnowflake);
console.log(htree);

//koch通过x坐标控制动画
function updateKochPos () {

  if (kochmv.x > canvas.width || kochmv.x < 0) {
    exp = -exp;
  }
  kochmv.x += exp;
}

//pythagoras通过y坐标控制动画
function updatePythagorasPos () {
  
  if (pythagorasmv.y > canvas.height || pythagorasmv.y < 0) {
    exp = -exp;
  }

  pythagorasmv.y += exp;

}


function updateKochSnowflakePos () {
  
  if (kochsnowflakemv.y > canvas.height || kochsnowflakemv.y < 0) {
    exp = -exp;
  }

  kochsnowflakemv.y += exp;

}


//Htree通过(x,y)坐标控制动画
function upadteHtreePos () {
  if (htreemv.y > canvas.height || htreemv.y < 0) {
    exp = -exp;
  }

  if (htreemv.x > canvas.height || htreemv.x < 0) {
    exp = -exp;
  }

  htreemv.x += exp;
  htreemv.y += exp;
}




function kochTest(time) {
  fps = calculateFps(time);
  if (!paused) {
      canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
      drawBg();
      drawWater();
      // renderbg();\

      updatePythagorasPos();
      pythagoras.update(pythagorasmv);
      upadteHtreePos();
      htree.update(htreemv);
      // updateKochSnowflakePos();
      // kochsnowflake.update(kochsnowflakemv);
      // console.log(dropWaterOffset);
      if(dropWaterOffset >= 215 ) {
        console.log('a');
        updateKochPos();
        koch.update(kochmv);
      }
  }

  requestNextAnimationFrame(kochTest);
}

//获取canvas坐标
function windowToCanvas(c, x, y) {
  var bbox = c.getBoundingClientRect();       //获取边界框（bounding box）,该边界框的坐标是相对于整个窗口的
  return {
    x: x - bbox.left * (c.width  / bbox.width),    //所以要乘上这么一个(c.width  / bbox.width)比值
    y: y - bbox.top  * (c.height / bbox.height)
  };
}





function handleMouseMove(e){
  var mouseX,
      mouseY;
  mouseX = parseInt(e.clientX- 8);
  mouseY = parseInt(e.clientY- 8);

  var dx = mouseX - water.x;
  var dy = mouseY - water.y;

  if (dx <= water.width && dy >= water.height/2 ){
    console.log(dx);
    console.log(dy);
    water.isClick = false;
    console.log(water.isClick);
    water.isClick = water.isClick ? false : true;
    //点击一次true
    console.log(water.isClick);
    // change to hovercolor if previously outside
    if (water.isClick){
        paused = paused ? false : true;
        water.isClick = false;
      
    }
  }else {
    // if (!water.isClick){
    //   // change to blurcolor if previously inside
    //     water.isClick = true;
        // drawWater();
        console.log("aaa");
    // }
  }
}

canvas.onclick = function (e) {
    handleMouseMove(e);
};

animateButton.onclick = function (e) {
  
    paused = paused ? false : true;
    if (paused) {
      animateButton.value = 'Animate';
    }
    else {
      // requestNextAnimationFrame(kochTest);
      // renderbg();
      // koch.update(kochmvcopy);

      animateButton.value = 'Pause';
    }
  
};


//初始化
water.src = 'images/waterdrop.png';
water.x = 330;
water.y = 10;

tree.src = 'images/smalltree.png';
nearTree.src = 'images/tree-twotrunks.png';
grass.src = 'images/grass.png';
grass2.src = 'images/grass2.png';
sky.src = 'images/sky.png';

sky.onload = function (e) {
   drawBg();
   drawWater();
   koch.update(kochmvcopy);
   console.log(water);
   // kochsnowflake.update(kochsnowflakemvcopy);
};


requestNextAnimationFrame(kochTest);