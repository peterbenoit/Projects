'use strict';
module.exports = function(grunt) {
	grunt.registerTask('jshint', [], function() {
		grunt.loadNpmTasks('grunt-contrib-jshint');

		if (arguments.length === 0) {
			grunt.task.run('jshint');
		}
		else {
			var a = arguments[0];
			if(a === 'a') { a = 'app'; }
			if(a === 'm' || a === 'mod') { a = 'modules'; }
			if(a === 'g') { a = 'gf'; }			
			grunt.task.run('jshint:' + a);
		}
	});
};