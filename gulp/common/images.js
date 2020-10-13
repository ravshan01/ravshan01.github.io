let {src, pipe, dest} = require('gulp');
const plumber = require('gulp-plumber');



async function images(destPath, devMode = false, server = null){

	if ( devMode )
		return src([ 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.ico' ])
			.pipe( plumber() )
			.pipe( dest(destPath) )
			.pipe( server.stream() )


	return src([ 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.ico' ])
		.pipe( dest(destPath) )

}

module.exports = images;
