let gulp, {src, pipe, dest, watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');

const pug2html = require('../common/pug2html.js');
const images   = require('../common/images.js');
const scss2css = require('../common/scss2css.js');
const css = require('../common/css.js');
const js  = require('../common/js.js');



async function server(){
	series(
		() => del('static/'),

		parallel(
			() => {	
				return src([ 
						'src/**/*', '!src/{pages,pages/**/*}', '!src/**/*.css', '!src/assets/{scss,scss/**/*}', '!src/**/*.js', 
						'!src/**/*.jpg', '!src/**/*.jpeg', '!src/**/*.png', '!src/**/*.svg', '!src/**/*.ico' 
					])
					.pipe( dest('static/') )
			},

			() => pug2html('static/', true, browserSync, true),
			() => images('static/', true, browserSync, true),
			() => js('static/', true, browserSync, true),

			series(
				() => css('static/', true, browserSync, true),
				() => scss2css('static/assets/css/', true, browserSync, true)
			)
		),

		startServer
	)()
}



async function startServer(){

	watch('src/**/*.html', () => browserSync.reload() );
	watch([ 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.ico' ], () => images('static/', true, browserSync) )

	watch('src/pages/**/*.pug', () => pug2html('static/', true, browserSync))
	watch('src/assets/**/*.scss', () => scss2css('static/assets/css/', true, browserSync))
	watch('src/**/*.css',  () => css('static/', true, browserSync) )
	watch('src/**/*.js',  () => js('static/', true, browserSync))

	browserSync.init({
		server : {
			baseDir : './static/'
		}
	})
}



module.exports = server;