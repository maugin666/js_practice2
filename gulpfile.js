var
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs');

var path = {
  prod: {
    html: 'prod/',
    js: 'prod/javascripts/',
    style: 'prod/stylesheets/'
  },
  dev: {
    html: 'dev/*.html',
    js: [
      'dev/javascripts/lib/jquery-3.2.1.js',
      'dev/javascripts/lib/handlebars-v4.0.10.js',
      'dev/javascripts/*.js'
      ],
    style: 'dev/stylesheets/base.scss'
  },
  watch: {
    html: 'dev/*.html',
    js: 'dev/javascripts/**/*.js',
    style: 'dev/stylesheets/base.scss'
  }
};

gulp.task('html:build', function () {
  gulp.src(path.dev.html)
    .pipe(gulp.dest(path.prod.html));
});

gulp.task('style:build', function () {
  gulp.src(path.dev.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.prod.style));
});

gulp.task('js:build', function () {
  gulp.src(path.dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.prod.js));
});

gulp.task('watch', function() {
  gulp.watch([path.watch.html], ['html:build']);
  gulp.watch([path.watch.style], ['style:build']);
  gulp.watch([path.watch.js], ['js:build']);
});

gulp.task('build', ['html:build', 'style:build', 'js:build']);