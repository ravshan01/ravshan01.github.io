let {src, pipe, dest} = require('gulp')
const pug     = require('gulp-pug');
const plumber = require('gulp-plumber');
const cached  = require('gulp-cached'); 


async function pug2html(destPath = 'static/', devMode = false, server = null, firstCreated = false){

	if ( devMode && firstCreated )
		return src('src/pages/*.pug')
			.pipe( plumber() )
			.pipe( cached('pug') )
			.pipe( pug({ pretty : true }) )
			.pipe( dest(destPath) )


	if ( devMode && firstCreated === false )
		return src('src/pages/*.pug')
			.pipe( plumber() )
			.pipe( cached('pug') )
			.pipe( pug({ pretty : true }) )
			.pipe( dest(destPath) )
			.pipe( server.stream() )
	



	return src('src/pages/*.pug')
		.pipe( pug({ pretty : true }) )
		.pipe( dest(destPath) )
}

module.exports = pug2html;