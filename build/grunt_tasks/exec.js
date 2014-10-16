'use strict';
module.exports = function(grunt) {
	grunt.registerTask('exec', [], function() {
		grunt.loadNpmTasks('grunt-exec');
		grunt.task.run('exec:list_all_files');
	});
};