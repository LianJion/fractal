function Canvas(fthis, id) {
    var that = this;

    this.elem = document.getElementById(id);
    this.ctx = this.elem.getContext('2d');
    this.width = this.elem.width;
    this.height = this.elem.height;

    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.clear = function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };

    this.elem.addEventListener("mousemove", function(e) {
        //var elem_loc = this.getPosition();
        fthis.update({
            x: e.clientX - 8,
            y: e.clientY - 8
        });
    }, false);

    // this.elem.addEventListener("mousedown", function(e) {
    //     fthis.onclick({
    //         x: e.clientX - 8,
    //         y: e.clientY - 8
    //     })
    // }, false);

};



function Koch(canvas_id,standalone){
    var i;
    
    // initialize the tree.
    this.canvas = new Canvas(this,canvas_id);
    this.ctx = this.canvas.ctx;

    // this.bgReady = false;
    this.bgImage = new Image();
    this.bgImage.src = "images/bg.png";

    this.waterImage = new Image();
    this.waterImage.src = "images/waterdrop.png";
    this.waterdrop = {
      x : 10 ,
      y : 10 ,
    };
    this.exp = 1;


    this.ctx.strokeStyle = 'black';
    this.ctx.lineCap = 'round';
    this.min_lw = 0.5;
    this.max_lw = 5;
    
    this.base_width = this.canvas.width*0.8;
    
    this.max_order = 5;
    this.min_order = 0;
    this.desired_order = 3;
    
    this.order_colors = Gradient("#258dc9","#043342",this.max_order+1);
    
    this.ratio = 1/3;
    
    this.ratios = [];
    this.widths = [];
    this.peak_xs = [];
    this.peak_ys = [];

    
    
    for(i=this.min_order; i<=this.max_order; i++){
        this.ratios[i] = Math.pow(this.ratio,i);
        this.widths[i] = this.base_width*this.ratios[i];
        this.peak_xs[i] = this.widths[i]/2;
        this.peak_ys[i] = -Math.sqrt(3)*this.peak_xs[i]*this.ratio;
    }
    

    this.circle = {
        x: 100, 
        y: 100, 
        velocityX: 3*Math.random(), 
        velocityY: 3*Math.random(), 
        radius: 50*Math.random(),
    }
    
    this.min_angle = 0;
    this.max_angle = Math.PI/3;
    this.angle = Math.PI/3;

    
    this.x_offset = (this.canvas.width-this.base_width)/2;
    this.y_offset = (this.canvas.height-( Math.sqrt(3)*(this.base_width*this.ratio)/4 ));
    
    // actually initialize the canvas
    this.init();
    if(!standalone) 
        this.canvas.blur();
}

