let {src, pipe, dest} = require('gulp');
const terser = require('gulp-terser');


async function js(destPath, devMode = false, server){
	if ( devMode )
		return src('src/**/*.js')
			.pipe( dest(destPath) )
			.pipe( server.stream() )


	return src('src/**/*.js')
		.pipe( terser() )
		.pipe( dest(destPath) )
}
	

module.exports = js;