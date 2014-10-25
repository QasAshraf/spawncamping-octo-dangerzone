module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "app/app.css": "app/app.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['app/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['Gruntfile.js'],
                tasks: ['bowercopy'],
                options: {
                    nospawn: true
                }
            }
        },
        "bower-install-simple": {
            options: {
                color: true,
                directory: "bower_components"
            },
            "prod": {
                options: {
                    production: true
                }
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },
        bowercopy: {
            // Javascript
            js: {
                options: {
                    destPrefix: 'app/components'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js',
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js'
                }
            },

            // Fonts
            fonts: {
                files: {
                    fonts: 'bootstrap/dist/fonts'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-bowercopy');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['bower-install-simple', 'less', 'bowercopy', 'watch']);
    grunt.registerTask('build', ['bower-install-simple', 'less', 'bowercopy']);
};