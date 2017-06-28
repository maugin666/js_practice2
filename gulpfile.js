var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  haml = require('gulp-haml'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

/*gulp.task('haml', function () {
  gulp.src('public/*.haml')
  .pipe(haml(haml({
    compiler: 'visionmedia'
  })))
  .pipe(gulp.dest('public/'));
});*/

gulp.task('sass', function () {
  return gulp.src('public/styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/styles/css'));
});

gulp.task('autoprefixer', ['sass'], function () {
  return gulp.src('public/styles/css/*.css')
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('public/styles/css/'));
});

gulp.task('watch', ['sass', 'autoprefixer'], function() {
  gulp.watch('public/styles/scss/*.scss', ['sass']);
  gulp.watch('public/styles/css/*.css', ['autoprefixer']);
});

gulp.task('run', ['sass', 'autoprefixer']);