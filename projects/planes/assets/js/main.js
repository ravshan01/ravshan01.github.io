window.addEventListener("load",(()=>{document.querySelector(".preloader-wrap").style.display="none";new App({distinctPlanesCount:5,colors:["black","blue","green","pink","orange"],settings:{roundTime:{min:15,max:120,default:30},spawnTime:{min:.25,max:1.5,default:.75},speed:{min:.5,max:2,default:1.5}}}).init()}));