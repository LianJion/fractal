//H-tree
function Tree(canvas){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'black';
    this.ctx.lineCap = 'round';
    // ratio比率
    this.max_ratio = 3;
    this.min_ratio = 1.41;
    this.ratio = (this.min_ratio);
    
    // PI：180°
    this.max_angle = Math.PI/2;
    this.angle = Math.PI/5;
    
    this.max_order = 10;
    this.order_colors = Gradient("#D4E576","#126845",this.max_order+1);
    this.start_length = this.canvas.height/3.25;  //144.6
    this.start_width = 15;        
    
    
    this.previous = {x:0,y:0};
    
    // actually initialize the canvas
    // this.draw();
    // if(!standalone) 
    //     this.canvas.blur();
}
// h-tree的原型
Tree.prototype = {

    // update的参数是canvas页面传进来的
    update: function(pos){

        console.log(pos.x);
        console.log(pos.y);
        this.updateAngle(pos);
        this.updateRatio(pos);
        // 调用了更新后的角度和比值，再进行绘制
        this.draw(pos.x);
    },
    updateAngle: function(pos){

        var x = -Math.abs(pos.x - (this.canvas.width/2)),
            y = pos.y - (this.canvas.height-this.start_length);
            // atan返回正切值为指定数字的角度,然后算出偏移角度
        this.angle = (Math.PI/2) - Math.atan(y/x);
    },
    updateRatio: function(pos){
        var x = pos.x - (this.canvas.width/2),
            y = pos.y - (this.canvas.height-this.start_length),
            // sqrt开根号，this.min_ratio=1.41，this.max_ratio=3 ,this.max_ratio-this.min_ratio=1.59
            //当绘制主躯干的适合Math.sqrt((x*x)+(y*y))/(this.canvas.width/2)>1
            d = Math.min(1,Math.sqrt((x*x)+(y*y))/(this.canvas.width/2));
        this.ratio = ((this.max_ratio-this.min_ratio)*(1-d)) + this.min_ratio;
        //不明白为啥要这样写
        // console.log(this.ratio);
    },
    draw: function(x){
        
        // draw the trunk of the tree.画出树的躯干
        this.ctx.save();

            //把原点（0，0）移动到底部中点
            this.ctx.translate(x,this.canvas.height);
            // (325,470)

            //actually draw the trunk.
            this.ctx.strokeStyle = this.order_colors[0];
            this.drawBranch(this.start_length,this.start_width);
            // (144.6,15)        
            
            this.ctx.save();
                this.ctx.translate(0,-this.start_length);
                // (0,-144.6)
                this.drawBranches(1);
            this.ctx.restore();     
            
        this.ctx.restore();
    },
    drawBranch: function(length, width){
        this.ctx.lineWidth = (!width || width<1)?1:width;
        this.ctx.beginPath();  
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(0,-length);
        this.ctx.stroke();
    },
    // 按照次序来绘制分叉，递归函数
    drawBranches: function(order){

      // 设置this.ratio的默认最小值是1.41
      var ratio = Math.pow(this.ratio,order),
          // this.start_length=144.6，this.start_width=15
          new_length = this.start_length/ratio,
          new_width = this.start_width/ratio;
      
      
      if(new_length < 3 || order > this.max_order){
          return;
      }
      
      this.ctx.strokeStyle = this.order_colors[Math.floor(order)];
      //this.ctx.strokeStyle = this.order_colors[8];
      
      //draw the right branch
      this.ctx.save();
          // 起初旋转角度Math.PI/5 ，36°
          this.ctx.rotate(this.angle*1.5);
      
          this.drawBranch(new_length,new_width);
      
          this.ctx.save();
              this.ctx.translate(0,-new_length);
              // order逐渐增加
              this.drawBranches(order+1);
          this.ctx.restore();
          
      this.ctx.restore();
        
      //draw the left branch
      this.ctx.save();
          this.ctx.rotate(-this.angle);
      
          this.drawBranch(new_length,new_width);
      
          this.ctx.save();
              this.ctx.translate(0,-new_length);
              this.drawBranches(order+1)
          this.ctx.restore();
      
      this.ctx.restore();
    }
};

