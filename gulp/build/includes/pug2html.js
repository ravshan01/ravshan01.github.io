let {src, pipe, dest} = require('gulp');
let pug = require('gulp-pug');



async function pug2html(cb){
	return src('src/pages/*.pug')
		.pipe( pug({ pretty : true }) )
		.pipe( dest('build/') )
}

module.exports = pug2html;