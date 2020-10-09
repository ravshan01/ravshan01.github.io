
function createSlider(elem, obj){
	if ( obj.slide ){
		let slider = new SlideSlider(elem, obj);
		slider.init();
		return slider;
	}
	
	let slider = new FadeOutSlider(elem, obj);
	slider.init();
	return slider;
}


class Slider{
	constructor(elem, obj){
		this.slider       = elem;
		this.slidesWrap   = this.slider.querySelector('.slides');
		this.slides       = Array.from( this.slidesWrap.children );

		this.controls     = obj.controls == false ? false : true;
		this.dots         = obj.dots && obj.dots != undefined ? true : false;
		this.slide        = obj.slide && obj.slide != undefined ? obj.slide : false;

		this.infinite     = obj.infinite == false ? false : true;
		this.autoSlide    = obj.autoSlide && obj.autoSlide != undefined ? true : false;
		this.timeline     = obj.timeline || obj.fullPage ? true : false;
		this.fullPage     = obj.fullPage && obj.fullPage != undefined ? true : false;
		this.controlsWrap = {}

		if ( obj.active ) this.activeIndex = obj.active - 1;
		if ( obj.active > this.slides.length ) this.activeIndex = this.slides.length - 1;
		if ( obj.active == 0 || obj.active < 0 || obj.active == undefined ) this.activeIndex = 0;



//autoShow
		if ( this.autoSlide ) {
			this.duration = obj.duration ? obj.duration : 4000;
			this.timer = setInterval(this.autoShow.bind(this), this.duration);
		}

}


//functions

	init(){
		this.createControls();
		this.addMouseSlide();


		if ( this.slide ) this.slider.classList.add('slide-slider');
		else this.slider.classList.add('fade-out-slider');

		if ( this.timeline ) this.slider.classList.add('timeline');
		if ( this.fullPage ) this.slider.classList.add('fullPage');
		if ( this.timeline && this.dots == false ) this.controlsWrap.controlsWrap.classList.add('only-button')
		if ( this.dots ) this.dotsInit();


		if ( this.controls && this.infinite == false ) {
			if ( this.activeIndex == 0 ) this.controlsWrap.prev.classList.add('disable');
			if ( this.activeIndex == this.slides.length - 1 ) this.controlsWrap.next.classList.add('disable');
		}


		if ( this.slide ) {
			this.setSlideShowCount();

			if ( this.activeIndex > 0 ){
				let slideCount = this.activeIndex;
				this.activeIndex = 0;
				for (let i = 0; i < slideCount; i++) this.next();
			}

			window.addEventListener('resize', this.reset.bind(this));
		}

		this.show();


		if ( this.fullPage ){

			if ( window.onwell != undefined ){
				window.addEventListener('wheel', this.wheelScroll.bind(this) );
				return;
			}else if ( window.onmousewheel != undefined ){
				window.addEventListener('mousewheel', this.wheelScroll.bind(this) )
				return;
			}

		}

	}


	show(){
		let slideActive = false;
		let dotsActive  = this.controlsWrap.controlsWrap.querySelector('.dots-active');

		for ( let i = 0; i < this.slides.length; i++ ){
			if ( this.slides[i].classList.contains('slide-active') ) slideActive = this.slides[i];
		}

		if ( slideActive ) slideActive.classList.remove('slide-active');
		if ( dotsActive )  dotsActive.classList.remove('dots-active');

		this.slides[this.activeIndex].classList.add('slide-active');
		if ( this.dots ) this.controlsWrap.dots[this.activeIndex].classList.add('dots-active');
	}

	autoShow(){
		this.next();
		this.show();
	}
	resetAutoShow(){
		clearInterval(this.timer);
		this.timer = setInterval(this.autoShow.bind(this), this.duration);
	}



	noTextSelection(){
		this.slider.addEventListener('mousedown', e => e.preventDefault())
	}

	noInfinite(eventType){
		if ( eventType == 'prev' ) {
			let activeIndex = this.activeIndex - 1;
			this.checkDisable(activeIndex);
			if ( activeIndex < 0 ) return true;
		}

		if ( eventType == 'next' ) {
			let activeIndex = this.activeIndex + 1;
			this.checkDisable(activeIndex);
			if ( activeIndex >= this.slides.length ) return true;
		}

		return false;
	}

	checkDisable(index){
		let disable = this.slider.querySelector('.disable');
		if ( disable ) disable.classList.remove('disable');

		if ( index <= 0 && this.controls ) this.controlsWrap.prev.classList.add('disable');

		if ( (index == this.slides.length - 1 || index == this.slides.length) && this.controls ){
			this.controlsWrap.next.classList.add('disable');
		}
	}


