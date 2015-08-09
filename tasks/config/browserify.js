module.exports = function(grunt) {
	grunt.config.set('browserify', {
		dev: {
			files: {
				// e.g.
				// 'relative/path/from/gruntfile/to/compiled/template/destination'  : ['relative/path/to/sourcefiles/**/*.html']
				// cwd: 'assets/js/',

				'.tmp/public/js/script.js': ['assets/js/**/*.js','assets/js/**/*.jsx','!assets/js/dependencies/*.js','!assets/js/bootstrap.min.js']
			},
			options: {
				transform:  [ require('grunt-react').browserify ]
			},
		}
	});
	grunt.loadNpmTasks('grunt-browserify');
};
