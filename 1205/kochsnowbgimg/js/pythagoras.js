function Pythagoras(canvas){
  var i;
  
  // initialize the tree.

  this.canvas = document.getElementById('canvas');
  this.canvas.ctx = this.canvas.getContext('2d');
  this.canvas.ctx.strokeStyle = 'black';
  this.canvas.ctx.lineCap = 'round';

  this.base_dim = Math.min(this.canvas.width/12,this.canvas.height/8);
  
  this.ratio = 0.5*Math.sqrt(2);
  
  this.max_order = 9;
  this.order_colors = Gradient("#D4E576","#126845",this.max_order+2);
  this.min_order = 0;
  this.desired_order = 7;
  
  //initialize the different scales
  this.scales = [];
  for(i=this.min_order; i<=this.max_order; i++){
    this.scales[i] = Math.pow(this.ratio,i);
  }
  
  //stuff for asymentric stuff.
  this.max_percentage = 0.8;
  this.l_percentage = 0.5;
  this.r_percentage = 0.5;
  
  
  // actually initialize the canvas
  this.calcVariables();
  // this.draw();
  // if(!standalone) 
  //   this.canvas.blur();
}

Pythagoras.prototype = {
  update: function(pos){
    this.updateOrder(pos);
    this.updateHorizontalPos(pos);
    this.calcVariables();
    this.draw();
  },
  updateOrder: function(pos){
    var min_y = this.canvas.height*0.1,
      max_y = this.canvas.height-(2*min_y),
      y = Math.min(max_y,Math.max(0, -(pos.y-(this.canvas.height-min_y)) ));
    this.desired_order = this.max_order*(y/max_y);
  },
  updateHorizontalPos: function(pos){
    var x = Math.min(1,Math.abs(pos.x - (this.canvas.width/2))/(this.canvas.width/2-(this.canvas.width*0.2)));
    x = ((this.max_percentage-0.5)*x) + 0.5;
    if(pos.x<(this.canvas.width/2)){ // we're on the right side.
      this.l_percentage = 1-x;
      this.r_percentage = x;
    }else{ //we're on the left.
      this.l_percentage = x;
      this.r_percentage = 1-x;
    }
  },
  draw: function(){
    
    // draw the trunk of the tree.
    this.canvas.ctx.save();

      // this.canvas.ctx.translate((this.canvas.width/2)-(this.base_dim/2),this.canvas.height);

      this.canvas.ctx.translate((this.canvas.width/4)-(this.base_dim/2)-(this.base_dim/2),this.canvas.height);
      // console.log((this.canvas.width/4)-(this.base_dim/2)-(this.base_dim/2));
      //actually draw the trunk.
      this.canvas.ctx.fillStyle = this.order_colors[0];
      this.drawBranch(this.base_dim,this.base_dim);   
      
      //now draw the branches.
      this.canvas.ctx.save();
        this.canvas.ctx.translate(0,-this.base_dim);
        this.drawBranches(1);
      this.canvas.ctx.restore();   
      
    this.canvas.ctx.restore();
  },
  calcVariables: function(){
    
    var whole = Math.floor(this.desired_order),
      frac = this.desired_order - whole,
      lx = this.l_percentage*this.base_dim,
      rx = this.r_percentage*this.base_dim,
      temp=0, i;
    
    // calculate the final height first.
    this.height = this.base_dim*(Math.min(this.r_percentage, this.l_percentage));
    
    //calulate all the base variables.
    
    //now calculate the angles for either side.
    this.langle = Math.atan(this.height/lx);
    this.rangle = Math.atan(this.height/rx);
    
    //calculate the lengths of each side.
    temp = this.height*this.height;
    this.lwidth = Math.sqrt((lx*lx)+(temp));
    this.rwidth = Math.sqrt((rx*rx)+(temp));
    
    //calculate the scales for each side.
    temp = this.base_dim*this.ratio;
    this.rscale = this.rwidth/(temp);
    this.lscale = this.lwidth/(temp);
    
    //now calculate all of the inbetween values (base up to desired order);
    this.lwidths = [this.lwidth];
    this.rwidths = [this.rwidth];
    this.rx_trans = [this.base_dim*this.l_percentage];
    this.ry_trans = [-this.height];
    for(i=1; i<=this.max_order+1; i++){
      temp = this.scales[i-1];
      this.lwidths[i] = this.lwidth*temp;
      this.rwidths[i] = this.rwidth*temp;
      this.rx_trans[i] = lx*temp;
      this.ry_trans[i] = -this.height*temp;
    }
    
    // calculate the angles and lengths on the last partial iteration.
    this.final_height = this.height*frac*this.scales[whole];
    
    temp = lx*this.scales[whole];
    this.final_langle = Math.atan(this.final_height/temp);
    this.final_lwidth = Math.sqrt((temp*temp)+(this.final_height*this.final_height));
    this.final_lheight = this.final_lwidth*frac;
    
    temp = rx*this.scales[whole];
    this.final_rangle = Math.atan(this.final_height/temp);
    this.final_rwidth = Math.sqrt((temp*temp)+(this.final_height*this.final_height));
    this.final_rheight = this.final_rwidth*frac;
    
  },
  drawBranch: function(width, height){
    this.canvas.ctx.fillRect(0,-height,width,height);
  },
  drawBranches: function(current_order){
    var next_order = current_order+1;
    
    //set the color to the current level.
    this.canvas.ctx.fillStyle = this.order_colors[current_order];
    
    //draw the left branch
    this.canvas.ctx.save();
      if(current_order > this.desired_order){
        //draw the special end.
        this.canvas.ctx.rotate(-this.final_langle);
        this.drawBranch(this.final_lwidth,this.final_lheight);
      }else{
        this.canvas.ctx.rotate(-this.langle);
        this.drawBranch(this.lwidths[current_order],this.lwidths[current_order]);
        this.canvas.ctx.save();
          this.canvas.ctx.translate(0,-this.lwidths[current_order]);
          this.canvas.ctx.scale(this.lscale,this.lscale);
          this.drawBranches(next_order);
        this.canvas.ctx.restore();
      }
    this.canvas.ctx.restore();
    
    
    
    //draw the right branch
    this.canvas.ctx.save();
      
      if(current_order > this.desired_order){
        //draw the special end.
        this.canvas.ctx.translate(this.rx_trans[current_order],-this.final_height);
        this.canvas.ctx.rotate(this.final_rangle);
        this.drawBranch(this.final_rwidth,this.final_rheight);
        
      }else{
        
        //draw the current branch
        this.canvas.ctx.translate(this.rx_trans[current_order],this.ry_trans[current_order]);
        this.canvas.ctx.rotate(this.rangle);
        this.drawBranch(this.rwidths[current_order],this.rwidths[current_order]);
        
        //draw the next one.
        this.canvas.ctx.save();
          this.canvas.ctx.translate(0,-this.rwidths[current_order]);
          this.canvas.ctx.scale(this.rscale,this.rscale);
          this.drawBranches(next_order);
        this.canvas.ctx.restore();
      }
    this.canvas.ctx.restore();
  }
};
