const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./dbconnect.js");
const userModel = require("./models/userModel.js");
const WhatsAppMessage = require("./models/whatsappModel.js");
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Replace with your front-end URL
}));
dbConnect();
const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

app.post("/webhook", async (req, res) => {
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
  const whatsappMessage = new WhatsAppMessage(req.body);
        await whatsappMessage.save();
        return res.status(200).send({
       success:true,
                message:"saved successfully"
        })
})

app.post("/register",async(req,res)=>{
const {
    display_name,
    user_name,
    email,
    created_at,
    updated_at,
    company,
    contact,
    currency,
    companySize,
    password
} = req.body;

const user = new userModel({display_name, user_name, email, created_at, updated_at, company, contact, currency, companySize, password});
await user.save();
return res.status(200).send({
        success:true,
        message:"Sent successfully"


})
})


app.get("/",(req,res)=>{
res.status(200).send({
        success:true,
        message:"Hello, server is working"

})
})

// Webhook verification route
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
   const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
  res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    res.sendStatus(403);
  }
  });


//listen port
app.listen(PORT,()=>{
console.log(`Server is working on ${PORT}`);

})