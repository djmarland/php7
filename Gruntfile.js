module.exports = function (grunt) {
    var sassFilesArray = [{
        expand: true,
        cwd: 'public/static',
        src: ['scss/**/*.scss', '!scss/**/_*.scss'],
        rename: function(destBase, destPath, options) {
            return options.cwd + '/' + destPath.replace(/^scss/, 'css').replace(/\.scss/, '.css');
        },
    }];

    // Project configuration.
    grunt.initConfig({
        staticPath: 'public/static',

        // Store your Package file so you can reference its specific data whenever necessary
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourcemap: 'none',
                precision: 8,
                includePaths: [
                    'node_modules'
                ]
            },
            dev: {
                files: sassFilesArray,
                options: {
                    sourcemap: 'auto',
                    outputStyle: 'nested'
                }
            },
            dist: {
                files: sassFilesArray,
                options: {
                    outputStyle: 'compressed'
                }
            }
        },

        // Run: `grunt watch` from command line for this section to take effect
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            scripts: {
            },
            sass: {
                files: ['<%=staticPath%>/scss/**/*.scss'],
                tasks: ['sass:dev']
            }
        }

    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');


    // Default Task
    grunt.registerTask('default', ['sass:dev']);
};