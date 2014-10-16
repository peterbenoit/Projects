'use strict';
module.exports = function(grunt) {
	grunt.registerTask('sync', [], function() {
		grunt.loadNpmTasks('grunt-sync');	

		if (arguments.length === 0) {
			grunt.task.run('sync');
		}
		// else {
		// 	var a = arguments[0];
		// 	if(a === 'p' || a === 'prod') { a = 'production'; }
		// 	if(a === 'd' || a === 'dev') { a = 'development'; }
		// 	grunt.task.run('watch:' + a);
		// }			
	});
};