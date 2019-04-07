var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var del = require('del');


gulp.task('style', function() {
    return gulp.src('source/sass/style.scss')

        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css'))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css'))

        .pipe(server.stream());
});

gulp.task('images', function() {
    return gulp.src('source/image/*.{png,jpg}')

        .pipe(imagemin([
            imageminMozjpeg({quality: 85}),
            imageminPngquant({quality: [0.7, 0.8]}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))

        .pipe(gulp.dest('build/image'));
});

gulp.task('sprite', function() {
    return gulp.src('source/image/svg/icon-*.svg')

        .pipe(imagemin([
            imagemin.svgo()
        ]))

        .pipe(svgstore({
            inlineSvg: true
        }))

        .pipe(rename('sprite.svg'))

        .pipe(gulp.dest('build/image/svg'));
});

gulp.task('webp', function() {
    return gulp.src('source/image/*.{png,jpg}')

        .pipe(webp({quality: 85}),)
        .pipe(gulp.dest('build/image/webp'));
});

gulp.task('html', function() {
    return gulp.src('source/*.html')

        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest('build'));
});

gulp.task('serve', function() {
    server.init({
        server: 'build/'
    });

    gulp.watch('source/sass/**/*.scss', gulp.series('style'));
    // gulp.watch('source/*.html').on('change', server.reload);
    // gulp.watch('source/*.html', gulp.series('html'));
    gulp.watch('source/*.html', gulp.series('html')).on('change', server.reload);
    gulp.watch('source/js/*.js').on('change', server.reload);

});

gulp.task('copy', function() {
    return gulp.src([
        'source/fonts/**/*.woff2',
        'source/image/**/logo-*.svg',
        'source/image/**/map-marker.svg',
        'source/js/**',
    ], {
        base: 'source'
    }) 
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
    return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'style', 'images', 'webp', 'sprite', 'html'));

// gulp.task('default', gulp.series('serve'));