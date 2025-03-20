const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("connection successfull")})
    .catch((error)=>{
        console.log(error)
        process.exit(1);
    });
}