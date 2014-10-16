'use strict';

module.exports = {
	development: {
		options: {
			paths: ['css'],
			ieCompat: true,		//Enforce the css output is compatible with Internet Explorer 8.  (scary)
			compress: false,	//Compress output by removing some whitespaces.
			cleancss: false		//Compress output using clean-css.
		},
		files: {
			'<%= pkg.directories.src %>css/app.css': '<%= pkg.directories.src %>less/app.less',
			'<%= pkg.directories.src %>css/bb.css': '<%= pkg.directories.src %>less/bb.less',
			'<%= pkg.directories.src %>css/wintablet.css': '<%= pkg.directories.src %>less/wintablet.less',
			'<%= pkg.directories.src %>css/carousel.css': '<%= pkg.directories.src %>less/carousel.less',
			'<%= pkg.directories.src %>css/flexslider.css': '<%= pkg.directories.src %>less/flexslider.less',
			'<%= pkg.directories.src %>css/ie.css': '<%= pkg.directories.src %>less/ie.less',
			'<%= pkg.directories.src %>css/jquery-ui.css': '<%= pkg.directories.src %>less/jquery-ui.less',
			'<%= pkg.directories.src %>css/mobile.css': '<%= pkg.directories.src %>less/mobile.less',
			// '<%= pkg.directories.src %>css/noscript.css': '<%= pkg.directories.src %>less/noscript.less',
			'<%= pkg.directories.src %>css/a2z-index.css': '<%= pkg.directories.src %>less/a2z-index.less',
			'<%= pkg.directories.src %>css/print.css': '<%= pkg.directories.src %>less/print.less',
			'<%= pkg.directories.src %>css/email-link.css': '<%= pkg.directories.src %>less/email-link.less',
			'<%= pkg.directories.src %>css/search-results.css': '<%= pkg.directories.src %>less/search-results.less'
		}
	},
	production: {
		options: {
			paths: ['css'],
			ieCompat: true,		//Enforce the css output is compatible with Internet Explorer 8.  (scary)
			compress: true,		//Compress output by removing some whitespaces.
			cleancss: true		//Compress output using clean-css.
		}, // idea is that copy task will move these files for production...
		files: {
			'<%= pkg.directories.src %>css/app.css': '<%= pkg.directories.src %>less/app.less',
			'<%= pkg.directories.src %>css/bb.css': '<%= pkg.directories.src %>less/bb.less',
			'<%= pkg.directories.src %>css/wintablet.css': '<%= pkg.directories.src %>less/wintablet.less',
			'<%= pkg.directories.src %>css/carousel.css': '<%= pkg.directories.src %>less/carousel.less',
			'<%= pkg.directories.src %>css/flexslider.css': '<%= pkg.directories.src %>less/flexslider.less',
			'<%= pkg.directories.src %>css/ie.css': '<%= pkg.directories.src %>less/ie.less',
			'<%= pkg.directories.src %>css/jquery-ui.css': '<%= pkg.directories.src %>less/jquery-ui.less',
			'<%= pkg.directories.src %>css/mobile.css': '<%= pkg.directories.src %>less/mobile.less',
			// '<%= pkg.directories.src %>css/noscript.css': '<%= pkg.directories.src %>less/noscript.less',
			'<%= pkg.directories.src %>css/a2z-index.css': '<%= pkg.directories.src %>less/a2z-index.less',
			'<%= pkg.directories.src %>css/print.css': '<%= pkg.directories.src %>less/print.less',
			'<%= pkg.directories.src %>css/email-link.css': '<%= pkg.directories.src %>less/email-link.less',
			'<%= pkg.directories.src %>css/search-results.css': '<%= pkg.directories.src %>less/search-results.less'					
			// '<%= pkg.directories.dest %>css/app.css': '<%= pkg.directories.src %>less/app.less',
			// '<%= pkg.directories.dest %>css/bb.css': '<%= pkg.directories.src %>less/bb.less',
			// '<%= pkg.directories.dest %>css/wintablet.css': '<%= pkg.directories.src %>less/wintablet.less',
			// '<%= pkg.directories.dest %>css/carousel.css': '<%= pkg.directories.src %>less/carousel.less',
			// '<%= pkg.directories.dest %>css/flexslider.css': '<%= pkg.directories.src %>less/flexslider.less',
			// '<%= pkg.directories.dest %>css/ie.css': '<%= pkg.directories.src %>less/ie.less',
			// '<%= pkg.directories.dest %>css/jquery-ui.css': '<%= pkg.directories.src %>less/jquery-ui.less',
			// '<%= pkg.directories.dest %>css/mobile.css': '<%= pkg.directories.src %>less/mobile.less',
			// // '<%= pkg.directories.dest %>css/noscript.css': '<%= pkg.directories.src %>less/noscript.less',
			// '<%= pkg.directories.dest %>css/a2z-index.css': '<%= pkg.directories.src %>less/a2z-index.less',
			// '<%= pkg.directories.dest %>css/print.css': '<%= pkg.directories.src %>less/print.less',
			// '<%= pkg.directories.dest %>css/email-link.css': '<%= pkg.directories.src %>less/email-link.less',
			// '<%= pkg.directories.dest %>css/search-results.css': '<%= pkg.directories.src %>less/search-results.less'
		}
	},
	// this is the only LESS routine which outputs to the build folder
	wcms: {
		options: {
			paths: ['css'],
			ieCompat: true,		//Enforce the css output is compatible with Internet Explorer 8.  (scary)
			compress: true,		//Compress output by removing some whitespaces.
			cleancss: true		//Compress output using clean-css.
		},
		files: {
			'<%= pkg.directories.dest %>css/sprites.css': '<%= pkg.directories.src %>less/sprites.less'
		}							
	}
}