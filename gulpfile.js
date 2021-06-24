/**
 * Gulp file to automate the various tasks
 **/

var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var composer = require('gulp-uglify/composer');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uglifyEs = require('uglify-es');
var uglify = composer(uglifyEs, console);
var rename = require('gulp-rename');


// Define paths


var paths = {
  dist: {
    backend: 'backend/web/dist',
  },
  base: {
    base: './',
    node: 'node_modules'
  },
  theme: {
    base: './',
    css: 'theme/assets/css',
    js: 'theme/assets/js',
    img: 'theme/assets/img/**/*.+(png|jpg|gif|svg)'
  }
};

var backendCssFiles = [
  // paths.base.node + '/sweetalert2/dist/sweetalert2.min.css',
  paths.base.node + '/dropzone/dist/min/dropzone.min.css',
  // paths.base.node + '/toastr/build/toastr.min.css',
  paths.theme.base + '/theme/assets/css/material-dashboard.css',
  paths.theme.base + '/backend/web/css/custom.css'
];

var backendJsFiles = [
  // paths.base.node + '/infinite-scroll/dist/infinite-scroll.pkgd.js',
  // paths.base.node + '/jquery.nicescroll/dist/jquery.nicescroll.min.js',
  // paths.base.node + '/bootstrap/dist/js/bootstrap.bundle.min.js',
  // paths.base.node + '/js-cookie/src/js.cookie.js',
  // paths.base.node + '/jquery.scrollbar/jquery.scrollbar.min.js',
  // paths.base.node + '/jquery-scroll-lock/dist/jquery-scrollLock.min.js',
  // paths.base.node + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
  // paths.base.node + '/sweetalert2/dist/sweetalert2.min.js',
  // paths.base.node + '/toastr/build/toastr.min.js',
  paths.base.node + '/dropzone/dist/min/dropzone.min.js',
  paths.base.node + '/underscore/underscore-min.js',
  paths.theme.base + '/theme/assets/js/core/popper.min.js',
  paths.theme.base + '/theme/assets/js/core/bootstrap-material-design.min.js',
  paths.theme.base + '/theme/assets/js/plugins/perfect-scrollbar.jquery.min.js',
  paths.theme.base + '/theme/assets/js/plugins/moment.min.js',
  paths.theme.base + '/theme/assets/js/plugins/sweetalert2.js',
  paths.theme.base + '/theme/assets/js/plugins/bootstrap-selectpicker.js',
  paths.theme.base + '/theme/assets/js/plugins/jasny-bootstrap.min.js',
  paths.theme.base + '/theme/assets/js/plugins/bootstrap-notify.js',
  paths.theme.base + '/theme/assets/js/material-dashboard.js',
  paths.theme.base + '/backend/web/js/main.ui.js',
  paths.theme.base + '/backend/web/js/modal.js'
];

// Concat CSS files

gulp.task('concat-backend:css', function (done) {
  return gulp.src(backendCssFiles)
    .pipe(concat('script.css'))
    .pipe(gulp.dest(paths.dist.backend + '/css'));
});

// Minify CSS

gulp.task('minify-backend:css', function () {
  return gulp.src([
    paths.dist.backend + '/css/script.css'
  ])
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist.backend + '/css'));
});

// Concat JS files

gulp.task('concat-backend:js', function (done) {
  return gulp.src(backendJsFiles)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.dist.backend + '/js'));
});

// Minify JS

gulp.task('minify-backend:js', function (cb) {
  return gulp.src([
    paths.dist.backend + '/js/script.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.backend + '/js'));
});

// Live reload

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: [paths.theme.base, paths.base.base]
    }
  });
});

// Watch for changes

gulp.task('watch', ['browserSync'], function () {
  gulp.watch(paths.theme.js, browserSync.reload);
  gulp.watch(paths.theme.html, browserSync.reload);
});

// Clean

gulp.task('clean-backend:dist', function () {
  return del.sync(paths.dist.backend);
});

// Copy Theme CSS

gulp.task('copy:css', function () {
  return gulp.src([
    paths.theme.base + '/themes/css/script.css'
  ])
    .pipe(gulp.dest(paths.dist.backend + '/css'));
});

// Copy Theme JS

gulp.task('copy:js', function () {
  return gulp.src([
    paths.theme.base + '/themes/js/script.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.backend + '/js'));
});

// Build

gulp.task('build-backend', function (callback) {
  runSequence(
    'clean-backend:dist',
    'copy:css',
    'copy:js',
    'concat-backend:js',
    // 'minify-backend:js',
    'concat-backend:css',
    'minify-backend:css',
    callback
  );
});

gulp.task('build', function (callback) {
  runSequence(
    'build-backend',
    callback
  );
});

// Default

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  );
});
