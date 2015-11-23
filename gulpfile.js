// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src(['bliss.core.js', 'bliss._.js'])
	.pipe(concat('bliss.js'))
	.pipe(gulp.dest('.'));
});

gulp.task('minify', ['concat'], function() {
  return gulp.src(['bliss.core.js', 'bliss.js'])
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
	gulp.watch(["*.js"], ['concat', 'minify']);
});

gulp.task('default', ['concat', 'minify']);