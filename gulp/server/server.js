let gulp, {src, pipe, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

const pug2html = require('../common/pug2html.js');
const images   = require('../common/images.js');
const scss2css = require('../common/scss2css.js');
const js  = require('../common/js.js');



async function server(){
	series(

		parallel(
			() => {	
				return src([ 
						'src/**/*', '!src/**/*.pug', '!src/**/*.scss', '!src/**/*.js', 
						'src/**/*.jpg', 'src/**/*.png', '!src/**/*.svg', 'src/**/*.ico' 
					])
					.pipe( dest('static/') )
			},

			() => images('static/'),
			() => pug2html('static/'),
			() => scss2css('static/assets/css/', true, browserSync), // browserSync передаю иначе будет в null
			() => js('static/')
		),

		startServer
	)()
}



async function startServer(){

	watch('src/**/*.html', () => browserSync.reload() );
	watch([ 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.ico' ], () => images('static/', true, browserSync) )

	watch('src/pages/**/*.pug', () => pug2html('static/', true, browserSync)) // DevMode = true
	watch('src/assets/**/*.scss', () => scss2css('static/assets/css/', true, browserSync)) // DevMode = true
	watch('src/**/*.js',  () => js('static/', true, browserSync))  // DevMode = true

	browserSync.init({
		server : {
			baseDir : './static/'
		}
	})
}



module.exports = server;