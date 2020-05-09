window.addEventListener('load', ()=>{

const $preloader  = document.querySelector('.preloader-wrap');
const $headerWrap = document.querySelector('.header-wrap'); 

fetch('./file-assets/preloader.html')
.then( response => response.text() )
.then( html => $preloader.innerHTML = html)


fetch('./file-assets/header.html')
.then( response => response.text() )
.then( html => $headerWrap.innerHTML = html)
.then( () =>{

	$preloader.classList.add('hide');

	window.addEventListener('mousedown', e => e.preventDefault())





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