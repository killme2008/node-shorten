var mysql = require('mysql');

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

function Storage(config){
	var connection = mysql.createConnection({
		host     : config.mysqlHost,
		user     : config.mysqlUser,
		password : config.mysqlPassword,
		database : config.mysqlDB
	});

	connection.connect();
	handleDisconnect(connection);
	this.connection = connection;
}


Storage.prototype.save = function(link, callback){
	this.connection.query('INSERT INTO st_links SET ?', link, callback);
}

Storage.prototype.getLinkById = function(id, callback){
	this.connection.query('SELECT * from st_links where link_id = ?', id, callback);
}

Storage.prototype.getLinkByURL = function(url, callback){
	this.connection.query('SELECT * from st_links where url = ?', url, callback);
}

Storage.prototype.getMaxLink = function(callback){
	this.connection.query('SELECT * from st_links order by id desc limit 1', callback);
}

exports.createStorage = function(config){
	return new Storage(config);
}
