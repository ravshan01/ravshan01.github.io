const h1 = document.querySelector('h1');
createAnimateText(h1, true);


const slider = createSlider(document.querySelector('.slider'), {
	controls: false,
	autoSlide: true,
	duration: 3500
})
