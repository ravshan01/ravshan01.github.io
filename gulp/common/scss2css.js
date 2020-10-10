let {src, pipe, dest} = require('gulp');
const plumber = require('gulp-plumber');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss     = require('gulp-clean-css');

sass.compiler = require('node-sass');



async function scss2css(destPath, devMode = false, server = null){	
	if ( devMode ) {

		return src('src/assets/scss/*.scss')
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( sass() )
			.pipe( sourcemaps.write() )
			.pipe( plumber.stop() )
			.pipe( dest(destPath) )
			.pipe( server.stream() )

	}


	return src('src/assets/scss/*.scss')
		.pipe( sass() )
		.pipe( autoprefixer({
			'overrideBrowserslist' : ['last 3 versions'],
			'cascade' : false
		}) )
		.pipe( cleanCss() )
		.pipe( dest(destPath) )
}


module.exports = scss2css;