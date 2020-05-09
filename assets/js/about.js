window.addEventListener('load', ()=>{

	let $h1 = document.querySelector('h1');
	createAnimateText($h1);
	
	const slider = newSlider({
		controls: false,
		slide: true,
		autoSlide: true,
		duration: 2000
	})

})