const express= require('express');
const {Client} = require("pg")

//connection
const client=new Client({
	host:"localhost",
	user:"postgres",
	port:5432,
	password:"1234",
	database:"postgres",
})

module.exports = client;