	addMouseSlide(){
		this.mousePosition = {};
		this.mousePosition.pos1 = 0;
		this.mousePosition.pos2 = 0;

		this.isMouseDown = false; // пока нигде не используется


		this.slider.addEventListener('mousedown', setMousePositionStart.bind(this) );
		this.slider.addEventListener('mouseup',   setMousePositionEnd.bind(this) );
		this.slider.addEventListener('touchstart', setMousePositionStart.bind(this) );
		this.slider.addEventListener('touchend', setMousePositionEnd.bind(this) );

		this.slider.addEventListener('mouseout', () => this.isMouseDown = false)


		let children = Array.from( this.slider.children ); // отменяем drag событие
		children.forEach( elem =>{
			elem.ondragstart = e => false
		})


		function setMousePositionStart(event){

			let e = event.clientX ? event : event.changedTouches[0];
			this.isMouseDown = true;

			if ( this.timeline ) this.mousePosition.pos1 = e.clientY;
			else this.mousePosition.pos1 = e.clientX;

		}

		function setMousePositionEnd(event){
			
			let e = event.clientX ? event : event.changedTouches[0];
			this.isMouseDown = false;

			if ( this.timeline ) this.mousePosition.pos2 = e.clientY;
			else this.mousePosition.pos2 = e.clientX;

			selectDirection.bind(this)();

		}

		function selectDirection(){

			let pos1 = this.mousePosition.pos1;
			let pos2 = this.mousePosition.pos2;
			if ( pos2 > pos1 && pos2 - pos1 >= 80 ) this.prev();
			if ( pos1 > pos2 && pos1 - pos2 >= 80 ) this.next();

		}

	}


	wheelScroll(e){
		if ( e.deltaY > 0 ) this.prev();
		if ( e.deltaY < 0 ) this.next();
	}

	createControls(){

		let controlsWrap = document.createElement('div');
		controlsWrap.classList.add('controls-wrap');
		this.controlsWrap.controlsWrap = controlsWrap;


		if ( this.controls || this.dots ) {
			//prev and next
			if ( this.controls ) {
				let prev = document.createElement('a');
				let next = document.createElement('a');
				let prevIcon = document.createElement('i');
				let nextIcon = document.createElement('i');

				if ( this.timeline ) {
					prevIcon.classList.add('fa', 'fa-chevron-up');
					nextIcon.classList.add('fa', 'fa-chevron-down');
				}else{
					prevIcon.classList.add('fa', 'fa-chevron-left');
					nextIcon.classList.add('fa', 'fa-chevron-right');
				}
				prev.append(prevIcon);
				next.append(nextIcon);

				prev.setAttribute('href', '#');
				next.setAttribute('href', '#');
				prev.classList.add('prev');
				next.classList.add('next');

				this.controlsWrap.controlsWrap.append(prev);
				this.controlsWrap.controlsWrap.append(next)
				this.controlsWrap.prev = prev;
				this.controlsWrap.next = next;

				this.controlsWrap.prev.addEventListener('click',this.prev.bind(this));
				this.controlsWrap.next.addEventListener('click', this.next.bind(this));
			}


			//slide-dots
			if ( this.dots ) {
				let dotsWrap = document.createElement('div');
				dotsWrap.classList.add('slide-dots');

				this.controlsWrap.dots = [];

				for (let i = 0; i < this.slides.length; i++) {
					let dots = document.createElement('a');
					dots.setAttribute('href', '#');
					dotsWrap.append(dots);
					this.controlsWrap.dots.push(dots);
				}

				this.controlsWrap.controlsWrap.append(dotsWrap);
				this.controlsWrap.dotsWrap = dotsWrap;
			}

		}
		this.slider.append(this.controlsWrap.controlsWrap);
	}



}




//FadeOutSlider

class FadeOutSlider extends Slider{
	constructor(elem, obj){
		super(elem, obj);
	}

	prev(e){
		if (e) e.preventDefault();

		if ( this.infinite == false ) {
			let breakFunc = this.noInfinite('prev');
			if ( breakFunc ) return;
		}

		this.activeIndex--;
		if ( this.activeIndex < 0 ) this.activeIndex = this.slides.length - 1;
		this.show();
		if ( this.autoSlide ) this.resetAutoShow();
	}

	next(e){
		if (e) e.preventDefault();

		if ( this.infinite == false ) {
			let breakFunc = this.noInfinite('next');
			if ( breakFunc ) return;
		}

		this.activeIndex++;
		if ( this.activeIndex >= this.slides.length ) this.activeIndex = 0;
		this.show();
		if ( this.autoSlide ) this.resetAutoShow();
	}

	dotsInit(){
		this.controlsWrap.dots.forEach( (elem, index)=>{
			elem.addEventListener('click', (e)=>{
				e.preventDefault();

				this.activeIndex = index;
				this.show();
				if ( this.infinite == false && this.controls ) this.checkDisable(this.activeIndex);
				if ( this.autoSlide ) this.resetAutoShow();
			})
		});
	}

}




// SlideSlider

class SlideSlider extends Slider{
	constructor(elem, obj){
		super(elem, obj);
		this.slideShowCount = obj.slideShowCount ? obj.slideShowCount : 1;
		this.alignCenter    = obj.alignCenter ? obj.alignCenter : false;

		this.transform = 0;

		this.adaptiveConfig = obj.adaptiveConfig ? obj.adaptiveConfig : false;
	}



