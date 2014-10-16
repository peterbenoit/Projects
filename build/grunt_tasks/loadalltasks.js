'use strict';
module.exports = function(grunt) {
	grunt.registerTask('loadAllTasks', [], function() {

		console.log(grunt.cli.tasks);
		console.log(target);	//--target=production

		Object.keys(require('./package.json').devDependencies).forEach(function(dep) {
			if(dep.substring(0,5) !== 'grunt' || dep.substring(0,6) === 'grunt-') {
				//grunt.loadNpmTasks(dep);
				console.log(dep)
			}
		});
	});
};