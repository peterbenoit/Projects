'use strict';

module.exports = {
	main: {
		files: [{
			cwd: '<%= pkg.directories.src %>',
			src: ['**'], 
			dest: '<%= pkg.directories.devenv %>'
		}],	
		verbose: true
	}
}