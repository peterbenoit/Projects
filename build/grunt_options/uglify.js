'use strict';
/**
 * Minifies and combines JavaScript files.
  * @type {Object}
 */
module.exports = {
	options: {
		preserveComments: 'some',	//will preserve all comments that start with a bang (!) or include a closure compiler style 
		banner: '/*! <%= this.src %> <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Build: <%= version %> */\n',
		sourceMap: true,
		mangle: true
	},
	libs: {
		options: {
			mangle: false
		},
		files: {
			'<%= pkg.directories.dest %>js/libs.min.js': [
				'<%= pkg.directories.src %>js/libs/jquery.js',
				'<%= pkg.directories.src %>js/libs/bootstrap.js',
				'<%= pkg.directories.src %>js/libs/underscore.js',
				'<%= pkg.directories.src %>js/libs/jquery.mediahelpers.js',
				'<%= pkg.directories.src %>js/libs/jquery.mobile.custom.min.js',
				'<%= pkg.directories.src %>js/libs/jquery.cookie.js',
				'<%= pkg.directories.src %>js/libs/media.match.js',
				'<%= pkg.directories.src %>js/libs/enquire.js',
				'<%= pkg.directories.src %>js/libs/moment/moment.min.js',
				'<%= pkg.directories.src %>js/jquery-funcs.js'
			]
		}
	},
	core: {
		files: {
			'<%= pkg.directories.dest %>js/core.min.js': [
				'<%= pkg.directories.src %>js/core.js',
				'<%= pkg.directories.src %>js/global.js',
				'<%= pkg.directories.src %>js/constants.js',
				'<%= pkg.directories.src %>js/dynamic.js'
			]
		}
	},
	dynamic: {
		files: {
			'<%= pkg.directories.dest %>js/modules/dynamic/flexslider.js': '<%= pkg.directories.src %>js/modules/dynamic/flexslider.js',
			'<%= pkg.directories.dest %>js/modules/dynamic/media.js': '<%= pkg.directories.src %>js/modules/dynamic/media.js',
			'<%= pkg.directories.dest %>js/modules/dynamic/mobile.js': '<%= pkg.directories.src %>js/modules/dynamic/mobile.js',
			'<%= pkg.directories.dest %>js/modules/dynamic/audio.js': '<%= pkg.directories.src %>js/modules/dynamic/audio.js',
			'<%= pkg.directories.dest %>js/modules/dynamic/gadgets.js': '<%= pkg.directories.src %>js/modules/dynamic/gadgets.js'
		}
	},
	OADC: {
		files: {
			'<%= pkg.directories.dest %>js/cdc/oadc/cdc.feedback.js': '<%= pkg.directories.src %>js/cdc/oadc/cdc.feedback.js',
			'<%= pkg.directories.dest %>js/cdc/oadc/cdc.formValidation.js': '<%= pkg.directories.src %>js/cdc/oadc/cdc.formValidation.js',
			'<%= pkg.directories.dest %>js/cdc/oadc/cdc.getFeed.js': '<%= pkg.directories.src %>js/cdc/oadc/cdc.getFeed.js'
		}
	},
	modules: {
		files: {
			'<%= pkg.directories.dest %>js/app.min.js': [
				'<%= pkg.directories.src %>js/modules/dynamic/mobile.js',
				'<%= pkg.directories.src %>js/modules/responsive.js',
				'<%= pkg.directories.src %>js/modules/modules.js',
				'<%= pkg.directories.src %>js/modules/breadcrumbs.js',
				'<%= pkg.directories.src %>js/modules/leftnav.js',
				'<%= pkg.directories.src %>js/modules/pageoptions.js',
				'<%= pkg.directories.src %>js/modules/search.js',
				'<%= pkg.directories.src %>js/modules/policy.js',
				'<%= pkg.directories.src %>js/modules/socialmedia.js',
				'<%= pkg.directories.src %>js/modules/gadgets.js',
				'<%= pkg.directories.src %>js/modules/govdelivery.js',
				'<%= pkg.directories.src %>js/app.js'
			]
		}
	},
	metrics : {
		options: {
			mangle: false,
			sourceMap: false
		},				
		files: [{
			expand: true,
			cwd: '<%= pkg.directories.metrics %>',
			src: '**/*.js',
			dest: '<%= pkg.directories.metricsdest %>'
		}]
	}
}