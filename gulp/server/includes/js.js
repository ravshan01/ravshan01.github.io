let {src, pipe, dest} = require('gulp');


async function js(server){

	return src('src/**/*.js')
		.pipe( dest('static/') )
		.pipe( server.reload() )

}
module.exports = js;