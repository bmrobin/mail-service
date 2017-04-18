/*global module:false,require:true*/
'use strict';

module.exports = function (grunt) {

  // automatically loads all of our grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({

    app: require('./package.json').appPath,

    dist: 'src/main/dist',

    // Compile TS into JS
    ts: {
      app: {
        // use options from our tsconfig.json 
        tsconfig: './tsconfig.json'
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {force: true},
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= dist %>/*',
            '!<%= dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      ts: {
        files: [ '<%= app %>/scripts/**/*.ts' ],
        tasks: [ 'prep' ]
      },
      tsconfig: {
        files: [ '../tsconfig.json'],
        tasks: [ 'prep' ]
      },
    },

    // Unit testing
    karma: {
      options: {
        configFile: 'src/test/javascript/karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      debug: {
        singleRun: false
      }
    },

    // Istanbul JS test coverage
    coverage: {
      default: {
        options: {
          thresholds: {
            statements: 89,
            branches: 89,
            lines: 89,
            functions: 89
          },
          dir: 'coverage',
          root: 'src/test/'
        }
      }
    },

    // JSHint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'gruntfile.js',
          '<%= app %>/scripts/**/*.js'
        ]
      }, 
      test: {
        src: [
          'gruntfile.js',
          'src/test/spec/**/*.js'
        ]
      },
      exclude: [ 'src/test/spec/e2e/*' ]
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'src/main/',
          livereload: true
        }
      }
    }

  });

  // Unit tests
  grunt.registerTask('test', [
    'clean',
    'karma:unit',
    'jshint:test'
  ]);

  // Host application in dev mode
  grunt.registerTask('prep', [
    'clean',
    'ts'
  ]);

  grunt.registerTask('default', [
    'prep',
    'watch'
  ]);

};
