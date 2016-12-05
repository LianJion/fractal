//统一模式代码
//koch曲线
function KochSnowflake(canvas){


    this.canvas = document.getElementById('canvas');
    this.canvas.ctx = this.canvas.getContext('2d');
    this.canvas.ctx.strokeStyle = 'black';
    this.canvas.ctx.lineCap = 'round';

    
    this.maxorder = 5;
    this.base_height = this.canvas.height / 2;
    
    this.order_colors = Gradient("#258dc9","#043342",this.maxorder+1);
}


KochSnowflake.prototype = {

  update: function(pos) {
    console.log(pos);
    var x = pos && pos.x || 0,
        y = pos && pos.y || 0,

        //ratio比率： x/canvas的width。 0.35~0.65之间，会随着鼠标x轴移动而移动
        ratio = Math.max(0.35, Math.min(0.65, x / this.canvas.width)),

        //gamma = 90* ratio,top angle of the initial triangle, 顶角
        gamma = Math.PI/3,
        // base angle 底角
        angle = (Math.PI - gamma) / 2,

        num = Math.floor(2 * this.maxorder * (1 - (y / this.canvas.height))),
        numMin =  Math.min(this.maxorder,num),
        order = Math.max(0, numMin);

    this.pos = this.pos || {x: 0, y: 0};
    this.pos.x = x;
    this.pos.y = y;
    console.log(this.pos);

    if (this.order === order && this.angle === angle)
        return;

    this.order = order;
    this.angle = angle;

    // ratio of width to the side of the smaller triangle in the middle
    this.ratio = Math.sin(angle) / (3 * Math.sin(gamma));

    // width and side width of the initial triangle, 
    var width = (this.base_height / Math.tan(angle)) * 2, 
        side = this.base_height / Math.sin(angle);

    //这个写法绝对要清屏啊，它是在之前基础上绘制一个新的koch，不是涨角度啊
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // drawing initial triangle
    this.canvas.ctx.save();
        this.canvas.ctx.strokeStyle = this.order_colors[0];
        // this.canvas.ctx.translate((this.canvas.width / 2) - (width / 2), this.canvas.height / 3);
        this.canvas.ctx.translate(this.canvas.width / 1.5, this.canvas.height / 3);
        //这个可以绘制科赫曲线, 第三个参数控制科赫曲线的上下,它是由y轴控制的
        this.draw(1, width, 1);
        //调用了一次函数

        //下面开始绘制雪花
        this.canvas.ctx.save();
          this.canvas.ctx.rotate(angle);
          this.draw(1, side, -1);
        this.canvas.ctx.restore();
        
        this.canvas.ctx.translate(width, 0);
        this.canvas.ctx.rotate(Math.PI - angle);
        this.draw(1, side, 1);
        // this.canvas.ctx.stroke();
    this.canvas.ctx.restore();
  },  
  //inverse：逆转
  draw: function(curr_order, width, inverse) {
     
    var third_width = width / 3,
        // width of the triangle
        tri_width = width * this.ratio;

    if (curr_order > this.order) {
        this.canvas.ctx.beginPath();
        this.canvas.ctx.moveTo(0, 0);
        this.canvas.ctx.lineTo(width, 0);
        this.canvas.ctx.lineWidth = 2;
        this.canvas.ctx.stroke();
        return;
    }

    ++curr_order;
    this.canvas.ctx.strokeStyle = this.order_colors[Math.floor(curr_order)];
    this.draw(curr_order, third_width, inverse);

    this.canvas.ctx.save();
      this.canvas.ctx.translate(third_width * 2, 0);
      this.draw(curr_order, third_width, inverse);
    this.canvas.ctx.restore();

    this.canvas.ctx.save();
      this.canvas.ctx.translate(third_width, 0);
      this.canvas.ctx.rotate(inverse * (-this.angle));
      this.draw(curr_order, tri_width, inverse);
    this.canvas.ctx.restore();

    this.canvas.ctx.save();
      this.canvas.ctx.translate(2 * third_width, 0);
      this.canvas.ctx.rotate(inverse * -(Math.PI - this.angle));
      this.draw(curr_order, tri_width, -inverse);
    this.canvas.ctx.restore();
  }
}

