'use strict';

module.exports = {
	options: {
		livereload: false,	//https://github.com/gruntjs/grunt-contrib-watch#live-reloading
		nospawn: true,
		spawn: false
	},
	everything: {
		files: '<%= pkg.directories.src %>/**/*',
		tasks: ['less:production', 'uglify', 'sync']		
	},
	sync: {
		files: '<%= pkg.directories.src %>/**/*',
		tasks: ['sync']
	},
	javascript: {
		files: '<%= pkg.directories.src %>/js/**/*',
		tasks: ['uglify', 'sync']
	},
	less: {
		files: '<%= pkg.directories.src %>/less/**/*',
		tasks: ['less:production', 'sync']	
	}
}