var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    paused = false,
    fishReady = false;
    fishImage = new Image();
    fishImage.src = 'images/fish.png';
fishImage.onload = function () {
   fishReady = true;
};



var sunReady = false,
    sunImage = new Image();
    sunImage.src = 'images/sun.png';

sunImage.onload = function () {
   sunReady = true;
};

var fishwater = {
  x:100,
  y:100,
};

var sun = {
  x: 310,
  y: 100,
}

var circle = {
  x: 200,
  y: 190,
  radius: 10
};

var angle = Math.PI; 

function fish() {
  if (fishReady) {
    ctx.drawImage(fishImage, fishwater.x, fishwater.y);
    // console.log(fishwater.x);
  }
}

function render() {
  if (sunReady) {
    ctx.drawImage(sunImage, sun.x, sun.y);
    // console.log(fishwater.x);
  }
}


function handleMouseMove(e){

    var mouseX,
        mouseY;
    mouseX = e.clientX- 8;
    console.log(e.clientY);
    mouseY = e.clientY- 8;

    var dx = mouseX - fishwater.x;
    var dy = mouseY - fishwater.y;
    //100 , 200
      //   // console.log(fishwater.x);
      //   // console.log(fishwater.y);
      //   console.log(mouseX);
      //   console.log(mouseY);
      // console.log(fishImage.width);
      // console.log(fishImage.height);
      // //201 185
      // console.log(dx);
      // console.log(dy);
    if ( dx <= fishImage.width && dx >= 0  && dy <= fishImage.height && dy >=0){
  
      fish.isClick = false;
      // console.log(fish.isClick);
      fish.isClick = fish.isClick ? false : true;
      if (fish.isClick){
          paused = paused ? false : true;
          console.log(paused);
          // drawcircle();
          changeweather();
          fish.isClick = false;
        
      }
    }else {
      console.log("aaa");
    }
}

canvas.onclick = function (e) {
  handleMouseMove(e);
};

function changeweather() {
  if(!paused) {
    console.log('change');
 
    ctx.clearRect(sun.x, sun.y, sunImage.width, sunImage.height);
    sunImage.src = 'images/cold.png';
    ctx.drawImage(sunImage, sun.x, sun.y);

  } else {
    ctx.clearRect(sun.x, sun.y, sunImage.width, sunImage.height);
    sunImage.src = 'images/sun.png';
    ctx.drawImage(sunImage, sun.x, sun.y);
    // ctx.save();
    //   console.log('sun');
    //   ctx.translate(sun.x + sunImage.width/2, sun.y + sunImage.height*2 );
    //   ctx.rotate(angle/3);
    //   ctx.scale(0.5, 0.5);
    //   ctx.drawImage(sunImage, 0, 0);
    // ctx.restore();
  }

}

function drawcircle() {
  if (!paused) {
    console.log(paused);
    ctx.save();
      ctx.beginPath();
      ctx.arc(circle.x+150,circle.y+200,circle.radius,0,Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = '#F4F4E5';
      ctx.fill();
    ctx.restore();
  }else {
    ctx.save();
      ctx.beginPath();
      ctx.arc(circle.x+150,circle.y,circle.radius,0,Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = '#F4F4E5';
      ctx.fill();
    ctx.restore();
  }

}

window.onload = function () {
  fish();
  render();
}