// Assigning modules to local variables
import gulp from 'gulp';
import less from 'gulp-less';

// Default task
gulp.task('default', ['less']);

// Less task to compile the less files and add the banner
gulp.task('less', function() {
  return gulp.src('less/agency.less') // TODO - update directory
    .pipe(less())
    .pipe(gulp.dest('css'));
});

// Copy Bootstrap core files from node_modules to vendor directory - TODO update directory
// gulp.task('bootstrap', function() {
//   return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
//     .pipe(gulp.dest('vendor/bootstrap'));
// });

// Copy jQuery core files from node_modules to vendor directory - TODO update directory
// gulp.task('jquery', function() {
//   return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
//     .pipe(gulp.dest('vendor/jquery'));
// });

// Copy Font Awesome core files from node_modules to vendor directory
// gulp.task('fontawesome', function() {
//     return gulp.src([
//             'node_modules/font-awesome/**',
//             '!node_modules/font-awesome/**/*.map',
//             '!node_modules/font-awesome/.npmignore',
//             '!node_modules/font-awesome/*.txt',
//             '!node_modules/font-awesome/*.md',
//             '!node_modules/font-awesome/*.json'
//         ])
//         .pipe(gulp.dest('vendor/font-awesome'))
// })

// Copy all third party dependencies from node_modules to vendor directory
// gulp.task('copy', ['bootstrap', 'jquery', 'fontawesome']);

// Watch Task that compiles LESS and watches for HTML or JS changes and reloads with browserSync
// TODO - minify functions as well
gulp.task('dev', ['less'], function() {
  gulp.watch('less/*.less', ['less']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
