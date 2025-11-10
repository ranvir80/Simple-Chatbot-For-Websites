/**
 * ═══════════════════════════════════════════════════════════════════
 * 🗄️ SUPABASE DATABASE SETUP SCRIPT
 * ═══════════════════════════════════════════════════════════════════
 * This script provides the SQL commands to set up your Supabase database
 * for the Lumo chatbot API.
 * 
 * HOW TO USE:
 * 1. Go to your Supabase project: https://supabase.com/dashboard
 * 2. Navigate to SQL Editor
 * 3. Copy and paste the SQL commands below
 * 4. Run them to create the required tables
 * ═══════════════════════════════════════════════════════════════════
 */

const SQL_COMMANDS = `
-- ═══════════════════════════════════════════════════════════════════
-- 👥 USERS TABLE
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
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

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_unique_id ON users(unique_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ═══════════════════════════════════════════════════════════════════
-- 💬 MESSAGES TABLE
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  unique_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unique_id ON messages(unique_id);

-- ═══════════════════════════════════════════════════════════════════
-- 📊 INTERACTION LOGS TABLE
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS interaction_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  unique_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  details JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_interaction_logs_user_id ON interaction_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_interaction_logs_timestamp ON interaction_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_interaction_logs_action_type ON interaction_logs(action_type);

-- ═══════════════════════════════════════════════════════════════════
-- 🚫 BLOCKED USERS TABLE (Optional - for spam protection)
-- ═══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS blocked_users (
  id BIGSERIAL PRIMARY KEY,
  unique_id TEXT UNIQUE NOT NULL,
  reason TEXT,
  blocked_at TIMESTAMPTZ DEFAULT NOW(),
  blocked_by TEXT DEFAULT 'system'
);

CREATE INDEX IF NOT EXISTS idx_blocked_users_unique_id ON blocked_users(unique_id);

-- ═══════════════════════════════════════════════════════════════════
-- 📈 ANALYTICS VIEW (Optional - for insights)
-- ═══════════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW user_analytics AS
SELECT 
  u.id,
  u.unique_id,
  u.name,
  u.email,
  u.message_count,
  u.created_at,
  u.last_seen,
  COUNT(DISTINCT m.id) as total_messages,
  COUNT(DISTINCT il.id) as total_interactions,
  MAX(m.timestamp) as last_message_at
FROM users u
LEFT JOIN messages m ON u.id = m.user_id
LEFT JOIN interaction_logs il ON u.id = il.user_id
GROUP BY u.id, u.unique_id, u.name, u.email, u.message_count, u.created_at, u.last_seen;

-- ═══════════════════════════════════════════════════════════════════
-- ✅ SETUP COMPLETE!
-- ═══════════════════════════════════════════════════════════════════
-- Your database is now ready for the Lumo chatbot API.
-- 
-- NEXT STEPS:
-- 1. Update your .env file with SUPABASE_URL and SUPABASE_KEY
-- 2. Run: npm install
-- 3. Run: npm start
-- 
-- SECURITY NOTES:
-- - Row Level Security (RLS) is disabled by default for API access
-- - If you need user-level security, enable RLS and create policies
-- - Keep your SUPABASE_KEY secure and never commit it to version control
-- ═══════════════════════════════════════════════════════════════════
`;

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🗄️  SUPABASE DATABASE SETUP INSTRUCTIONS');
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log('Follow these steps to set up your database:\n');
console.log('1. Go to: https://supabase.com/dashboard');
console.log('2. Select your project (or create a new one)');
console.log('3. Click on "SQL Editor" in the left sidebar');
console.log('4. Click "New Query"');
console.log('5. Copy and paste the SQL commands below');
console.log('6. Click "Run" to execute\n');
console.log('═══════════════════════════════════════════════════════════════════');
console.log('SQL COMMANDS TO RUN:');
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log(SQL_COMMANDS);
console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('After running the SQL commands:');
console.log('1. Go to Project Settings → API');
console.log('2. Copy your "Project URL" to .env as SUPABASE_URL');
console.log('3. Copy your "anon public" key to .env as SUPABASE_KEY');
console.log('4. Run: npm install');
console.log('5. Run: npm start');
console.log('═══════════════════════════════════════════════════════════════════\n');
