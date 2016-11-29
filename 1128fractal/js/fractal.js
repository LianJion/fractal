var treepos = {
  x:500,
  y:100,
}




var kochpos = {
  x:900,
  y:100,
}

//毕达哥斯拉树


var pythagoraspos = {
  x:800,
  y:50,
};

window.onload = function() {
    
  var h_tree =  new Tree(canvas);
  console.log(h_tree);
  var koch =  new Koch(canvas);
  var pythagoras =  new Pythagoras(canvas);
  h_tree.update(treepos);
  koch.update(kochpos);
  pythagoras.update(pythagoraspos);
  
};