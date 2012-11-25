var util = require('util')
, config = require('./config').config;

exports.todayKey = function(){
	var today = new Date();
	return util.format("%d-%d-%d", today.getFullYear(), today.getMonth()+1, today.getDate());
}

exports.todayTopLinks = function(cache, n, callback){
	cache.zrevrange(this.todayKey(), 0 , n , function(err,rt){
		var links = [];
		if(!err){
			rt.forEach(function(e){
				links.push(util.format("%s/%s", config.site, e));
			});
		}
		if(callback)
			callback(err,links);
	});
}

function millisecondsUntilMidnight() {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return (midnight.getTime() - new Date().getTime());
}

exports.scheduleAtMidnight = function(callback, delay, args){
	setTimeout(callback, millisecondsUntilMidnight() + delay, args);
}

