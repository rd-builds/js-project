// ══════════════════════════════════════════════════════
//  chatbot.js — Powered by Groq (FREE)
// ══════════════════════════════════════════════════════

const GROQ_API_KEY = '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'; 

let chatIsOpen = false;
let chatHistory = [];
let chatLoading = false;

const chatWindow = document.getElementById('chat-window');
const chatToggle = document.getElementById('chat-toggle');
const chatClose  = document.getElementById('close-btn');
const chatMsgs   = document.getElementById('messages');
const chatInput  = document.getElementById('user-input');
const chatSend   = document.getElementById('send-btn');

// Hide API banner if still in HTML
const apiBanner = document.getElementById('api-banner');
if (apiBanner) apiBanner.style.display = 'none';

// ── Toggle open/close ──────────────────────────────────
chatToggle.addEventListener('click', () => {
  chatIsOpen = !chatIsOpen;
  chatWindow.classList.toggle('open', chatIsOpen);
  chatToggle.textContent = chatIsOpen ? '✕' : '💬';
  if (chatIsOpen) setTimeout(() => chatInput.focus(), 300);
});

chatClose.addEventListener('click', () => {
  chatIsOpen = false;
  chatWindow.classList.remove('open');
  chatToggle.textContent = '💬';
});

// ── Auto-resize textarea ───────────────────────────────
chatInput.addEventListener('input', () => {
  chatInput.style.height = '42px';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
});

// ── Enter to send ──────────────────────────────────────
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
});

chatSend.addEventListener('click', sendChatMessage);

// ── Add message bubble ─────────────────────────────────
function addChatMessage(role, text) {
  const hint = chatMsgs.querySelector('.hint');
  if (hint) hint.remove();

  const div = document.createElement('div');
  div.className = `msg ${role}`;

  if (role === 'bot') {
    div.innerHTML = `<div class="label">AI Assistant</div>${sanitize(text)}`;
  } else if (role === 'error') {
    div.innerHTML = `⚠️ ${sanitize(text)}`;
  } else {
    div.textContent = text;
  }

  chatMsgs.appendChild(div);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function sanitize(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/\n/g, '<br>');
}

// ── Typing dots ────────────────────────────────────────
function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="label">AI Assistant</div>
    <div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatMsgs.appendChild(div);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

// ── Send message to Groq ───────────────────────────────
async function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text || chatLoading) return;

  addChatMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  chatInput.value = '';
  chatInput.style.height = '42px';
  chatLoading = true;
  chatSend.disabled = true;
  showTyping();

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for Sevya Foundation website. Be warm, friendly and concise.'
          },
          ...chatHistory
        ]
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || `Error ${res.status}`);

    const reply = data.choices?.[0]?.message?.content || '(No response)';
    chatHistory.push({ role: 'assistant', content: reply });

    hideTyping();
    addChatMessage('bot', reply);

  } catch (err) {
    hideTyping();
    let msg = err.message;
    if (msg.includes('401'))           msg = 'Invalid Groq API key. Check GROQ_API_KEY in chatbot.js';
    if (msg.includes('429'))           msg = 'Rate limit reached. Wait a moment and try again.';
    if (msg.includes('Failed to fetch')) msg = 'Network error. Check your internet connection.';
    addChatMessage('error', msg);

  } finally {
    chatLoading = false;
    chatSend.disabled = false;
    chatInput.focus();
  }
}