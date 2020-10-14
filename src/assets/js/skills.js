createAnimateText( document.querySelector('h1'), true )


const slider = createSlider(document.querySelector('.slider'), {
	slide: true,
	infinite: false
});

const cube = new Cube();
cube.init();