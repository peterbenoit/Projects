'use strict';
module.exports = function(grunt) {
	// Default task (if you just run grunt from cmd line)
	grunt.registerTask('default', 'Default Task', function() {
		grunt.log.subhead('!////////////////////////////////////////////////////////////////////////////////////////////////');
		grunt.log.subhead('!/////   GRUNT by default runs without jshint or qunit. Test the build before deployment!   /////');
		grunt.log.subhead('!////////////////////////////////////////////////////////////////////////////////////////////////');
		grunt.log.ok('Loading Plugins...');
	
		// grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-text-replace');
		grunt.loadNpmTasks('grunt-contrib-compress');
		
		grunt.log.ok('Running default task on build: ' + cfg.version());

		// grunt.task.run('clean:production');								// remove folders and files from output folder.
		grunt.task.run('less:production');								// LESS is compiled into the working CSS folder, so has to occur before copy
		grunt.task.run('copy:production');								// copy all files that don't need modified
		grunt.task.run('less:wcms');
		grunt.task.run('uglify');										// compress &|| mangle JS - and save in build output folder
		grunt.task.run('replace');										// remove media query stuff from ie.css	- and save in build output folder
		grunt.task.run('update');										// write dynamically created files - and save in build output folder
		grunt.task.run('compress');										// zip the package and save in build_output/releases folder by default
	});
};