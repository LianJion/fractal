var redSlider   = new COREHTML5.Slider('rgb(0,0,0)',
                                       'rgba(255,0,0,0.8)', 0);
redSlider.appendTo('redSliderDiv');


redSlider.addChangeListener( function() { 
  
   redSlider.fillStyle = 'rgb(' +
      (redSlider.knobPercent * 255).toFixed(0) + ', 0, 0)';
});


redSlider.fillStyle   = 'rgb(' +
   (redSlider.knobPercent * 255).toFixed(0)   + ', 0, 0)';

redSlider.draw();


var positionContext = document.getElementById('canvas').getContext('2d');
function updatePos() {
	
}