var __awaiter=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(n,o){function r(e){try{l(i.next(e))}catch(e){o(e)}}function a(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,a)}l((i=i.apply(e,t||[])).next())}))};class App{constructor(e){this.pagesControl=new PagesControl,this.links=new Links,this.settingsControl=new SettingsControl,this.modalControl=new ModalControl,this.timeControl=timeControl,this.colorsControl=new ColorsControl(e.colors),this.planesControl=new PlanesControl,this.imagesControl=new ImagesControl({distinctPlanesCount:e.distinctPlanesCount,colors:e.colors}),this.settings={mode:"",colors:[],roundTime:e.defaultRoundTime?e.defaultRoundTime:30,spawnTime:e.defaultSpawnTime?e.defaultSpawnTime:.5,speed:e.defaultSpeed?e.defaultSpeed:2},this.game={startTimer:document.querySelector(".game-start-timer"),timer:document.querySelector(".game-timer"),scene:document.querySelector(".game-scene"),play:!1,pause:!1,stop:!0,finish:!1}}init(){this.settingsControl.init(this.settings),this.modalControl.init(),this.createEventListener(),this.imagesControl.loadImages()}createEventListener(){this.links.home.startLink.addEventListener("click",(()=>this.pagesControl.openPage("home","modes"))),this.links.home.settingsLink.addEventListener("click",(()=>this.pagesControl.openPage("home","settings"))),this.links.home.helpLink.addEventListener("click",(()=>this.pagesControl.openPage("home","help"))),this.links.settings.home.addEventListener("click",(()=>this.pagesControl.openPage("settings","home"))),this.links.help.home.addEventListener("click",(()=>this.pagesControl.openPage("help","home"))),this.links.modes.home.addEventListener("click",(()=>this.pagesControl.openPage("modes","home"))),this.links.modes.easy.addEventListener("click",(()=>this.startGame("modes","easy"))),this.links.modes.medium.addEventListener("click",(()=>this.startGame("modes","medium"))),this.links.modes.hard.addEventListener("click",(()=>this.startGame("modes","hard"))),this.links.game.pause.addEventListener("click",(()=>this.pauseGame())),this.links.pause.home.addEventListener("click",(()=>this.forceStopGame())),this.links.pause.restart.addEventListener("click",(()=>this.restartGame("pause"))),this.links.pause.continue.addEventListener("click",(()=>this.continueGame())),this.links.gameEnd.home.addEventListener("click",(()=>this.toHome("gameEnd"))),this.links.gameEnd.restart.addEventListener("click",(()=>this.restartGame("gameEnd"))),this.links.gameEnd.next.addEventListener("click",(()=>this.restartGame("gameEnd")))}startGame(e,t){return __awaiter(this,void 0,void 0,(function*(){this.pagesControl.openPage(e,"load"),yield this.imagesControl.checkLoadedImages(),this.pagesControl.openPage("load","game"),this.settings.colors=this.colorsControl.randomColors(t),this.colorsControl.createDOMColors(this.settings.colors);for(let e=0;e<3;e++)setTimeout((()=>this.game.startTimer.innerText=(3-e).toString()),600*e);setTimeout((()=>{this.game.play=!0,this.game.stop=!1,this.settings.mode=t,this.game.startTimer.innerText="";let e=this.preparation();this.loop(e)}),1800)}))}preparation(){let e=(this.settings.roundTime-this.settings.speed)/this.settings.spawnTime,t=this.imagesControl.getImages(e),s=[],i=[],n={};this.settings.colors.forEach((e=>n[e]=0));for(let e=0;e<t.length;e++)s.push(t[e].color),i.push(t[e].image);return this.planesControl.startCreatePlanes({game:this.game,count:e,images:i,speed:this.settings.speed,spawnTime:this.settings.spawnTime}),s.forEach((e=>{this.settings.colors.indexOf(e)>=0&&n[e]++})),n}loop(e){this.timeControl.bind(this.game,this.settings.roundTime)();let t=setInterval((()=>{this.game.finish&&this.finish(e),this.game.stop&&clearInterval(t)}),300)}finish(e){this.pagesControl.openPage("game","response");let t={},s=0;for(let i in e)s++,t[i]={},t[i].div=document.querySelector("#color-div"+s),t[i].input=document.querySelector("#color-input"+s),t[i].div.classList.add(i),t[i].div.closest(".color-input-wrap").classList.add("display-flex");this.links.response.check.onclick=()=>this.checkResult(e,t)}checkResult(e,t){let s={},i=!0;for(let i in e)s[i]=+t[i].input.value;for(let t in s)s[t]!==e[t]&&(i=!1);this.showGameResult(i)}showGameResult(e){this.pagesControl.openPage("response","gameEnd");let t=document.querySelector(".game-end-page .win"),s=document.querySelector(".game-end-page .defeat");e&&t.classList.remove("display-none"),!1===e&&s.classList.remove("display-none")}toHome(e){this.reset(),this.pagesControl.openPage(e,"home")}pauseGame(){this.pagesControl.openPage("game","pause"),this.game.pause=!0}continueGame(){this.pagesControl.openPage("pause","game"),this.game.pause=!1}restartGame(e){this.reset(),this.startGame(e,this.settings.mode)}forceStopGame(){this.reset(),this.pagesControl.openPage("pause","home")}reset(){this.game.play=!1,this.game.pause=!1,this.game.stop=!0,this.game.finish=!1,this.settings.colors=[],this.colorsControl.deleteDOMActiveColors();let e=document.querySelectorAll(".color-div"),t=document.querySelectorAll(".color-input"),s=document.querySelectorAll(".color-input-wrap");e.forEach((e=>e.classList.value="color-div")),t.forEach((e=>e.value="")),s.forEach((e=>e.classList.remove("display-flex")));let i=document.querySelector(".win"),n=document.querySelector(".defeat");i.classList.add("display-none"),n.classList.add("display-none")}}class ColorsControl{constructor(e){this._colors=e,this._DOMColors=document.querySelector(".game-active-colors")}createDOMColors(e){for(let t=0;t<e.length;t++){let s=document.createElement("div");s.classList.add("game-active-color",e[t]),this._DOMColors.append(s)}}deleteDOMActiveColors(){let e=this._DOMColors.querySelectorAll(".game-active-color");e.length>0&&e.forEach((e=>e.remove()))}randomColors(e){let t=[],s=0;switch(e){case"easy":s=1;break;case"medium":s=2;break;case"hard":s=3}for(let e=0;e<s;e++){let e="";for(;e=this._colors[Math.ceil(Math.random()*this._colors.length-1)],!(t.indexOf(e)<0););t.push(e)}return t}}class Links{constructor(){this.home={startLink:document.querySelector(".home-page .start_link"),settingsLink:document.querySelector(".home-page .settings_link"),helpLink:document.querySelector(".home-page .help_link")},this.settings={home:document.querySelector(".settings-page .to-home")},this.help={home:document.querySelector(".help-page .to-home")},this.modes={home:document.querySelector(".modes-page .to-home"),easy:document.querySelector(".easy-mode_link"),medium:document.querySelector(".medium-mode_link"),hard:document.querySelector(".hard-mode_link")},this.game={pause:document.querySelector(".game-page .pause_link")},this.pause={home:document.querySelector(".paused-page .home_link"),restart:document.querySelector(".paused-page .restart_link"),continue:document.querySelector(".paused-page .continue_link")},this.response={check:document.querySelector(".game-response-page .check-colors_link")},this.gameEnd={home:document.querySelector(".game-end-page .home_link"),restart:document.querySelector(".game-end-page .restart_link"),next:document.querySelector(".game-end-page .next_link")}}}class PagesControl{constructor(){this._pages={load:document.querySelector(".load-page"),home:document.querySelector(".home-page"),settings:document.querySelector(".settings-page"),help:document.querySelector(".help-page"),modes:document.querySelector(".modes-page"),game:document.querySelector(".game-page"),pause:document.querySelector(".paused-page"),response:document.querySelector(".game-response-page"),gameEnd:document.querySelector(".game-end-page")},this.openPage=this.openPage.bind(this)}openPage(e,t){this._pages[e].classList.remove("opacity-1"),this._pages[e].classList.add("opacity-0"),this._pages[t].classList.remove("opacity-0"),this._pages[t].classList.add("opacity-1")}}class ImagesControl{constructor(e){this._distinctPlanesCount=e.distinctPlanesCount,this._colors=e.colors,this._imagesLoaded=!1,this._imagesUrl=[],this._images=[];for(let e=0;e<this._distinctPlanesCount;e++){let t={};this._colors.forEach((s=>t[s]=`./assets/images/planes/plane${e+1}/${s}.svg`)),this._imagesUrl.push(t)}}checkLoadedImages(){return new Promise((e=>{setInterval((()=>{this._imagesLoaded&&e()}),50)}))}getImages(e){let t=[];for(let s=0;s<e;s++)t.push(this.getImage());return t}getImage(){let e=Math.ceil(Math.random()*this._distinctPlanesCount-1),t=Math.ceil(Math.random()*this._colors.length-1),s=this._colors[t];return{color:s,image:this._images[e][s].cloneNode(!0)}}loadImages(){let e=[];this._imagesUrl.forEach((t=>{let s={};for(let i in t){let n=new Promise((e=>{let n=new Image;n.classList.add("plane-image"),n.src=t[i],s[i]=n,n.onload=()=>e(n)}));e.push(n)}this._images.push(s)})),Promise.all(e).then((()=>this._imagesLoaded=!0)).catch((()=>this.loadImages()))}}class ModalControl{constructor(){this._modal=document.querySelector(".modal"),this._accept=document.querySelector(".modal .accept"),this._cancel=document.querySelector(".modal .cancel")}init(){this.createEventListener()}createEventListener(){this._accept.addEventListener("click",this.launch.bind(this)),this._cancel.addEventListener("click",this.close.bind(this))}launch(){launchFullScreen(document.documentElement),this.close()}close(){this._modal.style.display="none"}}class Plane{constructor(e,t){this._game=e,this._plane=document.createElement("div"),this._image=t.image,this._directionFrom=Math.random()>=.5?"left":"right",this._speed=t.speed}createDOMElement(){this._plane.append(this._image),this._plane.classList.add("plane"),this._plane.style[this._directionFrom]="-10%",this._plane.style.top=Math.ceil(90*Math.random()).toString()+"%","left"===this._directionFrom&&(this._plane.style.transform="scaleX(-1)")}getDomElement(){return this._plane}fly(){let e=setInterval((()=>{let t=+this._plane.style[this._directionFrom].split("%")[0];this._game.play&&!1===this._game.pause&&(this._plane.style[this._directionFrom]=++t+"%"),(this._game.stop||t>=110)&&(this._plane.remove(),clearInterval(e))}),1e3*this._speed/120)}}class PlanesControl{startCreatePlanes(e){let t=[];for(let s=0;s<e.count;s++)t.push(this.createPlane(e.game,{image:e.images[s],speed:e.speed}));let s=0,i=setInterval((()=>{e.game.play&&!1===e.game.pause&&(e.game.scene.append(t[s].getDomElement()),t[s].fly(),s++),(e.game.stop||s==t.length)&&clearInterval(i)}),1e3*e.spawnTime)}createPlane(e,t){let s=new Plane(e,t);return s.createDOMElement(),s}}class SettingsControl{constructor(){this.settings={},this.roundTimeControl={minus:document.querySelector(".settings-part.round-time .minus"),plus:document.querySelector(".settings-part.round-time .plus"),div:document.querySelector(".settings-part.round-time #round-time-div")},this.spawnTimeControl={minus:document.querySelector(".settings-part.spawn-time .minus"),plus:document.querySelector(".settings-part.spawn-time .plus"),div:document.querySelector(".settings-part.spawn-time #spawn-time-div")},this.speedControl={minus:document.querySelector(".settings-part.speed .minus"),plus:document.querySelector(".settings-part.speed .plus"),div:document.querySelector(".settings-part.speed #speed-div")}}init(e){this.settings=e,this.setDefaultSettings(),this.createEventListener()}createEventListener(){this.roundTimeControl.minus.addEventListener("click",(()=>this.editSettings("roundTime","decrement"))),this.spawnTimeControl.minus.addEventListener("click",(()=>this.editSettings("spawnTime","decrement"))),this.speedControl.minus.addEventListener("click",(()=>this.editSettings("speed","decrement"))),this.roundTimeControl.plus.addEventListener("click",(()=>this.editSettings("roundTime","increment"))),this.spawnTimeControl.plus.addEventListener("click",(()=>this.editSettings("spawnTime","increment"))),this.speedControl.plus.addEventListener("click",(()=>this.editSettings("speed","increment")))}setDefaultSettings(){this.roundTimeControl.div.innerText=this.settings.roundTime,this.spawnTimeControl.div.innerText=this.settings.spawnTime,this.speedControl.div.innerText=this.settings.speed}editSettings(e,t){if("roundTime"===e){let e=+this.roundTimeControl.div.innerText;"increment"===t?e+=1:e-=1,"increment"===t&&e>300&&(e=300),"decrement"===t&&e<10&&(e=10),this.roundTimeControl.div.innerText=e,this.settings.roundTime=e}if("spawnTime"===e||"speed"==e){let s=+this[e+"Control"].div.innerText;"increment"===t?s+=.25:s-=.25,s=Math.ceil(100*s)/100,"increment"===t&&"spawnTime"===e&&s>2&&(s=2),"increment"===t&&"speed"===e&&s>5&&(s=5),"decrement"===t&&"spawnTime"===e&&s<.25&&(s=.25),"decrement"===t&&"speed"===e&&s<.5&&(s=.5),this[e+"Control"].div.innerText=s,this.settings[e]=s}}}function cancelFullScreen(e){e.exitFullscreen?e.exitFullscreen():e.webkitExitRequestFullscreen?e.webkitExitlFullscreen():e.mozExitFullscreen&&e.mozExitFullScreen()}function launchFullScreen(e){e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullscreen&&e.mozRequestFullScreen()}function timeControl(e){let t=e;i.bind(this)();let s=setInterval((()=>{t<=0&&(this.play=!1,this.stop=!0,this.finish=!0,clearInterval(s)),this.play&&!1===this.pause&&i.bind(this)(),this.stop&&(this.timer.innerText="00:00",clearInterval(s))}),1e3);function i(){let s=t>=60?t/60-e%60:0,i=t>=60?t%60:t,n=s>=10?s.toString():"0"+s.toString(),o=i>=10?i.toString():"0"+i.toString();this.timer.innerText=`${n}:${o}`,t--}}