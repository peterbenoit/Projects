'use strict';

module.exports = {
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
	}
}