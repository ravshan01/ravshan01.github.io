let $h1 = document.querySelector('h1');
createAnimateText($h1);
	
let $slider = document.querySelector('.slider');

const slider = createSlider($slider, {
	controls: false,
	autoSlide: true,
	duration: 3000
})
