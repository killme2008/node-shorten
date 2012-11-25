
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, link = require('./routes/link')
, http = require('http')
, config = require('./config').config
, redis = require('redis')
, utils = require('./utils')
, path = require('path');

var app = express();

var cache = redis.createClient(config.redisPort, config.redisHost);

function startTopLinksKeyScheduler(){
	utils.scheduleAtMidnight(function(key){
		cache.del(key);
		startTopLinksKeyScheduler();
	}, 60*60*1000, utils.todayKey());
}

startTopLinksKeyScheduler();

app.configure(function(){
	app.set('port', process.env.PORT || config.port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/link/add', link.add);
app.get('/:id', link.redirect);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
