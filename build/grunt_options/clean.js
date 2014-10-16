'use strict';

module.exports = {
	options: {
		force: true
	},
	production: {
		src: ['<%= pkg.directories.dest %>']
	}
}