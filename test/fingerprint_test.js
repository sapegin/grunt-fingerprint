var fs = require('fs');

exports.fingerprint = {
	compile: function(test) {
		'use strict';

		test.expect(1);

		var actual = fs.readFileSync('test/tmp/assets.php', 'utf8');
		var expected = fs.readFileSync('test/expected/assets.php', 'utf8');
		test.equal(expected, actual, 'Should generate PHP file with fingerprint.');

		test.done();
	}
};