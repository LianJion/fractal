var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var waterReady = false;
var waterdrop = {
	x:10,
	y:10
};

var exp = 1;
var waterimg = new Image();
waterimg.onload = function () {
  waterReady = true;
};

waterimg.src = "images/waterdrop.png";

function render() {
	if(waterReady) {
		ctx.drawImage(waterimg, waterdrop.x, waterdrop.y);
	}
}

window.onload = function (){

	render();
}


canvas.onmousedown = function(e){
  var x = e.clientX - waterdrop.x;
  var y = e.clientY - waterdrop.y;

  //判断鼠标是否点击在图像内
  if(e.clientX >= waterdrop.x + this.offsetLeft && e.clientX <= waterdrop.x + 43 + this.offsetLeft && e.clientY >= waterdrop.y + this.offsetTop && e.clientY <= waterdrop.y + 65 + this.offsetTop){
    console.log('this.offsetLeft:'+ this.offsetLeft);
    document.onmousemove = function(e){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      //鼠标拖动时重绘黑色背景
      ctx.drawImage(waterimg, e.clientX-x, e.clientY-y);
     
      //记录矩形的位置
      waterdrop.x = e.clientX-x;
      waterdrop.y = e.clientY-y;
      
    };
    document.onmouseup = function(){
      document.onmousemove = null;
    };

    document.onclick = function(){
      interval(waterdrop);
    }
  }
};

function fall(waterdrop) {
	
    ctx.clearRect(0, 0, canvas.width, canvas.height);//绘制前清理画布，避免重复绘制
    waterdrop.y += exp;
    if(waterdrop.y >= (canvas.height-65)){
    	waterdrop.y = canvas.height-65;
    }
    render();
}

function interval(waterdrop){
    window.setInterval(fall, 30, waterdrop);
}