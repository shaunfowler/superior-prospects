var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var js = {
    src: [
        'app/app.js',
        'app/services/**/*.*',
        'app/directives.js',
        'app/filters.js',
        'app/controllers/**/*.*',
    ],
    dest: {
        dir: 'app/',
        filename: 'all.js'
    }
};

gulp.task('js', function() {
    return gulp.src(js.src)
        .pipe(concat(js.dest.filename))
        .pipe(gulp.dest(js.dest.dir));
});

gulp.task('js-watch', ['js'], function() {
    gulp.watch(js.src, ['js']);
});