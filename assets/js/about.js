window.addEventListener('load', ()=>{

	let $h1 = document.querySelector('h1');
	createAnimateText($h1);
	
	const slider = createSlider({
		controls: false,
		slide: true,
		autoSlide: true,
		duration: 3000
	})

})