module.exports = function() {
    var client = './src/client/';
    var server = './src/server/';
    var build = './dist/';
    var temp = './.tmp/';
    var assets = client + 'assests/';
    var config = {        
        /**
        * Files paths
        */
        build:       build,
        client:      client,
        css :        temp + '**/*.css',
        fonts:       [
                     './bower_component/font-awesome/fonts/**/*.*',
                     assets + 'fonts/**/*.*'],
        htmltemplates : [
                     client + '**/*.html',
                     '!**/index.html'],
        images:      assets + 'img/**/*.*',
        index:       client + 'index.html',
        server:      server,
        temp:        temp,//temp folder
        alljs  : [//all js to vet
                     client + '**/*.js',// define src files pattern
                     client + '*.js',//patterns to include
                     '!bower_component/**',//patterns to exclude
                     '!node_modules/**'],
        stylus : [client + '**/*.stylus',
                  client + '*.stylus'],
        autoprefixer: ['last 3 version', '> 5%'],
        getWiredepDefaultOptions : getWiredepDefaultOptions,
        js : [
            client + '**/modules/**/*module.js',
            client + '**/modules/**/*.js',
            client + '**/**/*module.js',
            client + '**/**/*.js',
            '!' + client + '**/*.spec.js'
        ],
        /**
        * template cache
        */
        templateCache : {
            file: 'templates.js',
            options: {
                module: 'angCore', //module name to hold the cached templates,
                standAlone: false,
                root: 'app/'
            }
        },
        /**
        * browser sync
        */
        browserReloadDelay: 1000,
        
        /**
        * Bower and NPM locations
        */
        bower: {
            json:         require('./bower.json'),
            directory:    './bower_component/',
            ignorePath:   '../..'
        },
        
        /**
        * Node settings
        */
        defaultPort: 3001,
        nodeServer:  server + 'app.js'
        
    };
    return config;

////////////////////////
    function getWiredepDefaultOptions(){
        var options = {
            bowerJson:  config.bower.json,
            directory:  config.bower.directory,
            ignorePath: config.bower
        };
        return options;
    }
};


