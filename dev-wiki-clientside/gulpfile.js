/**
* Imports
*/
var gulp = require('gulp');
var args = require('yargs').argv;//fetch console args
var del = require('del');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});//loads plugins adhoc
var config = require('./gulp.config')();
var port = process.env.PORT || config.defaultPort;

var blue   = $.util.colors.blue;
var green  = $.util.colors.green;
var red    = $.util.colors.red;
var yellow = $.util.colors.yellow;
var gray   = $.util.colors.gray;

//the below imports are replaced by gulp-load-plugins
//var jshint = require('gulp-jshint');//js analyzer
//var jscs = require('gulp-jscs');//js style checker
//var util = require('gulp-util');
//var gulpPrint = require('gulp-print');
//var gulpIf = require('gulp-if');//conditionals

/******
* Tasks
*******/

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
/**
* Checks javascript code
*/
gulp.task('vet', function() {//gulp.task: defines a new task
    log('Analyzing js with JSHint and JSCS', blue);

    return gulp
       .src(config.alljs)
       .pipe($.if(args.verbose, $.print()))
       .pipe($.jscs())
       .pipe($.jshint())
       .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
//       .pipe($.jshint.reporter('fail'));
});

gulp.task('vet-watcher' , function () {
         gulp.watch([config.alljs] , ['vet']);//fires vet task when JS files are changed
});
/**
* Process stylus files to CSS
*/
gulp.task('styles', ['clean-styles'], function() {//process css
    log('Compiling Stylus --> CSS', blue);

    return gulp
        .src(config.stylus)//reads stylus files
        .pipe($.plumber())//gracefully handles errors
        .pipe($.stylus())//process stylus
        //.on('error', errorLogger)//upon even execute function
        .pipe($.autoprefixer({browsers: config.autoprefixer}))//adds vendor prefixes
        .pipe(gulp.dest(config.temp));//saves output to temp
});
/**
* Copy fonts to dist
*/
gulp.task('fonts', ['clean-fonts'], function() {
   log('Compressing fonts...', blue);
    return gulp
       .src(config.fonts)
       .pipe($.plumber())
       .pipe($.if(args.verbose, $.print()))
       .pipe(gulp.dest(config.build + 'fonts'));
});
/**
* Copy images to dist
*/
gulp.task('images', ['clean-images'], function() {
   log('Copying images...', blue);
    return gulp
       .src(config.images)
       .pipe($.imagemin({optimizationLevel: 4}))
       .pipe($.plumber())
       .pipe($.if(args.verbose, $.print()))
       .pipe(gulp.dest(config.build + 'images'));
});

/**
* Cleans files before generating new ones
*/
gulp.task('clean', function(done) {//clean dist and tmp directories
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + delconfig, yellow);
    del(delconfig, done);
});
gulp.task('clean-styles', function(done) {//clean styles from temp folder
    clean(config.temp + '**/*.css', done);
});
gulp.task('clean-fonts', function(done) {//clean fonts from dist folder
    clean(config.build + 'fonts/**/*.*', done);
});
gulp.task('clean-images', function(done) {//clean images from dist folder
    clean(config.build + 'images/**/*.*', done);
});
gulp.task('clean-code', function(done) {//clean images from dist folder
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.js',
        config.build + 'js/**/*.html'
    );
    clean(files, done);
});
/**
* Watch stylus files for changes and kick of 'styles' task on change
*/
gulp.task('stylus-watcher', function() {
   gulp.watch([config.stylus] , ['styles']) ;//when changes are made in the files
                                             //specified in the first param, the tasks
                                             //specified to the right will be executed
});
/**
* Minifies and Injects all HTML in our app to an angular module as cached templates
*/
gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))//empty: true makes sure empty tags wont be removed during HTML minify
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});
/**
* Inject JS and CSS into HTML
*/
gulp.task('wiredep', function() {
                                  //Note:this task does note include custom style
                                  //to prevent stylus preprocessing everytime this task is executed
    log('Wiring up bower, css, js and app js into' + config.index, blue);
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)//read index.html
        .pipe($.plumber())
        .pipe($.if(args.verbose, $.print()))
        .pipe(wiredep(options))//set wiredep config
        .pipe($.inject(gulp.src(config.js)))//inject js
        .pipe(gulp.dest(config.client));//write output to destination
});
/**
* Inject custom CSS into HTML
* It is seperated from 'wiredep' task as it requires to preprocess stylus
* and we want to be able to skip it if we want
*/
gulp.task('inject', ['wiredep', 'styles'], function() { //wiredep task + css preprocess and inject
    log('Wiring up css into' + config.index, blue);
    return gulp
        .src(config.index)//read index.html
        .pipe($.plumber())
        .pipe($.if(args.verbose, $.print()))
        .pipe($.inject(gulp.src(config.css)))//inject CSS
        .pipe(gulp.dest(config.client));//write output to destination
});
/**
* Serve dev build, Kicks of nodeJS
* nodemon - watches nodeJS app for changes, if changes are made nodemon will update the changes
* browserSync - enable live preview of changes, including JS and stylus without refreshing,
* as well as syncing multiple browser
*/
gulp.task('serve-dev', ['inject', 'stylus-watcher', 'vet'], function() {
    var nodeOptions = {
            script: config.server + 'app.js',
            delayTime: 1,
            env: {
                'PORT': port,
                'NOE_ENV': isDev() ? 'dev' : 'build'
            },
            watch: [config.server]
        };
    return $.nodemon(nodeOptions)
            .on('restart', ['vet'], function(ev) {
                log('**** nodemon restarted ****', blue);
                log('files changes on restarted \n: ' + ev, blue);
                setTimeout(function() {
                    browserSync.notify('reloading now...');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
            })
            .on('start', function(ev) {
                log('**** nodemon started ****', green);
                startBrowserSync();
            })
            .on('crash', function(ev) {
                log('**** nodemon crashed ****', red);
            })
            .on('exit', function(ev) {
                log('**** nodemon exited ****', blue);
            });
});

gulp.task('serve', ['inject'], function() {

});
////////////
/**
* Determine if environemnt is dev or not, env is provided from command line args,
* if no relevant args are found defaults to dev
*/
function isDev(){
    if(args.dev){ return true;}
    return false;
}
/**
*browserSync configuration
*/
function startBrowserSync(){
    if(args.nosync || browserSync.active) {
        return;
    }
    log('Starting browser-sync on port: ' + port);
//    gulp.watch([config.stylus], ['styles'])
//        .on('change', function(event) {
//        changeEvent(event);
//    });
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.client + '**/*.*',
            '!' + config.stylus,
            config.temp   + '**/*.css'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File: ' + event.path.replace(srcPattern, '') + ' ' + event.type, blue);
}
/**
* Clears the specified file and logs to console
*/
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}
/**
* Log utility functions
*/
function log(msg , color) {
    if(typeof color === 'undefined'){
        color = gray;
    }
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log(color(msg[item]));
            }
        }
    } else {
        $.util.log(color(msg));
    }
}

function errorLogger(error) {
    log('***** START ERROR ******', red);
    log(error, red);
    log('***** END ERROR ******', red);
    this.emit('end');
}
