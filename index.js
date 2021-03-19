const express = require("express");
const app = express();
const { OPT_IN_API, sendMessageAPI } = require("./config");

app.use(express.json());
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

app.set("view engine",'ejs');
app.use('/', function(req, res, next){ 
    res.render('home'); 
    next(); 
})

app.post("/sendData",(req,res)=>{
    let body = JSON.stringify(req.body);
    console.log(`Request object is: ${body}`);
    console.log("sendMessageAPI is: ",sendMessageAPI);
    console.log("OPT_IN_API is: ",OPT_IN_API);
})

app.listen(process.env.PORT||3000,()=>{
    console.log(`Running on port ${process.env.PORT || 3000}`);
})