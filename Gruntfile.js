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
		nodeunit: {
			all: ['test/fingerprint_test.js']
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
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'fingerprint', 'nodeunit', 'jshint', 'clean']);

};
