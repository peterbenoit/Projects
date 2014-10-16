'use strict';
/**
 * Replace X with Y. Currently used to remove media query from IE(<8) CSS, and include version info into head.html
 * @type {Object}
 */
module.exports = {
	iecss: {
		src: ['<%= pkg.directories.src %>css/ie.css'],
		dest: ['<%= pkg.directories.dest %>css/ie.css'],
		replacements: [{
			from: /(\/\* START OF MEDIA QUERY WRAPPER \*\/)((.|\n)*)(\/\* END OF MEDIA QUERY WRAPPER \*\/)/,
			to: ''
		}]
	},
	head: {
		src: ['<%= pkg.directories.src %>includes/head.html'],
		dest: ['<%= pkg.directories.dest %>includes/head.html'],
		replacements: [{
			from: /app\.css/,
			to: 'app.css?' + global.cfg.version()
		}, {
			from: /print\.css/,
			to: 'print.css?' + global.cfg.version()
		}
		// }, {
		// 	from: /content="3\.0"/,
		// 	to: 'content="' + global.cfg.version() + '"'
		// }
		]
	}
}
