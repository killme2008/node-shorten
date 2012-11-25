var storage = require('../storage')
, linkId = require('../id')
, config = require('../config').config
, util = require('util')
, nurl = require('url');

var id = linkId.createId();
var db = storage.createStorage(config);

db.getMaxLink(function(err,rt){
	if(err){
		console.log("Query maxium link id failed:%s",err);
	}else{
		if(rt.length > 0){
			var link = rt[0];
			id = linkId.createId(link.link_id);
			console.log("Initial link id is %s",link.link_id);
		}
	}
});

function formatURL(url){
	var urlObj = nurl.parse(url,false,true);
	if(urlObj.protocol != 'http:' && urlObj.protocol != 'https:' && urlObj.protocol != 'ftp:')
		throw new Error('Invalid url,only supports http/https protocols');
	return nurl.format(urlObj);
}

//Status codes.
var SUCCESS = 0;
var EXISTS_URL = 1;
var NOT_SHORTEN = 2;
var EMPTY_URL = 3;
var INVALID_URL = 4;
var INTERNAL_ERR = 5;

exports.redirect = function(req,res){
	var link_id = req.params.id;
	db.getLinkById(link_id, function(err,rows){
		if(err || rows.length == 0){
			console.log("Could not find link for %s", link_id);
			res.render('index',{ error: util.format("Could not find link by id %s",link_id)});
			return;
		}else{
			var link = rows[0];
			res.redirect(link.url);
		}
	});
}

exports.add = function(req,res){
	if(!req.body.url)
		res.send({status:EMPTY_URL, error:'url is empty'});
	try{
		var url = req.body.url;
		if( url.length < config.linkMinLength || url.indexOf(config.site) == 0){
			//Too small link or it's been shorten by this web site,we don't want to short it.
			res.send({status:NOT_SHORTEN, result:url});
			return;
		}
		url = formatURL(url);
		db.getLinkByURL(url,function(err,rows){
			if(err){
				console.log("Query link by url failed:%s",err);
				res.send({status:INTERNAL_ERR, error:'Internal server error,please try it later'});
				return;
			}
			if(rows.length > 0){
				var link  = rows[0];
				res.send({status:EXISTS_URL, result:util.format("%s/%s",config.site,link.link_id)});
			}else{
				var link_id = id.nextId();
				var link = {'link_id':link_id, 'url':url, 'save_date':new Date()};
				db.save(link, function(err,rt){
					if(err){
						console.log("Save link failed:%s",err);
						res.send({status:INTERNAL_ERR, error:'Internal server error,please try it later'});
						return;
					}
					if(rt.affectedRows == 1){
						res.send({status:SUCCESS,result:util.format("%s/%s",config.site,link_id)});
					}else{
						res.send({status:INTERNAL_ERR, error:'Internal server error,please try it later'});
					}
				});
			}
		});
	}catch(e){
		console.log("Add link failed,expcetion:%s %s",e.message,e.stack);
		res.send({status:INVALID_URL, error:'Invalid url,failed to be shorten.'});
	}
}