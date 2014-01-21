'use strict';
/*global describe:false, it:false*/

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');

describe('grunt-fingerprint', function() {
	describe('fingerprint', function() {
		var filename = 'test/tmp/assets.php';
		it('Should create fingerprint file.', function() {
			assert.ok(fs.existsSync(filename), 'Fingerprint file created.');
			assert.ok(fs.statSync(filename).size, 'Fingerprint file not empty.');
		});
		it('Fingerprint file content is OK.', function() {
			var fingerprint = grunt.file.read(filename);
			assert.ok(/<\?php define\('FINGERPRINT', '[0-9a-f]{32}'\); \?>\s*/.test(fingerprint), 'Fingerprint is OK.');
		});
	});
});
