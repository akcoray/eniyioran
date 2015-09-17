module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {           
      options: {
        separator: ';'
      },
      controllers: {
        src: ['public/javascripts/controllers/*.js'],
        dest: 'public/javascripts/release/controllers.min.js'
      }
    }    
  });

  var path = "../node_modules/grunt-contrib-concat/tasks";

  grunt.log.writeln("directory exists : ", grunt.file.isDir(path));

  //path = "C:\\projects\\websites\\node_modules\\grunt-contrib-concat\\";
  grunt.loadTasks(path)
  grunt.log.writeln("task loaded");

  grunt.task.registerTask('default', ['concat']);


  grunt.log.writeln("concat exists : "  + grunt.task.exists("concat"));
  grunt.log.writeln("default exists : "  + grunt.task.exists("default"));
}