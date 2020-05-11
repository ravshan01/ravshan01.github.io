const $h1 = document.querySelector('h1');
createAnimateText($h1);

let $contactLinks = document.querySelectorAll('.contact-links a');
let $contactText  = document.querySelector('.contact-text');

$contactLinks.forEach( elem => elem.addEventListener('click', contactLinkClick) );
// $contactText.addEventListener('mousedown', () => retu)


function contactLinkClick(e){
	e.preventDefault();

	let activeLink = document.querySelector('.button-active');
	if ( activeLink ) activeLink.classList.remove('button-active');

	this.classList.add('button-active');

	let text = this.dataset.text;
	let href = this.getAttribute('href');

	$contactText.innerText = text;
	$contactText.setAttribute('href', href);


}