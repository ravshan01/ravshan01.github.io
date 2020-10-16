window.addEventListener('load', () => { 
	window.addEventListener('mousedown', e => e.preventDefault());


	document.querySelector('.preloader').style.display = 'none'; 


	// ***** Navigation *****
	
	const navLinks = document.querySelectorAll('nav a');
	navLinks[0].classList.add('active');

	for (let i = 0; i < navLinks.length; i++){
		if ( window.location.href === navLinks[i].href ) {

			navLinks[0].classList.remove('active')
			navLinks[i].classList.add('active')
			
		}
	}


	
	// ***** Toggle Menu *****

	const toglleMenuLink = document.querySelector('.toggle-menu-link');
	const header = document.querySelector('.header_footer');

	toglleMenuLink.addEventListener('click', () => {
		toglleMenuLink.classList.toggle('toggle-menu-link-close');
		header.classList.toggle('translate-0');
	})



	// ***** Footer *****

	const year = document.querySelector('.current-year');
	year.innerText = new Date().getFullYear();

})