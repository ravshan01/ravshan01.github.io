window.onload=()=>{document.querySelector(".preloader-wrap").classList.add("hide"),document.addEventListener("mousedown",(e=>e.preventDefault()));let e=document.querySelector(".column-active").innerText,t=document.querySelector(".row-active").innerText,n=document.querySelector(".theme-active").dataset.value;const o=new App({table:{$tableWrap:".main",$table:".table"},settings:{$themes:".theme"},config:{columnCount:e,rowCount:t,theme:n}});o.init(),window.addEventListener("resize",o.changeTableSize.bind(o))};