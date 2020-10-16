let gulp, {src, pipe, dest, series, parallel} = require('gulp');
const del = require('del');

const images   = require('../common/images.js'); 
const pug2html = require('../common/pug2html.js');
const scss2css = require('../common/scss2css.js');
const css = require('../common/css.js');
const js  = require('../common/js.js');



async function build(){
	series(
		() => del('build/'),

		parallel(
			() => {
				return src([
						'src/**/*', 'src/**/*.htaccess', '!src/{pages,pages/**/*}', '!src/assets/{scss,scss/**/*}', '!src/**/*.css', '!src/**/*.js',
						'!src/**/*.jpg', '!src/**/*.jpeg', '!src/**/*.png', '!src/**/*.svg', '!src/**/*.ico'
					])
					.pipe( dest('build/') )
			},

			() => images('build/'),
			() => pug2html('build/'),
			() => js('build/'),

			series(
				() => css('build/'),
				() => scss2css('build/assets/css')
			)
		)

	)()
}


module.exports = build;