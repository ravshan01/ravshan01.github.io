function Player(domString){
	this.$player   = document.querySelector(domString);;
	this.$play     = this.$player.querySelector('.play');
	this.$home     = this.$player.querySelector('.home');
	this.$settingsLink = this.$player.querySelector('.settings');

	this.$game     = this.$player.querySelector('.game');
	this.$number   = this.$player.querySelector('.number');
	this.$input    = this.$player.querySelector('.input');
	this.$response = this.$player.querySelector('.response');
	this.$submit   = this.$player.querySelector('.submit');

	this.$responseDiv      = this.$player.querySelector('.response-div');
	this.$win              = this.$player.querySelector('.win');
	this.$defeat           = this.$player.querySelector('.defeat');
	this.$responseControls = this.$player.querySelector('.response-controls');

	this.$repeat = this.$player.querySelector('.repeat');
	this.$next   = this.$player.querySelector('.next');
	this.$quit   = this.$player.querySelector('.quit');
}

let playerProto = {
	operation   : document.querySelector('.operation .setting-active')   .getAttribute('value'),
	digits      : document.querySelector('.digits .setting-active')      .getAttribute('value'),
	numberCount : document.querySelector('.number-count .setting-active').getAttribute('value'),
	speed       : document.querySelector('.speed .setting-active')       .getAttribute('value'),
	players     : document.querySelector('.players .setting-active')     .getAttribute('value'),
	modes       : document.querySelector('.modes .setting-active')       .getAttribute('value'),

	game      : game,
	reset : reset,
	next  : next,
	quit  : quit,

	randomNum  : randomNum,
	randomColor: randomColor,
	expressionCreate : expressionCreate
}
Player.prototype = playerProto;



// Menu settings

const $nav      = document.querySelector('header');
const $navLinks = document.querySelectorAll('.nav li > a');
const $settings = {
	$operation   : document.querySelectorAll('.operation a'),
	$digits      : document.querySelectorAll('.digits a'),
	$numberCount : document.querySelectorAll('.number-count a'),
	$speed       : document.querySelectorAll('.speed a'),
	$players     : document.querySelectorAll('.players a'),
	$modes       : document.querySelectorAll('.modes a')
}

$navLinks.forEach( elem => elem.addEventListener('click', e => e.preventDefault() ));

for (let elem in $settings) $settings[elem].forEach(elem => elem.addEventListener('click', settingActive) );

let player1 = new Player('.player1');
let player2 = new Player('.player2');
let player3 = new Player('.player3')

// Main
const players = {
	'player1' : player1,
	'player2' : player2,
	'player3' : player3
}



//Player settings

createPlayerSettings();
createEventListener(); //добавление обработчиков событий на меню настроек пользователя
playersInit(); //добавление обработчиков событий

playersReinit(); //редактирование количества игроков

let playersName = document.querySelectorAll('.player-name');
playersName.forEach( (elem) => elem.addEventListener('keydown', (e) =>{
	if (e.keyCode == 13 ) elem.blur()
}))



//Main functions

function playersInit(){

	for (let player in players) {
		let thisPlayer = players[player];

		thisPlayer.$play.addEventListener  ('click', game.bind( thisPlayer ));
		thisPlayer.$submit.addEventListener('click', checkResponse.bind( thisPlayer ));
		thisPlayer.$repeat.addEventListener('click', repeat.bind( thisPlayer ));
		thisPlayer.$next.addEventListener  ('click', next.bind( thisPlayer ));
		thisPlayer.$quit.addEventListener  ('click', quit.bind( thisPlayer ));

		thisPlayer.$response.addEventListener('keydown', e => {
			if ( e.keyCode == 13 ) checkResponse.bind(thisPlayer)();
		})

		thisPlayer.$settingsLink.addEventListener('click', e => {
			e.preventDefault();
			thisPlayer.$home.classList.add('hide');
			thisPlayer.$settingsWrap.classList.add('visible');
		})

		thisPlayer.winCount    = 0;
		thisPlayer.defeatCount = 0;

		thisPlayer.$winImg    = thisPlayer.$player.querySelector('.win-img');
		thisPlayer.$winGif    = thisPlayer.$player.querySelector('.win-gif');
		thisPlayer.$defeatImg = thisPlayer.$player.querySelector('.defeat-img');
		thisPlayer.$defeatGif = thisPlayer.$player.querySelector('.defeat-gif');

		thisPlayer.colors = [];

		thisPlayer.$turboColor = thisPlayer.$player.querySelector('.turbo-color');
	}

}


