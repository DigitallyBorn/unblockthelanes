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
    gulp.watch('webapp/styles/**/*.less', ['styles']);
    gulp.watch('webapp/scripts/**/*.js', ['scripts']);
    gulp.watch('webapp/scripts/**/*.pug', ['templates']);
    gulp.watch('webapp/index.html', ['copy:index']);
});

gulp.task('styles', function () {
    gulp.src('webapp/styles/styles.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/assets/stylesheets'));
});


gulp.task('scripts', function () {
    gulp.src('webapp/scripts/**/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/javascripts'));
});

gulp.task('templates', function () {
    return gulp.src('webapp/scripts/**/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(templateCache({standalone: true}))
      .pipe(gulp.dest('build/assets'));
});


gulp.task('copy:vendor', function() {
    return gulp.src('webapp/vendor/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/vendor'))
});

gulp.task('copy:index', function() {
    return gulp.src('webapp/index.html')
        .pipe(gulp.dest('app/views/application'))
});

gulp.task('copy:media', function() {
    return gulp.src('webapp/images/**/*')
        .pipe(gulp.dest('app/assets/images'))
});

gulp.task('copy', ['copy:index', 'copy:media', 'copy:vendor']);

gulp.task('dist', ['copy', 'styles', 'scripts', 'templates', 'zip']);

gulp.task('default', ['dev']);