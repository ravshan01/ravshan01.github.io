let {src, pipe, dest} = require('gulp');
const plumber = require('gulp-plumber');
const cached  = require('gulp-cached');



async function images(destPath, devMode = false, server = null){

	if ( devMode )
		return src([ 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.ico' ])
			.pipe( cached('images') )
			.pipe( plumber() )
			.pipe( dest(destPath) )
			.pipe( server.stream() )


	return src([ 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.ico' ])
		.pipe( cached('images') )
		.pipe( dest(destPath) )

}

module.exports = images;
