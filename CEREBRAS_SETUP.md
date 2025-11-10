# ⚡ Cerebras Setup Guide

## Why Cerebras for Your Chatbot?

Cerebras is the **fastest and most affordable** AI provider for production chatbots:

### 🚀 Performance
- **7x faster** inference than GPT-3.5
- **~200ms** average response time
- Built on custom AI chips for speed

### 💰 Cost
- **$0.10 per million tokens** (5x cheaper than GPT-3.5)
- No hidden fees
- Pay only for what you use

### 🎯 Quality
- **Llama 3.1** models (Meta's latest)
- Comparable quality to GPT-3.5
- Great for conversational AI

### 🔄 Compatibility
- **OpenAI-compatible API**
- Drop-in replacement
- Easy migration

---

## 🔑 Get Your Cerebras API Key (2 Minutes)

### Step 1: Sign Up
1. Go to [cloud.cerebras.ai](https://cloud.cerebras.ai/)
2. Click "Sign Up" or "Get Started"
3. Create account (email + password)
4. Verify your email

### Step 2: Create API Key
1. Log in to dashboard
2. Navigate to "API Keys" section
3. Click "Create New Key"
4. Give it a name (e.g., "Lumo Chatbot")
5. **Copy the key** (starts with `csk-...`)
6. ⚠️ **Save it securely** - you won't see it again!

### Step 3: Add to Your Project
```powershell
# Copy the example file
Copy-Item .env.example .env

# Open in editor
notepad .env
```

Replace this line:
```env
CEREBRAS_API_KEY=your-cerebras-api-key-here
```

With your actual key:
```env
CEREBRAS_API_KEY=csk-abc123xyz...your-actual-key
```

Save and close.

---

## 🚀 Start Your Server

```powershell
npm install
npm start
```

You should see:
```
═══════════════════════════════════════════════════════════════════
🤖 LUMO CHATBOT API - ONLINE
═══════════════════════════════════════════════════════════════════
Owner: Ranvir Pardeshi
Port: 3000
Environment: development
Database: Disabled (set SUPABASE credentials)
AI Provider: Cerebras AI ✅
AI Model: llama3.1-8b
═══════════════════════════════════════════════════════════════════
Ready to chat! 🚀
```

---

## 🧪 Test It

Open in browser:
```
http://localhost:3000/demo.html
```

Click the chat button and try:
- "Hi! Tell me about Ranvir"
- "What is BoardBro?"
- "What are Ranvir's technical skills?"

You'll get **instant responses** powered by Cerebras! ⚡

---

## 🎛️ Cerebras Configuration

### Available Models

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| `llama3.1-8b` | ⚡⚡⚡ Fastest | 🎯 Great | Chatbots (Recommended) |
| `llama3.1-70b` | ⚡⚡ Fast | 🎯🎯 Better | Complex queries |
| `llama-3.3-70b` | ⚡⚡ Fast | 🎯🎯🎯 Best | Latest & greatest |

### Performance Tuning

In `.env`, adjust these for your needs:

```env
# Response length (default: 500)
CEREBRAS_MAX_TOKENS=500

# Creativity (0.0 = deterministic, 1.0 = creative)
CEREBRAS_TEMPERATURE=0.7

# Nucleus sampling (0.0-1.0)
CEREBRAS_TOP_P=0.9
```

**Recommendations:**
- **Chatbots**: `TEMPERATURE=0.7`, `TOP_P=0.9` ✅
- **Factual Q&A**: `TEMPERATURE=0.3`, `TOP_P=0.8`
- **Creative writing**: `TEMPERATURE=0.9`, `TOP_P=0.95`

---

## 💡 Cost Estimation

### Example: 1000 Users Per Month

**Average conversation:**
- User message: ~50 tokens
- Bot response: ~150 tokens
- Total per message: ~200 tokens

**If each user sends 10 messages:**
- 1000 users × 10 messages × 200 tokens = 2M tokens
- **Cost: $0.20/month** 🎉

Compare to GPT-3.5:
- Same usage: $1.00/month (5x more expensive)

---

## 🔄 Switching Providers

Want to try OpenAI or Gemini? Easy!

### Switch to OpenAI
```env
# Comment out Cerebras
# CEREBRAS_API_KEY=csk-...

# Add OpenAI
AI_API_KEY=sk-your-openai-key
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo
```

### Switch to Gemini
```env
# Comment out Cerebras
# CEREBRAS_API_KEY=csk-...

# Add Gemini
AI_API_KEY=your-gemini-key
AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
AI_MODEL=gemini-pro
```

Restart server and it works! The API is compatible. 🔄

---

## 📊 Monitoring Usage

### Check Cerebras Dashboard
1. Go to [cloud.cerebras.ai](https://cloud.cerebras.ai/)
2. Navigate to "Usage" or "Billing"
3. See real-time token usage
4. Set up alerts for spending limits

### Server Logs
Your server logs every AI call:
```
🧠 AI PROCESS: Calling AI API for user John Doe
🧠 AI PROCESS: Sending 5 messages to Cerebras AI
✅ SUCCESS: AI response generated: Hi John! 👋...
```

---

## 🆘 Troubleshooting

### "No Cerebras API key configured"
- Check `.env` file exists
- Verify key is correct (starts with `csk-`)
- Restart server after editing `.env`

### "Cerebras API error (401)"
- Invalid API key
- Key may have been revoked
- Create new key in Cerebras dashboard

### "Cerebras API error (429)"
- Rate limit exceeded
- Wait a minute and try again
- Check usage in dashboard

### Slow responses
- Check your internet connection
- Try switching to `llama3.1-8b` (faster model)
- Reduce `CEREBRAS_MAX_TOKENS`

---

## 🎯 Best Practices

### 1. Use Environment Variables
Never hardcode API keys in code!
```javascript
// ❌ Bad
const apiKey = 'csk-abc123...';

// ✅ Good
const apiKey = process.env.CEREBRAS_API_KEY;
```

### 2. Monitor Usage
- Set up spending alerts in Cerebras dashboard
- Log all API calls for debugging
- Track response times

### 3. Optimize Prompts
- Keep system prompts concise
- Use context efficiently (15 messages)
- Reduce `MAX_TOKENS` if responses are too long

### 4. Handle Errors Gracefully
The server already does this:
```javascript
// Fallback response if Cerebras fails
"I apologize, but I'm having trouble right now. Please try again! 🙏"
```

---

## 🚀 Ready for Production?

### Checklist
- ✅ Cerebras API key configured
- ✅ Server tested locally
- ✅ Database setup (optional)
- ✅ CORS configured for your domain
- ✅ Environment set to production
- ✅ Monitoring in place

### Deploy
```powershell
# Set production environment
$env:NODE_ENV="production"

# Start server
npm start
```

Or deploy to:
- Railway.app
- Render.com
- Vercel
- Your own server

---

## 🎉 You're All Set!

Your chatbot is now powered by **Cerebras AI**:
- ⚡ Lightning fast responses
- 💰 Very affordable costs  
- 🎯 High quality conversations
- 🚀 Production ready

**Enjoy building! 🤖**

---

**Questions or issues?**
Check the main README.md or server logs for detailed information.

**Built by Ranvir Pardeshi** 🎓
