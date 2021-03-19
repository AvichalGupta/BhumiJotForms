const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { OPT_IN_API, sendMessageAPI } = require("./config");

const fetchData = {
    method:"OPT_IN",
    format:"json",
    userid: 2000194659,
    password: "htPtqTeC",
    phone_number: 919777777778,
    v:1.1,
    auth_schema:"plain",
    channel:"WHATSAPP"
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

app.set("view engine",'ejs');
app.use('/', function(req, res, next){ 
    res.render('home'); 
    next(); 
})

app.post("/sendData",async (req,res)=>{
    // let body = JSON.stringify(req.body);
    // console.log(`Request object is: ${body}`);
    // console.log("sendMessageAPI is: ",sendMessageAPI);
    console.log("OPT_IN_API is: ",OPT_IN_API);
    // console.log("OPT_IN_API data is: ",fetchData);
    const {name,phonenumber,email,permissionto} = req.body;
    // console.log(`Name: ${name}, Email:${email}, Phone:${phonenumber}, OptedIn:${permissionto}`);
    if(permissionto==="Yes"){
        try {
            const fetchResponse = await fetch(OPT_IN_API
                ,{
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body:JSON.stringify(fetchData)
            }
            )
            console.log(`Result of first API is: ${JSON.stringify(fetchResponse)}`)
            // return fetchResponse.json()
        }catch(err){
            console.log(`Error in first API is: ${JSON.stringify(err)}`);
        }
        // .then((response)=>{
        //     console.log(`Result of first API is: ${JSON.stringify(response)}`);
        //     // return response.json();
        // }).catch((err)=>{
        //     console.log(`Error in first API is: ${JSON.stringify(err)}`);
        // })
    }
})

app.listen(process.env.PORT||3000,()=>{
    console.log(`Running on port ${process.env.PORT || 3000}`);
})