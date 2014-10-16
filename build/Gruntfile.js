module.exports = function(grunt) {
	// load all grunt tasks
	// npm install --save-dev matchdep
	// require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// 
	global.cfg = {
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
		os: function() {
			var dir = (process.platform === 'darwin') ? 'mac' : 'win';
			return dir;
		}
	};

	var ENVS = {
		LOCAL: {
			load: ['grunt-contrib-less'],
			task: ['less:development']
		},
		DEV: {
			load: ['grunt-contrib-less'],
			task: ['less:development','less:wcms']
		},
		PROTOTYPE: {
			load: ['grunt-contrib-less','grunt-contrib-copy','grunt-contrib-uglify','grunt-text-replace'],
			task: ['less:production','copy:production','less:wcms','uglify','replace','update']
		},
		QA: {
			load: ['grunt-contrib-less','grunt-contrib-copy','grunt-contrib-uglify','grunt-text-replace'],
			task: ['less:production','copy:production','less:wcms','uglify','replace','update']
		},
		PROD: {
			load: ['grunt-contrib-less','grunt-contrib-copy','grunt-contrib-uglify','grunt-text-replace','grunt-contrib-compress'],
			task: ['less:production','copy:production','less:wcms','uglify','replace','update','compress']
		}
	},
	target = (grunt.option('target') || 'LOCAL').toUpperCase(),
	uglifyOptions = require('./grunt_options/uglify'),
	lessOptions = require('./grunt_options/less'),
	copyOptions = require('./grunt_options/copy'),
	jshintOptions = require('./grunt_options/jshint'),
	cleanOptions = require('./grunt_options/clean'),
	replaceOptions = require('./grunt_options/replace'),
	compressOptions = require('./grunt_options/compress'),
	qunitOptions = require('./grunt_options/qunit'),
	doccoOptions = require('./grunt_options/docco'),
	watchOptions = require('./grunt_options/watch'),
	syncOptions = require('./grunt_options/sync'),
	weinreOptions = require('./grunt_options/weinre'),
	jsonlintOptions = require('./grunt_options/jsonlint'),
	execOptions = require('./grunt_options/exec'),
	browserSyncOptions = require('./grunt_options/browserSync');	

	// if(!(target in ENVS)) {
	// 	grunt.fail.fatal('"target" parameter required --> e.g. --target=PROD   Supported target environments: ' + Object.keys(ENVS).toString());
	// }
	// else {
		grunt.log.ok(target);
		var load = ENVS[target].load;
		for (var i = 0, len = load.length; i < len; i++) {
			console.log('loading: ' + load[i]);
			grunt.loadNpmTasks(load[i]);
		}	
	// }

	grunt.initConfig({
		pkg: cfg.pkg,
		src: '<%= grunt.task.current.file.src %>',
		version: cfg.version(),
		os: cfg.os(),
		time: function () {
			var t = new Date().getTime() / 1000,
			h = parseInt(t / 3600) % 24,
			m = parseInt(t / 60) % 60,
			s = parseInt(t % 60, 10);

			return h + '-' + m + '-' + s;
		},
		timeStamp: function () {
			return new Date().getTime();
		},
		uglify: uglifyOptions,
		less: lessOptions,
		copy: copyOptions,
		jshint: jshintOptions,
		clean: cleanOptions,
		replace: replaceOptions,
		compress: compressOptions,
		qunit: qunitOptions,
		docco: doccoOptions,
		watch: watchOptions,
		sync: syncOptions,
		weinre: weinreOptions,
		jsonlint: jsonlintOptions,
		exec: execOptions,
		browserSync: browserSyncOptions
	});

	grunt.loadTasks('./grunt_tasks');
	grunt.registerTask('build', ENVS[target].task, function() {
		console.log('running build task a');
	});
};
