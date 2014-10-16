'use strict';
module.exports = function(grunt) {
	grunt.registerTask('replace', [], function() {
		grunt.loadNpmTasks('grunt-text-replace');
		grunt.task.run('replace');
	});
};