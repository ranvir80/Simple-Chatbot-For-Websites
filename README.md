# 🤖 Lumo Chatbot API

**Production-ready Express.js server for Lumo chatbot** - Ranvir Pardeshi's personal AI assistant with enterprise-grade security and intelligent conversation capabilities.

---

## 👨‍💻 About Ranvir Pardeshi

**Ranvir Pardeshi** - 11th grade student at Sardar SK Pawar High School, Pachora, Maharashtra, India.

### 🚀 Professional Journey
- **AI Intern at BoardBro** (Sep 2025 - Oct 2025): Built and managed WhatsApp, Instagram, and chat support automation systems
- **Freelance AI Developer**: Specializes in client pricing models (Fixed vs Subscription) and automation solutions
- **Recent Achievement**: Built production-ready personal portfolio using Google AI Studio (vibe-coding, zero errors, sleek design)

### 💼 Core Expertise
- **AI Agent & Automation Development**: Building intelligent systems for the future
- **Multi-Platform Integration**: WhatsApp, Telegram, Instagram bot development
- **AI/ML Technologies**: LangChain, LLM integration, prompt engineering, conversational AI
- **Database Management**: Supabase, API integrations, automation workflows
- **Development Stack**: JavaScript, Node.js, Express, Google AI Studio, vibe-coding tools

### 🎯 Current Focus
- Managing multi-platform AI automation (WhatsApp, Instagram, chat support)
- Client pricing optimization strategies
- Advanced AI frameworks and agent SDKs
- Building Lumo - personal AI assistant with appointment booking and intelligent responses

### 🌟 Projects
- **BoardBro**: AI-powered board exam learning platform for Gen-Z students (10th, 12th standard)
  - Role: AI automation developer - built WhatsApp, Instagram, chat support systems
  - Tech: Node.js, AI/LLM, Supabase, multi-platform messaging automation
  - Vision: 24/7 AI-powered exam preparation assistance

---

## ✨ Lumo Chatbot Features

