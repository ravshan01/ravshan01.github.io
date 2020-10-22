window.addEventListener('load', () => {

	const preloader = document.querySelector('.preloader-wrap');
	preloader.style.display = 'none';


	const config = {
		distinctPlanesCount : 5,
		colors : [ 'black', 'blue', 'green', 'pink', 'orange'],

		settings : {
			roundTime : {
				min : 15,
				max : 120,
				default : 30
			},

			spawnTime : {
				min : 0.25,
				max : 1.5,
				default : 0.75
			},

			speed : {
				min : 0.5,
				max : 2,
				default : 1.5
			}
		}
	}


	const app = new App(config);
	app.init();

})
