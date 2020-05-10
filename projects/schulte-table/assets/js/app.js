class App{
	constructor(obj){

		this.isPlay = false;
		this.table = {
			$tableWrap :
				obj.table.$tableWrap ? document.querySelector(obj.table.$tableWrap) : document.querySelector('.table-wrap'),
			$table :
				obj.table.$table ? document.querySelector(obj.table.$table) : document.querySelector('.table'),

			$play  : document.querySelector('.play'),
			$stop  : document.querySelector('.stop'),
			$time  : document.querySelector('.time'),
			$win   : document.querySelector('.win'),
			$winTime : document.querySelector('.win-time'),

			seconds : 0,
			minutes : 0,
			time    : '',

			activeNum : 1,
			maxNum    : 0,

		}


		this.settings = {
			$settings     :
				obj.settings.$settings ? document.querySelector(obj.settings.$settings) : document.querySelector('.settings'),
			$settingsLink :
				obj.settings.$settingsLink ? document.querySelector(obj.settings.$settingsLink) : document.querySelector('.settings-link'),

			$play : document.querySelector('.start'),
			$stop : document.querySelector('.stop'),

			$info     : document.querySelector('.info'),
			$infoLink : document.querySelector('.info-link'),
			$infoText : document.querySelector('.info-text'),

			$columns  : document.querySelectorAll('.columns a'),
			$rows     : document.querySelectorAll('.rows a'),

			$themes : document.querySelectorAll('.theme')
		}


		this.config = {
			columnCount : obj.config.columnCount ? obj.config.columnCount : 5,
			rowCount    : obj.config.rowCount ? obj.config.rowCount : 5,
			theme       : obj.config.theme ? obj.config.theme : 'bg-blue'
		}

	}


	init(){
		this.changeTableSize();
		this.changeTableClass();
		this.createTableCells();
		this.createEventListener();
		this.changeTheme();
	}

	reInit(e){
		if (e) e.preventDefault();

		this.reset();
		this.changeTableClass();
		this.createTableCells();
	}


	play(e) {
		if (e) e.preventDefault();
		if ( this.isPlay == true ) return false;

		this.table.$play.classList.add('scale-0');
		this.table.$stop.classList.add('scale-1');

		this.isPlay = true;
		this.time.bind(this)();
		this.timer = setInterval( this.time.bind(this), 1000);
	}

	reset(e){

		this.table.$table.innerHTML = '';
		this.table.$play.classList.remove('scale-0');
		this.table.$stop.classList.remove('scale-1');

		this.isPlay = false;
		this.table.seconds = 0;
		this.table.minutes = 0;
		this.table.time    = '00:00';
		this.table.$time.innerText = '00:00'
		this.table.activeNum = 1;

		clearInterval(this.timer);

	}

	end(){
		this.table.$win.classList.add('visible');
		this.table.$winTime.innerText = this.table.time;

		setTimeout( () => this.table.$win.classList.remove('visible'), 3500 );

		this.reInit();
	}




	// table


	createTableCells(){

		let cellCount = this.config.columnCount * this.config.rowCount;
		let numbers   = this.createNumbers(cellCount);
		this.table.maxNum = cellCount;

		for (let i = 0; i < cellCount; i++){

			let $cell = document.createElement('div');
			$cell.innerText = numbers[i];
			$cell.classList.add('cell');
			$cell.addEventListener('click', this.cellClick.bind(this))
			this.table.$table.append($cell);

		}

	}


	cellClick(e){
		if ( this.isPlay == false ) return false;

		let cell = e.target;
		let num  = +cell.innerText;

		let obj = this.checkCorrectNum(num);
		let correct = obj.correct;
		let end     = obj.end;

		let cellClass = 'green';
		if ( correct == false ) cellClass = 'red';
		cell.classList.add(cellClass);
		setTimeout( () => cell.classList.remove(cellClass) , 1400)

		if ( end ) this.end();

	}


	checkCorrectNum(num) {

		let obj = {
			correct : false,
			end     : false
		};

		let activeNum = this.table.activeNum;

		if ( num == activeNum ){
			obj.correct = true;
			this.table.activeNum++;
		}
		if ( num == this.table.maxNum && num == activeNum ) obj.end = true;

		return obj;

	}


	changeTableSize(){
		let $tableWrap = this.table.$tableWrap;

		let $tableWrapWidth  = $tableWrap.offsetWidth;
		let $tableWrapHeight = $tableWrap.offsetHeight;

		let width   = '';
		let height  = '';

		if ( $tableWrapWidth > $tableWrapHeight ) width = height = $tableWrapHeight - 70 + 'px';
		if ( $tableWrapWidth < $tableWrapHeight ) width = height = $tableWrapWidth  - 70 + 'px';

		this.table.$table.style.width  = width;
		this.table.$table.style.height = height;
	}



	// other functions

	createEventListener(){

		this.settings.$columns.forEach( elem => elem.addEventListener( 'click', this.changeColumnClick.bind(this) ));
		this.settings.$rows.forEach( elem => elem.addEventListener( 'click', this.changeRowClick.bind(this) ));

		this.table.$play .addEventListener( 'click', this.play.bind(this) );
		this.table.$stop.addEventListener( 'click', this.reInit.bind(this) );

		this.settings.$settingsLink.addEventListener('click', this.toggleShowSettings.bind(this) );
		this.settings.$themes.forEach( elem => elem.addEventListener( 'click', this.changeTheme.bind(this) ));

		this.settings.$infoLink.addEventListener('click', e => {
			e.preventDefault();
			this.settings.$infoText.classList.toggle('visible');
		})

	}


	changeColumnClick(e) {
		if (e) e.preventDefault();

		let $columnActive = document.querySelector('.column-active');
		$columnActive.classList.remove('column-active');

		let $cell = e.target;
		$cell.classList.add('column-active');

		this.config.columnCount = +$cell.innerText;
		this.reInit.bind(this)();
	}

	changeRowClick(e) {
		if (e) e.preventDefault();

		let $rowActive = document.querySelector('.row-active');
		$rowActive.classList.remove('row-active');

		let $cell = e.target;
		$cell.classList.add('row-active');

		this.config.rowCount = +$cell.innerText;
		this.reInit.bind(this)();
	}


	time(){
		let seconds = '';
		let minutes = '';
		let time    = '';

		this.table.seconds++;
		if ( this.table.seconds >=60 ){
			this.table.seconds = 0;
			this.table.minutes++;
		}

		seconds = this.table.seconds >= 10 ? this.table.seconds.toString() : '0' + this.table.seconds;
		minutes = this.table.minutes >= 10 ? this.table.minutes.toString() : '0' + this.table.minutes;
		time    = minutes + ':' + seconds;

		this.table.time = time;
		this.table.$time.innerText = time;

	}

	createNumbers(cellCount){
		let max = cellCount;
		let numbers = [];

		for (let i = 0; i < max; i++){
			let num   = 0;
			let isset = false;

			while( isset == false ){
				num = Math.ceil( Math.random() * max );
				if ( numbers.indexOf(num) == -1 ) isset = true;
			}

			numbers.push(num)
		}
		return numbers;
	}

	changeTableClass(){
		let table = this.table.$table;
		table.classList.value = '';

		table.classList.add('table');
		table.classList.add('grid-col-' + this.config.columnCount);
		table.classList.add('grid-row-' + this.config.rowCount);
	}

	toggleShowSettings(e){
		if (e) e.preventDefault();
		this.settings.$settings.classList.toggle('translate-0');
	}

	changeTheme(e){
		let theme;
		if (!e) theme = this.config.theme;

		if (e){
			let $theme = e.target;
			theme = $theme.dataset.value;
			this.config.theme = theme;

			let $themeActive = document.querySelector('.theme-active');
			$themeActive.classList.remove('theme-active');
			$theme.classList.add('theme-active');
		}

		document.body.classList.value = '';
		document.body.classList.add(theme);
	}


}
