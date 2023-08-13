var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");

gulp.task("sass", function () {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

gulp.task(
  "watch",
  gulp.series("sass", function () {
    browserSync.init({
      server: {
        baseDir: "./",
      },
    });

    gulp.watch("sass/**/*.scss", gulp.series("sass"));
    gulp.watch(["index.html", "./style.css"]).on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series("sass", "watch"));
