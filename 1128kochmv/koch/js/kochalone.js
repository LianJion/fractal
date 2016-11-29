var koch_canvas = document.getElementById("canvas");
var ctx = koch_canvas.getContext('2d');
var paused = true;

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



//动画坐标参数
var kochmv = {
  x:0,
  y:0
};
var exp = 5;

function updateWater () {
  if (kochmv.x > koch_canvas.width || kochmv.x < 0) {
    exp = -exp;
  }
  kochmv.x += exp;
}

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
  clear();
  updateOrder(pos);
  init();
}

function clear() {
  ctx.clearRect(0, 0, koch_canvas.width, koch_canvas.height);
}

function windowToCanvas(c, x, y) {
  var bbox = c.getBoundingClientRect();       //获取边界框（bounding box）,该边界框的坐标是相对于整个窗口的
  return {
    x: x - bbox.left * (c.width  / bbox.width),    //所以要乘上这么一个(c.width  / bbox.width)比值
    y: y - bbox.top  * (c.height / bbox.height)
  };
}


koch_canvas.addEventListener("click", function(e) {
  var loc = windowToCanvas(koch_canvas, e.clientX, e.clientY);
  //果然老师说的有道理，悟了，koch动画来者！
  

}, false);


function animate(time) {
   if (!paused) {
      
      //koch动画效果就出现了
      updateWater();
      update(kochmv);

      window.requestNextAnimationFrame(animate);
   }
}
   
// Initialization................................................

ctx.font = '48px Helvetica';

animateButton.onclick = function (e) {
   render();
   paused = paused ? false : true;
   if (paused) {
      animateButton.value = 'Animate';
   }
   else {
      window.requestNextAnimationFrame(animate);
      animateButton.value = 'Pause';
   }
};