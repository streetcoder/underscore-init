var gulp 			= require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var uglify 			= require('gulp-uglify');
var flatten         = require('gulp-flatten');
var imagemin        = require('gulp-imagemin');
var runSequence     = require('run-sequence').use(gulp);


gulp.task('sass', function()
{
    return gulp.src('src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/styles'));
});


// minify dependency scripts and copy to scripts directory
gulp.task('depsScripts',function()
{
    return gulp.src(['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('dependency', ['depsScripts']);

// optimize image and copy to dist directory
gulp.task('images', function() {
    return gulp.src(['src/images/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(gulp.dest('dist/images'));
});

// flatten and copy to dist directory
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(flatten())
        .pipe(gulp.dest('dist/fonts'));
});


// default task run all the tasks
gulp.task('default', function(callback){
    runSequence('sass','dependency', 'images', 'fonts', callback);
});
