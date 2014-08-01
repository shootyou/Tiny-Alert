module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
        main    : ['build/']
    },
    copy: {
        main: {
            src    : 'images/*',
            dest   : 'build/images/',
            expand : true,
            flatten: true
        }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    cssmin: {
        options: {
            banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> hihicd@hotmail.com */'
        },

        files: {
            expand: true,
            src   : 'css/*.css',
            dest  : 'build/'
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> hihicd@hotmail.com*/\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', ['clean','copy','cssmin','concat', 'uglify']);

};