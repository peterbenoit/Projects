'use strict';
module.exports = function(grunt) {
	grunt.registerTask('docco', [], function() {
		grunt.loadNpmTasks('grunt-docco');
		grunt.task.run('docco');
	});
};