window.addEventListener('load', ()=>{

	fetch('./file-assets/header.html')
	.then( response => response.text() )
	.then( html => {
		// Initialize the DOM parser
		let parser = new DOMParser();

		let $doc    = parser.parseFromString(html, "text/html");
		let $header = $doc.querySelector('.header-wrap');
		document.body.prepend($header)

	})
	.then( () => {


	// const $preloader = document.querySelector('.preloader-wrap');
	// $preloader.classList.add('hide');


	//определяем активную ссылку в меню

	const $links = document.querySelectorAll('.nav a');
	let isMenuLink = false;

	$links.forEach( elem =>{
		if ( window.location.href == elem.href ){
			elem.classList.add('menu-link-active');
			isMenuLink = true;
		}
	});
	if ( isMenuLink == false ) $links[0].classList.add('menu-link-active');



	// mobile menu

	const $settingsLink = document.querySelector('.settings-link');
	const $header      = document.querySelector('header');

	$settingsLink.addEventListener('click', e => {
		e.preventDefault();
		$header.classList.toggle('translate-0');
		$settingsLink.classList.toggle('settings-link-close');
	})


	})
})
