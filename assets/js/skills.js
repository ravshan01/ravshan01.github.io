window.addEventListener('load', ()=>{

	let $h1 = document.querySelector('h1');
	createAnimateText($h1)

	const slider = createSlider({
		autoSlide: true,
		duration: 4000
	});

	// window.addEventListener('click', e => console.log(e))


	class Cube{
		constructor(obj){
			this.$cube     = document.querySelector('.cube');
			this.$wrap     = this.$cube.parentElement; 
			this.$cubeInfo = document.querySelector('.cube-info');

			this.startPosX = 0;
			this.startPosY = 0;

			this.defaultRotateX = -30;
			this.defaultRotateY = 30;

			this.rotateX = 0;
			this.rotateY = 0;

			this.isMouseDown = false;
		}


		init(){
			this.$wrap.addEventListener( 'mousedown', this.mouseDown.bind(this) );
			this.$wrap.addEventListener('touchstart', this.mouseDown.bind(this) );

			window.addEventListener( 'mouseup',  this.mouseUp.bind(this) );
			window.addEventListener( 'touchend', this.mouseUp.bind(this) );

			this.$wrap.addEventListener( 'mousemove', this.rotate.bind(this) );
			this.$wrap.addEventListener( 'touchmove', this.rotate.bind(this) );
		}

		rotate(event){
			if ( this.isMouseDown ){

				let e = event.clientX && event.clientX !== 0 ? event : event.changedTouches[0];

				let posX = e.clientX;
				let posY = e.clientY;

				this.rotateX = this.defaultRotateX - ( posY - this.startPosY ) / 3;
				this.rotateY = this.defaultRotateY + ( posX - this.startPosX ) / 3;

				this.$cube.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`;

			}

		}

		mouseDown(event){
			let e = event.clientX ? event : event.changedTouches[0];

			this.isMouseDown = true;
			this.startPosX = e.clientX;
			this.startPosY = e.clientY;

			this.$cubeInfo.classList.add('hide')
		}

		mouseUp(){
			this.isMouseDown = false;

			this.defaultRotateX = this.rotateX;
			this.defaultRotateY = this.rotateY;
		}


	}
	


	const cube = new Cube();
	cube.init();



})