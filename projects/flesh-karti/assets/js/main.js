window.onload = function(){

	bubbly({
		colorStart: '#009FFF',
		colorStop: '#ec2F4B'
	});


//Create units Div
	let unitsDiv = document.querySelectorAll('.units-wrap > div'),
		num = 1;

	unitsDiv.forEach((elem, index)=>{

		if ( index != unitsDiv.length - 1 ) {

			let unitsWrap = document.createElement('div');
			unitsWrap.classList.add('units');
			elem.prepend(unitsWrap);
			for(let i = 0; i < 4; i++ ){

				let div = document.createElement('div');
				div.classList.add('unit');
				let span = document.createElement('span');
				span.innerText = num;
				div.prepend(span);
				unitsWrap.prepend(div);
			}
			num *= 10;

		}
	});

//Reverse .tens > div  and  .units-wrap > div

	var tensDiv     = document.querySelectorAll('.tens-wrap > div'),
		orderTens   = tensDiv.length,
		orderUnits  = orderTens;

	tensDiv.forEach((elem, index)=>{
		if ( index != tensDiv.length - 1 ) {
			elem.style.order = orderTens;
			orderTens-=1;
		}
		else elem.style.order = tensDiv.length + 1
	});

	unitsDiv.forEach((elem, index)=>{
		if ( index != tensDiv.length - 1 ) {
			elem.style.order = orderUnits;
			orderUnits-=1;
		}
		else elem.style.order = tensDiv.length + 1
	});




//Main


	var tens      = document.querySelectorAll('.tens-wrap .tens'),
		tensValue = document.querySelectorAll('.tens span'),
		unit      = document.querySelectorAll('.units .unit'),
		units     = document.querySelectorAll('.units'),
		unitValue = document.querySelectorAll('.unit span'),
		input     = document.querySelector('.score'),
		submit    = document.querySelector('.submit'),
		inputNum  = 0,
		trueDiv   = document.querySelector('.true'),
		falseDiv  = document.querySelector('.false');
		
	let mainNum,
		digit = 2;

	mainNum = randomNumber(digit);
	num = mainNum;
	upAbacus(num);


	submit.addEventListener('click', (e)=>{
		e.preventDefault();
		main();
	})
	input.addEventListener('keydown', (e)=>{
		if ( e.keyCode == 13 ) main();
	});


//Functions

	function main(){
		inputNum = +input.value;

		if ( inputNum == mainNum ) {
			trueDiv.style.visibility = 'visible';
			setTimeout( ()=> trueDiv.style.visibility = 'hidden', 1200 );
		}else{
			falseDiv.classList.add('active');
			falseDiv.style.visibility = 'visible';
			setTimeout( ()=> falseDiv.style.visibility = 'hidden', 1200);
		}

		reset();
		mainNum = randomNumber(digit);
		num = mainNum;
		upAbacus(num);
	}
	


	function randomNumber(digit = 2){
		let funcDigit = 1; 	
		if ( digit == 1 ){
			funcDigit = 10
		}else{
			for (let  i = 0; i < digit; i++) {
				funcDigit *= 10;
			}
		}
		let num = Math.floor( Math.random() * funcDigit );
		return num;
	}

	function upAbacus(numCopy, digitLet = 0){

		let activeNum    = numCopy % 10,
			funcUnits = units[digitLet].querySelectorAll('.unit');
				
		num = Math.floor( num / 10 );

		if ( activeNum >= 5 ) {
			tens[digitLet].classList.add('active-tens');
			activeNum -= 5;
		}
		for (let i = 0; i < activeNum; i++) {
			funcUnits[i].classList.add('active-unit');
		}

		digitLet++;

		if ( digitLet < digit ) return upAbacus(num, digitLet);

	}

	function reset(){
		let activeTens  = document.querySelectorAll('.active-tens'),
			activeUnits = document.querySelectorAll('.active-unit'),
			active      = document.querySelector('.active');

		activeTens.forEach( (elem, index)=> elem.classList.remove('active-tens') );
		activeUnits.forEach( (elem, index)=> elem.classList.remove('active-unit') );
		input.value = '';
	}


//Settings

	var digitLink      = document.querySelector('.digit-link'),
		digits         = document.querySelector('.digits'),
		digitDiv       = digits.querySelectorAll('.digit');

	digitLink.addEventListener('click', (e)=>{
		e.preventDefault();
		digits.classList.toggle('digits-active');
	});
	digitDiv.forEach( elem => elem.addEventListener('click', digitsFunc) );

	function digitsFunc(){
		let digitActive = digits.querySelector('.digit-active');
		digitActive.classList.remove('digit-active');
		this.classList.add('digit-active');
		reset();

		digitLink.innerText = this.innerText;
		digit = +this.innerText;
		mainNum = randomNumber(digit);
		num = mainNum;
		upAbacus(num);
	}


}