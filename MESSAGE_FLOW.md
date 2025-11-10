# 📨 Message Reception Flow

## Where Messages Are Received

The server receives messages at the **POST /api/chat** endpoint (line 750 in server.js).

---

## 🔄 Complete Message Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. FRONTEND (bot.js)                                       │
│     User types message in chat widget                       │
│     → Collects: userId, name, email, message                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  2. HTTP POST REQUEST                                       │
│     POST http://localhost:3000/api/chat                     │
│     Body: {                                                  │
│       "userId": "John_john@email.com_123_456",              │
│       "name": "John Doe",                                   │
│       "email": "john@email.com",                            │
│       "message": "Hi! Tell me about Ranvir"                 │
│     }                                                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  3. SERVER RECEIVES (Line 750)                              │
│     app.post('/api/chat', async (req, res) => {             │
│       const { userId, name, email, message } = req.body;    │
│     })                                                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  4. SECURITY CHECKS                                         │
│     ✅ Rate limiting (5 req/15s per IP)                     │
│     ✅ Input validation (non-empty strings)                 │
│     ✅ Email format check                                    │
│     ✅ Message length check (max 1000 chars)                │
│     ✅ Prompt injection detection                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  5. USER MANAGEMENT                                         │
│     → Get or create user in Supabase                        │
│     → Load last 15 messages for context                     │
│     → Save user's message to database                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  6. CEREBRAS AI PROCESSING                                  │
│     → Build system prompt (modular, context-aware)          │
│     → Send to Cerebras API                                  │
│     → Receive AI response (~200ms)                          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  7. RESPONSE & LOGGING                                      │
│     → Save assistant's response to database                 │
│     → Log interaction for analytics                         │
│     → Return JSON to frontend                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  8. FRONTEND DISPLAYS                                       │
│     Response: {                                              │
│       "message": "Hi John! 👋 I'm Lumo..."                  │
│     }                                                        │
│     → Rendered in chat widget                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📍 Exact Location in Code

### Main Endpoint (Line 750)
```javascript
/**
 * Main chat endpoint - handles frontend bot.js requests
 */
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  const ip = req.ip || req.connection.remoteAddress;
  
  try {
    log.incoming(`Chat request from IP: ${ip}`);
    
    // 1. RATE LIMITING
    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment and try again.',
      });
    }
    
    // 2. VALIDATE INPUT
    const { userId, name, email, message } = req.body;
    
    // ... validation logic ...
    
    // 7. CALL CEREBRAS AI
    const aiResponse = await callAIAPI(sanitizedMessage, messageHistory, {
      unique_id: sanitizedUserId,
      name: sanitizedName,
      email: sanitizedEmail,
    });
    
    // 10. RETURN RESPONSE
    res.json({
      message: aiResponse.message,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "I'm sorry, something went wrong. Please try again! 🙏",
    });
  }
});
```

---

## 🌐 Frontend Integration

### How bot.js Sends Messages

The frontend `bot.js` sends messages like this:

```javascript
// In frontend/bot.js (around line 6)
const API_ENDPOINT = 'http://localhost:3000/api/chat';

// When user sends message (around line 520)
async function sendMessage() {
  const message = input.value.trim();
  
  // Add user message to UI
  addUserMessage(message);
  
  // Show typing indicator
  showTyping();
  
  try {
    // SEND TO SERVER
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userData.uniqueId,      // Generated on registration
        name: userData.name,             // User's name
        email: userData.email,           // User's email
        message: message                 // The actual message text
      })
    });
    
    const data = await response.json();
    
    // Hide typing indicator
    hideTyping();
    
    // Display bot response
    addBotMessage(data.message);
    
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 🔍 Request/Response Examples

### Example 1: Simple Greeting

**Request to server:**
```http
POST http://localhost:3000/api/chat
Content-Type: application/json

