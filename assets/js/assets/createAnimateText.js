function createAnimateText(domElem, wrap=false){
	
	let $elem  = domElem;
	let text   = $elem.dataset.text;
	let arr    = text.split(',');

	arr.forEach( (elem, index) =>{

		for (let char of elem) {
			let $span = createSpan(char);
			createEventListener($span);
			$elem.append($span)
		}

		if ( index != arr.length - 1 ){
			let $comma = createSpan(',');
			$elem.append($comma);
			createEventListener($comma);
			let  $br = document.createElement('br');
			$elem.append($br)
		}

	});


}

function createSpan(char){
	let $span = document.createElement('span');
	$span.innerText = char;

	return $span;
}

function createEventListener($dom){
	$dom.addEventListener('mouseover', function(){
		
		this.classList.add('text-animate');
		setTimeout( () => this.classList.remove('text-animate'), 1200 );

	})
}