function game(e){
	if ( e ) e.preventDefault();

	this.$home.classList.add('hide')
	this.$game.classList.add('visible');
	let expression = [];
	let sum = 0;
	let colors = [];
	let colorName = ''; //турбо режим
	let colorActiveName = '';

	if ( this.repeat ){
		expression = this.expression;
		sum = this.response;

		colors      = this.colors;
		colorActive = this.colorActive;
		colorActiveName = this.colorActiveName;
	}else{

		let obj = this.expressionCreate();
		expression = obj.expression;
		sum        = obj.sum;
		colors          = obj.colors;
		colorActive     = obj.colorActive;
		colorActiveName = obj.colorActiveName;

		this.expression = expression;
		this.response   = sum;

		this.colors          = colors;
		this.colorActive     = colorActive;
		this.colorActiveName = colorActiveName;

	}


	if ( this.modes == 'turbo' ){
		this.$turboColor.innerText = colorActiveName;
		this.$turboColor.style.color = colorActive;
		this.$turboColor.classList.add('visible');

		setTimeout( () => this.$turboColor.classList.remove('visible') , this.speed)
	}


	for (let i = 0; i < expression.length; i++ ) setTimeout( () => {
		let color = colors[i]
		this.$number.style.color = color;

		this.$number.innerText = expression[i];
	}, this.speed * i)


	setTimeout( () =>{
		this.$number.classList.add('hide');
		this.$input.classList.add('visible');

		if ( playerProto.players == 1 ) setTimeout( () => players.player1.$response.focus(), 100 ) // без SetTimeOut не работает ???
	}, this.speed * expression.length )

}



function expressionCreate(){
	let expression = [];
	let num = 0;
	let firstNum = this.randomNum();
	if ( this.operation == '-' ) firstNum = this.randomNum('-');

	let sum = firstNum;

	expression.push(firstNum.toString());

	let colorsObj       = this.randomColor();
	let colors          = colorsObj.colors;
	let colorActive     = colorsObj.colorActive;     //для турбо режима
	let colorActiveName = colorsObj.colorActiveName; //для турбо режима

	if ( this.modes == 'turbo' && colorActive != colors[0] ) sum = 0;
	

	for (let i = 1; i < this.numberCount; i++){ // кроме примеров на минус
		num = this.randomNum();
		if ( this.operation == '-' ) num = this.randomNum('-', sum);

		if( num > sum  &&  this.operation == 'randomly' ) {
			if ( (this.modes == 'turbo' && colorActive == colors[i]) || this.modes !== 'turbo' ) sum += num;
			num = '+' + num;
			expression.push(num);
			continue;
		}

		if ( this.operation == 'randomly' ) {
			let randomOperation = Math.random();

			if ( randomOperation >= 0.7 ){
				if ( (this.modes == 'turbo' && colorActive == colors[i]) || this.modes != 'turbo' ) sum += num;
				num = '+' + num;
			}else{
				if ( (this.modes == 'turbo' && colorActive == colors[i]) || this.modes != 'turbo' ) sum -= num;
				num = '-' + num;
			}
		}

		if ( this.operation == '+' ){
			if ( (this.modes == 'turbo' && colorActive == colors[i]) || this.modes != 'turbo' ) sum += num;
			num = '+' + num;
		}
		if ( this.operation == '-' ) {
			if ( (this.modes == 'turbo' && colorActive == colors[i]) || this.modes != 'turbo' ) sum -= num;
			num = '-' + num;
		}

		expression.push(num)
	}

	return {
		'expression' : expression,
		'sum'        : sum,
		'colors'          : colors,
		'colorActive'     : colorActive,
		'colorActiveName' : colorActiveName
	};
}


