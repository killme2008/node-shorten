## Introduction

A URL shorten web site powered by Node.js and Express.js.

## Setup

First, I am using MySQL (data storage) and Redis (cache), so you have to configure MySQL/Redis in `config.js`:

     exports.config = {
      	mysqlHost:"localhost",
    	mysqlUser:"root",
    	mysqlPassword:"",
    	mysqlDB:"shorten",
		
    	redisHost:'localhost',
	    redisPort:6379,

	    site:'http://localhost:3000',
    	linkMinLength:10,
    	linkBits:6
    }
	
It includes the user, password, database, Redis host/port, etc. Create the table using `sql/st_links.sql` before startup:

     msyql> source st_links.sql;
	 
Second, you must install [Node.js](http://nodejs.org), then install Node modules by:

	 sudo npm install -d

Last, startup the HTTP server:

	 sh start.sh

The site is online at `http://localhost:3000`.

## Chrome extension

You can install the chrome extension at `extensions/chrome`. It will use the API to short the URL in the current Chrome tab address bar.


