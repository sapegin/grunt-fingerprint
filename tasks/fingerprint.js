/**
 * Assets versioning task for Grunt
 *
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	var fs = require('fs'),
		async = grunt.util.async;

	grunt.registerMultiTask('fingerprint', 'Assets versioning task for Grunt', function() {
		var target = this.target;
		var configPrefix = [ this.name, target ].join('.');
		this.requiresConfig([ configPrefix, 'src' ].join('.'));

		var maxFingerprint = 0;
		var done = this.async();

		async.forEach(this.filesSrc, function(file, next) {
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
				filename: grunt.config.getRaw([ configPrefix, 'filename' ].join('.')),
				template: grunt.config.getRaw([ configPrefix, 'template' ].join('.'))
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
			contents = grunt.template.process(options.template, {data: context});
		}
		else {
			contents = options.fingerprint;
		}

		var filename;
		if (options.filename) {
			filename = grunt.template.process(options.filename, {data: context});
		}
		else {
			filename = options.target;
		}

		grunt.file.write(filename, contents);
		grunt.log.writeln('File "' + filename + '" created.');
		done();
	}

};
