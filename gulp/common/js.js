let {src, pipe, dest} = require('gulp');
const terser  = require('gulp-terser');
const plumber = require('gulp-plumber'); 


async function js(destPath, devMode = false, server){
	if ( devMode )
		return src('src/**/*.js')
			.pipe( plumber() )
			.pipe( dest(destPath) )
			.pipe( server.stream() )


	return src('src/**/*.js')
		.pipe( terser() )
		.pipe( dest(destPath) )
}
	

module.exports = js;