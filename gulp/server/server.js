let gulp, {src, pipe, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();


const pug2html = require('./includes/pug2html.js');
const css = require('./includes/css.js');
const js  = require('./includes/js.js');




async function startServer(){

	startWatching();
	browserSyncStart();

}



async function startWatching(){

	src([ 'src/**/*', '!src/**/*.pug', '!src/**/*.css', '!src/**/*.js' ])
	.pipe( dest('static/') )

	pug2html();
	css();
	js();


	watch('src/pages/**/*.pug', () => pug2html(browserSync))
	watch('src/**/*.css', () => css(browserSync))
	watch('src/**/*.js',  () => js(browserSync))

}


async function browserSyncStart(){

	browserSync.init({
		server : {
			baseDir : './static/'
		}
	})
}



module.exports = startServer;