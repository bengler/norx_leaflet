var express = require('express');

require('coffee-script')


var routes = require('./routes');
var http = require('http');
var path = require('path');
var browserify = require('browserify-middleware');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.compress());
app.use(express.staticCache())
app.use(express.static(path.join(__dirname, 'public')));

//provide browserified versions of all the files in a directory
app.use('/js', browserify('./client', {
  grep: /\.(?:js|coffee)$/,
  transform: ['caching-coffeeify', 'brfs'],
  noParse: ['three', 'jquery']
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
