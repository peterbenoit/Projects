'use strict';
module.exports = function(grunt) {
	grunt.registerTask('test', [], function() {
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-qunit');

		grunt.task.run(['jshint', 'qunit']);
	});
};