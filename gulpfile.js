var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var replace = require('replace');
var replaceFiles = ['./www/js/app.js'];

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass']);

gulp.task('add-proxy', function() {
  return replace({
    regex: "https://api.sandbox.veritrans.co.id",
    replacement: "http://localhost:8100/proxy",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
});

gulp.task('remove-proxy', function() {
  return replace({
    regex: "http://localhost:8100/proxy",
    replacement: "https://api.sandbox.veritrans.co.id",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
});
