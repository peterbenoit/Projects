'use strict';
module.exports = function(grunt) {
	grunt.registerTask('browsersync', [], function() {
		grunt.loadNpmTasks('grunt-browser-sync');

		grunt.task.run('browserSync');
	});
};