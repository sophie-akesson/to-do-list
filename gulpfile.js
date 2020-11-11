let gulp = require("gulp");
let sass = require("gulp-sass");
let watch = require("gulp-watch");
var rename = require("gulp-rename");
let minify = require("gulp-csso")

gulp.task("default", function (){
    return watch("scss/*.scss", function () {
    gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe(minify())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("css"))
    });
});