- ✅ **Production-ready security** - Helmet.js, CORS, input validation, prompt injection protection
- ✅ **Multi-AI provider support** - OpenAI, Gemini, Cerebras, Anthropic Claude compatible
- ✅ **Database integration** - Supabase for message history, user analytics, and interaction logging
- ✅ **Smart rate limiting** - 5 requests per 15 seconds per IP (configurable)
- ✅ **Context-aware responses** - Adapts to conversation history and user intent
- ✅ **Automated spam protection** - Detects and blocks malicious patterns
- ✅ **Colorful logging** - Beautiful console output for easy debugging
- ✅ **Graceful error handling** - Never leaks sensitive information
- ✅ **Compression & optimization** - Fast response times
- ✅ **Zero-downtime design** - Built for production deployment

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Cerebras API Key** - Fast & affordable AI - [Get key](https://cloud.cerebras.ai/)
- **Supabase Account** - Optional but recommended - [Sign up](https://supabase.com)

### 1. Install Dependencies

```powershell
npm install
```

### 2. Configure Environment

```powershell
# Copy example environment file
Copy-Item .env.example .env

# Edit with your settings
notepad .env
```

**Minimum required configuration:**
```env
# Cerebras AI (Primary - Fast & Affordable)
CEREBRAS_API_KEY=your-cerebras-api-key-here
CEREBRAS_MODEL=llama3.1-8b

# Security
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

**Optional (for full features):**
```env
# Database (for message history & analytics)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Cerebras Performance Tuning
CEREBRAS_MAX_TOKENS=500
CEREBRAS_TEMPERATURE=0.7
CEREBRAS_TOP_P=0.9
```

### 3. Get Your Cerebras API Key

#### 🔑 Cerebras (Primary - Recommended)
1. Visit [cloud.cerebras.ai](https://cloud.cerebras.ai/)
2. Sign up for free account
3. Navigate to API Keys section
4. Click "Create New Key"
5. Copy the key

**Why Cerebras?**
- ⚡ **7x faster** than GPT-3.5 inference
- 💰 **Very affordable** - $0.10 per million tokens
- 🎯 **High quality** - Llama 3.1 models (8B, 70B)
- 🔄 **OpenAI-compatible** - Easy to switch anytime
- 🚀 **Production-ready** - Built for scale

#### 🔑 Alternative: OpenAI (If you prefer)
1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy key (starts with `sk-`)
5. Use `AI_API_KEY` instead of `CEREBRAS_API_KEY` in .env

#### 🔑 Alternative: Google Gemini (Free tier available)
1. Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key
4. Use `AI_API_KEY` in .env

### 4. Setup Database (Optional)

If you want message history and analytics:

```powershell
# Run setup script to see SQL commands
node setup-database.js
```

Then:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project or select existing
3. Open SQL Editor
4. Copy and paste the SQL commands from setup script
5. Run to create tables
6. Add credentials to `.env`

### 5. Start the Server

```powershell
# Production mode
npm start

# Development mode (auto-reload)
# Development mode (auto-reload)
npm run dev
```

Server will start on **http://localhost:3000**

You should see:
```
═══════════════════════════════════════════════════════════════════
🤖 LUMO CHATBOT API - ONLINE
═══════════════════════════════════════════════════════════════════
Owner: Ranvir Pardeshi
Port: 3000
Environment: development
Database: Connected ✅
AI API: Configured ✅
═══════════════════════════════════════════════════════════════════
Ready to chat! 🚀
```

### 6. Test It!

Open in browser:
- **Test Page**: `http://localhost:3000/test.html`
- **Demo Page**: `http://localhost:3000/demo.html`
- **Health Check**: `http://localhost:3000/`

---

## 📡 API Documentation

### `POST /api/chat`

Main chatbot endpoint - handles all chat interactions.

#### Request Format
```json
{
  "userId": "John_john@email.com_1699887654321_1234",
  "name": "John Doe",
  "email": "john@email.com",
  "message": "Hi! Tell me about BoardBro"
}
```

#### Field Requirements
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `userId` | string | Yes | Non-empty, unique identifier |
| `name` | string | Yes | Non-empty, max 1000 chars |
| `email` | string | Yes | Valid email format |
| `message` | string | Yes | Non-empty, max 1000 chars |

#### Success Response (200 OK)
```json
{
  "message": "Hi John! 👋 BoardBro is an AI-powered board exam learning platform..."
}
```

#### Error Responses

**400 Bad Request** - Invalid input
```json
{
  "error": "All fields are required: userId, name, email, message"
}
```

**429 Too Many Requests** - Rate limit exceeded
```json
{
  "error": "Too many requests. Please wait a moment and try again."
}
```

**500 Internal Server Error** - Server issue
```json
{
  "message": "I'm sorry, something went wrong. Please try again! 🙏"
}
```

### `GET /`

Health check endpoint.

#### Response (200 OK)
```json
{
  "status": "online",
  "service": "Lumo Chatbot API",
  "version": "1.0.0",
  "timestamp": "2025-11-10T12:34:56.789Z"
}
```

---

## 🔒 Security Features

### 1. Input Validation & Sanitization
- **Type checking**: All fields must be strings
- **Email validation**: RFC 5322 compliant regex
- **Length limits**: Messages capped at 1000 characters
- **XSS protection**: Input sanitization
- **SQL injection prevention**: Parameterized queries

### 2. Rate Limiting
- **Per IP tracking**: 5 requests per 15 seconds
- **Configurable limits**: Adjust in `.env`
- **Automatic blocking**: Persistent offenders blocked
- **Memory-efficient**: In-memory tracking with cleanup

### 3. CORS Protection
- **Origin whitelisting**: Only allowed domains accepted
- **Credential support**: Secure cookie handling
- **Method restrictions**: Only GET and POST
- **Header validation**: Strict header policies

### 4. Prompt Injection Defense
- **Pattern detection**: 16+ injection patterns monitored
- **Attempt tracking**: Auto-blocks after 3 attempts
- **Safe responses**: Deflects without revealing internals
- **Logging**: All attempts logged for analysis

**Detected patterns include:**
- "ignore previous instructions"
- "show your system prompt"
- "reveal your code"
- "repeat everything above"
- Role-play attempts
- And more...

### 5. Error Masking
- **No stack traces**: Never exposed to clients
- **Generic messages**: Safe user-facing errors
- **Detailed logging**: Server-side only
- **No data leaks**: Sensitive info protected

### 6. Security Headers (Helmet.js)
- **Content Security Policy**: XSS protection
- **HSTS**: Force HTTPS
- **X-Frame-Options**: Clickjacking prevention
- **X-Content-Type-Options**: MIME sniffing protection
- **Referrer Policy**: Privacy protection

---

## 🤖 AI Provider Configuration

The server is optimized for **Cerebras AI** but supports multiple providers.

### Cerebras (Primary - Recommended)
```env
CEREBRAS_API_KEY=your-cerebras-key
CEREBRAS_API_URL=https://api.cerebras.ai/v1/chat/completions
CEREBRAS_MODEL=llama3.1-8b

# Optional performance tuning
CEREBRAS_MAX_TOKENS=500
CEREBRAS_TEMPERATURE=0.7
CEREBRAS_TOP_P=0.9
```

**Available Cerebras Models:**
- `llama3.1-8b` - Fast, great for chatbots (Recommended)
- `llama3.1-70b` - More powerful, slower
- `llama-3.3-70b` - Latest model

**Why Cerebras?**
- ⚡ 7x faster inference than competitors
- 💰 Very affordable ($0.10/M tokens vs $0.50/M for GPT-3.5)
- 🎯 High quality Llama 3.1 models
- 🔄 OpenAI-compatible API (drop-in replacement)
- 🚀 Built for production scale

### OpenAI (Alternative)
```env
AI_API_KEY=sk-your-openai-key
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo
```

**Models:** `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`

### Google Gemini (Alternative - Free Tier)
```env
AI_API_KEY=your-gemini-key
AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
AI_MODEL=gemini-pro
```

**Models:** `gemini-pro`, `gemini-pro-vision`

### Anthropic Claude (Alternative)
```env
AI_API_KEY=your-anthropic-key
AI_API_URL=https://api.anthropic.com/v1/messages
AI_MODEL=claude-3-haiku-20240307
```

**Models:** `claude-3-haiku`, `claude-3-sonnet`, `claude-3-opus`

---

## 🗄️ Database Schema

### Tables

#### `users` - User Information
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  unique_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);
```

#### `messages` - Chat History
```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  unique_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);
```

#### `interaction_logs` - Analytics
```sql
CREATE TABLE interaction_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  unique_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  details JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

