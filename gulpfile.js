const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const del = require('del');
const { parallel } = require('gulp');
const browserSync = require('browser-sync').create();
// const sass = require('gulp-sass')(require('sass'));
// const watcher = require('gulp-watch');
// const source = require('gulp-sourcemaps');



const filescss = ['./src/css/style1.css', './src/css/style2.css']
const filesjs = ['./src/js/script1.js', './src/js/script2.js']



function styles() {
    return gulp.src(filescss)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({

            cascade: false
        }))
        .pipe(cleanCSS(
            {
                level: 2
            }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(filesjs)
        .pipe(concat('script.js'))
        .pipe(terser())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
}
function clean() {
    return del(['build/*'])
}
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('clean', clean)
gulp.task('css', styles);
gulp.task('js', scripts);
gulp.task('watch', watch)
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)))
gulp.task('start', gulp.series('build', 'watch'))