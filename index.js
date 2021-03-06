const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})
app.listen(process.env.PORT||3000,()=>{
    console.log(`Running on port ${process.env.PORT || 3000}`);
})

app.post("/",(req,res)=>{
    console.log(req);
})
