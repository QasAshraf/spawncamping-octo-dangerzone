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
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
                    'angular.js': 'angular/angular.js',
                    'angular-route.js': 'angular-route/angular-route.js',
                    'ng-tags-input.js': 'ng-tags-input/ng-tags-input.min.js',
                    'ng-tags-input.bootstrap.css': 'ng-tags-input/ng-tags-input.bootstrap.css',
                    'ng-tags-input.css': 'ng-tags-input/ng-tags-input.css'
                }
            },

            // Fonts
            fonts: {
                files: {
                    fonts: 'bootstrap/dist/fonts'
                }
            }
        },
        shipit: {
            options: {
                workspace: '.',
                deployTo: '/var/www/html/tagchat',
                repositoryUrl: 'https://github.com/QasAshraf/spawncamping-octo-dangerzone.git',
                ignores: ['.git', 'node_modules', 'bower_components'],
                keepReleases: 2
            },
            prod: {
                servers: 'root@bongo.qasashraf.com'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-shipit');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['bower-install-simple', 'less', 'bowercopy', 'watch']);
    grunt.registerTask('build', ['bower-install-simple', 'less', 'bowercopy']);
};