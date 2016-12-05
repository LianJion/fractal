(function() {

	var width,
		  height, 
		  largeHeader, 
		  canvas, 
		  ctx, 
		  triangles, 
		  target, 
		  animateHeader = false;
		  
  var colors = ['81,173,166', '255,223,0', '245,131,87', '191,76,115', '104,84,137','49,104,157']; 
  // var colors = ['225,238,210', '219,208,167', '230,155,3', '209,73,78', '18,53,85'];
	var colors = ['72,35,68', '43,81,102', '66,152,103', '250,178,67', '224,33,48','81,173,166', '255,223,0', '245,131,87', '191,76,115', '104,84,137','49,104,157'];
	//rgb数组,
	var animateButton = document.getElementById('animateButton');
  var max_order = 5;
  var order_colors = Gradient("#258dc9","#043342", max_order+1);


	
	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		target = {x: 0, y: height};

		largeHeader = document.getElementById('large-header');
		largeHeader.style.height = height+'px';

		canvas = document.getElementById('demo-canvas');
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext('2d');
		



		// create particles 
		triangles = [];
		for(var x = 0; x < 480; x++) {
			addTriangle(x*10);
		}
	}

	function addTriangle(delay) {
		setTimeout(function() {
			var t = new Triangle();
			triangles.push(t);
			//push：把创建好的三角形对象插入到数组中
			tweenTriangle(t);
		}, delay);
	}

	//tri就是创建的三角形对象
	function tweenTriangle(tri) {
		var t = Math.random()*(2*Math.PI);
		// console.log(t);
		var x = (200+Math.random()*100)*Math.cos(t) + width*0.5;
		var y = (200+Math.random()*100)*Math.sin(t) + height*0.5-20;
		var time = 4+3*Math.random();

		//TweenLite.to框架
		TweenLite.to(
			tri.pos, 
			time, 
			{	
				x: x,
				y: y,
				ease: Circ.easeOut,
				//类似于velocity.js的写法
				onComplete: function() {
					tri.init();
					tweenTriangle(tri);
					// console.log(tri);
				}

			});
		}

	

	function scrollCheck() {
		if(document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		largeHeader.style.height = height+'px';
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		//animateHeader默认是true
		if(!animateHeader) {

			ctx.clearRect(0, 0, width, height);
			//遍历三角形数组，绘制三角形
			for(var i in triangles) {
				triangles[i].draw();
			}
		}
		//执行动画
    window.requestNextAnimationFrame(animate);
	}

	// Canvas manipulation ,绘制图形对象
	function Triangle() {
		var _this = this;

		// constructor
		(function() {
			//数组
			_this.coords = [{},{},{}];
			_this.pos = {};
			init();
		})();

		function init() {
      //发射例子的位置
			_this.pos.x = width*0.5;
			_this.pos.y = height*0.5-20;
			_this.coords[0].x = -10+Math.random()*40;
			_this.coords[0].y = -10+Math.random()*40;
			_this.coords[1].x = -10+Math.random()*40;
			_this.coords[1].y = -10+Math.random()*40;
			_this.coords[2].x = -10+Math.random()*40;
			_this.coords[2].y = -10+Math.random()*40;
	

			_this.scale = 0.1+Math.random()*0.3;
			_this.color = colors[Math.floor(Math.random()*colors.length)];
      // _this.color = order_colors[Math.floor(Math.random()*order_colors.length)];
      // console.log(_this.color);

			setTimeout(function() { _this.alpha = 0.8; }, 10);
		}

		this.draw = function() {
			if(_this.alpha >= 0.005) _this.alpha -= 0.005;
			else _this.alpha = 0;

			ctx.beginPath();
			ctx.moveTo(_this.coords[0].x+_this.pos.x, _this.coords[0].y+_this.pos.y);
			ctx.lineTo(_this.coords[1].x+_this.pos.x, _this.coords[1].y+_this.pos.y);
			ctx.lineTo(_this.coords[2].x+_this.pos.x, _this.coords[2].y+_this.pos.y);
			
			
			ctx.closePath();
			ctx.fillStyle = 'rgba('+_this.color+','+ _this.alpha+')';
      // _this.color = order_colors[Math.floor(Math.random()*order_colors.length)]
      // ctx.fillStyle = _this.color;
      // console.log(_this.color);

			ctx.fill();
		};

		this.init = init;
	}
		

  // Event handling
  function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

	animateButton.onclick = function (e) {

	    animateHeader = animateHeader ? false : true;
	    console.log(animateHeader);
	    if (animateHeader) {
	      animateButton.value = 'Start';
	    }
	    else {
	      animateButton.value = 'Stop';
	      
	    }
  
	};


  function start() {
    initHeader();
    addListeners();
  }
  

	window.onload = function () {
		
		start();
    window.requestNextAnimationFrame(animate);
	}

})();
//立即执行函数



