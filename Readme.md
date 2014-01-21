# Assets versioning task for Grunt

[![Build Status](https://travis-ci.org/sapegin/grunt-fingerprint.png)](https://travis-ci.org/sapegin/grunt-fingerprint)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Installation

This plugin requires Grunt 0.4.

Install `grunt-fingerprint`:

```
npm install grunt-fingerprint --save-dev
```

Add somewhere in your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-fingerprint');
```

Inside your `Gruntfile.js` file add a section named `fingerprint`. See Parameters section below for details.


## Parameters

All parameters supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md). 

### src `String|Array`

Array of your static files (or string for single file). Newest file will be used to calculate fingerprint. Wildcards are supported.

### filename `String`

Name of file where fingerprint will be saved. You can use `target` context variable here:

```json
filename: '<%= target %>.txt'
```

### template `String`

Fingerprint file contents template. You can use `fingerprint` context variable here:

```json
template: "<?php define('FINGERPRINT', '<%= fingerprint %>'); ?>"
```

If `template` not specified only fingerprint will be written to file.


## Config Example

``` javascript
fingerprint: {
  assets: {
    src: [
      'js/*.js',
      'css/*.css'
    ],
    filename: 'fingerprint.php',
    template: "<?php define('FINGERPRINT', '<%= fingerprint %>'); ?>"
  }
}
```

## Changelog

The changelog can be found in the Changelog.md file.


---

## License

The MIT License, see the included `License.md` file.