#### `blocked_users` - Spam Protection
```sql
CREATE TABLE blocked_users (
  id BIGSERIAL PRIMARY KEY,
  unique_id TEXT UNIQUE NOT NULL,
  reason TEXT,
  blocked_at TIMESTAMPTZ DEFAULT NOW(),
  blocked_by TEXT DEFAULT 'system'
);
```

### Data Retention
- **Message limit**: 50 messages per user
- **Cleanup**: Automatic removal of old messages
- **Analytics**: Retained indefinitely
- **Blocked users**: Manual removal only

---

## 🎨 Frontend Integration

### Update Your HTML

1. **Edit `frontend/bot.js`** (line 6):
```javascript
// Change this to your server URL
const API_ENDPOINT = 'http://localhost:3000/api/chat';
// For production: 'https://yourdomain.com/api/chat'
```

2. **Add to your HTML**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome</h1>
  
  <!-- Chatbot widget appears bottom-left -->
  <script src="frontend/bot.js"></script>
</body>
</html>
```

### Configure CORS

Add your frontend domain to `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com,https://www.yourdomain.com
```

### Test Locally

1. Start server: `npm start`
2. Open `demo.html` in browser
3. Chat button appears bottom-left
4. Click to start chatting!

---

## ⚙️ Configuration Options

### Rate Limiting

Customize in `.env`:
```env
RATE_LIMIT_MAX=5           # Requests per window
RATE_LIMIT_WINDOW_MS=15000 # Window duration (milliseconds)
```

**Examples:**
- Strict: `RATE_LIMIT_MAX=3` and `RATE_LIMIT_WINDOW_MS=10000` (3 req/10s)
- Relaxed: `RATE_LIMIT_MAX=10` and `RATE_LIMIT_WINDOW_MS=30000` (10 req/30s)

### Message Limits

```env
MAX_MESSAGE_LENGTH=1000         # Max chars per message
MESSAGE_HISTORY_LIMIT=50        # Total messages stored per user  
CONTEXT_MESSAGES_LIMIT=15       # Messages sent to AI for context
```

### Server Settings

```env
PORT=3000                       # Server port
NODE_ENV=production             # Environment (development/production)
```

---

## 📊 Logging & Monitoring

### Log Categories

The server uses **colorful console logging**:

| Icon | Category | Description |
|------|----------|-------------|
| 📥 | **INCOMING** | Incoming requests |
| 📤 | **OUTGOING** | Outgoing responses |
| 🧠 | **AI PROCESS** | AI API calls |
| 💾 | **DATABASE** | Database operations |
| 💬 | **INTERACTION** | User interactions |
| 🔒 | **SECURITY** | Security events |
| ⚠️ | **SPAM** | Rate limiting |
| 🚫 | **BLOCKED** | Blocked users |
| ❌ | **ERROR** | Errors |
| ✅ | **SUCCESS** | Successful operations |
| ℹ️ | **INFO** | General information |
| 💭 | **THINKING** | AI analysis |
| 🔍 | **ANALYSIS** | Context detection |

### Example Output

```
📥 INCOMING: Chat request from IP: 192.168.1.100
💭 THINKING: Analyzing message: "Tell me about BoardBro"
🔍 ANALYSIS: Detected contexts: project
🧠 AI PROCESS: Calling AI API for user John Doe
💾 DATABASE: Saved user message for user John_john@email.com_123
✅ SUCCESS: Response sent to John_john@email.com_123 in 842ms
```

---

## 🚀 Deployment

### Railway (Recommended)

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in Railway dashboard
5. Deploy automatically!

**Environment variables to add:**
- `AI_API_KEY`
- `AI_API_URL`
- `AI_MODEL`
- `ALLOWED_ORIGINS`
- `SUPABASE_URL` (optional)
- `SUPABASE_KEY` (optional)

### Render

1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Create Web Service

### Vercel

1. Install CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Add environment variables in Vercel dashboard
5. Redeploy: `vercel --prod`

### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set config vars: `heroku config:set AI_API_KEY=your-key`
5. Deploy: `git push heroku main`

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t lumo-chatbot .
docker run -p 3000:3000 --env-file .env lumo-chatbot
```

