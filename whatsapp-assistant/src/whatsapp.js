const axios = require("axios");

const version = process.env.WHATSAPP_API_VERSION || "v23.0";
const url = () => `https://graph.facebook.com/${version}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

async function sendText(to, body) {
  await axios.post(url(), {
    messaging_product:"whatsapp",
    to,
    type:"text",
    text:{ body }
  }, {
    headers:{ Authorization:`Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type":"application/json" }
  });
}
module.exports = { sendText };
