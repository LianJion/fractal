var paused = true;

var exp = 5;

//初始化坐标值
var kochmvcopy = {
  x:100,
  y:0
}
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
}

//水滴
var waterdrop = {
  x:10,
  y:10
}


//下落水滴
var waterReady = false;
var waterimg = new Image();
waterimg.onload = function () {
  waterReady = true;
};
waterimg.src = "images/waterdrop.png";


var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
   bgReady = true;
};
bgImage.src = "images/bg.png";




function renderbg () {

  if (bgReady) {
    canvas.ctx.drawImage(bgImage, 0, 0);
  }
  //先画背景后画水滴
}

function renderwater() {
  if (waterReady) {
    canvas.ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  }
}

//实例化分形
var koch =  new Koch(canvas);
var pythagoras =  new Pythagoras(canvas);
var htree = new Htree(canvas);

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



function animate(time) {
   if (!paused) {
      canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
      render();
      //koch动画效果就出现了
  

      // updatePythagorasPos();
      // pythagoras.update(pythagorasmv);

      // upadteHtreePos();
      // htree.update(htreemv);
      window.requestNextAnimationFrame(animate);
   }
}


function kochTest(time) {
  if (!paused) {
      canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
      renderbg();
      updateKochPos();
      koch.update(kochmv);
      window.requestNextAnimationFrame(kochTest);
  }
}

//获取canvas坐标
function windowToCanvas(c, x, y) {
  var bbox = c.getBoundingClientRect();       //获取边界框（bounding box）,该边界框的坐标是相对于整个窗口的
  return {
    x: x - bbox.left * (c.width  / bbox.width),    //所以要乘上这么一个(c.width  / bbox.width)比值
    y: y - bbox.top  * (c.height / bbox.height)
  };
}


canvas.onmousedown = function(e){
  renderwater();
  var x = e.clientX - waterdrop.x;
  var y = e.clientY - waterdrop.y;

  //判断鼠标是否点击在图像内
  if(e.clientX >= waterdrop.x + this.offsetLeft && e.clientX <= waterdrop.x + 43 + this.offsetLeft && e.clientY >= waterdrop.y + this.offsetTop && e.clientY <= waterdrop.y + 65 + this.offsetTop){
    console.log('this.offsetLeft:'+ this.offsetLeft);
    document.onmousemove = function(e){
      // canvas.ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
      
      //鼠标拖动时重绘黑色背景
      canvas.ctx.drawImage(waterimg, e.clientX-x, e.clientY-y);
     
      //记录矩形的位置
      waterdrop.x = e.clientX-x;
      waterdrop.y = e.clientY-y;
      draw();
    };
    document.onmouseup = function(){
      document.onmousemove = null;
    };

    document.onclick = function(){
      // window.requestNextAnimationFrame(drop);
      interval(waterdrop);  

      // draw();
    }
  }
};


//逻辑有点混乱那，现在的问题是落到那个位置的时候水滴不见了
function fall(waterdrop) {
  
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);//绘制前清理画布，避免重复绘制
    waterdrop.y += exp;
    renderbg();
    renderwater();
    koch.update(kochmvcopy);
    if(waterdrop.y >= 185) {
      
      paused = false;
      window.requestNextAnimationFrame(kochTest);
    }
    // else {
    //    waterdrop.y += exp;
    //    paused = true;
    // }
    // if(waterdrop.y >= (canvas.height-65)){
    //   waterdrop.y = canvas.height-65;
    // }
    
}

function interval(waterdrop){
    window.setInterval(fall, 30, waterdrop);
}

function drop() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

  waterdrop.y = waterdrop.y + exp;
  if(waterdrop.y >= (canvas.height-65)) {
    waterdrop.y = canvas.height-65 ;
  }
  render();
  // canvas.ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  window.requestNextAnimationFrame(drop);
}

//让水滴控制koch曲线的动画
function draw() {
  if(waterdrop.y > 185) {
    paused = false;
    window.requestNextAnimationFrame(kochTest);
  }
  else {
    paused = true;
    canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
    render();
    koch.update(kochmvcopy);
  }
}

animateButton.onclick = function (e) {
  
    paused = paused ? false : true;
    if (paused) {
      animateButton.value = 'Animate';
    }
    else {
      // window.requestNextAnimationFrame(kochTest);
      renderbg();
      koch.update(kochmvcopy);
      animateButton.value = 'Pause';
    }
  
};


