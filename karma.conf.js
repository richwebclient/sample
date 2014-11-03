// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-06-09 using
// generator-karma 0.8.2

module.exports = function (config) {
    'use strict';
    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '.',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        preprocessors: {
            'app/!(bower_components)/**/*.html': ['ng-html2js']
        },

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/!(bower_components)/**/*.module.js',
            'app/!(bower_components)/**/*.js',
            'app/!(bower_components)/**/*.html',
            'app/!(bower_components)/**/*.spec.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 7777,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-jasmine', 'karma-ng-html2js-preprocessor'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        ngHtml2JsPreprocessor: {
            moduleName: 'app.templates',
            stripPrefix: 'app/'
        }
    });
};
