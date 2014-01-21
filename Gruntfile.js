/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

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
		clean: ['test/tmp']
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', ['clean', 'fingerprint', 'mochaTest', 'jshint', 'clean']);
	grunt.registerTask('build', ['clean', 'fingerprint', 'mochaTest', 'jshint', 'clean']);

};
