let {src, pipe, dest} = require('gulp');
const terser  = require('gulp-terser');
const plumber = require('gulp-plumber');
const cached  = require('gulp-cached');


async function js(destPath, devMode = false, server = null, firstCreated = false){

	if ( devMode && firstCreated )
		return src('src/**/*.js')
			.pipe( plumber() )
			.pipe( cached('js') )
			.pipe( dest(destPath) )


	if ( devMode && firstCreated === false )
		return src('src/**/*.js')
			.pipe( plumber() )
			.pipe( cached('js') )
			.pipe( dest(destPath) )
			.pipe( server.stream() )



	src([ 'src/**/*.js', '!src/**/main.js'])
		.pipe( terser() )
		.pipe( dest(destPath) )
	src('src/**/main.js')
		.pipe( dest(destPath) )
}
	

module.exports = js;