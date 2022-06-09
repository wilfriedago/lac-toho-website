const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const webp = require('gulp-webp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// File paths
const filesPath = {
  src: {
    scss: './src/scss/style.scss',
    js: './src/js/**/*.js',
    img: './src/images/**/*.{jpg,png}',
  },
  dest: {
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/images/',
  },
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(filesPath.src.scss, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer('last 2 versions'), cssnano()]))
    .pipe(dest(filesPath.dest.css, { sourcemaps: '.' }));
}

// JS task: concatenates and uglifies JS files to main.js
function jsTask() {
  return src(filesPath.src.js, { sourcemaps: true })
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(dest(filesPath.dest.js, { sourcemaps: '.' }));
}

//Image Webp conversion task : Convert file to webp format
function webpImgTask() {
  return src(filesPath.src.img).pipe(webp()).pipe(dest(filesPath.dest.img));
}

// Watch task: watch SCSS and JS files for changes
function watchTask() {
  watch(filesPath.dest.img, webpImgTask);
  watch(
    [filesPath.src.scss, filesPath.src.js],
    { interval: 1000, usePolling: true }, //Makes docker work
    series(parallel(scssTask, jsTask))
  );
}

// Dev Gulp task
exports.default = series(parallel(scssTask, jsTask), webpImgTask, watchTask);

// Prod Gulp task
exports.build = series(parallel(scssTask, jsTask), webpImgTask);
