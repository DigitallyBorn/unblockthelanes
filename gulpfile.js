var gulp = require('gulp'),
    less = require('gulp-less'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    zip = require('gulp-zip'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('dev', ['copy', 'styles', 'scripts', 'templates', 'watch']);

gulp.task('watch', function () {
    gulp.watch('application/styles/**/*.less', ['styles']);
    gulp.watch('application/scripts/**/*.js', ['scripts']);
    gulp.watch('application/templates/**/*.pug', ['templates']);
    //gulp.watch('application/index.html', ['copy:index']);
});

gulp.task('styles', function () {
    gulp.src('application/stylesheets/styles.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('scripts', function () {
    gulp.src('application/scripts/**/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/javascripts'));
});

gulp.task('templates', function () {
    return gulp.src('application/templates/**/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('app/views/application'));
});


gulp.task('copy:vendor', function() {
    return gulp.src('application/vendor/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/javascripts'))
});

//gulp.task('copy:index', function() {
//    return gulp.src('webapp/index.html')
//        .pipe(gulp.dest('app/views/application'))
//});

gulp.task('copy:media', function() {
    return gulp.src('application/images/**/*')
        .pipe(gulp.dest('public/assets/images'))
});

gulp.task('copy', ['copy:media', 'copy:vendor']);

gulp.task('dist', ['copy', 'styles', 'scripts', 'templates', 'zip']);

gulp.task('default', ['dev']);