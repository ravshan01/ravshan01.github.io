window.onload = () =>{

	const $preloader = document.querySelector('.preloader-wrap');
	$preloader.classList.add('hide');

	document.addEventListener( 'mousedown', e => e.preventDefault() );
	

	let columnCount = document.querySelector('.column-active').innerText;
	let rowCount    = document.querySelector('.row-active').innerText;
	let theme       = document.querySelector('.theme-active').dataset.value;

	const app = new App({
		table : {
			$tableWrap : '.main',
			$table    : '.table'
		},

		settings : {
			$themes: '.theme'
		},

		config : {
			'columnCount' : columnCount,
			'rowCount'    : rowCount,
			'theme'       : theme
		}
	})

	app.init();

	window.addEventListener('resize', app.changeTableSize.bind(app));

}
