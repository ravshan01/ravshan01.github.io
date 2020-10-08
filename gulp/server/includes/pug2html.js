let {src, pipe, dest} = require('gulp')
const pug = require('gulp-pug');


async function pug2html(server){

	return src('src/pages/*.pug')
		.pipe( pug({ pretty : true }) )
		.pipe( dest('static/') )
		.pipe( server.reload() )

}
module.exports = pug2html;