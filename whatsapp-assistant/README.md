# WhatsApp Business Assistant

A small-business WhatsApp assistant that handles:
- Product/catalog and price questions
- FAQs (delivery, returns, payments, customisation, hours)
- Order requests
- Booking/callback requests
- Human-support handoff messaging

## Stack
Node.js + Express + Meta WhatsApp Cloud API. Request data is stored in a local JSON file for this starter.

## 1. Install
\`\`\`bash
cd whatsapp-assistant
npm install
\`\`\`

## 2. Configure
Copy `.env.example` to `.env` and set:
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- business details

Never commit `.env` or access tokens.

## 3. Run
\`\`\`bash
npm start
\`\`\`

The server exposes:
- `GET /health`
- `GET /webhook` for Meta verification
- `POST /webhook` for incoming WhatsApp messages

## 4. Connect Meta WhatsApp
In Meta for Developers, create/configure a WhatsApp Cloud API app and set the webhook callback URL to:

`https://YOUR-DOMAIN/webhook`

Use the same verify token as `WHATSAPP_VERIFY_TOKEN`, subscribe the WhatsApp phone number to message events, and provide the generated access token + phone number ID in `.env`.

## 5. Conversation examples

**Customer:** Hi  
**Assistant:** Shows the main menu.

**Customer:** product  
**Assistant:** Shows the catalogue and prices.

**Customer:** order  
**Assistant:** Collects product, quantity, name, phone and delivery address, then saves an order request.

**Customer:** booking  
**Assistant:** Collects name, date, time, request purpose and phone, then saves a booking request.

**Customer:** What are your delivery options?  
**Assistant:** Answers from `src/data.js`.

## Customisation
Edit `src/data.js` to change:
- products and prices
- FAQs
- business name/hours

For production, replace `src/store.js` with PostgreSQL, MySQL, Supabase, or another durable database and add authentication for any admin dashboard.

## Security
- Keep tokens in environment variables.
- Add rate limiting before public deployment.
- Validate webhook signatures for production.
- Do not store unnecessary customer data.
- Add an authenticated admin endpoint/dashboard before exposing request data.
