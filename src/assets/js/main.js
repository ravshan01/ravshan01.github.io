window.addEventListener('load', () => { 
	window.addEventListener('mousedown', e => e.preventDefault());

	document.querySelector('.preloader').classList.style.display = 'none'; 



	// ---------- Navigation ----------

	const navLinks = document.querySelectorAll('nav a');
	navLinks[0].classList.add('active-link');

	for (let i = 0; i < navLinks.length; i++){
		if ( window.location.href === navLinks[i] )	navLinks.classList.add('active-link')
	}


	
	// ---------- Toggle Menu ----------

	const toglleMenuLink = document.querySelector('.toggle-menu-link');
	const header = document.querySelector('header');

	toglleMenuLink.addEventListener('click', () => {
		toglleMenuLink.classList.toggle('toggle-menu-link-close');
		header.classList.toggle('translate-0');
	})



	// ---------- Footer ----------

	const year = document.querySelector('.current-year');
	year.innerText = new Date().getFullYear();

})