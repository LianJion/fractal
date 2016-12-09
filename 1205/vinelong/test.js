
// var path2 = document.querySelector('#test');

// var len = path2.getTotalLength();
// path2.style.strokeDasharray = path2.style.strokeDashoffset = len;
// console.log(path2.style.strokeDasharray);


// $.Velocity(path2, {strokeDasharray: 0 },{ duration: 5000, delay: 50});
// console.log(path2.style.strokeDasharray);

var paths = $('path:not(defs path)');
paths.each(function(i, e) {
    e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
});
console.log(paths[0].style.strokeDasharray);
var tl = new TimelineMax();


tl.add([
    TweenLite.to(paths.eq(0), 1, {strokeDashoffset: 0, delay: 0.0}),
]);

console.log(paths[0].style.strokeDasharray);