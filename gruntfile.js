/*global module:false,require:true*/
'use strict';

module.exports = function (grunt) {

  // automatically loads all of our grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-ts');

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
    }

  });

  grunt.registerTask('default', [
    'clean',
    'ts'
  ]);

};