function checkResponse(e){
	if ( e ) e.preventDefault();

	if ( this.$response.value.trim() == '' ) {
		this.$response.focus();
		return;
	}

	this.$input.classList.remove('visible');
	let response = this.$response.value;


	if ( this.response == response ){
		this.$win.classList.add('display-block');
		this.winCount++;
		this.defeatCount = 0;

		if ( this.winCount > 4 ) this.winCount = 0;
		if ( this.winCount == 4 ){
			this.$winImg.classList.add('display-none');
			this.$winGif.classList.add('display-block')
		}

	}else{
		this.$defeat.classList.add('display-block');
		this.winCount = 0;
		this.defeatCount++;

		if ( this.defeatCount > 4 ) this.defeatCount = 0;
		if ( this.defeatCount == 4 ) {
			this.$defeatImg.classList.add('display-none');
			this.$defeatGif.classList.add('display-block');
		}
	}

	this.$responseDiv.classList.add('visible');
}



function settingActive(e){
	e.preventDefault();

	let value  = this.getAttribute('value');
	let parent = this.parentElement;
	let active = parent.querySelector('.setting-active');
	let property = parent.classList[0];

	active.classList.remove('setting-active');
	this.classList.add('setting-active');

	let isPlayer = false; //определяем была ли общая настройка или отдельного игрока
	let isParent = this.closest('.player-settings');
	if ( isParent != null ) isPlayer = true;

	if ( isPlayer ) {
		let player = isParent.parentNode.classList[1];
		players[player][property] = value;

		players[player].$home.classList.add('hide');
	}


	if ( isPlayer == false ) {
		playerProto[property] = value;
		if ( property == 'players' ) playersReinit();

		//меняем активные элементы в личных настройках игроков
		for(let player in players){
			let thisPlayer = players[player];
			if ( thisPlayer.hasOwnProperty(property) ) break;

			let propertyActiveNode = thisPlayer.$settings['$'+property];
			if ( property != 'players' ){
				propertyActiveNode.forEach(elem => {
					if ( elem.classList[0] == 'setting-active' ) elem.classList.remove('setting-active');
					if ( elem.getAttribute('value') == value ) elem.classList.add('setting-active');
				});
			}

		}
	}

}



function randomNum(operation, sum){ // operation, sum для примеров на минус
	if ( operation == '-' ){
		let num = 0;
		let max = 0;
		let min = 0; // при создании первого числа

		if ( sum != undefined) max = Math.floor( sum * (2 / 3) );
		if ( sum == undefined || sum == 0 ){ // также при турбо режиме
			max = (1 * this.digits * 10) - 1;
			min = Math.floor( max * (1 / 2) );
		}

		for (let i = 0;; i++){
			num = Math.random() * this.digits * 10;
			num = Math.floor(num);
			if ( sum == undefined && num > min && num < max ) break;
			if ( sum != undefined && num < max) break;
		}

		return num;
	}

	let num = Math.random() * this.digits * 10;
	num = Math.floor(num);
	return num
}


function randomColor(){
	let colors = ['red', 'lime', 'magenta', 'blue'];
	let colorsName = ['красный', 'зелёный', 'розовый', 'синий'];
	let responseColors = [];
	let responseColorsName = [];

	for(let i = 0; i < this.numberCount; i++){
		let random =  Math.floor( Math.random() * colors.length );

		responseColors.push( colors[random] );
		responseColorsName.push( colorsName[random] );
	}

	let random      = Math.floor( Math.random() * responseColors.length );
	let colorActive = responseColors[random];
	let colorActiveName = responseColorsName[random];

	if( this.operation == '-' && this.modes == 'turbo' ){
		colorActive     = responseColors[0];
		colorActiveName = responseColorsName[0];
	}

	return {
		'colors'      : responseColors, //для турбо режима
		'colorActive' : colorActive,
		'colorActiveName' : colorActiveName
	}
}