{
  "userId": "John_john@email.com_1699887654321_1234",
  "name": "John Doe",
  "email": "john@email.com",
  "message": "Hi!"
}
```

**Server receives at line 750:**
```javascript
app.post('/api/chat', async (req, res) => {
  // req.body contains the above JSON
  const { userId, name, email, message } = req.body;
  // userId = "John_john@email.com_1699887654321_1234"
  // name = "John Doe"
  // email = "john@email.com"
  // message = "Hi!"
```

**Response from server:**
```json
{
  "message": "Hi John! 👋 I'm Lumo, Ranvir's AI assistant. How can I help you today?"
}
```

---

### Example 2: Complex Query

**Request:**
```json
{
  "userId": "Sarah_sarah@email.com_1699887654321_5678",
  "name": "Sarah",
  "email": "sarah@email.com",
  "message": "Tell me about Ranvir's BoardBro project and his technical skills"
}
```

**Server Processing:**
1. Receives at `/api/chat` endpoint ✅
2. Validates all fields ✅
3. Gets user from database (creates if new) ✅
4. Loads conversation history ✅
5. Detects contexts: `['project', 'boardbro', 'ai']` ✅
6. Builds system prompt with relevant info ✅
7. Calls Cerebras API ✅
8. Returns response ✅

**Response:**
```json
{
  "message": "BoardBro is an AI-powered board exam learning platform for Gen-Z students (10th, 12th standard). Ranvir worked as AI Intern from Sep-Oct 2025, building WhatsApp, Instagram, and chat support automation systems...\n\nRegarding technical skills:\n- Core: JavaScript, AI Agents, LangChain\n- Development: Multi-platform bot creation\n- AI/ML: LLM integration, prompt engineering..."
}
```

---

## 🛡️ Security at Reception Point

When a message is received, the server immediately applies security:

```javascript
// Line 756: Rate limiting
if (!checkRateLimit(ip)) {
  return res.status(429).json({
    error: 'Too many requests. Please wait a moment and try again.',
  });
}

// Line 764: Field validation
if (!userId || !name || !email || !message) {
  return res.status(400).json({
    error: 'All fields are required: userId, name, email, message',
  });
}

// Line 800: Email validation
if (!isValidEmail(sanitizedEmail)) {
  return res.status(400).json({
    error: 'Invalid email format',
  });
}

// Line 808: Message length check
if (sanitizedMessage.length > CONFIG.maxMessageLength) {
  return res.status(400).json({
    error: 'Message must be 1000 characters or less',
  });
}
```

---

## 🔌 Testing Message Reception

### Method 1: Using Demo Page
```
1. Start server: npm start
2. Open: http://localhost:3000/demo.html
3. Click chat button
4. Type message
5. Server receives at /api/chat endpoint
```

### Method 2: Using cURL
```powershell
curl -X POST http://localhost:3000/api/chat `
  -H "Content-Type: application/json" `
  -d '{
    "userId": "test_user_123",
    "name": "Test User",
    "email": "test@example.com",
    "message": "Hello Lumo!"
  }'
```

### Method 3: Using Postman
```
1. Create POST request
2. URL: http://localhost:3000/api/chat
3. Headers: Content-Type: application/json
4. Body (raw JSON):
   {
     "userId": "test_user_123",
     "name": "Test User",
     "email": "test@example.com",
     "message": "Hello!"
   }
5. Send
```

---

## 📊 What Happens in Server Logs

When a message is received, you'll see:

```
📥 INCOMING: Chat request from IP: ::1
📥 INCOMING: User: test_user_123 | Message length: 12 chars
💾 DATABASE: Fetching/creating user: test_user_123
✅ SUCCESS: Created new user: Test User (test_user_123)
💾 DATABASE: Fetching message history for user test_user_123
💾 DATABASE: Retrieved 0 messages for context
💾 DATABASE: Saved user message for user test_user_123
🧠 AI PROCESS: Calling AI API for user Test User
💭 THINKING: Analyzing message: "Hello Lumo!"
🔍 ANALYSIS: Detected contexts: general
🧠 AI PROCESS: Sending 3 messages to Cerebras AI
✅ SUCCESS: AI response generated: Hi Test User! 👋...
💾 DATABASE: Saved assistant message for user test_user_123
💬 INTERACTION: Logged chat action (sentiment: neutral)
✅ SUCCESS: Response sent to test_user_123 in 543ms
```

---

## 🎯 Summary

**Messages are received at:**
- **Endpoint**: `POST /api/chat`
- **Location**: Line 750 in `server.js`
- **URL**: `http://localhost:3000/api/chat`
- **Method**: HTTP POST
- **Content-Type**: `application/json`

**Required fields in request body:**
- `userId` - Unique user identifier
- `name` - User's name
- `email` - User's email (validated)
- `message` - The chat message (max 1000 chars)

**Response format:**
```json
{
  "message": "AI generated response text"
}
```

---

**Built by Ranvir Pardeshi** 🎓🤖
