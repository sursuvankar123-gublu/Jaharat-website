const { business, faqs, products } = require("./data");
const { add } = require("./store");

const sessions = new Map();

function normalize(s="") { return s.toLowerCase().replace(/[^a-z0-9@+:.\s-]/g," ").replace(/\s+/g," ").trim(); }
function money(n) { return `₹${Number(n).toLocaleString("en-IN")}`; }

function productList() {
  return products.map(p => `• ${p.name} — ${money(p.price)} (ID: ${p.id})`).join("\n");
}

function faq(text) {
  const q=normalize(text);
  const hit=faqs.find(f=>f.keys.some(k=>q.includes(k)));
  return hit?.answer;
}

function menu() {
  return `Hi! 👋 Welcome to ${business.name}.\n\nI can help with:\n1️⃣ Products & prices\n2️⃣ Order questions\n3️⃣ Booking/request a callback\n4️⃣ FAQs\n5️⃣ Human support\n\nReply with a number or type your question.`;
}

function startFlow(from, type) {
  sessions.set(from,{ type, step:type==="order"?"product":"name", data:{} });
}

function flow(from,text) {
  const s=sessions.get(from); if(!s) return null;
  const t=text.trim();
  if (t.toLowerCase()==="cancel") { sessions.delete(from); return "Cancelled. Send MENU anytime to start again."; }

  if(s.type==="order") {
    if(s.step==="product"){ s.data.product=t; s.step="quantity"; return "How many would you like?"; }
    if(s.step==="quantity"){ if(!/^\\d+$/.test(t)||+t<1){return "Please enter a valid quantity, e.g. 2.";} s.data.quantity=+t; s.step="name"; return "Your name?"; }
    if(s.step==="name"){s.data.name=t;s.step="phone";return "Best phone number for the order?";}
    if(s.step==="phone"){s.data.phone=t;s.step="address";return "Delivery address?";}
    if(s.step==="address"){s.data.address=t; const item=add("orders",{from,data:s.data,status:"new"});sessions.delete(from);return `Thanks! 🎉 Order request ${item.id} has been recorded. Our team will confirm availability, total and payment details shortly.`;}
  }
  if(s.type==="booking") {
    if(s.step==="name"){s.data.name=t;s.step="date";return "Preferred date? (e.g. 12 Oct)";}
    if(s.step==="date"){s.data.date=t;s.step="time";return "Preferred time?";}
    if(s.step==="time"){s.data.time=t;s.step="purpose";return "What would you like to book/request?";}
    if(s.step==="purpose"){s.data.purpose=t;s.step="phone";return "Best phone number to confirm the request?";}
    if(s.step==="phone"){s.data.phone=t;const item=add("bookings",{from,data:s.data,status:"pending"});sessions.delete(from);return `Request received ✅ Reference: ${item.id}. We’ll confirm your booking by WhatsApp.`;}
  }
}

async function handleMessage(from,text) {
  const active=flow(from,text); if(active) return active;
  const q=normalize(text);
  if(["hi","hello","hey","menu","start"].includes(q)) return menu();
  if(q==="1" || q.includes("product") || q.includes("price") || q.includes("catalog")) return `Here’s our current catalogue:\n\n${productList()}\n\nTo place an order, reply ORDER.`;
  if(q==="2" || q==="order" || q.includes("place order")) { startFlow(from,"order"); return `Great! 🛍️ What product would you like? You can use a product ID or name.\n\n${productList()}`; }
  if(q==="3" || q.includes("book") || q.includes("appointment") || q.includes("booking")) { startFlow(from,"booking"); return "Sure! 📅 What is your name?"; }
  if(q==="4" || q.includes("faq")) return "Ask me anything about delivery, returns, payments, customisation or opening hours.";
  if(q==="5" || q.includes("human") || q.includes("agent")) return "Sure. 👤 I’ve flagged this for human support. Please leave your question and our team will respond during business hours.";
  return faq(text) || `I’m not sure about that yet. Try MENU, PRODUCT, ORDER, BOOKING, or HUMAN.\n\nFor a person, reply HUMAN.`;
}
module.exports = { handleMessage };
