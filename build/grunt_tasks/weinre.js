'use strict';
module.exports = function(grunt) {
	grunt.registerTask('weinre', [], function() {
		grunt.loadNpmTasks('grunt-weinre');
		grunt.task.run('weinre');
	});	
};