'use strict';
module.exports = function(grunt) {
	grunt.registerTask('compress', [], function() {
		grunt.loadNpmTasks('grunt-contrib-compress');
		grunt.task.run('compress');
	});
};