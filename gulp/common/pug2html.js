let {src, pipe, dest} = require('gulp')
const pug     = require('gulp-pug');
const plumber = require('gulp-plumber');


async function pug2html(destPath, devMode = false, server){

	if ( devMode ){
		return src('src/pages/*.pug')
			.pipe( plumber() )
			.pipe( pug({ pretty : true }) )
			.pipe( dest(destPath) )
			.pipe( server.stream() )
	}


	return src('src/pages/*.pug')
		.pipe( pug({ pretty : true }) )
		.pipe( dest(destPath) )
}



module.exports = pug2html;