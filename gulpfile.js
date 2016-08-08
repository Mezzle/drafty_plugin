'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const glob = require('glob');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const processors = [
    autoprefixer()
];

const sassOptions = {
    outputStyle: 'nested',
    precision: 8
};

gulp.task('sass', () => {
    return gulp.src('extension/scss/*.scss', {base: 'extension'})
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('scss', 'css');
        }))
        .pipe(sourcemaps.write('.', {includeContent: false}))
        .pipe(gulp.dest('extension'))
});

gulp.task('sass:watch', () => {
    return gulp.watch('extension/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass']);
gulp.task('watch', ['sass:watch']);
