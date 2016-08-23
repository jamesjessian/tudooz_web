module.exports = function (grunt) {
	
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt);
  
  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    /* Empty target directories */
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*'
          ]
        }]
      }
    },
	
    /* Copy all files into dist */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '{,*/}*.html',
            'img/{,*/}*.*',
            'fonts/{,*/}*.*',
            'js/{,*/}*.*',
            'css/{,*/}*.*',
            'views/{,*/}*.*'
          ]
        }]
      }
    },

	/* Minify all *.css files in place */
	cssmin: {
	  dist: {
		files: [{
		  expand: true,
		  cwd: '<%= config.dist %>',
		  src: ['css/*.css', 'fonts/{,*/}*.css', 'views/{,*/}*.css'],
		  dest: '<%= config.dist %>'
		}]
	  }
	},
	
	/* Minify all *.js files in place */
    uglify: {
	  dist: {
		files: [{
		  expand: true,
		  cwd: '<%= config.dist %>',
		  src: ['js/{,*/}*.js'],
		  dest: '<%= config.dist %>'
		}]
	  }
    },
	
	/* Minify HTML */
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    }
  });
  
  grunt.registerTask('build', [
    'clean:dist',	
    'copy:dist',	
    'cssmin',		
    'uglify',		
    'htmlmin'		
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};