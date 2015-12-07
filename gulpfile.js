// grab our gulp packages
var gulp  = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename")
var concat = require("gulp-concat");
var eslint = require("gulp-eslint");

gulp.task("concat", function() {
  return gulp.src(["bliss.shy.js", "bliss._.js"])
	.pipe(concat("bliss.js"))
	.pipe(gulp.dest("."));
});

gulp.task("minify", ["concat"], function() {
	var u = uglify();
	u.on("error", function(error){
		console.error(error);
		u.end();
	});

	return gulp.src(["bliss.shy.js", "bliss.js"])
	.pipe(u)
	.pipe(rename({ suffix: ".min" }))
	.pipe(gulp.dest("."))
});

gulp.task("lint", function() {
	return gulp.src(["bliss.shy.js", "bliss.js"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("watch", function() {
	gulp.watch(["*.js"], ["lint", "concat", "minify"]);
});

gulp.task("default", ["lint", "concat", "minify"]);