---

## 🐛 Troubleshooting

### Server Won't Start

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**: Port 3000 is in use. Either:
- Kill the process: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`
- Or change port in `.env`: `PORT=3001`

---

### No AI API Key Configured

**Problem**: Server starts but responses say "demo mode"

**Solution**: Add Cerebras API key to `.env`:
```env
CEREBRAS_API_KEY=your-actual-cerebras-key-here
```

Then restart server: `npm start`

Get your key from: [cloud.cerebras.ai](https://cloud.cerebras.ai/)

---

### Database Features Disabled

**Problem**: "Database: Disabled" in startup message

**Solution**: Add Supabase credentials to `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

Get these from: [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API

---

### CORS Errors in Browser

**Problem**: `Access to fetch at 'http://localhost:3000/api/chat' has been blocked by CORS policy`

**Solution**: Add your frontend URL to `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080,https://yourdomain.com
```

Restart server after changing.

---

### Rate Limit Exceeded

**Problem**: `429 Too Many Requests`

**Solution**: Either:
- Wait 15 seconds and try again
- Or increase limits in `.env`:
```env
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=30000
```

---

### Chatbot Doesn't Appear

**Problem**: No chat button on webpage

**Solutions**:
1. Check browser console for errors (F12)
2. Verify `frontend/bot.js` path is correct
3. Ensure server is running: `http://localhost:3000/`
4. Check API_ENDPOINT in bot.js matches server URL

---

### AI Responses are Generic

**Problem**: Bot gives basic responses, not personalized

**Solution**: Server works! The AI just needs more context. Try asking about:
- "Tell me about Ranvir's BoardBro project"
- "What AI projects has Ranvir worked on?"
- "How can I contact Ranvir?"

---

## 🏗️ Architecture

### Request Flow

```
Browser
  ↓
  POST /api/chat
  ↓
Rate Limit Check (IP-based)
  ↓
Input Validation & Sanitization
  ↓
Get/Create User (Supabase)
  ↓
Load Message History (last 15)
  ↓
Detect Context & Intent
  ↓
Build System Prompt (Modular)
  ↓
Call AI API (OpenAI/Gemini/etc)
  ↓
Save Messages (User + Assistant)
  ↓
Log Interaction (Analytics)
  ↓
Return JSON Response
  ↓
Browser (Render in UI)
```

### Security Layers

```
1. CORS Protection → Only allowed origins
2. Helmet.js → Security headers
3. Rate Limiting → Per-IP tracking
4. Input Validation → Type & format checks
5. Prompt Injection Detection → Pattern matching
6. Error Masking → No information leaks
7. Database Security → Parameterized queries
```

### Modular System Prompt

```
Always Loaded (Core):
├── core_identity
├── security_shield
├── communication
├── injection_defense
└── fallback

Conditionally Loaded (Context-based):
├── ranvir_profile (general questions)
├── ranvir_skills (tech questions)
├── professional_experience (career questions)
├── recent_achievements (latest work)
├── boardbro_info (project questions)
├── boardbro_technical (technical details)
├── ai_interests (AI development)
├── student_life (personal questions)
└── contact_info (contact requests)
```

This token-efficient approach loads only relevant context, reducing API costs and improving response quality.

---

## 📚 Tech Stack

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web framework
- **Helmet.js** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Compression** - Response compression

### Database
- **Supabase** - PostgreSQL database
- **@supabase/supabase-js** - Client library

### AI Integration
- **OpenAI API** - GPT models
- **Google Gemini API** - Gemini models
- **Cerebras API** - Llama models
- **Anthropic API** - Claude models

### Security
- **dotenv** - Environment variable management
- **express-rate-limit** - Rate limiting
- **Input validation** - Custom middleware
- **Prompt injection detection** - Pattern matching

---

## 📄 License

ISC License

---

## 🤝 About the Creator

**Built with ❤️ by Ranvir Pardeshi**

- 🎓 11th Grade Student, Sardar SK Pawar High School, Pachora
- 🤖 AI Agent & Automation Developer
- 💼 Former AI Intern at BoardBro (Sep-Oct 2025)
- 🚀 Freelance AI Developer & Consultant

### Connect
- 💬 WhatsApp: Available for project discussions
- 🌐 Portfolio: Built with Google AI Studio (zero errors!)
- 📧 Email: Available through chatbot
- 🤝 Open to: Collaborations, AI projects, automation consulting

### Expertise
- Multi-platform AI automation (WhatsApp, Telegram, Instagram)
- Conversational AI and chatbot development
- Client pricing strategy optimization
- Educational technology solutions

---

## 🎯 What Makes Lumo Special?

1. **Production-Ready**: Not a demo - built for real-world deployment
2. **Enterprise Security**: Prompt injection defense, rate limiting, error masking
3. **Multi-AI Support**: Works with OpenAI, Gemini, Cerebras, Claude
4. **Context-Aware**: Remembers conversation history and adapts responses
5. **Developer-Friendly**: Beautiful logging, easy configuration, clear docs
6. **Ranvir's Architecture**: Same system design as his successful WhatsApp bot
7. **Battle-Tested**: Proven in production at BoardBro with thousands of interactions

---

## 📞 Support & Contact

### Need Help?
1. Check the troubleshooting section
2. Review server logs for detailed errors
3. Verify all environment variables are set
4. Test with `demo.html` to isolate issues

### Want to Collaborate?
Ranvir is available for:
- AI automation projects
- Chatbot development
- Multi-platform integration
- Client pricing consultation
- Educational technology solutions

Use the chatbot to get in touch!

---

**🚀 Ready to deploy your intelligent chatbot? Let's go!**

```powershell
npm install
Copy-Item .env.example .env
# Add your API keys to .env
npm start
```

**Built by Ranvir Pardeshi - 11th Grade Student & AI Developer** 🎓🤖
