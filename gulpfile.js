// grab our gulp packages
var gulp  = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");

// gulp.task("concat", function() {
//   return gulp.src(["bliss.shy.js", "bliss._.js"])
// 	.pipe(concat("bliss.js"))
// 	.pipe(gulp.dest("."));
// });
//
// gulp.task("minify", function() {
// 	var u = uglify();
// 	u.on("error", function(error) {
// 		console.error(error);
// 		u.end();
// 	});
//
// 	return gulp.src(["bliss.shy.js", "bliss.js"])
// 	.pipe(u)
// 	.pipe(rename({ suffix: ".min" }))
// 	.pipe(gulp.dest("."));
// });
//
// gulp.task("watch", function() {
// 	gulp.watch(["*.js", "!bliss.js", "!*.min.js"], gulp.series("concat", "minify"));
// });
//
// gulp.task("default", gulp.series("concat", "minify"));
