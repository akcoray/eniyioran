module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    watch : {
      scripts: {
        files: ['public/javascripts/controllers/*.js', 'public/javascripts/services/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      }
    },
    concat: {           
      options: {
        separator: ''
      },
      controllers: {
        src: ['public/javascripts/controllers/*.js'],
        dest: 'public/javascripts/release/controllers.min.js'
      },
      services: {
        src: ['public/javascripts/services/*.js'],
        dest: 'public/javascripts/release/services.min.js'
      }      
    }    
  });

  var path = "../node_modules/grunt-contrib-concat/tasks";
  var path1 = "../node_modules/grunt-contrib-watch/tasks";

  grunt.log.writeln("directory exists : ", grunt.file.isDir(path));
  grunt.log.writeln("directory exists : ", grunt.file.isDir(path1));

  //path = "C:\\projects\\websites\\node_modules\\grunt-contrib-concat\\";
  grunt.loadTasks(path)
  grunt.loadTasks(path1)
  grunt.log.writeln("task loaded");

  grunt.task.registerTask('default', ['watch']);


  grunt.log.writeln("concat exists : "  + grunt.task.exists("concat"));
  grunt.log.writeln("watch exists : "  + grunt.task.exists("watch"));
  grunt.log.writeln("default exists : "  + grunt.task.exists("default"));
}