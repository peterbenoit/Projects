'use strict';
module.exports = function(grunt) {
	grunt.registerTask('jsonlint', [], function() {
		grunt.loadNpmTasks('grunt-jsonlint');

		grunt.task.run('jsonlint');
	});
};