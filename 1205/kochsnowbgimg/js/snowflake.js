
//在原有canvas画布基础上
var fract = new Fractal.Koch(canvas, {x: 0, y: 0}, 5, "#477ff1");
	
	var start = {x: canvas.width / 2, y: canvas.height},
	target = {x: 0, y: 0},
	kochAnim = new Fractal.Animation(fract, start, target);

	//鼠标移开后重新执行
	kochAnim.skip(4000);