const mongoose = require("mongoose");

const dbConnect =()=>{
try{
mongoose.connect("mongodb+srv://connect:msgtest@cluster0.du1yt.mongodb.net/");
        console.log("Database connected successfully");
}
catch(error){
console.log("Database not connected", error);
}
}
module.exports = dbConnect;