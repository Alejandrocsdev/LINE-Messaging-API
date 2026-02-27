# LINE Messaging API — Express Integration

A lightweight Node.js + Express server that integrates with the LINE Messaging API.  
It verifies webhook requests, extracts group and user information from incoming events, stores them in a MySQL database, and supports sending push messages to LINE groups.

This project is designed for environments where the LINE free plan limits proactive retrieval of group and user data. Instead, the server collects these identifiers from webhook events when users interact with the bot.

---

## ✨ Features

- 🔐 Webhook signature verification using HMAC-SHA256 (`lineGuard`)
- 👥 Automatic user & group discovery from incoming messages
- 🗄️ MySQL persistence of users, groups, and relationships
- 🔗 Many-to-many mapping between users and groups
- 💬 Push message support to groups
- 🧩 Clean Controller–Service architecture
- 🛡️ Async error handling middleware
- 🧪 Ready for local development with ngrok

---

## 🔐 Webhook Security — lineGuard

All webhook requests are verified using LINE's signature mechanism.

```
X-Line-Signature header
→ HMAC-SHA256 verification
→ Reject if invalid
```

Middleware example:

```js
router.post('/webhook', lineGuard, lineController.webhook);
```

---

## 📥 Webhook Processing Flow

When a message event is received from a group:

```
LINE Platform
      ↓
POST /api/line/webhook
      ↓
Verify signature
      ↓
Extract groupId & userId
      ↓
Fetch group name (if new)
      ↓
Fetch user display name (if new)
      ↓
Store in database
      ↓
Create User–Group relationship
```

---

## 💬 Sending Messages

Push messages can be sent to a group using:

```
POST /api/line/message
```

Request body:

```json
{
  "groupId": "GROUP_ID",
  "text": "Hello from the bot!"
}
```

---

## 👥 User & Group Management Endpoints

### Get all users

```
GET /api/line/user
```

### Get all groups

```
GET /api/line/group
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000

LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token

BASE_URL=https://api.line.me/v2/bot
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Sequelize (MySQL)
- LINE Messaging API
- Crypto (HMAC verification)

---

## 📄 License

MIT License

---

## 📌 Author

Alex Chen
