const express = require('express');
const routes = require('./routes/route');
const cors = require("cors");
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000

// database connection
require('./config/database').connect();

app.use('/api/v1', routes)

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})

app.get('/' , (req,res)=>{
   res.send(`<h1>hello </h1>`);
})