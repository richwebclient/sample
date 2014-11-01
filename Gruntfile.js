module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            }, server: {
                proxies: [
                    {
                        context: '/services',
                        host: 'localhost',
                        port: 8081,
                        https: false,
                        changeOrigin: true,
                        rewrite: {
                            '^/': '/oasp4j-example-application/'
                        }
                    },
                    {
                        context: '/',
                        host: 'localhost',
                        port: 9000,
                        https: false,
                        changeOrigin: true
                        
                    }

                ]
            },
            develop: {
                options: {
                    port: 9000,
                    open: {
                        target: 'http://localhost:9000/'
                    },
                    base: ['app'],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var cacheClear = function (req, res, next) {
                            res.setHeader('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
                            res.setHeader('Pragma', 'no-cache');
                            res.setHeader('Cache-Control', 'no-store');
                            next();
                        }, middlewares = [cacheClear], directory = (options.directory || options.base[options.base.length - 1]);
                      
                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });
                          // Setup the proxy
                        middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            }
        },
        wiredep: {
            develop: {
                src: ['app/index.html'],
                ignorePath: new RegExp('^app/')
            }
        },
        watch: {
            options: {livereload: true},
            all: {
                files: ['app/**', '!/app/lib/**']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: false
            },
            unit_chrome: {
                configFile: 'karma.conf.js',
                singleRun: false,
                browsers: [
                    'Chrome'
                ]
            },
            ci: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('test', [
        'karma:unit'
    ]);
    grunt.registerTask('test:debug', [
        'karma:unit_chrome'
    ]);
    grunt.registerTask('test:ci', [
        'karma:ci'
    ]);
    grunt.registerTask('default', [
        'karma:unit'
    ]);
    grunt.registerTask('serve', [
        'wiredep', 'configureProxies:server', 'connect:develop', 'watch'
    ]);
};