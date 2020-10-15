let {src, pipe, dest} = require('gulp');
const plumber = require('gulp-plumber'); 
const cached  = require('gulp-cached');
const autoprefixer = require('gulp-autoprefixer');


async function css(destPath, devMode = false, server = null, firstCreated = false){

	if ( devMode && firstCreated ){
		return src('src/**/*.css')
			.pipe( cached('css') )
			.pipe( dest(destPath) )
	}

	if ( devMode && firstCreated === false ) {
		return src('src/**/*.css')
			.pipe( plumber() )
			.pipe( cached('css') )
			.pipe( dest(destPath) )
			.pipe( server.stream() )
	}



	return src('src/**/*.css')
		.pipe( cached('css') )
		.pipe( autoprefixer() )
		.pipe( dest(destPath) )
} 

module.exports = css;