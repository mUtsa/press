module.exports = function(grunt) {
    grunt.initConfig({
            less: {
                development: {
                    options: {
                        paths: ["public/assets/css"]
                    },
                    files: {"css/app.css": "app.less"}
                }
            },
            watch: {
                files: "*.less",
                tasks: ["less"]
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less', 'watch']);
};