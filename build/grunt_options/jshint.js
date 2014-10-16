'use strict';
// this task will fail if there's a JS error
module.exports = {
	options: {
		globals: {
			jQuery: true,
			console: true,
			module: true,
			'CDC': true,
			'log': true,
			'Modernizr': true,
			'_': true,
			alert: true
		},
		'predef': [
			'_',
			'Modernizr',
			'moment',
			'$',
			'enquire'
		],				
		'smarttabs': true,
		'maxparams': 5,
		'maxdepth': 5,
		'maxstatements': 25,
		'maxcomplexity': 10,
		// 'es5': true,
		'browser': true,
		'boss': false,
		'curly': false,
		'debug': false,
		'devel': false,
		'eqeqeq': true,
		'evil': true,
		'forin': false,
		'immed': true,
		'laxbreak': false,
		'newcap': true,
		'noarg': true,
		'noempty': false,
		'nonew': false,
		'nomen': false,
		'onevar': true,
		'plusplus': false,
		'regexp': false,
		'undef': true,
		'sub': true,
		'strict': false,
		'white': true,
		'unused': true				
	},			
	gf: {
		options: {
			reporter:'jslint',
			reporterOutput: '<%= pkg.directories.errors %>jshint-gruntfile-errors(<%= timeStamp() %>).xml',
		},
		files: { src: ['Gruntfile.js'] },
	},
	modules: {
		options: {
			reporter:'jslint',
			reporterOutput: '<%= pkg.directories.errors %>jshint-modules-errors(<%= timeStamp() %>).xml',
		},
		files: {
			src: ['<%= pkg.directories.src %>js/modules/**.js']
		},
	},
	app: {
		options: {
			reporter:'jslint',
			reporterOutput: '<%= pkg.directories.errors %>jshint-app-errors(<%= timeStamp() %>).xml',
		},
		files: {
			src: 
				['<%= pkg.directories.src %>js/app.js',
				'<%= pkg.directories.src %>js/constants.js',
				'<%= pkg.directories.src %>js/core.js',
				'<%= pkg.directories.src %>js/dynamic.js',
				'<%= pkg.directories.src %>js/global.js',
				'<%= pkg.directories.src %>js/jquery-funcs.js'
				]
		},
	},
}