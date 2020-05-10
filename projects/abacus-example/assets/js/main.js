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
	var tens    = document.querySelectorAll('.tens-wrap .tens'),
		tensValue = document.querySelectorAll('.tens span'),
		unit    = document.querySelectorAll('.units .unit'),
		unitValue = document.querySelectorAll('.unit span');
		sum     = 0;

	var abacus = {
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
			showSum();
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
			showSum();

		});


	});


//functions

	let score = document.getElementsByClassName('score')[0];

	function showSum(){
		score.innerText = sum;
	}

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

	reset.addEventListener('click', ()=>{
		let activeTens  = document.querySelectorAll('.active-tens'),
			activeUnits = document.querySelectorAll('.active-unit');

		activeTens.forEach( (elem, index)=> elem.classList.remove('active-tens') );
		activeUnits.forEach( (elem, index)=> elem.classList.remove('active-unit') );
		sum = 0;
		showSum();

	});



//Options Style



}