createAnimateText( document.querySelector('h1') );


let contactsLinks = document.querySelectorAll('.contacts-links a');
let contactsText  = document.querySelector('.contacts-text');
contactsLinks.forEach( elem => elem.addEventListener('click', contactsLinkClick) );


function contactsLinkClick(e){
	e.preventDefault();

	let activeLink = document.querySelector('.button-active');
	if ( activeLink ) activeLink.classList.remove('button-active');
	this.classList.add('button-active');

	let text = this.dataset.text;
	let href = this.getAttribute('href');

	contactsText.innerText = text;
	contactsText.setAttribute('href', href);
}