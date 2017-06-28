var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

gulp.task('sass', function () {
  return gulp.src('dev/styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dev/styles/css'));
});

gulp.task('autoprefixer', ['sass'], function () {
  return gulp.src('dev/styles/css/*.css')
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('dev/styles/css/'));
});

gulp.task('watch', ['sass', 'autoprefixer'], function() {
  gulp.watch('dev/styles/scss/*.scss', ['sass']);
  gulp.watch('dev/styles/css/*.css', ['autoprefixer']);
});

gulp.task('run', ['sass', 'autoprefixer']);