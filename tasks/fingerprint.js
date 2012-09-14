/**
 * Assets versioning task for Grunt
 *
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	// @todo Ditch this when grunt v0.4 is released
	grunt.util = grunt.util || grunt.utils;

	var fs = require('fs'),
		async = grunt.util.async;

	grunt.registerMultiTask('fingerprint', 'Assets versioning task for Grunt', function() {
		var target = this.target;
		this.requiresConfig([ this.name, target, 'files' ].join('.'));

		var options = this.data,
			files = Array.isArray(options.files) ? options.files : [options.files],
			maxFingerprint = 0,
			done = this.async();

		async.forEach(files, function(file, next) {
			file = grunt.template.process(file);
			var fingerprint = getFileFingerprint(file);
			if (fingerprint > maxFingerprint) {
				maxFingerprint = fingerprint;
			}
			next();
		}, function() {
			save({
				fingerprint: maxFingerprint,
				target: target,
				filename: options.filename,
				template: options.template
			}, done);
		});
	});

	function getFileFingerprint(filepath) {
		return fs.statSync(filepath).mtime.getTime();
	}

	function save(options, done) {
		var context = {
			target: options.target,
			fingerprint: options.fingerprint
		};

		var contents;
		if (options.template) {
			contents = grunt.template.process(options.template, context);
		}
		else {
			contents = options.fingerprint;
		}

		var filename;
		if (options.filename) {
			filename = grunt.template.process(options.filename, context);
		}
		else {
			filename = options.target;
		}

		grunt.file.write(filename, contents);
		grunt.log.writeln('File "' + filename + '" created.');
		done();
	}

};
