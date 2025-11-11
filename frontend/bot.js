(function() {
  'use strict';
  
  // ===== CONFIGURATION =====
  const API_ENDPOINT = 'https://ranvirwebbot.onrender.com/api/chat';
  const STORAGE_KEY_USER = 'chatbot_user_data';
  const STORAGE_KEY_CHAT_PREFIX = 'chatbot_chat_';
  
  // ===== STATE =====
  let userData = null;
  let chatHistory = [];
  let isOpen = false;
  let floatingMessageInterval = null;
  
  // ===== STYLES =====
  const styles = `
    .chatbot-container * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    .chatbot-button-wrapper {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 9998;
    }
    
    .chatbot-button {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #000;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 2;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .chatbot-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.4);
    }
    
    .chatbot-button:active {
      transform: scale(1.05);
    }
    
    /* Wave pulse rings - softer and longer */
    .chatbot-pulse-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1.5px solid rgba(0, 0, 0, 0.15);
      animation: pulseRing 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      z-index: 1;
    }
    
    .chatbot-pulse-ring:nth-child(2) {
      animation-delay: 1.3s;
    }
    
    .chatbot-pulse-ring:nth-child(3) {
      animation-delay: 2.6s;
    }
    
    @keyframes pulseRing {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
      }
      50% {
        opacity: 0.2;
      }
      100% {
        transform: translate(-50%, -50%) scale(3);
        opacity: 0;
      }
    }
    
    /* Floating message tooltip - subtle without background */
    .chatbot-floating-message {
      position: absolute;
      bottom: 70px;
      left: 0;
      color: #333;
      padding: 8px 12px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      z-index: 3;
      transition: opacity 0.4s ease, transform 0.4s ease;
      text-shadow: 0 1px 2px rgba(255,255,255,0.8);
      font-weight: 500;
    }
    
    .chatbot-floating-message.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .chatbot-window {
      position: fixed;
      bottom: 90px;
      left: 20px;
      width: 380px;
      max-width: calc(100vw - 40px);
      height: 500px;
      max-height: calc(100vh - 120px);
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .chatbot-window.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }
    
    .chatbot-header {
      background: #000;
      color: #fff;
      padding: 16px 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    
    .chatbot-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 28px;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity 0.2s, transform 0.2s;
      line-height: 1;
    }
    
    .chatbot-close:hover {
      opacity: 1;
      transform: rotate(90deg);
    }
    
    .chatbot-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    }
    
    .chatbot-body::-webkit-scrollbar {
      width: 6px;
    }
    
    .chatbot-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .chatbot-body::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 3px;
    }
    
    .chatbot-body::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    
    .chatbot-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .chatbot-form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .chatbot-form label {
      font-size: 13px;
      color: #000;
      font-weight: 600;
    }
    
    .chatbot-form input {
      width: 100%;
      padding: 12px 14px;
      border: 2px solid #000;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      background: #fff;
    }
    
    .chatbot-form input:focus {
      border-color: #333;
      box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    }
    
    .chatbot-form button {
      background: #000;
      color: #fff;
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.2s, transform 0.1s;
      margin-top: 4px;
    }
    
    .chatbot-form button:hover {
      background: #333;
    }
    
    .chatbot-form button:active {
      transform: scale(0.98);
    }
    
    .chatbot-messages {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 100%;
    }
    
    .chatbot-message {
      display: flex;
      align-items: flex-end;
      animation: messageSlide 0.3s ease;
    }
    
    @keyframes messageSlide {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .chatbot-message.user {
      justify-content: flex-end;
    }
    
    .chatbot-message.bot {
      justify-content: flex-start;
    }
    
    .chatbot-message-bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
    
    .chatbot-message.user .chatbot-message-bubble {
      background: #000;
      color: #fff;
      border-bottom-right-radius: 4px;
    }
    
    .chatbot-message.bot .chatbot-message-bubble {
      background: #f0f0f0;
      color: #000;
      border-bottom-left-radius: 4px;
    }
    
    .chatbot-typing {
      display: flex;
      gap: 4px;
      padding: 14px 16px;
      background: #f0f0f0;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      width: fit-content;
    }
    
    .chatbot-typing span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #666;
      animation: typing 1.4s infinite ease-in-out;
    }
    
    .chatbot-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .chatbot-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typing {
      0%, 60%, 100% {
        opacity: 0.3;
        transform: translateY(0);
      }
      30% {
        opacity: 1;
        transform: translateY(-4px);
      }
    }
    
    .chatbot-input-area {
      padding: 16px;
      border-top: 1px solid #e5e5e5;
      background: #fff;
      display: flex;
      gap: 10px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    
    .chatbot-input {
      flex: 1;
      padding: 10px 14px;
      border: 2px solid #000;
      border-radius: 20px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      resize: none;
      max-height: 100px;
      min-height: 40px;
      line-height: 1.4;
      transition: border-color 0.2s;
    }
    
    .chatbot-input:focus {
      border-color: #333;
    }
    
    .chatbot-send {
      background: #000;
      color: #fff;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, transform 0.1s;
      flex-shrink: 0;
    }
    
    .chatbot-send:hover:not(:disabled) {
      background: #333;
    }
    
    .chatbot-send:active:not(:disabled) {
      transform: scale(0.95);
    }
    
    .chatbot-send:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    .chatbot-footer {
      padding: 10px;
      text-align: center;
      font-size: 11px;
      color: #999;
      border-top: 1px solid #e5e5e5;
      background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      flex-shrink: 0;
    }
    
    @media (max-width: 480px) {
      .chatbot-window {
        left: 10px;
        bottom: 80px;
        width: calc(100vw - 20px);
        height: 550px;
        max-height: calc(100vh - 100px);
      }
      
      .chatbot-button-wrapper {
        bottom: 10px;
        left: 10px;
      }
      
      .chatbot-button {
        width: 56px;
        height: 56px;
        font-size: 26px;
      }
      
      .chatbot-pulse-ring {
        width: 56px;
        height: 56px;
      }
    }
  `;
  
  // ===== UTILITY FUNCTIONS =====
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function scrollToBottom() {
    const body = document.querySelector('.chatbot-body');
    if (body) {
      setTimeout(() => {
        body.scrollTo({
          top: body.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  }
  
  // ===== FLOATING MESSAGE FUNCTIONS =====
  
  function showFloatingMessage() {
    // Don't show if chat is open
    if (isOpen) return;
    
    const messageEl = document.querySelector('.chatbot-floating-message');
    if (!messageEl) return;
    
    // Show message
    messageEl.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 3000);
  }
  
  function startFloatingMessageLoop() {
    // Clear any existing interval
    if (floatingMessageInterval) {
      clearInterval(floatingMessageInterval);
    }
    
    // Show message at random intervals between 6-10 seconds
    function scheduleNext() {
      const delay = Math.random() * 4000 + 6000; // 6000-10000ms (6-10 seconds)
      floatingMessageInterval = setTimeout(() => {
        showFloatingMessage();
        scheduleNext();
      }, delay);
    }
    
    // Start the loop
    scheduleNext();
  }
  
  function stopFloatingMessageLoop() {
    if (floatingMessageInterval) {
      clearTimeout(floatingMessageInterval);
      floatingMessageInterval = null;
    }
  }
  
  // ===== STORAGE FUNCTIONS =====
  
  function loadUserData() {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        userData = JSON.parse(saved);
        loadChatHistory();
        return true;
      } catch (e) {
        console.error('Error loading user data:', e);
      }
    }
    return false;
  }
  
  function saveUserData() {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
  }
  
  function loadChatHistory() {
    if (!userData) return;
    
    const key = STORAGE_KEY_CHAT_PREFIX + userData.uniqueId;
    const saved = localStorage.getItem(key);
    
    if (saved) {
      try {
        chatHistory = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading chat history:', e);
        chatHistory = [];
      }
    }
  }
  
  function saveChatHistory() {
    if (!userData) return;
    const key = STORAGE_KEY_CHAT_PREFIX + userData.uniqueId;
    localStorage.setItem(key, JSON.stringify(chatHistory));
  }
  
  // ===== MESSAGE FUNCTIONS =====
  
  function addMessage(text, type) {
    chatHistory.push({ text, type, timestamp: Date.now() });
    saveChatHistory();
    
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${type}`;
    messageEl.innerHTML = `
      <div class="chatbot-message-bubble">${escapeHtml(text)}</div>
    `;
    messagesContainer.appendChild(messageEl);
    
    scrollToBottom();
  }
  
  function addUserMessage(text) {
    addMessage(text, 'user');
  }
  
  function addBotMessage(text) {
    addMessage(text, 'bot');
  }
  
  function showTyping() {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;
    
    const typingEl = document.createElement('div');
    typingEl.className = 'chatbot-message bot';
    typingEl.id = 'chatbot-typing-indicator';
    typingEl.innerHTML = `
      <div class="chatbot-typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    scrollToBottom();
  }
  
  function hideTyping() {
    const typingEl = document.getElementById('chatbot-typing-indicator');
    if (typingEl) {
      typingEl.remove();
    }
  }
  
  function renderMessages() {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = '';
    
    chatHistory.forEach(msg => {
      const messageEl = document.createElement('div');
      messageEl.className = `chatbot-message ${msg.type}`;
      messageEl.innerHTML = `
        <div class="chatbot-message-bubble">${escapeHtml(msg.text)}</div>
      `;
      messagesContainer.appendChild(messageEl);
    });
    
    scrollToBottom();
  }
  
  // ===== API FUNCTIONS =====
  
  async function sendMessage() {
    const input = document.querySelector('.chatbot-input');
    const sendBtn = document.querySelector('.chatbot-send');
    
    if (!input || !sendBtn) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Clear input and reset height
    input.value = '';
    input.style.height = 'auto';
    
    // Disable input
    sendBtn.disabled = true;
    input.disabled = true;
    
    // Add user message
    addUserMessage(message);
    
    // Show typing indicator
    showTyping();
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData.uniqueId,
          name: userData.name,
          email: userData.email,
          message: message
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Hide typing
      hideTyping();
      
      // Add bot response
      if (data.message) {
        addBotMessage(data.message);
      } else {
        addBotMessage('Sorry, I didn\'t receive a proper response. Please try again.');
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      hideTyping();
      addBotMessage('Sorry, I\'m having trouble connecting right now. Please try again later.');
    } finally {
      // Re-enable input
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }
  
  // ===== UI FUNCTIONS =====
  
  function handleRegistration() {
    const nameInput = document.getElementById('chatbot-name');
    const emailInput = document.getElementById('chatbot-email');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!name || !email) {
      alert('Please fill in both fields');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Generate unique ID exactly as specified
    const uniqueId = name + "_" + email + "_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    
    userData = { name, email, uniqueId };
    saveUserData();
    
    // Reinitialize chat interface
    initChatInterface();
    
    // Add welcome message
    addBotMessage(`Hi ${name}! 👋 How can I help you today?`);
  }
  
  function initRegistrationForm() {
    const body = document.querySelector('.chatbot-body');
    
    body.innerHTML = `
      <div class="chatbot-form">
        <div class="chatbot-form-group">
          <label for="chatbot-name">Name</label>
          <input type="text" id="chatbot-name" placeholder="Enter your name" autocomplete="name" />
        </div>
        <div class="chatbot-form-group">
          <label for="chatbot-email">Email</label>
          <input type="email" id="chatbot-email" placeholder="Enter your email" autocomplete="email" />
        </div>
        <button id="chatbot-submit" type="button">Start Chat</button>
      </div>
    `;
    
    const nameInput = document.getElementById('chatbot-name');
    const emailInput = document.getElementById('chatbot-email');
    const submitBtn = document.getElementById('chatbot-submit');
    
    submitBtn.onclick = handleRegistration;
    
    nameInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        emailInput.focus();
      }
    };
    
    emailInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleRegistration();
      }
    };
    
    // Focus name input
    setTimeout(() => nameInput.focus(), 100);
  }
  
  function initChatInterface() {
    const window = document.querySelector('.chatbot-window');
    const body = document.querySelector('.chatbot-body');
    const footer = document.querySelector('.chatbot-footer');
    
    // Remove existing input area if any
    const existingInput = document.querySelector('.chatbot-input-area');
    if (existingInput) existingInput.remove();
    
    // Set up messages container
    body.innerHTML = '<div class="chatbot-messages"></div>';
    
    // Add input area
    const inputArea = document.createElement('div');
    inputArea.className = 'chatbot-input-area';
    inputArea.innerHTML = `
      <textarea class="chatbot-input" placeholder="Type a message..." rows="1"></textarea>
      <button class="chatbot-send" aria-label="Send message">➤</button>
    `;
    window.insertBefore(inputArea, footer);
    
    const input = inputArea.querySelector('.chatbot-input');
    const sendBtn = inputArea.querySelector('.chatbot-send');
    
    // Send button handler
    sendBtn.onclick = sendMessage;
    
    // Enter key handler
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };
    
    // Auto-resize textarea
    input.oninput = function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    };
    
    // Render existing messages
    renderMessages();
  }
  
  function toggleChat() {
    isOpen = !isOpen;
    const window = document.querySelector('.chatbot-window');
    const floatingMessage = document.querySelector('.chatbot-floating-message');
    
    if (isOpen) {
      window.classList.add('open');
      
      // Hide floating message when chat opens
      if (floatingMessage) {
        floatingMessage.classList.remove('show');
      }
      
      // Focus input if chat interface is loaded
      setTimeout(() => {
        const input = document.querySelector('.chatbot-input');
        if (input) input.focus();
      }, 300);
    } else {
      window.classList.remove('open');
    }
  }
  
  function createChatbot() {
    // Create main container
    const container = document.createElement('div');
    container.className = 'chatbot-container';
    
    // Create button wrapper with pulse rings
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'chatbot-button-wrapper';
    
    // Create pulse rings
    buttonWrapper.innerHTML = `
      <div class="chatbot-pulse-ring"></div>
      <div class="chatbot-pulse-ring"></div>
      <div class="chatbot-pulse-ring"></div>
    `;
    
    // Create floating button
    const button = document.createElement('button');
    button.className = 'chatbot-button';
    button.innerHTML = '💬';
    button.setAttribute('aria-label', 'Open chat');
    button.onclick = toggleChat;
    
    // Create floating message tooltip
    const floatingMessage = document.createElement('div');
    floatingMessage.className = 'chatbot-floating-message';
    floatingMessage.textContent = "I'm here 💬";
    
    // Add button and message to wrapper
    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(floatingMessage);
    
    // Create chat window
    const window = document.createElement('div');
    window.className = 'chatbot-window';
    window.innerHTML = `
      <div class="chatbot-header">
        <span>Chat with us 🤖</span>
        <button class="chatbot-close" aria-label="Close chat">×</button>
      </div>
      <div class="chatbot-body"></div>
      <div class="chatbot-footer">Created by Ranvir Pardeshi</div>
    `;
    
    // Close button handler
    window.querySelector('.chatbot-close').onclick = toggleChat;
    
    // Append elements
    container.appendChild(buttonWrapper);
    container.appendChild(window);
    document.body.appendChild(container);
    
    // Initialize appropriate interface
    if (userData) {
      initChatInterface();
    } else {
      initRegistrationForm();
    }
    
    // Start floating message loop
    startFloatingMessageLoop();
  }
  
  // ===== INITIALIZATION =====
  
  function init() {
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    
    // Load saved user data
    loadUserData();
    
    // Create chatbot UI
    createChatbot();
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();