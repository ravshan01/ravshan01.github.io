let {src, pipe, dest} = require('gulp');
let autoprefixer = require('gulp-autoprefixer');



async function css(server){
	return src('src/**/*.css')

		.pipe( autoprefixer({
			'overrideBrowserslist' : ['last 3 versions'],
			'cascade' : false
		}) )
		.pipe( dest('static/') )
		.pipe( server.stream() )

}

module.exports = css;