const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

const filescss = ['./src/css/style1.css', './src/css/style2.css']
const filesjs = ['./src/js/script1.js', './src/js/script2.js']


function styles() {
    return gulp.src(filescss)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({

            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
}
function scripts() {
    return gulp.src(filesjs)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./build/js'))

}

gulp.task('css', styles);
gulp.task('js', scripts);