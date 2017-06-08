const http=require("http");
const express=require("express");
const  url=require("url");
const qs=require("querystring");


var app=express();

http.createServer(app).listen(8080);

app.use(express.static("public"));




