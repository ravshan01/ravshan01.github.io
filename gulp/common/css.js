let {src, pipe, dest} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');



async function css(destPath, devMode = false, server = null){	
	if ( devMode ) {

		return src('src/**/*.css')
			.pipe( autoprefixer({
				'overrideBrowserslist' : ['last 3 versions'],
				'cascade' : false
			}) )
			.pipe( dest(destPath) )
			.pipe( server.stream() )
	}


	return src('src/**/*.css')
		.pipe( autoprefixer({
			'overrideBrowserslist' : ['last 3 versions'],
			'cascade' : false
		}) )
		.pipe( cleanCss() )
		.pipe( dest(destPath) )
}



module.exports = css;