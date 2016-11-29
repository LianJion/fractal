var koch_canvas = document.getElementById("canvas");
var ctx = koch_canvas.getContext('2d');

//koch参数
    ctx.strokeStyle = 'black';
    ctx.lineCap = 'round';
    
var min_lw = 0.5,
    max_lw = 5,
    max_order = 5,
    min_order = 0,
    desired_order = 3,
    ratio = 1/3,
    base_width = koch_canvas.width*0.8;

var order_colors = Gradient("#258dc9","#043342",max_order+1), 
  ratios = [],
  widths = [],
  peak_xs = [],
  peak_ys = [];

var i;
for(i = min_order; i <= max_order; i++){
  ratios[i] = Math.pow(ratio,i);
  widths[i] = base_width*ratios[i];
  peak_xs[i] = widths[i]/2;
  peak_ys[i] = -Math.sqrt(3)*peak_xs[i]*ratio;
}

circle = {
  x: 100, 
  y: 100, 
  velocityX: 3*Math.random(), 
  velocityY: 3*Math.random(), 
  radius: 50*Math.random(),
}


var min_angle = 0,
  max_angle = Math.PI/3,
  angle = Math.PI/3,
  x_offset = (koch_canvas.width-base_width)/2;
  y_offset = (koch_canvas.height-( Math.sqrt(3)*(base_width*ratio)/4 ));



//water对象参数
var exp = 1;
var waterReady = false;
var waterimg = new Image();
waterimg.onload = function () {
  waterReady = true;
};
waterimg.src = "images/waterdrop.png";
var waterdrop = {};

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
   bgReady = true;
};
bgImage.src = "images/bg.png";

//温度计背景参数
var temperReady = false;
var temperImage = new Image();
temperImage.onload = function () {
   temperReady = true;
};
temperImage.src = "images/temper.png";


//函数
function init() {
  //Math.floor向下取整
  var whole = Math.floor(desired_order),
      frac = desired_order - whole;
  
  //based on desired order calculate the line width
  ctx.lineWidth = ((max_lw-min_lw)*( (max_order-desired_order)/(max_order-min_order) ))+min_lw; 
  
  //we can also calculate stuff for the final triangle
  final_angle = (frac*max_angle) || max_angle;
  final_peak_y = -Math.tan(final_angle)*widths[whole+((frac==0)?0:1)]/2;
  final_side_width = (widths[whole+((frac==0)?0:1)]/2)/Math.cos(final_angle);
  
  ctx.save();
    ctx.strokeStyle = order_colors[whole];
    ctx.translate(x_offset,y_offset);
    draw(0);
  ctx.restore();
}

function draw(current_order) {
  var next_order = current_order+1,
      angle = max_angle,
      peak_x = peak_xs[current_order],
      peak_y = peak_ys[current_order],
      side_width = widths[current_order];
  
  if((next_order) >= desired_order){
      //set a new angle.
      angle = final_angle;
      
      //reset the peak height;
      peak_y = final_peak_y;
      
      //reset the side width;
      side_width = final_side_width;
      
  }
  
  if(desired_order == 0){
      drawLine(widths[0]);
      return;
  }
  
  //draw the left side
  if((next_order) >= desired_order){
      drawLine(widths[next_order]);
  }else{
      draw(next_order);
  }
  
  //draw the left side of the triangle
  ctx.save();
      ctx.translate(widths[next_order],0);
      ctx.rotate(-angle);
      if((next_order) >= desired_order){
          drawLine(side_width);
      }else{
          draw(next_order);
      }
  ctx.restore();
  
  
  // draw the right side of the triangle
  ctx.save();
      ctx.translate(peak_x,peak_y);
      ctx.rotate(angle);
      if((next_order) >= desired_order){
          drawLine(side_width);
      }else{
          draw(next_order);
      }
  ctx.restore();
  
  
  
  //draw the right side
  ctx.save();
      ctx.translate(widths[next_order]*2,0);
      if((next_order) >= desired_order){
          drawLine(widths[next_order]);
      }else{
          draw(next_order);
      }
  ctx.restore();
  
  return false;
}

function drawLine(length){
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(length,0);
  ctx.stroke();
}

function updateOrder(pos){
  var x = Math.min((pos.x - x_offset)/base_width,1);
  x = (x<0)?0:x;
  desired_order = (max_order*x)+min_order;
} 


function update(pos){
  //这个要考虑下清屏关系
  // clear();
  render();
  updateOrder(pos);
  init();
}

function clear() {
  ctx.clearRect(0, 0, koch_canvas.width, koch_canvas.height);
}


function reset () {
  waterdrop.x = 10;
  waterdrop.y = 10;
}


function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (temperReady) {
    ctx.drawImage(temperImage, 70, 15);
  }
  if (waterReady) {
    ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  }

}


//触发事件
//实现鼠标移动图像，点击图像


function windowToCanvas(c, x, y) {
  var bbox = c.getBoundingClientRect();       //获取边界框（bounding box）,该边界框的坐标是相对于整个窗口的
  return {
    x: x - bbox.left * (c.width  / bbox.width),    //所以要乘上这么一个(c.width  / bbox.width)比值
    y: y - bbox.top  * (c.height / bbox.height)
  };
}

koch_canvas.addEventListener("mousedown",function(e) {
  var x = e.clientX - waterdrop.x;
  var y = e.clientY - waterdrop.y;
  if(e.clientX >= waterdrop.x + this.offsetLeft && e.clientX <= waterdrop.x + 43 + this.offsetLeft && e.clientY >= waterdrop.y + this.offsetTop && e.clientY <= waterdrop.y + 65 + this.offsetTop){
      console.log('this.offsetLeft:'+ this.offsetLeft);
      document.onmousemove = function(e){
        //如果清空屏幕话会出现白色背景
        // ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
        if(waterdrop.x > 90 && waterdrop.x < 380 ) {
          ctx.fillRect(90, waterdrop.y+30, waterdrop.x-50,10);
        }
        
        //鼠标拖动时重绘黑色背景,只允许鼠标x轴移动
        ctx.drawImage(waterimg, e.clientX-x, waterdrop.y);
       
        //记录矩形的位置
        waterdrop.x = e.clientX-x;
        // waterdrop.y = e.clientY-y;
      };
      document.onmouseup = function(){
       
        document.onmousemove = null;

        console.log("a");
        ctx.fillRect(90, waterdrop.y+30, waterdrop.x-50,10);
        // ctx.fillStyle = "#eee";
        // if(waterdrop.x < 380){
        //   
        // } else {
          //进度条的问题
          document.onmousemove = null;
        // }
        
        // console.log("a");
         // 

      };
      // document.onclick = function(e){
      //   //动画要清除屏幕
      //   // ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
      //   requestNextAnimationFrame(drop);
      // }
  }
}, false);


function drop() {
  waterdrop.y = waterdrop.y + exp*10;
  ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  requestNextAnimationFrame(drop);
}

koch_canvas.addEventListener("mousemove", function(e) {
  var loc = windowToCanvas(koch_canvas, e.clientX, e.clientY);
  //果然老师说的有道理，悟了，koch动画来者！
  update(waterdrop);
}, false);

function start() {
  reset();
  render();
  // requestNextAnimationFrame(start);
}

window.onload = function(){
  start();
}