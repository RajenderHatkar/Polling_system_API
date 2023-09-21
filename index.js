const express=require("express");
const port=8001;
const mongoose = require('mongoose')
const db = require('./config/mongoose');

const cookieParser = require('cookie-parser')
const app=express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//route setup
app.use('/',require('./routers/index'));



app.listen(port, (err)=>{
    if(err){
        console.log("something went wrong for appication to Run :",err);
       
    }
    console.log(" Application running on port:" ,port);
})