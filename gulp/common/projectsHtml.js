let {src, pipe, dest} = require('gulp');
const cached = require('gulp-cached');


function projectsHtml(destPath, server){
	return src('src/projects/**/*.html')
		.pipe( cached('projects_html') )
		.pipe( dest(destPath) )
		.pipe( server.stream() )
}

module.exports = projectsHtml;