const $preloader  = document.querySelector('.preloader-wrap');

fetch('./file-assets/preloader.html')
.then( response => response.text() )
.then( html => $preloader.innerHTML = html)