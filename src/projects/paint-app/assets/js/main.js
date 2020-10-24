window.onload = function(){

	document.querySelector('.preloader-wrap').style.display = 'none';


	let canv = document.getElementById('canvas');
	let	ctx  = canv.getContext('2d');
	let	isMouseDown = false;
	let	replayDraw  = false;

	canv.style.display = 'block';
	canv.width  = document.documentElement.clientWidth;
	canv.height = document.documentElement.clientHeight;

//Draw

	canv.addEventListener('mousedown', mouseDown);
	canv.addEventListener('touchstart', mouseDown);
	canv.addEventListener('mouseup', mouseUp);
	canv.addEventListener('touchend', mouseUp);
	canv.addEventListener('mousemove', mouseMove);
	canv.addEventListener('touchmove', mouseMove);


	let color      = '#ffffff';
	let	background = '#000000';
	let	lineWidth  = 20;
	let	radius     = lineWidth / 2;
	let	offsetX;
	let	offsetY;

	ctx.lineWidth = lineWidth; 
	canv.style.backgroundColor = background;

	clearCanv();

	
	function mouseDown(){
		isMouseDown = true;
	}

	function mouseUp(){
		isMouseDown = false;

		if ( !replayDraw ) {
			coords.push('mouseup');
			ctx.beginPath();
		}
	}

	function mouseMove(e){
		offsetX = e.offsetX;
		offsetY = e.offsetY;

		if ( typeof(offsetX) == 'undefined' ) {
			offsetX = e.changedTouches[0].clientX;
			offsetY = e.changedTouches[0].clientY;
		}
		if ( isMouseDown && !replayDraw ){
			draw();
			coords.push({
				offsetX:    offsetX,
				offsetY:    offsetY,
				color:      color,
				lineWidth:  lineWidth
			});				
		}
	}


	function clearCanv(){
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.beginPath();
	}

	function draw(){
		ctx.fillStyle   = color;
		ctx.strokeStyle = color;
		ctx.lineWidth   = lineWidth;
		radius          = lineWidth / 2; 

		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(offsetX, offsetY, radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(offsetX, offsetY);
	}




//Clear   Save   Replay

	let clear  = document.querySelector('.clear');
	let	save   = document.querySelector('.save');
	let	replay = document.querySelector('.replay');
	let	coords = [];
	



	clear.addEventListener('click', e => {
		e.preventDefault();
		clearCanv();
		coords = [];
	});

	save.addEventListener('click', e => {
		e.preventDefault();

		sessionStorage.setItem('background', background);
		sessionStorage.setItem('coords', JSON.stringify(coords));

		let saved = document.querySelector('.saved');
		saved.style.visibility = 'visible';
		setTimeout(()=> saved.style.visibility = 'hidden' , 1200);
		ctx.beginPath();
	});


	replay.addEventListener('click', e =>{
		e.preventDefault();
		coords = JSON.parse(sessionStorage.getItem('coords'));

		clearCanv();
		canv.style.backgroundColor = sessionStorage.getItem('background');

		let timer = setInterval( () => {
			replayDraw = true;

			if ( coords.length <= 1 ) {
				replayDraw = false;
				clearInterval(timer);
				ctx.beginPath();

				return;
			}else{
				let opt = coords.shift();
				
					offsetX    = opt.offsetX;
					offsetY    = opt.offsetY;
					color      = opt.color;
					lineWidth  = opt.lineWidth; 
					draw();
			}

			background = sessionStorage.getItem('background');
			colorPalitFunc();
			backgroundPalitFunc();
			widthPalitFunc();


		}, 25);


	})





//Options  -  Color  Background  LineWidth  Eraser	

	let settings        = document.querySelector('.settings');
	let	settingsWrap    = document.querySelector('.settings-wrap');
	let	colorLink       = document.querySelector('.color-link');
	let	colorPalit      = document.querySelectorAll('.color-wrap .color li');
	let	colorPalitSpan  = document.querySelectorAll('.color-wrap .color span');
	let	backgroundLink  = document.querySelector('.background-link');
	let	backgroundPalit = document.querySelectorAll('.background-wrap .background li');
	let	backgroundPalitSpan = document.querySelectorAll('.background-wrap .background span');
	let	widthLink       = document.querySelector('.width-link');
	let	widthPalit      = document.querySelectorAll('.width li');
	let	widthPalitspan  = document.querySelectorAll('.width li span');


	settings.addEventListener('click', (e) => {
		e.preventDefault();
		settings.classList.toggle('settings-active');
		settingsWrap.classList.toggle('settings-wrap-active');
	});


	colorLink.addEventListener('click', showPalit);
	backgroundLink.addEventListener('click', showPalit);
	widthLink.addEventListener('click', showPalit);


	function showPalit(e){
		e.preventDefault();

		if ( this.nextElementSibling ) // nextElementSibling = palit
			this.nextElementSibling.classList.toggle('active-palit');
		else this.nextSibling.classList.toggle('active-palit');
		
		this.childNodes[1].classList.toggle('rotate'); // childNodes = i.fa
	}


	colorPalit.forEach( (elem, index) =>{
		colorFunc(elem, index);
		elem.addEventListener('click', colorActive);
		colorPalitFunc();
	});

	backgroundPalit.forEach( (elem, index)=>{
		colorFunc(elem, index);
		elem.addEventListener('click', backgroundActive);
		backgroundPalitFunc();
	});

	widthPalit.forEach( (elem, index)=>{
		elem.style.width  = '' + widthPalitspan[index].innerText + 'px';
		elem.style.height = '' + widthPalitspan[index].innerText + 'px'; 

		elem.addEventListener('click', widthActive);
		widthPalitFunc();
	});





	function colorFunc(elem, index){ // background Palit
		elem.style.background = colorPalitSpan[index].innerText;
	}


	function colorPalitFunc(){
		let active = document.querySelector('.color-wrap .color li.active');
		if ( active ) active.classList.remove('active');

		colorPalit.forEach( (elem, index)=>{
			if ( color == colorPalitSpan[index].innerText ) elem.classList.add('active');
		});
	}

	function backgroundPalitFunc(){
		let active = document.querySelector('.background-wrap .background li.active');
		if ( active ) active.classList.remove('active');

		backgroundPalit.forEach( (elem, index) =>{
			if ( background == backgroundPalitSpan[index].innerText ) elem.classList.add('active');
		});
	}

	function widthPalitFunc(){
		let active = document.querySelector('.width li.active');
		if ( active ) active.classList.remove('active');

		widthPalit.forEach( (elem, index)=>{
			if ( lineWidth == widthPalitspan[index].innerText ) elem.classList.add('active');
		})
	}



	function colorActive(){
		let active = document.querySelector('.color-wrap .color li.active');
		active.classList.remove('active');
		this.classList.add('active');

		color = this.childNodes[0].innerText;
	}

	function backgroundActive(){
		let active = document.querySelector('.background-wrap .background li.active');
		active.classList.remove('active');
		this.classList.add('active');

		canv.style.backgroundColor = this.childNodes[0].innerText;
		background = this.childNodes[0].innerText;
	}
	
	function widthActive(){
		let active = document.querySelector('.width li.active');
		active.classList.remove('active');
		this.classList.add('active');

		lineWidth = this.childNodes[0].innerText;
	}



}