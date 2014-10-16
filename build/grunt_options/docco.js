'use strict';

module.exports = {
	debug: {
		src: ['<%= pkg.directories.src %>js/**/*.js'],
		options: {
			output: '<%= pkg.directories.docs %>'
		}
	}
}