const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "requests.json");
fs.mkdirSync(path.dirname(file), { recursive:true });

function read() {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { return { orders:[], bookings:[] }; }
}
function write(data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

function add(type, payload) {
  const data = read();
  const item = { id: Date.now().toString(36), createdAt:new Date().toISOString(), ...payload };
  data[type].push(item);
  write(data);
  return item;
}
module.exports = { add, read };
