// Assigning modules to local variables
var gulp = require('gulp');
var less = require('gulp-less');

// Default task
gulp.task('default', ['less']);

// Less task to compile the less files and add the banner
gulp.task('less', function() {
  return gulp.src('client/public/less/splash.less')
    .pipe(less())
    .pipe(gulp.dest('client/public/styles'));
});

// Watch Task that compiles LESS and watches for HTML or JS changes and reloads with browserSync
// TODO - minify functions as well
gulp.task('dev', ['less'], function() {
  gulp.watch('less/*.less', ['less']);
  
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
