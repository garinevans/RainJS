module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      all: ['js-source/*.js'],
      options: {ignores: ['js-source/browserified.js']}
    },

    uglify: {
      my_target: {
        files: {
          'js/rain.min.js': [
              'js-source/rainlayout.droplet.js',
              'js-source/rainlayout.core.js',
              'js-source/rain.js'
            ],
          'js/main.min.js': "js-source/main.js"
        }
      }
    },

    sass: {
      dist: {
        files: {
          'css/styles.css': 'sass/main.scss'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/styles.min.css': ['css/styles.css']
        }
      }
    },

    watch: {
      files: ['sass/**.scss',
              'js-source/**.js'  
            ],
      tasks: ['sass', 
              'jshint', 
              'cssmin', 
              'uglify'],
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);

};