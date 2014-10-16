/**
 * Sync.js
 * Requires: node.js
 *  	     fs-extra:https://github.com/jprichardson/node-fs-extra
 *  	     node-watch:https://github.com/yuanchuan/node-watch
 *
 * Monitors a local folder for changes, and immediately copies to a remote destination. Assumes mapped drives and same file paths.
 *
 * c:\TemplatePackage => i:\TemplatePackage
 *
 * RUN: node watch
 * Copies modified files from X -> Y, using to update nchm-dvss1.cdc.gov:#### from local
 */

var fs = require('fs-extra'),
watch = require('node-watch'),
grunt = require('grunt'),
local = 'c:',									// local drive with copy of TemplatePackage
remote = 'i:',									// remote drive 
path = local + '\\TemplatePackage\\', 			//\\3.0\\',		// path to monitor for changes
source,											// full path to file
dest,											// mirrored destination of the file
filename,										// name of the file
types = {'js': 1, 'css': 1, 'less': 1, 'html': 1, 'htm': 1, 'gif': 1, 'jpg': 1, 'jpeg': 1, 'svg': 1, 'png': 1},
re = /\.js|\.css|\.less|\.html|\.htm|\.gif|\.jpg|\.jpeg|\.svg|\.png$/;

var filter = function(pattern, fn) {
	return function(filename) {
		// ignore .svn or .git modifications
		if(filename.indexOf('.svn') > -1 || filename.indexOf('.git') > -1) {
			return false;
		}

		console.log('File modified: ' + filename);

		var type = filename.split('.'),
			type = type[type.length -1];

		if(type in types) {

			if(type === 'less') {
				grunt.tasks(['less:dev']);
			}
		}

		fn(filename, type);

		// if (pattern.test(filename)) {
		// 	fn(filename);
		// }
	}
};

watch(path, filter(re, function(file, type) {
	var filename = file.replace(/^.*['\\/]/, ''),
		source = file.substring(0, file.lastIndexOf('\\') + 1),
		dest = source.replace(local, remote);

	console.log('copying: ' + filename + ' to => ' + dest);
	
	fs.copy(file, dest + filename, function(err){
		if (err) return console.error(err);
		console.log("success!")
	});
}));