	prev(e){
		if (e) e.preventDefault();

		if ( this.infinite == false ) {
			let isBreak = this.noInfinite('prev');
			if ( isBreak ) return;
		}

		this.activeIndex--;
		if ( this.activeIndex < 0 ) this.activeIndex = this.slides.length - 1;

		let centerIndex = this.slides.length - Math.round( this.slideShowCount / 2 )


		// base slide

		if ( this.transform != 0 && this.timeline == false ){

			if ( this.alignCenter && this.activeIndex >=centerIndex ) {
				// ничего не делаем
			}else{
				this.transform -= this.slides[0].offsetWidth;
				this.slidesWrap.style.transform = `translateX(${-this.transform}px)`;
			}

		}

		if ( this.transform != 0 && this.timeline ) {

			if ( this.alignCenter && this.activeIndex >= centerIndex  ) {
				// ничего не делаем
			}else{
				this.transform -= this.slides[0].offsetHeight;
				this.slidesWrap.style.transform = `translateY(${-this.transform}px)`;
			}

		}


		// переход на последний слайд

		if ( this.transform == 0 && this.activeIndex == this.slides.length - 1 ) {
			let slideCount = this.activeIndex;
			this.activeIndex = 0;
			for (let i = 0; i < slideCount; i++) this.next();
		}


		this.show();
		if ( this.autoSlide ) this.resetAutoShow();
	}


	next(e){
		if(e) e.preventDefault();

		if ( this.infinite == false ) {
			let isBreak = this.noInfinite('next');
			if ( isBreak ) return;
		}

		this.activeIndex++;
		if ( this.activeIndex >= this.slides.length ) this.activeIndex = 0;

		let maxBaseTransform     = ( this.slides.length - this.slideShowCount ) * this.slides[0].offsetWidth;
		let maxTimelineTransform = ( this.slides.length - this.slideShowCount ) * this.slides[0].offsetHeight;
		let centerIndex = Math.round( this.slideShowCount / 2 );


		// base slide

		if ( this.transform < maxBaseTransform && this.timeline == false ){ //Timeline False

			if ( this.alignCenter && this.activeIndex < centerIndex ){
				// ничего не делаем
			}else{
				this.transform += this.slides[0].offsetWidth;
				this.slidesWrap.style.transform = `translateX(${-this.transform}px)`;
			}

		}


		if ( this.transform < maxTimelineTransform && this.timeline ){ //Timeline True

			if ( this.alignCenter && this.activeIndex < centerIndex ) {
				// ничего не делаем
			}else{
				this.transform += this.slides[0].offsetHeight;
				this.slidesWrap.style.transform = `translateY(${-this.transform}px)`;
			}

		}


		// переход на первый слайд

		if ( this.transform >= maxBaseTransform && this.timeline == false && this.activeIndex == 0 ){
			this.activeIndex = this.slides.length - 1;
			let slideCount = this.activeIndex;

			for (let i = 0; i < slideCount; i++) this.prev();
		}

		if ( this.transform >= maxTimelineTransform && this.timeline && this.activeIndex == 0 ){
			this.activeIndex = this.slides.length - 1;
			let slideCount = this.activeIndex;

			for (let i = 0; i < slideCount; i++) this.prev();
		}


		this.show();
		if ( this.autoSlide ) this.resetAutoShow();

	}


	dotsInit(){
		this.controlsWrap.dots.forEach( (elem, index)=>{

			elem.addEventListener('click', e => {
				e.preventDefault();
				let slideCount = 0;

				if ( index > this.activeIndex ){
					slideCount = index - this.activeIndex;
					for (let i = 0; i < slideCount; i++ ) this.next();
				}
				if( this.activeIndex > index ){
					slideCount = this.activeIndex - index;
					for ( let i = 0; i < slideCount; i++ ) this.prev();
				}

				this.activeIndex = index;
				this.show();

				if ( this.infinite == false && this.controls ) this.checkDisable(this.activeIndex);
				if ( this.autoSlide ) this.resetAutoShow();
			})

		});
	}


	setSlideShowCount(){
		let arr = this.adaptiveConfig

		for (let i = 0; i < arr.length; i++) {
			let windowWidth = window.innerWidth;
			let slideShowCount = arr[i][1];
			let points         = arr[i][0].trim().split('-');

			if ( windowWidth >= points[0] && windowWidth <= points[1] ) {
				this.slideShowCount = slideShowCount;
				break;
			}

		}

		this.slides.forEach( elem =>{
			if ( this.timeline == false ) elem.style.minWidth = `${100 / this.slideShowCount}%`;
			if ( this.timeline ) elem.style.minHeight = `${100 / this.slideShowCount}%`;
		})

	}

	reset(){
		this.activeIndex = 0;
		this.transform   = 0;

		this.slidesWrap.style.transform = 'translate(0)';
		this.show();
	}

}
