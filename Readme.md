# Assets versioning task for Grunt

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

### files ```string|array```

Array of your static files (or string for single file). Newest file will be used to calculate fingerprint. Wildcards are supported.

### filename ```string```

Name of file where fingerprint will be saved. You can use `target` context variable here:

```json
filename: '<%= target %>.txt'
```

### template ```string```

Fingerprint file contents template. You can use `fingerprint` context variable here:

```json
template: "<?php define('FINGERPRINT', '<%= fingerprint %>'); ?>"
```

If `template` not specified only fingerprint will be written to file.


## Config Example

``` javascript
fingerprint: {
  assets: {
    files: [
      'js/*.js',
      'css/*.css'
    ],
    filename: 'fingerprint.php',
    template: "<?php define('FINGERPRINT', '<%= fingerprint %>'); ?>"
  }
}
```

## Release History

### 2013-02-18 v0.1.0

* Grunt 0.4 support.


---

## License

The MIT License, see the included `License.md` file.
