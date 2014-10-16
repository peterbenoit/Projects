'use strict';
/**
 * Copies files from their source folder to the build destination folder
 * @type {Object}
 */
module.exports = {
	production: {
		files: [
			{
				expand: true,
				cwd: '<%= pkg.directories.src %>',
				src: [
					'fonts/*',
					'css/**',
					// 'css/esp/*',
					// 'css/homepage/*',
					// 'css/lib/**',
					'images/**/*.png',
					'images/**/*.ico',
					'images/**/*.jpg',
					'images/**/*.gif',
					'includes/**/*.html', 
					'js/contrib/**',
					'js/cdc/**',
					'js/modules/dynamic/**',
					'js/libs/modernizr-latest.js',							
					'js/libs/flashmediaelement.swf',
					'js/libs/jquery.fitvids.js',
					'js/libs/jquery.flexslider2.js',
					'js/libs/jquery.watermark.js',
					'js/libs/jquery-ui.js',
					'js/libs/matchmedia.js',
					'js/libs/mediaelement-and-player.min.js',
					'js/libs/jquery-inputmask/**',
					'js/libs/jquery-json/**',
					'js/libs/jquery-validation/**',
					'js/libs/moment/**',
					'js/jslibs.json',
					'js/themes.json',
					'js/icons.json',
					'js/jslibs-jsonp.json',
					'js/themes-jsonp.json',
					'js/icons-jsonp.json',
					'js/json/**',
					'local/**'
				],
				dest: '<%= pkg.directories.dest %>'		
			},
		],	
	},
	dev: {
		files: [
			{
				expand: true,
				cwd: '<%= pkg.directories.src %>',
				src: [
					'fonts/*',
					'css/**',
					'images/**/*.png',
					'images/**/*.ico',
					'images/**/*.jpg',
					'images/**/*.gif',
					'includes/**/*.html', 
					'js/**',
					'modules/**',
					'local/**',
					'Templates/**'
				],
				dest: '<%= pkg.directories.dev %>'		
			},
		],	
	}
}