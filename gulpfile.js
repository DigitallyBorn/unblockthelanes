var gulp = require('gulp'),
  less = require('gulp-less'),
  pug = require('gulp-pug'),
  watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  templateCache = require('gulp-angular-templatecache'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('dev', ['styles', 'templates', 'watch']);

gulp.task('watch', function () {
  gulp.watch('styles/**/*.less', ['styles']);
  gulp.watch('templates/**/*.pug', ['templates']);
});

gulp.task('styles', function () {
  gulp.src('styles/styles.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('templates', function () {
  return gulp.src('templates/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./app/views/application'));
});

gulp.task('dist', ['styles', 'templates']);

gulp.task('default', ['dev']);