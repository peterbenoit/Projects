'use strict';
module.exports = function(grunt) {
	grunt.registerTask('less', [], function() {
		grunt.loadNpmTasks('grunt-contrib-less');

		if (arguments.length === 0) {
			grunt.task.run('less');
		}
		else {
			var a = arguments[0];
			if(a === 'p' || a === 'prod') { a = 'production'; }
			if(a === 'd' || a === 'dev') { a = 'development'; }
			if(a === 'w') { a = 'wcms'; }
			grunt.task.run('less:' + a);
		}
	});
};