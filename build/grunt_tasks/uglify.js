'use strict';
module.exports = function(grunt) {
	grunt.registerTask('uglify', [], function() {
		grunt.loadNpmTasks('grunt-contrib-uglify');

		if (arguments.length === 0) {
			grunt.task.run('uglify');
		}
		else {
			var a = arguments[0];
			if(a === 'l' || a === 'lib') { a = 'libs'; }
			if(a === 'c') { a = 'core'; }
			if(a === 'm' || a === 'mod') { a = 'modules'; }			
			if(a === 'f' || a === 'flex') { a = 'flexslider'; }			
			if(a === 'med') { a = 'media'; }			
			if(a === 'mob') { a = 'mobile'; }			
			grunt.task.run('uglify:' + a);
		}
	});
};