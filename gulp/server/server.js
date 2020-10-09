let gulp, {src, pipe, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();


const pug2html = require('../common/pug2html.js');
const css = require('../common/css.js');
const js  = require('../common/js.js');




async function startServer(){

	src([ 'src/**/*', '!src/**/*.pug', '!src/**/*.css', '!src/**/*.js' ])
	.pipe( dest('static/') )

	pug2html('static/');
	css('static/', true, browserSync);
	js('static/');


	watcher() 
	browserSyncStart()
}



async function watcher(){

	watch('src/pages/**/*.pug', () => pug2html('static/', true, browserSync)) // DevMode = true
	watch('src/**/*.css', () => css('static/', true, browserSync)) // DevMode = true
	watch('src/**/*.js',  () => js('static/', true, browserSync))  // DevMode = true

}


async function browserSyncStart(){

	browserSync.init({
		server : {
			baseDir : './static/'
		}
	})
}



module.exports = startServer;