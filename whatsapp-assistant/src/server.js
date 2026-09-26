require("dotenv").config();
const express=require("express");
const { handleMessage }=require("./assistant");
const { sendText }=require("./whatsapp");

const app=express();
app.use(express.json());

app.get("/health",(req,res)=>res.json({ok:true,service:"whatsapp-business-assistant"}));

app.get("/webhook",(req,res)=>{
  const mode=req.query["hub.mode"];
  const token=req.query["hub.verify_token"];
  const challenge=req.query["hub.challenge"];
  if(mode==="subscribe" && token===process.env.WHATSAPP_VERIFY_TOKEN) return res.status(200).send(challenge);
  return res.sendStatus(403);
});

app.post("/webhook",async(req,res)=>{
  res.sendStatus(200);
  try {
    const change=req.body?.entry?.[0]?.changes?.[0];
    const message=change?.value?.messages?.[0];
    if(!message || message.type!=="text") return;
    const from=message.from;
    const text=message.text?.body || "";
    const reply=await handleMessage(from,text);
    if(reply) await sendText(from,reply);
  } catch(err) {
    console.error("Webhook error:",err.response?.data || err.message);
  }
});

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`WhatsApp assistant running on port ${port}`));
