module.exports = function(grunt) {
	var cfg = {
		pkg: grunt.file.readJSON('package.json'),
		version: function() {
			// {build} -> {major}.{minor}.{point}
			//CDC_TemplatePackage_{build}_RC{RCNumber}
			var rc = parseInt(this.pkg.releaseCandidate) || 0,
				build = this.pkg.majorVersion + '.' + this.pkg.minorVersion + '.' + this.pkg.buildVersion;

			// append the RC number if it exists
			if(rc) {
				build += '.' + rc;
			}

			return build;	
		},
	};
	grunt.initConfig({
		pkg: cfg.pkg,
		src: '<%= grunt.task.current.file.src %>',
		version: cfg.version(),
		time: function () {
			var t = new Date().getTime() / 1000,
			h = parseInt(t / 3600) % 24,
			m = parseInt(t / 60) % 60,
			s = parseInt(t % 60, 10);

			return h + '-' + m + '-' + s;
		},
		timeStamp: function () {
			return new Date().getTime();	// Date.now()
		},
		uglify: {
			options: {
				preserveComments: 'some',	//will preserve all comments that start with a bang (!) or include a closure compiler style 
				banner: '/*! <%= this.src %> <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Build: <%= version %> */\n'
			},
			libs: {
				options: {
					preserveComments: 'some'
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
			// modernizr: {
			// 	options: {
			// 		preserveComments: 'some'	
			// 	},
			// 	files: {
			// 		'<%= pkg.directories.src %>js/libs/modernizr-latest.js': ['<%= pkg.directories.dest %>js/libs/modernizr.js']		// just so we don't have to update the include...
			// 	}
			// },
			core: {
				options: {
					mangle: true	//reduce names of local variables to (usually) single-letters
				},
				files: {
					'<%= pkg.directories.dest %>js/core.min.js': [
						'<%= pkg.directories.src %>js/core.js',
						'<%= pkg.directories.src %>js/global.js',
						'<%= pkg.directories.src %>js/constants.js',
						'<%= pkg.directories.src %>js/dynamic.js'
					]
				}
			},
			flexslider: {
				options: {
					mangle: true
				},
				files: {
					'<%= pkg.directories.dest %>js/modules/dynamic/flexslider.js': ['<%= pkg.directories.src %>js/modules/dynamic/flexslider.js']
				}
			},
			media: {
				options: {
					mangle: true
				},
				files: {
					'<%= pkg.directories.dest %>js/modules/dynamic/media.js': ['<%= pkg.directories.src %>js/modules/dynamic/media.js']
				}
			},
			mobile: {
				options: {
					mangle: true
				},
				files: {
					'<%= pkg.directories.dest %>js/modules/dynamic/mobile.js': ['<%= pkg.directories.src %>js/modules/dynamic/mobile.js']
				}
			},			
			modules: {
				options: {
					mangle: true
				},
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
			}
		},
		less: {
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
		},
		copy: {
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
			development: {
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
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				indent: 4,
				quotmark: 'single',
				// undef: true,
				eqnull: true,
				browser: true,
				unused: true,
				trailing: true,
				evil: true,
				jquery: true,
				globals: {
					jQuery: true
				},
				smarttabs: true,
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
		},
		clean: {
			options: {
				force: true
			},
			production: {
				src: ['<%= pkg.directories.dest %>']
			}
		},
		replace: {
			iecss: {
				src: ['<%= pkg.directories.src %>css/ie.css'],
				overwrite: true,
				replacements: [{
					from: /(\/\* START OF MEDIA QUERY WRAPPER \*\/)((.|\n)*)(\/\* END OF MEDIA QUERY WRAPPER \*\/)/,
					to: ''
				}] 				
			}
		},
		compress: {
			main: {
				options: {
					//\\cdc.gov\ahb_apps\WWWDEV_CDC_GOV\TemplatePackage\releases
					archive: '<%= pkg.directories.releases + pkg.fileName + version %>.zip',
				},
				files: [
					{
						expand: true,
						cwd: '<%= pkg.directories.dest %>',
						src: ['**/*']	
					},
				],
			},
		},
		qunit: {
			//all: ['<%= pkg.directories.qunit %>**/*.html']
			all: {
				options: {
					urls: ['<%= pkg.urls.local + pkg.urls.TemplatePackage + pkg.urls.qunit %>underscore.html']
				}
			}
		},
		docco: {
			debug: {
				src: ['<%= pkg.directories.src %>js/**/*.js'],
				options: {
					output: '<%= pkg.directories.docs %>'
				}
			}
		},
		watch: {
			options: {
				livereload: false,	//https://github.com/gruntjs/grunt-contrib-watch#live-reloading
				nospawn: true,
				spawn: false
			},
			production: {
				files: '<%= pkg.directories.src %>/**/*',
				tasks: ['less:production', 'uglify', 'sync']				
			},
			development: {
				files: '<%= pkg.directories.src %><%= pkg.directories.less %>/*',
				tasks: ['less:development', 'sync']
			},
			sync: {
				files: '<%= pkg.directories.src %>/**/*',
				tasks: ['sync']
			}
		},
		sync: {
			main: {
				files: [{
					cwd: '<%= pkg.directories.src %>',
					src: ['**'], 
					dest: '<%= pkg.directories.devenv %>'
				}],	
				verbose: true
			}
		},		
	});

	// README: 
	// Because the tasks are loaded on demand, you can no longer run them from commandline without registering a new custom task
	// 
	// grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task (if you just run grunt from cmd line)
	grunt.registerTask('default', 'Default Task', function() {
		grunt.log.writeln('Loading Plugins');
	
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-text-replace');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-compress');
		
		grunt.log.writeln('Running default task on build: ' + cfg.version());

		grunt.task.run('clean:production');								// remove folders and files from output folder.
		grunt.task.run(['uglify','less:production','less:wcms']);		// compress &|| mangle JS, compress less - and save in build output folder
		grunt.task.run('replace');										// remove media query stuff from ie.css		
		grunt.task.run('copy:production');								// copy all files that don't need modified
		grunt.task.run('update');										// write dynamically created files	
		grunt.task.run('compress');										// zip the package and save in build_output/releases folder by default
	});

	grunt.registerTask('less', [], function() {
		grunt.loadNpmTasks('grunt-contrib-less');

		if (arguments.length === 0) {
			grunt.task.run('less');
		}
		else {
			var a = arguments[0];
			if(a === 'p' || a === 'prod') { a = 'production'; }
			if(a === 'd' || a === 'dev') { a = 'development'; }
			if(a === 'w') { a = 'wcms'; }
			grunt.task.run('less:' + a);
		}
	});

	grunt.registerTask('jshint', [], function() {
		grunt.loadNpmTasks('grunt-contrib-jshint');

		if (arguments.length === 0) {
			grunt.task.run('jshint');
		}
		else {
			var a = arguments[0];
			if(a === 'a') { a = 'app'; }
			if(a === 'm' || a === 'mod') { a = 'modules'; }
			if(a === 'g') { a = 'gf'; }			
			grunt.task.run('jshint:' + a);
		}
	});

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

	grunt.registerTask('qunit', [], function() {
		grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.task.run('qunit');
	});

	grunt.registerTask('docco', [], function() {
		grunt.loadNpmTasks('grunt-docco');
		grunt.task.run('docco');
	});

	grunt.registerTask('watch', [], function() {
		grunt.loadNpmTasks('grunt-contrib-watch');

		if (arguments.length === 0) {
			grunt.task.run('watch:production');
		}
		else {
			var a = arguments[0];
			if(a === 'p' || a === 'prod') { a = 'production'; }
			if(a === 'd' || a === 'dev') { a = 'development'; }
			if(a === 's') { a = 'sync'; }
			grunt.task.run('watch:' + a);
		}			
	});

	grunt.registerTask('sync', [], function() {
		grunt.loadNpmTasks('grunt-sync');	

		if (arguments.length === 0) {
			grunt.task.run('sync');
		}
		// else {
		// 	var a = arguments[0];
		// 	if(a === 'p' || a === 'prod') { a = 'production'; }
		// 	if(a === 'd' || a === 'dev') { a = 'development'; }
		// 	grunt.task.run('watch:' + a);
		// }			
	});

	grunt.registerTask('compress', [], function() {
		grunt.loadNpmTasks('grunt-contrib-compress');
		grunt.task.run('compress');
	});

	// grunt update
	grunt.registerTask('update', 'Update includes for build package', function() {
		grunt.file.write(cfg.pkg.destination + 'build.txt', 'build: ' + cfg.version());
		grunt.file.write(cfg.pkg.destination + 'includes/js-core.html', '<script src="/TemplatePackage/3.0/js/libs.min.js"></script><script src="/TemplatePackage/3.0/js/core.min.js"></script>');
		grunt.file.write(cfg.pkg.destination + 'includes/js-modules.html', '<script src="/TemplatePackage/3.0/js/app.min.js"></script><script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5399b2ed4e882822&amp;async=1"></script>');
	});

	grunt.registerTask('version', [], function() {
		grunt.log.writeln(cfg.version());
	});
};

