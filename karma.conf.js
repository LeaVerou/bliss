// Karma configuration
// Generated on Fri Dec 04 2015 17:29:55 GMT-0800 (PST)

module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon', 'fixture', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'bliss.shy.js',
      'bliss._.js',
      'tests/helpers.js',
      'tests/**/*.js',
      'tests/fixtures/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['html2js'],
      'tests/**/*.js': ['jshint'],
      '*.js': ['jshint']
    },

    jshint: {
      options: {
        curly: true,    // requires you to always put curly braces around blocks in loops and conditionals.
        eqeqeq: false,  // prohibits the use of == and != in favor of === and !==.
        loopfunc: true, // suppresses warnings about functions inside of loops. 
        noarg: true,    // prohibits the use of arguments.caller and arguments.callee
        expr: true,     // suppresses warnings about the use of expressions where normally you would expect to see assignments or function calls
        undef: false,   // This option prohibits the use of explicitly undeclared variables
        boss: true,     // suppresses warnings about the use of assignments in cases where comparisons are expected
        devel: false,   // defines globals that are usually used for logging poor-man's debugging
        eqnull: false,  // suppresses warnings about == null comparisons
        browser: true,  // option defines globals exposed by modern browsers
        globals: {}     // predefined global variables, if undef is true, this must be populated
      },
      summary: false
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    customLaunchers: {

      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }

    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_travis_ci'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  });

}
