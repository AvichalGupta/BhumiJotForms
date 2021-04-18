const express = require("express");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config()
const id = process.env.id;
const password = process.env.password;
const message = `Thank you for choosing to volunteer with Bhumi. Our volunteers form the heartbeat of Bhumi.   

There are many ways in which you can get involved and ensure that our efforts move forward. However, you can start by choosing to volunteer

- for the education of children through Ignite. You will have to attend a mandatory orientation.
- for any of the civic initiatives through Catalyse. Sign up through one of the emails you will receive.`;
const encodedMsg = encodeURI(message);

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

async function optInFunction(url){
    try {
        //DO NOT change the method or the header mentioned below.
        const fetchResponse = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        
        // the response will be a json if everything goes smoothly.
        const responseData = await fetchResponse.json();
        
        //Uncomment and re-run to view errors in fetch request. 
        console.log("responseData: ",responseData);

        //Uncomment to check response behaviour
        console.log("responseData is: ",JSON.stringify(responseData));
        // console.log("responseData is: ",JSON.stringify(responseData.data));

        //check implemented for unique user mobile number.
        switch(responseData.response.id){
            case "100": console.log("Internal Server Error from Gupshup.");
            break;
            case "101": console.log(responseData.details);
            break;
            case "102": console.log("Invalid credentials");
            break;
            case "103": console.log(responseData.details);
            break;
            case "105": console.log(responseData.details);
            break;
            case "106": console.log("Invalid parameter values in URL");
            break;
            case "175": console.log(responseData.details);
            break;
            default: 
            if(responseData.data.response_messages[0].status==="success"){
                return true;
            }else{
                return false;
            }
            // console.log("Invalid response")
            break;
        }        
    }catch(err){
        console.log(`Error in first API is: ${err}`);
    }
}
async function sendMessageFunction(url){
    try {
        const fetchResponse = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        const responseData = await fetchResponse.json();
        console.log("responseData: ",JSON.stringify(responseData));
        // if(responseData.data.response_messages[0].status==="success"){
        //     return true;
        // }else{
        //     return false;
        // }
    }catch(err){
        console.log(`Error in second API is: ${err}`);
    }
}

app.post("/sendData",async (req,res)=>{
    // DO NOT change the keys names.
    const {name,email,phonenumber9,permissionto} = req.body;
    const phoneArr = phonenumber9.split(" ");
    const countryCode = phoneArr[0].split("+");
    const phone_num = countryCode[1]+phoneArr[1];
    const OPT_IN_API = `https://media.smsgupshup.com/GatewayAPI/rest?method=OPT_IN&format=json&userid=${id}&password=${password}&phone_number=${phone_num}&v=1.1&auth_scheme=plain&channel=WHATSAPP`;
    const sendMessageAPI = `https://media.smsgupshup.com/GatewayAPI/rest?method=SendMessage&format=json&userid=${id}&password=${password}&send_to=${phone_num}&v=1.1&auth_scheme=plain&msg_type=HSM&msg=${encodedMsg}`;
    
    // This condition checks if the user has chosen "YES" in the permission to contact option of the form.
    if(permissionto==="Yes"){
        const optedIn = await optInFunction(OPT_IN_API);
        if(optedIn){
            sendMessageFunction(sendMessageAPI);
        }else{
            console.log("User has already opted-in");
            sendMessageFunction(sendMessageAPI);
        }
    }else{
        console.log("User has chosen not to opt-in");
    }
})

app.listen(process.env.PORT||3000,()=>{
    console.log(`Running on port ${process.env.PORT || 3000}`);
})