//Other functions

function next(e){
	e.preventDefault();
	this.repeat = false;
	if ( this.modes == 'turbo' ) this.colors = []; //для турбо режима

	this.reset();
	this.game();
}

function repeat(e){
	e.preventDefault();
	this.repeat = true;

	this.reset();
	this.game();
}

function reset(){
	this.$winImg.classList.remove('display-none');
	this.$winGif.classList.remove('display-block');
	this.$win.classList.remove('display-block');

	this.$defeatImg.classList.remove('display-none');
	this.$defeatGif.classList.remove('display-block');
	this.$defeat.classList.remove('display-block');

	this.$responseDiv.classList.remove('visible');
	this.$input.classList.remove('visible');
	this.$number.classList.remove('hide');
	this.$number.innerText = '';
	this.$response.value = '';

	this.$game.classList.remove('visible');
	this.$home.classList.remove('hide');
	this.$settingsWrap.classList.remove('visible');

	this.$turboColor.classList.remove('visible');
}

function quit(e){
	e.preventDefault();
	this.reset();
	this.$home.classList.remove('hide');
}

function playersReinit(){
	let $playersHide = document.querySelectorAll('.player.display-none');
	if ( $playersHide ) $playersHide.forEach(elem => elem.classList.remove('display-none') )

	if ( playerProto.players == 1  ) {
		players.player2.$player.classList.add('display-none');
		players.player3.$player.classList.add('display-none');

		player2.reset();
		player3.reset();
	}
	if ( playerProto.players == 2 ){
		players.player3.$player.classList.add('display-none');
		players.player3.reset();
	}
}



//Player Settings

function createPlayerSettings(){
	let $navCopy = document.querySelector('ul.nav');
	$navCopy     = $navCopy.cloneNode(true);
	$players     = $navCopy.querySelector('.players').parentNode;
	$navCopy.removeChild($players);

	let $settings = document.createElement('div');
	$settings.classList.add('player-settings');
	$settings.prepend($navCopy);

	let $quit = document.createElement('a');
	$quit.classList.add('quit-settings');
	$quit.innerText = 'Закрыть';
	$settings.prepend($quit);

	let $settingsCopy  = $settings.cloneNode(true);
	let $settingsCopy2 = $settings.cloneNode(true);

	players.player1.$player.prepend($settings);
	players.player2.$player.prepend($settingsCopy);
	players.player3.$player.prepend($settingsCopy2);


	for (let player in players) {
		let thisPlayer = players[player];

		thisPlayer.$settingsWrap = thisPlayer.$player.querySelector('.player-settings');
		thisPlayer.$quitSettings = thisPlayer.$player.querySelector('.quit-settings');

		thisPlayer.$settings = {
			$operation   : thisPlayer.$player.querySelectorAll('.operation a'),
			$digits      : thisPlayer.$player.querySelectorAll('.digits a'),
			$numberCount : thisPlayer.$player.querySelectorAll('.number-count a'),
			$speed       : thisPlayer.$player.querySelectorAll('.speed a'),
			$modes       : thisPlayer.$player.querySelectorAll('.modes a')
		}
	}


}


function createEventListener(){

	for (let player in players) {
		let thisPlayer = players[player];
		let $navLinks = thisPlayer.$player.querySelectorAll('.nav li > a');

		thisPlayer.$quitSettings.addEventListener('click', e => {
			e.preventDefault();
			thisPlayer.$settingsWrap.classList.remove('visible')
			thisPlayer.$home.classList.remove('hide');
		})

		$navLinks.forEach(elem => elem.addEventListener('click', e => e.preventDefault()) );

		for(let elem in thisPlayer.$settings) thisPlayer.$settings[elem].forEach( elem => elem.addEventListener('click', settingActive) )
	}
}