Koch.prototype = {
   
    // onclick: function(pos){
    //   // this.canvas.clear();
    //   // this.waterDrop(pos);
    //   this.updateOrder(pos);
    //   this.init();
    // },
    update: function(pos){
        // this.canvas.clear();
        this.updateOrder(pos);
        this.renderBg();
        this.init();
    },
    updateOrder: function(pos){
        var x = Math.min((pos.x - this.x_offset)/this.base_width,1);
        x = (x<0)?0:x;
        this.desired_order = (this.max_order*x)+this.min_order;
    },
    init: function(){
        var whole = Math.floor(this.desired_order),
            frac = this.desired_order - whole;
        
        //based on desired order calculate the line width
        this.ctx.lineWidth = ((this.max_lw-this.min_lw)*( (this.max_order-this.desired_order)/(this.max_order-this.min_order) ))+this.min_lw; 
        
        //we can also calculate stuff for the final triangle
        this.final_angle = (frac*this.max_angle) || this.max_angle;
        this.final_peak_y = -Math.tan(this.final_angle)*this.widths[whole+((frac==0)?0:1)]/2;
        this.final_side_width = (this.widths[whole+((frac==0)?0:1)]/2)/Math.cos(this.final_angle);
        
        this.ctx.save();
            this.ctx.strokeStyle = this.order_colors[whole];
            this.ctx.translate(this.x_offset,this.y_offset);
            this.draw(0);
        this.ctx.restore();
    },
    drawLine: function(length){
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(length,0);
        this.ctx.stroke();
    },
    draw: function(current_order){
        var next_order = current_order+1,
            angle = this.max_angle,
            peak_x = this.peak_xs[current_order],
            peak_y = this.peak_ys[current_order],
            side_width = this.widths[current_order];
        
        if((next_order) >= this.desired_order){
            //set a new angle.
            angle = this.final_angle;
            
            //reset the peak height;
            peak_y = this.final_peak_y;
            
            //reset the side width;
            side_width = this.final_side_width;
            
        }
        
        if(this.desired_order == 0){
            this.drawLine(this.widths[0]);
            return;
        }
        
        //draw the left side
        if((next_order) >= this.desired_order){
            this.drawLine(this.widths[next_order]);
        }else{
            this.draw(next_order);
        }
        
        //draw the left side of the triangle
        this.ctx.save();
            this.ctx.translate(this.widths[next_order],0);
            this.ctx.rotate(-angle);
            if((next_order) >= this.desired_order){
                this.drawLine(side_width);
            }else{
                this.draw(next_order);
            }
        this.ctx.restore();
        
        
        // draw the right side of the triangle
        this.ctx.save();
            this.ctx.translate(peak_x,peak_y);
            this.ctx.rotate(angle);
            if((next_order) >= this.desired_order){
                this.drawLine(side_width);
            }else{
                this.draw(next_order);
            }
        this.ctx.restore();
        
        
        
        //draw the right side
        this.ctx.save();
            this.ctx.translate(this.widths[next_order]*2,0);
            if((next_order) >= this.desired_order){
                this.drawLine(this.widths[next_order]);
            }else{
                this.draw(next_order);
            }
        this.ctx.restore();
        
        return false;
    },

    //开始画水滴，点击水滴下落动画
    renderBg: function(){
      this.ctx.drawImage(this.bgImage, 0, 0);
    },
    // drawWater: function() {
     
    //   this.ctx.drawImage(this.waterImage,this.waterdrop.x,this.waterdrop.y);
    // },

    // drop: function() {
    //   this.waterdrop.y +=  this.exp*10;
    //   ctx.drawImage(this.waterImage, this.waterdrop.x, this.waterdrop.y);
    //   requestNextAnimationFrame(drop);
    // },
    // waterDrop: function(pos) {

    //   var x = pos.x - this.waterdrop.x;
    //   var y = pos.y - this.waterdrop.y;

    //   if(pos.x >= (this.waterdrop.x + 8) && (pos.x <= this.waterdrop.x + 43 + 8) && pos.y >= (this.waterdrop.y + 8) && pos.y <= (this.waterdrop.y + 65 + 8))
    //   {   
    //     console.log(pos.x);
    //     console.log(pos.y);
    //     this.ctx.clearRect(pos.x-x,pos.y-y, 43,65);
    //     requestNextAnimationFrame(Koch.prototype.drop);
        
    //   }
    // }   
}


