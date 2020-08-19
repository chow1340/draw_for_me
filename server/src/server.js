require('dotenv').config();
var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : process.env.DB_HOSTNAME,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
  insecureAuth : true,
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();
