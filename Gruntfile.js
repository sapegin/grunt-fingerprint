module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	grunt.loadTasks('tasks');

	grunt.initConfig({
		fingerprint: {
			assets: {
				src: [
					'test/src/*.css',
					'test/src/*.js'
				],
				filename: 'test/tmp/<%= target %>.php',
				template: "<?php define('FINGERPRINT', '<%= fingerprint %>'); ?>"
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*.js']
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'tasks/*.js', 'test/*.js'],
			options: {
				node: true,
				white: false,
				smarttabs: true,
				eqeqeq: true,
				immed: true,
				latedef: false,
				newcap: true,
				undef: true
			}
		},
		jscs: {
			all: [
				'tasks/*.js'
			],
		},		
		clean: ['test/tmp']
	});

	grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'fingerprint', 'mochaTest', 'clean']);
	grunt.registerTask('build', ['default']);

};
