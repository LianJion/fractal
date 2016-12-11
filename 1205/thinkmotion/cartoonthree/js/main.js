var  skyOffset = 0,
    grassOffset = 330,
    treeOffset = 0,
    nearTreeOffset = 0,
    dropWaterOffset = 0,
    dropOffsetY = 0,
    exptest = 1,
    paused = true,
    isOpacity = false,
    isDrop = false,

    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps=60,

    //视差动画根据不同图层设置不同的速度（单位：像素/帧）
    TREE_VELOCITY = 20,
    FAST_TREE_VELOCITY = 40,
    SKY_VELOCITY = 8,
    GRASS_VELOCITY = 75,
    Y_VELOCITY = 1;

var sky = new Image(),
    tree = new Image(),
    waterdrop = new Image(),
    nearTree = new Image();


var htreemv = {
   x:850,
   y:50,
};
var loc = {
  x: 0,
  y: 0
};

var waterPos = {
  x: 480,
  y: 330
};


function drawWater() {

  grassOffset = grassOffset <= canvas.height - waterdrop.height - 49 ?
                 grassOffset +  GRASS_VELOCITY/fps : canvas.height - waterdrop.height - 49;

  waterPos.y = grassOffset;

  canvas.ctx.drawImage(waterdrop, waterPos.x, waterPos.y, waterdrop.width, waterdrop.height);
}

//Htree通过(x,y)坐标控制动画
function upadteHtreePos () {
  if (htreemv.y > canvas.height || htreemv.y < 0) {
    exptest = -exptest;
    
     htreemv.y += exptest;
  }

  if (htreemv.x > canvas.width || htreemv.x < 0) {
    exptest = -exptest;
   
    htreemv.x += exptest;
  }

   htreemv.x += exptest;
  htreemv.y += exptest;
}


function drawBg () {
   canvas.ctx.save();

   skyOffset = skyOffset < canvas.width ?
               skyOffset + SKY_VELOCITY/fps : 0;

 
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
     canvas.ctx.drawImage(tree, 100, canvas.height - 180);
     canvas.ctx.drawImage(tree, canvas.width + 100, canvas.height - 180);
     canvas.ctx.drawImage(tree, 1100, canvas.height - 180);
     canvas.ctx.drawImage(tree, canvas.width + 400, canvas.height - 180);
   canvas.ctx.restore();

   canvas.ctx.save();
   canvas.ctx.translate(-nearTreeOffset, 0);
   canvas.ctx.drawImage(nearTree, 250, canvas.height - 100);
   canvas.ctx.drawImage(nearTree, canvas.width + 250, canvas.height - 100);
   canvas.ctx.drawImage(nearTree, 700, canvas.height - 100);
   canvas.ctx.drawImage(nearTree, canvas.width + 800, canvas.height - 100);
   canvas.ctx.restore();

   
}


// var opacityValue = droptime.getAttribute("fill");
// console.log(opacityValue);
// if( opacityValue == 0){
//   paused = false;
//   isDrop = true;
  
// }

 // var water = $("#icon g");
 //    water.velocity({translateY: "+=142px" }, {duraiton: "3000", easing: "spring", delay: "6000"})
 //    .velocity(
 //      {opacity: 0},
 //      {duraiton: "3000", easing:"spring"},
 //      {complete: function(){ 
 //        paused = false;
 //        console.log(paused);
 //        alert("a");
 //      }});

// var a = document.getElementById("icon");
// console.log(a);
// var test = a.getAttribute("class");
// console.log(test);
// var opacityValue = a.getAttribute("id");
// console.log(opacityValue);

 var water = $("#icon");
     var waterpath = $("#icon g");
      console.log(waterpath);
      water.velocity({translateY: "+=142px" }, {duraiton: "3000", easing: "spring"});
      water.velocity({opacity: 0},{duraiton: "3000", easing:"spring", delay: "7000", 
        complete:function(){ paused = false ; }
      });
  


function calculateFps(now) {
   var fps = 1000 / (now - lastTime);
   lastTime = now;
   return fps; 
}



var htree = new Htree(canvas);

function treeTest(time) {
  fps = calculateFps(time);
  if (!paused) {
      canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
      drawBg();
      drawWater();
     
      //毕达哥斯拉树和h-tree树
      // updatePythagorasPos();
      // pythagoras.update(pythagorasmv);
      if (isOpacity) {
        
        upadteHtreePos();
        // console.log(htreemv.x);
        // console.log(htreemv.y);
        htree.update(loc);
        // console.log(loc);
      }
     
    
  }

  requestNextAnimationFrame(treeTest);
}


function windowToCanvas(c, x, y) {
  var bbox = c.getBoundingClientRect();       //获取边界框（bounding box）,该边界框的坐标是相对于整个窗口的
  return {
    x: x - bbox.left * (c.width  / bbox.width),    //所以要乘上这么一个(c.width  / bbox.width)比值
    y: y - bbox.top  * (c.height / bbox.height)
  };
}



canvas.onmousemove = function(e) {
  handleMousemove(e);
}

function handleMousemove(e){
  // if(isOpacity){
    var locPos = windowToCanvas(canvas, e.clientX, e.clientY);
    loc.x = locPos.x;
    loc.y = locPos.y/8;
    // console.log(loc);
    isOpacity = true;
  // }
  
}

sky.src = 'images/treebg.png';
tree.src = 'images/tree.png';
nearTree.src = 'images/grass.png';
waterdrop.src = 'images/water.png';
sky.onload = function (e) {
  drawBg();
  // drawWater();
  htree.update(htreemv);
};


requestNextAnimationFrame(treeTest);