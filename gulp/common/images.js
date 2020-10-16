let {src, pipe, dest} = require('gulp');
const plumber = require('gulp-plumber');
const cached  = require('gulp-cached');



async function images(destPath, devMode = false, server = null, firstCreated = false){

	if ( devMode && firstCreated )
		return src([ 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.ico' ])
			.pipe( plumber() )
			.pipe( cached('images') )
			.pipe( dest(destPath) )


	if ( devMode && firstCreated === false )
		return src([ 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.ico' ])
			.pipe( plumber() )
			.pipe( cached('images') )
			.pipe( dest(destPath) )
			.pipe( server.stream() )



	return src([ 'src/**/*.jpg', 'src/**/.jpeg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.ico' ])
		.pipe( dest(destPath) )
}

module.exports = images;
