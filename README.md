##Introduction

A url shorten web site powered by node.js and express.js.

##Setup

First,i am using mysql to store the data,so you have to configure mysql in `config.js`:

     exports.config = {
      	mysqlHost:"localhost",
    	mysqlUser:"root",
    	mysqlPassword:"",
    	mysqlDB:"shorten",

	    site:'http://localhost:3000',
    	linkMinLength:10,
    	linkBits:6
    }
	
Including user,password,database etc.Create the table using `sql/st_links.sql`:

     msyql> source st_links.sql;

At last,startup the http server:

     node app.js
	 

The site is online `http://localhost:3000`.
