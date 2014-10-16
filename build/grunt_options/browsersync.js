'use strict';

module.exports = {
	bsFiles: {
		src : '<%= pkg.directories.src %>/css/*.css'
	},
	options: {
		proxy: {
			baseDir: "<%= pkg.urls.local %>"
		}
	}
}