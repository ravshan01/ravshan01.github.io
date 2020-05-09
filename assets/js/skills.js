window.addEventListener('load', ()=>{

	let $h1 = document.querySelector('h1');
	createAnimateText($h1)


	class Cube{
		constructor(obj){
			this.$wrap   = document.querySelector('.main'); 
			this.$cube   = document.querySelector('.cube');

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
			window.addEventListener( 'mouseup',  this.mouseUp.bind(this) );
			this.$wrap.addEventListener( 'mousemove', this.rotate.bind(this) );
		}

		rotate(event){
			if ( this.isMouseDown ){

				let e = event.clientX ? event : event.changedTouches[0];
				let posX = e.clientX;
				let posY = e.clientY;

				this.rotateX = this.defaultRotateX - ( posY - this.startPosY ) / 3;
				this.rotateY = this.defaultRotateY + ( posX - this.startPosX ) / 3;

			


				// console.log(this.rotateX, this.rotateY)

				this.$cube.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`;


			}

		}

		mouseDown(event){
			let e = event.clientX ? event : event.changedTouches[0];

			this.isMouseDown = true;
			this.startPosX = e.clientX;
			this.startPosY = e.clientY;
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