if (window.jQuery) { var Velocity = $.Velocity; }   

var fadeIn = {
  p: {
    opacity: 1,
    top: "50px"
  },
  o: {
    fast: {
      duration: 1000,
      easing: "ease-out"
    },
    slow: {
      duration: 3000,
      easing: "ease-out"
    }
  }
};

var test1 = document.getElementById('test');

var test2 = document.getElementById('test2');

var test3 = document.getElementById('test3');

// $.Velocity.RunSequence([
//   {e: test1, p: {translateX: 100, top: "50px", opacity: 1}, o: fadeIn.o.slow },
//   {e: test2, p: {translateX: 200, top: "50px", opacity: 1}, o: fadeIn.o.fast },
//   {e: test3, p: {translateX: 300, top: "50px", opacity: 1}, o: fadeIn.o.slow }
// ]);


$.Velocity.RunSequence([
  {e: test1, p: {translateX: 100, top: "50px", opacity: 1}, o: {duration: 1000} },
  {e: test2, p: {translateX: 200, top: "50px", opacity: 1}, o: {duration: 1000, sequenceQueue: false } },
  {e: test3, p: {translateX: 300, top: "50px", opacity: 1}, o: {duration: 1000} }
]);
