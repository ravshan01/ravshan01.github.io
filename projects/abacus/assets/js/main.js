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
		unitValue = document.querySelectorAll('.unit span'),
		scoreDiv  = document.getElementsByClassName('score')[0],
		trueDiv   = document.querySelector('.true'),
		digit     = 10,
		sum       = 0,
		score     = randomNum(digit);

	showScore();
	const abacus = {
		tens,
		tensValue,
		unit,
		unitValue: unitValue
	};


	abacus.tens.forEach( (elem, index)=> {
		elem.addEventListener('click', ()=>{

			elem.classList.toggle('active-tens');
			if ( elem.classList.contains('active-tens') ) {
				sum+= +abacus.tensValue[index].innerText;
			}else{
				sum-= +abacus.tensValue[index].innerText;
			}
			scoreCheck();
		});
	});


	abacus.unit.forEach( (elem, index, arr)=>{
		let units;
		elem.addEventListener('click', ()=>{
			elem.classList.toggle('active-unit');
			if ( elem.classList.contains('active-unit') ) {
				upFunc(elem, index);
			}else{
				downFunc(elem, index);
			}
			scoreCheck();

		});


	});


//functions

	function upFunc(elem, index){

		sum += +abacus.unitValue[index].innerText;
		if ( elem.previousElementSibling ) {
			units = elem.previousElementSibling;
			if ( units.classList.contains('active-unit') ) {
				return false;
			}else{
				units.classList.add('active-unit');
				return upFunc(units, index--);
			}
		}else{
			return false;
		}
	}
	function downFunc(elem, index){

		sum -= +abacus.unitValue[index].innerText;
		if ( elem.nextElementSibling ) {
			units = elem.nextElementSibling;
			if ( units.classList.contains('active-unit') ) {
				units.classList.remove('active-unit');
				return downFunc(units, index++);
			}
		}else{
			return false;
		}
	}

	//Reset
	var reset = document.getElementsByClassName('reset')[0];
	reset.addEventListener('click', resetFunc);

	function resetFunc(){
		let activeTens  = document.querySelectorAll('.active-tens'),
			activeUnits = document.querySelectorAll('.active-unit');

		activeTens.forEach( (elem, index)=> elem.classList.remove('active-tens') );
		activeUnits.forEach( (elem, index)=> elem.classList.remove('active-unit') );
		sum = 0;
	}


//ScoreCheck
	function scoreCheck(){
		if ( score == sum ){

			setTimeout( ()=>{
				trueDiv.classList.add('true-active');
				setTimeout(()=>{
					trueDiv.classList.remove('true-active');
				}, 500);
				resetFunc();
				score = randomNum(digit);
				showScore();
			}, 420)

		}
	}

	function randomNum(digit = 10){
		let num = Math.floor( Math.random() * (digit * 10) );
		if ( num == 0 ){
			return randomNum(digit)
		}else return num;
	}
	function showScore(){
		scoreDiv.innerText = score;
	}
 
//Digits

	var digitLink  = document.querySelector('.digit-link'),
		digits     = document.querySelector('.digits'),
		digitDiv   = document.querySelectorAll('.digit');

	digitLink.addEventListener('click', (e)=>{
		e.preventDefault();
		digits.classList.toggle('digits-active');
	})
	digitDiv.forEach( elem => elem.addEventListener('click', digitFunc) );

	function digitFunc(){
		let digitActive = digits.querySelector('.digit-active');
		digitActive.classList.remove('digit-active');
		this.classList.add('digit-active');
		digitLink.innerText = this.innerText;

		if ( +this.innerText == 1 ) {
			digit = 1;
		}else{
			digit = 1;
			let i = +this.innerText;
			for (let j = 1; j < i; j++) {
				digit *= 10; 
			}
		}
		resetFunc();
		score = randomNum(digit);
		showScore();
	}

}