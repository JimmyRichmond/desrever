var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/* Scripts task */
gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'src/js/**/*.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

/* Sass task */
gulp.task('sass', function () {
  gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    /* Reload the browser CSS after every change */
    .pipe(reload({ stream: true }));
});

/* Reload task */
gulp.task('bs-reload', function () {
  browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
  browserSync.init(['dist/css/*.css', 'dist/js/*.js'], {
    proxy: 'localhost:' + (process.env.PORT || 3000)
  });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync'], function () {
  /* Watch scss, run the sass task on change. */
  gulp.watch(['src/scss/**/*.scss'], ['sass'])
  /* Watch app.js file, run the scripts task on change. */
  gulp.watch(['src/js/**/*.js'], ['scripts'])
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['views/**/*.handlebars', 'app.js'], ['bs-reload']);
});