function Koch2(canvas_id){
    var i;
    
    // initialize the tree.
    this.canvas = new Canvas(this,canvas_id);
    this.ctx = this.canvas.ctx;

    // this.bgReady = false;
    this.bgImage = new Image();
    this.bgImage.src = "images/bg.png";

    this.waterImage = new Image();
    this.waterImage.src = "images/waterdrop.png";
    this.waterdrop = {
      x : 10 ,
      y : 10 ,
    };
    this.exp = 1;


    this.ctx.strokeStyle = 'black';
    this.ctx.lineCap = 'round';
    this.min_lw = 0.5;
    this.max_lw = 5;
    
    this.base_width = this.canvas.width*0.4;
    
    this.max_order = 5;
    this.min_order = 0;
    this.desired_order = 3;
    
    this.order_colors = Gradient("#eee","#ccc",this.max_order+1);
    
    this.ratio = 1/3;
    
    this.ratios = [];
    this.widths = [];
    this.peak_xs = [];
    this.peak_ys = [];

    
    
    for(i=this.min_order; i<=this.max_order; i++){
        this.ratios[i] = Math.pow(this.ratio,i);
        this.widths[i] = this.base_width*this.ratios[i];
        this.peak_xs[i] = this.widths[i]/2;
        this.peak_ys[i] = -Math.sqrt(3)*this.peak_xs[i]*this.ratio;
    }
    

    this.circle = {
        x: 100, 
        y: 100, 
        velocityX: 3*Math.random(), 
        velocityY: 3*Math.random(), 
        radius: 50*Math.random(),
    }
    
    this.min_angle = 0;
    this.max_angle = Math.PI/3;
    this.angle = Math.PI/3;

    
    this.x_offset = (this.canvas.width-this.base_width)/2;
    this.y_offset = (this.canvas.height-( Math.sqrt(3)*(this.base_width*this.ratio)/4 ));
    
    // actually initialize the canvas
    this.init();
    // if(!standalone) 
        // this.canvas.blur();
}

Koch2.prototype = {
   
    // onclick: function(pos){
    //   // this.canvas.clear();
    //   // this.waterDrop(pos);
    //   this.updateOrder(pos);
    //   this.init();
    // },
    update: function(pos){
        // this.canvas.clear();
        this.updateOrder(pos);
        this.renderBg();
        this.init();
    },
    updateOrder: function(pos){
        var x = Math.min((pos.x - this.x_offset)/this.base_width,1);
        x = (x<0)?0:x;
        this.desired_order = (this.max_order*x)+this.min_order;
    },
    init: function(){
        var whole = Math.floor(this.desired_order),
            frac = this.desired_order - whole;
        
        //based on desired order calculate the line width
        this.ctx.lineWidth = ((this.max_lw-this.min_lw)*( (this.max_order-this.desired_order)/(this.max_order-this.min_order) ))+this.min_lw; 
        
        //we can also calculate stuff for the final triangle
        this.final_angle = (frac*this.max_angle) || this.max_angle;
        this.final_peak_y = -Math.tan(this.final_angle)*this.widths[whole+((frac==0)?0:1)]/2;
        this.final_side_width = (this.widths[whole+((frac==0)?0:1)]/2)/Math.cos(this.final_angle);
        
        this.ctx.save();
            this.ctx.strokeStyle = this.order_colors[whole];
            this.ctx.translate(this.x_offset,this.y_offset);
            this.draw(0);
        this.ctx.restore();
    },
    drawLine: function(length){
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(length,0);
        this.ctx.stroke();
    },
    draw: function(current_order){
        var next_order = current_order+1,
            angle = this.max_angle,
            peak_x = this.peak_xs[current_order],
            peak_y = this.peak_ys[current_order],
            side_width = this.widths[current_order];
        
        if((next_order) >= this.desired_order){
            //set a new angle.
            angle = this.final_angle;
            
            //reset the peak height;
            peak_y = this.final_peak_y;
            
            //reset the side width;
            side_width = this.final_side_width;
            
        }
        
        if(this.desired_order == 0){
            this.drawLine(this.widths[0]);
            return;
        }
        
        //draw the left side
        if((next_order) >= this.desired_order){
            this.drawLine(this.widths[next_order]);
        }else{
            this.draw(next_order);
        }
        
        //draw the left side of the triangle
        this.ctx.save();
            this.ctx.translate(this.widths[next_order],0);
            this.ctx.rotate(-angle);
            if((next_order) >= this.desired_order){
                this.drawLine(side_width);
            }else{
                this.draw(next_order);
            }
        this.ctx.restore();
        
        
        // draw the right side of the triangle
        this.ctx.save();
            this.ctx.translate(peak_x,peak_y);
            this.ctx.rotate(angle);
            if((next_order) >= this.desired_order){
                this.drawLine(side_width);
            }else{
                this.draw(next_order);
            }
        this.ctx.restore();
        
        
        
        //draw the right side
        this.ctx.save();
            this.ctx.translate(this.widths[next_order]*2,0);
            if((next_order) >= this.desired_order){
                this.drawLine(this.widths[next_order]);
            }else{
                this.draw(next_order);
            }
        this.ctx.restore();
        
        return false;
    },

    //开始画水滴，点击水滴下落动画
    renderBg: function(){
      this.ctx.drawImage(this.bgImage, 0, 0);
    },
    // drawWater: function() {
     
    //   this.ctx.drawImage(this.waterImage,this.waterdrop.x,this.waterdrop.y);
    // },

    // drop: function() {
    //   this.waterdrop.y +=  this.exp*10;
    //   ctx.drawImage(this.waterImage, this.waterdrop.x, this.waterdrop.y);
    //   requestNextAnimationFrame(drop);
    // },
    // waterDrop: function(pos) {

    //   var x = pos.x - this.waterdrop.x;
    //   var y = pos.y - this.waterdrop.y;

    //   if(pos.x >= (this.waterdrop.x + 8) && (pos.x <= this.waterdrop.x + 43 + 8) && pos.y >= (this.waterdrop.y + 8) && pos.y <= (this.waterdrop.y + 65 + 8))
    //   {   
    //     console.log(pos.x);
    //     console.log(pos.y);
    //     this.ctx.clearRect(pos.x-x,pos.y-y, 43,65);
    //     requestNextAnimationFrame(Koch.prototype.drop);
        
    //   }
    // }   
}

