module.exports = {
  business: {
    name: process.env.BUSINESS_NAME || "JAHARAT",
    phone: process.env.BUSINESS_PHONE || "",
    hours: "Mon-Sat, 10:00 AM-7:00 PM IST"
  },
  faqs: [
    { keys:["shipping","delivery","deliver"], answer:"We offer delivery across India. Delivery time and charges depend on your location and order." },
    { keys:["return","refund","exchange"], answer:"Returns/exchanges depend on product condition and our current policy. Please share your order number and we’ll check it for you." },
    { keys:["payment","pay","upi","cod"], answer:"We can accept online payments. COD availability depends on the delivery location." },
    { keys:["custom","customize","customisation"], answer:"For custom jewellery requests, tell us the design, size and preferred material. Our team will confirm feasibility and price." },
    { keys:["hours","open","timing"], answer:"Our support hours are Mon-Sat, 10:00 AM-7:00 PM IST." }
  ],
  products: [
    { id:"JR001", name:"Oxidized Jhumka", price:799 },
    { id:"JR002", name:"Oxidized Nose Ring", price:399 },
    { id:"JR003", name:"Oxidized Necklace", price:1299 },
    { id:"JR004", name:"Nose Septum", price:499 }
  ]
};
