let {src, pipe, dest} = require('gulp');
const terser  = require('gulp-terser');
const plumber = require('gulp-plumber');
const cached  = require('gulp-cached');


async function js(destPath, devMode = false, server){
	if ( devMode )
		return src('src/**/*.js')
			.pipe( plumber() )
			.pipe( cached('js') )
			.pipe( dest(destPath) )
			.pipe( server.stream() )


	return src('src/**/*.js')
		.pipe( cached('js') )
		.pipe( terser() )
		.pipe( dest(destPath) )
}
	

module.exports = js;