window.onload = function() {
    
    new Koch("canvas",false);
    new Koch2("canvas", false);
    // start();
};


var canvas = document.getElementById("canvas");
var drop = document.getElementById("drop");
var ctx = canvas.getContext("2d");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/bg.png";

var exp = 1;
//water img
var waterReady = false;
var waterimg = new Image();
waterimg.onload = function () {
  waterReady = true;
};
waterimg.src = "images/waterdrop.png";


var waterdrop = {};

var reset = function () {
  waterdrop.x = 10;
  waterdrop.y = 10 ;
};

var render = function () {
  // if (bgReady) {
  //   ctx.drawImage(bgImage, 0, 0);
  // }

  if (waterReady) {
    ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  }
};

canvas.onmousedown = function(e){
  var x = e.clientX - waterdrop.x;
  var y = e.clientY - waterdrop.y;

  //判断鼠标是否点击在图像内
  if(e.clientX >= waterdrop.x + this.offsetLeft && e.clientX <= waterdrop.x + 43 + this.offsetLeft && e.clientY >= waterdrop.y + this.offsetTop && e.clientY <= waterdrop.y + 65 + this.offsetTop){
      console.log('this.offsetLeft:'+ this.offsetLeft);
      document.onmousemove = function(e){
        //不重新绘制就不会出现白色的背景
          // ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
          
          //鼠标拖动时重绘黑色背景
          ctx.drawImage(waterimg, e.clientX-x, e.clientY-y);
         
          //记录矩形的位置
          waterdrop.x = e.clientX-x;
          waterdrop.y = e.clientY-y;
      };
      document.onmouseup = function(){
          document.onmousemove = null;
      };

      // document.onclick = function(e){
      //   //动画要清除屏幕
      //   ctx.clearRect(e.clientX-x, e.clientY-y, 43,65);
      //   requestNextAnimationFrame(drop);
      // }
  }
};


function getClickPos(e){
  var rect = canvas.getBoundingClientRect();
  return {
    'x': e.clientX - rect.left,
    'y': e.clientY - rect.top
  }
}

drop.onclick = function(e){
  var pos = getClickPos(e);
  console.log(pos.x);
  console.log(pos.y);
  console.log("click me !");
}


var drop = function () {
  waterdrop.y = waterdrop.y + exp*10;
  ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
  requestNextAnimationFrame(drop);
};

var main = function () {
  render();
  window.requestNextAnimationFrame(main);
};

function start() {
  reset();
  main();
}

