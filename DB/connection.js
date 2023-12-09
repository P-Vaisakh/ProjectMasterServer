// const { default: mongoose } = require("mongoose");

const mongoose=require("mongoose")
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(err=>{
    console.log("___CONNECTED___");
}).catch(err=>{
    console.log("___CONNECTION FAILED___",err);
})


