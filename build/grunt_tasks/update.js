'use strict';
module.exports = function(grunt) {
	// The build version of the JS includes should only reference the built JS files
	grunt.registerTask('update', 'Update includes for build package', function() {
		var version = '?' + cfg.version();

		grunt.file.write(cfg.pkg.directories.dest + 'build.txt', 'build: ' + version.replace('?', ''));

		// not versioning JS for now.
		version = '';

		grunt.file.write(cfg.pkg.directories.dest + 'includes/js-core.html', '<script>page_timing.libs_start = Date.now();</script><script src="/TemplatePackage/3.0/js/libs.min.js' + version + '"></script><script>page_timing.libs_end = Date.now();page_timing.core_start = Date.now();</script><script src="/TemplatePackage/3.0/js/core.min.js' + version + '"></script><script>page_timing.core_end = Date.now();</script>');
		grunt.file.write(cfg.pkg.directories.dest + 'includes/js-modules.html', '<script>page_timing.app_start = Date.now();</script><script src="/TemplatePackage/3.0/js/app.min.js' + version + '"></script><script>page_timing.app_end = Date.now();page_timing.addthis_start = Date.now();</script><script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5399b2ed4e882822&amp;async=1"></script><script>page_timing.addthis_end = Date.now();</script>');
	});
};