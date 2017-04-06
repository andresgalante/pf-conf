var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
      gulp.src('www/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./www/css/maps'))
        .pipe(gulp.dest('./www/css/'))
        .pipe(reload({stream:true}));
});

// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./www"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch task
gulp.task('watch',function() {
    gulp.watch('www/sass/**/*.scss',['styles']);
    gulp.watch(["www/*.html", "www/*.css"], ['bs-reload']);
});

// deploys
gulp.task('default',  ['styles','browser-sync','watch']);
