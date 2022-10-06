const express= require('express');
const {Client} = require("pg")

//connection
const client=new Client({
	host:"localhost",
	user:process.env.USER,
	port:5432,
	password:process.env.PASSWORD,
	database:process.env.DB
})

module.exports = client;