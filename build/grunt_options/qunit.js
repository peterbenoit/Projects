'use strict';

module.exports = {
	//all: ['<%= pkg.directories.qunit %>**/*.html']
	all: {
		options: {
			urls: ['<%= pkg.urls.local + pkg.urls.TemplatePackage + pkg.urls.qunit %>underscore.html']
		}
	}
}