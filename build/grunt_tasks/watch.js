'use strict';
module.exports = function(grunt) {
	grunt.registerTask('watch', [], function() {
		grunt.loadNpmTasks('grunt-contrib-watch');

		if (arguments.length === 0) {
			grunt.task.run('watch:everything');
		}
		else {
			var a = arguments[0];
			if(a === 'p' || a === 'prod' || a === 'e') { a = 'everything'; }
			if(a === 'j' || a === 'js') { a = 'javascript'; }
			if(a === 'l') { a = 'less'; }
			if(a === 's') { a = 'sync'; }
			grunt.task.run('watch:' + a);
		}			
	});
};