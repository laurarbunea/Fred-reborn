module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Set up the project environment
         * --------------------------------------------------------------------
         */
        paths: {
            assets: "frontend",
            grunticons: "<%= paths.assets %>/images/grunticons",
            sass: "<%= paths.assets %>/sass",
            css: "www/css"
        },

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';\n'
            },
            dist: {
                // the files to concatenate
                src: [
//                    'bower_components/nunjucks/browser/nunjucks-slim.min.js',
                    'frontend/js/lib/browser.js',
                    'frontend/js/lib/jquery.min.js',
                    'build/site.js'
                ],
                // the location of the resulting JS file
                dest: 'www/js/site.js'
            },
            traffic: {
                // the files to concatenate
                src: [
                    'bower_components/nunjucks/browser/nunjucks-slim.min.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/marionette/lib/backbone.marionette.min.js',
                    'build/traffic.templates.js',
                    'build/traffic.js'
                ],
                // the location of the resulting JS file
                dest: 'www/js/traffic.js'
            }
        },

        nunjucks: {
            precompile: {
                baseDir: 'frontend/templates/browser',
                src: 'frontend/templates/browser/*',
                dest: 'build/templates.js',
                options: {
                    // env: require('./app/lib/nunjucks/nunjucks'),
                    name: function(filename) {
                        return filename.replace(/\.j2$/, "");
                    }
                }
            },
            traffic: {
                baseDir: 'templates/traffic',
                src: 'templates/traffic/*',
                dest: 'build/traffic.templates.js',
                options: {
                    // env: require('./app/lib/nunjucks/nunjucks'),
                    name: function(filename) {
                        return filename.replace(/\.j2$/, "");
                    }
                }
            }
        },

        browserify: {
            application: {
                files: {
                    'build/site.js': [
                        'frontend/js/components/**/*.js',
                        'frontend/js/site.js'
                    ]
                },
            },
            traffic: {
                files: {
                    'build/traffic.js': [
                        'frontend/js/traffic.js'
                    ]
                }
            }
        },

        watch: {
            js: {
                options: {
                    nospawn: true,
                    livereload: true
                },
                files: [
                    "frontend/js/**/*.js",
                    "templates/client/**/*.j2",
                    "templates/traffic/**/*.j2"
                ],
                tasks: [
                    "js"
                ]
            },
            sass: {
                options: {
                    nospawn: true,
                    livereload: true
                },
                files: [
                    "<%= paths.sass %>/**/*.scss"
                ],
                tasks: [
                    "css"
                ]
            }
        },

        sass: {
            dev: {
                files: {
                    "www/css/screen.css": "<%= paths.sass %>/screen.scss"
                },
                options: {
                    sourceComments: 'none',
                    sourceMap: false
                }
            }
        },

        grunticon_pigment: {

            icons: {

                files: [{
                    cwd: '<%= paths.grunticons %>',
                    dest: '<%= paths.css %>'
                }],

                options: {

                    // colours for svg colourising
                    // white, blue, dark-blue, grey, dark-grey, green, orange, red
                    svgColors: ["#ffffff", "#236FA6", "#005685", "#6b6a6a", "#454444", "#59B359", "#FFA217", "#CA4142"],

                    // custom selectors
                    // used for themed icons
                    customselectors: {
                        "route-stop": [".route > .route__item:after"],
                        "roadworks": [".route > .route__item.route__item--roadworks:after"],
                        "warning": [".route > .route__item.route__item--warning:after"],
                        "bg-hatched": [".breakline--hatched:before, .subnav__nav:before, .hatched-line:before, .level-1 .traffic-info__header:after"],
                        "mask-traffic-figure": [".route .route__figure:after"]
                    },

                    previewhtml: "icons-preview.html",

                    // templates for css output and preview page
                    template: "<%= paths.grunticons %>/template/default-css.hbs"
                    // , previewTemplate:  "<%= paths.grunticons %>/template/preview.hbs"

                }
            }
        },


        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    cwd: __dirname,
                    ignore: [
                        'node_modules/**',
                        'bower_components/**'
                    ],
                    ext: 'js,json'
                }
            }
        },


        autoprefixer: {

            options: {
                map: true,
                browsers: ['> 1%', 'last 2 versions', 'ie >= 8', 'Android 2.3', 'Android 4', 'Firefox >= 4', 'iOS >= 5']
            },

            // prefix the specified file
            main: {
                options: {
                },
                src: 'www/css/screen.css'
            },
            slim: {
                options: {
                },
                src: 'www/css/style-guide.css'
            }
        },

        uglify: {
            dist: {
                files: {
                    'www/js/site.js': ['www/js/site.js']
                },
                options: {
                    banner: "/* NZTA.JS */",
                    mangle: {
                        except: ['jQuery', 'ga']
                    }
                }
            }
        },

        cssmin: {
            dist: {
                options: {
                    banner: '/* NZTA */'
                },
                files: {
                    'www/css/screen.css': ['www/css/screen.css']
                }
            },
            slim: {
                options: {
                    banner: '/* Style guide */'
                },
                files: {
                    'www/css/style-guide.css': ['www/css/style-guide.css']
                }
            }
        },

        cmq: {
            options: {
                log: false
            },
            your_target: {
                files: {
                    'www/css/screen.css': ['www/css/screen.css']
                }
            }
        }

    });

    /**
     * The cool way to load your grunt tasks
     * --------------------------------------------------------------------
     */
    Object.keys( pkg.devDependencies ).forEach( function( dep ){
        if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
    });

    grunt.registerTask("default", [
        "nodemon"
    ]);

    grunt.registerTask("css", [
        "sass",
        "autoprefixer"
    ]);


    grunt.registerTask("js", [
        "browserify",
        "nunjucks",
        "concat"
    ]);

    grunt.registerTask("icon", [
        "grunticon_pigment"
    ]);


    grunt.registerTask("dist", [
        "js",
        "css",
        "uglify:dist",
        "cssmin:dist"
    ]);


    grunt.registerTask("all-the-things", [
        "icon",
        "js",
        "css",
        "uglify:dist",
        "cssmin:dist"
    ]);

    grunt.registerTask("all", ["all-the-things"]);
    grunt.registerTask("boom", ["all-the-things"]);
    grunt.registerTask("it-is-done", ["all-the-things"]);
    grunt.registerTask("smash", ["all-the-things"]);

};