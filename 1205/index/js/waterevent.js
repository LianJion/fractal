var sky = new Image(),
    water = new Image(),
    tree = new Image(),
    nearTree = new Image(),
    grass = new Image(),
    grass2 = new Image(),
    icebar = new Image(),
    snow = new Image(),
    paused = true,
    isDrag = false,
    drop = false,
    //动画控制参数
    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps=60,

    skyOffset = 0,
    grassOffset = 0,
    treeOffset = 0,
    nearTreeOffset = 0,
    dropWaterOffset = 0,
    dropOffsetY = 0,

    //视差动画根据不同图层设置不同的速度（单位：像素/帧）
    TREE_VELOCITY = 20,
    FAST_TREE_VELOCITY = 40,
    SKY_VELOCITY = 8,
    GRASS_VELOCITY = 75,
    Y_VELOCITY = 1;


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
  x:200,
  y:10
}

var icebarpos = {
  x: 250+274,
  y: 300,
}

var snowpos = {
  x: 205+274,
  y: 280,
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


function bg() {
  canvas.ctx.drawImage(sky, 0, 0);
}

function drawWater() {
  //判断条件有待修改
  // if (drop) {
  //   dropWaterOffset = 0;
  // } else {
    dropWaterOffset = dropWaterOffset < 350 ? dropWaterOffset + FAST_TREE_VELOCITY/fps : 350;
    //给了一个常数保证下落的高度值。
    dropOffsetY = dropOffsetY < canvas.height ? dropOffsetY + Y_VELOCITY/fps : 0;
  // }
 
  canvas.ctx.save();
    // canvas.ctx.translate(0, dropWaterOffset);
    waterdrop.y = dropWaterOffset;
    canvas.ctx.drawImage(water, waterdrop.x, waterdrop.y);
    console.log(waterdrop.y);
  canvas.ctx.restore();
}




function drawIce() {
  canvas.ctx.drawImage(icebar, icebarpos.x, icebarpos.y);
  //改了与冰棒之间的间距
  canvas.ctx.drawImage(snow, snowpos.x, snowpos.y);
}



//实例化分形
var koch =  new Koch(canvas);
var pythagoras =  new Pythagoras(canvas);
var htree = new Htree(canvas);
var kochsnowflake = new Kochsnowflake(canvas);
// console.log(htree);

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
      // drawBg();
      bg();
     
      drawIce();
      kochsnowflake.update(snowpos);

      //毕达哥斯拉树和h-tree树
      // updatePythagorasPos();
      // pythagoras.update(pythagorasmv);
      // upadteHtreePos();
      // htree.update(htreemv);

      drawWater();
    
    
      // console.log(dropWaterOffset);
      if (dropWaterOffset >= 350) {
        // console.log('a');
        updateKochPos();
        koch.update(kochmv);
      } else {
        koch.update(kochmvcopy);
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





function handleMouseclick(e){
  var mouseX,
      mouseY;
  mouseX = parseInt(e.clientX- 8);
  mouseY = parseInt(e.clientY- 8);

  var dx = mouseX  - waterdrop.x;
  var dy = mouseY + FAST_TREE_VELOCITY/fps - waterdrop.y;

  // console.log(mouseY);
  // console.log(waterdrop.y);
  // console.log(dropOffsetY);
  
  // console.log(water.height);

  if ( dx <= water.width && dx >= 0 && dy <= water.height+15 && dy >= 0 ){
    console.log(dy);
    drop = false;
      water.isClick = false;
    console.log(water.isClick);
    water.isClick = water.isClick ? false : true;
    //点击一次true
    // console.log(water.isClick);
    // change to hovercolor if previously outside
    if (water.isClick){
        paused = paused ? false : true;
        water.isClick = false;
    }
  }else {
        // console.log("aaa");
  }
}


function handleMousemove(e) {
  var mouseX,
      mouseY;
  mouseX = parseInt(e.clientX- 8);
  mouseY = parseInt(e.clientY- 8);

  var dx = mouseX - snowpos.x;
  var dy = mouseY - snowpos.y;

  if (dx <= snow.width && dx >= 0 && dy <= snow.height && dy >= 0){
    
    isDrag = true;
    console.log(isDrag);
  }
}

canvas.onmousedown = function(e) {
  //点击拖拽
  handleMouseclick(e);
  handleMousemove(e);
}

canvas.onmousemove = function(e) {
  handleMousedrag(e);
}

function handleMousedrag(e) {
  if (isDrag) {
    var mouseX,
        mouseY;
    mouseX = parseInt(e.clientX- 8);
    mouseY = parseInt(e.clientY- 8);
    var dx = mouseX - snowpos.x;
    var dy = mouseY - snowpos.y;

    canvas.ctx.clearRect(0,0,canvas.width, canvas.height);
    bg();
    canvas.ctx.drawImage(icebar, icebarpos.x, icebarpos.y);

    canvas.ctx.drawImage(snow, snowpos.x, snowpos.y);
    snowpos.x = mouseX;
    var snowSlideWidth = icebarpos.x+icebar.width-20;
    if (snowpos.x > snowSlideWidth) {
      snowpos.x = snowSlideWidth;

    } else if(snowpos.x <= 479 ) {
      snowpos.x = 479;
    } else {
      paused = false;
      drop = true;
    }
    
    // kochsnowflake.update(snowpos);
  }
}


canvas.onmouseout = function() {
  isDrag = false;
}

canvas.onmouseup = function() {
  isDrag = false;
}

animateButton.onclick = function (e) {
  
    paused = paused ? false : true;
    if (paused) {
      animateButton.value = 'Animate';
    }
    else {
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
sky.src = 'images/background.png';
icebar.src = 'images/snowhot.png';
snow.src = 'images/snowflake.png';

sky.onload = function (e) {
   // drawBg();
   bg();
   drawWater();
   drawIce();
  
   koch.update(kochmvcopy);
   // kochsnowflake.update(kochmvcopy);
   // console.log(water);
   // console.log(icebar);
   //
   // kochsnowflake.update(kochsnowflakemvcopy);
};


requestNextAnimationFrame(kochTest);