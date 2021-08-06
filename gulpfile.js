const {src, dest, watch, task} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const Fiber = require('fibers')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const minify = require('gulp-minify');

/**
 * Compile SCSS to CSS
 * @returns {*}
 */
function css() {
    return src('src/scss/**/*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            fiber: Fiber
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'))
}

/**
 * Minify js files
 * @returns {*}
 */
function js() {
        return src('src/js/**/*.js')
            .pipe(minify({
                ext: {
                    min: '.min.js'
                },
                noSource: true,
                preserveComments: 'all'
            }))
            .pipe(dest('dist/js'))
}

/**
 * Watch file changes (JS, CSS)
 * @param cb
 */
function watcher(cb) {
    watch('src/scss/**/*.{scss,sass}', css, cb)
    watch('src/js/**/*.js', js, cb)
}

exports.css = css
exports.js = js
exports.watcher = watcher