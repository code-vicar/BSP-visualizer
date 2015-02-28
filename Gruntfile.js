module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'app'
                }
            }
        }
    });

    grunt.registerTask('default', ['connect:server:keepalive']);
};
