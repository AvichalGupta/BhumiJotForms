const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT||3000,()=>{
    console.log(`Running on port ${process.env.PORT || 3000}`);
})

app.post("/sendData",(req,res)=>{
    console.log(req.params);
})
