/**
 * Zevia Sands Resort - AI Island Concierge
 * Interactive 24/7 intelligent guest assistant
 */
(function() {
  // Prevent duplicate initialization
  if (window.ZeviaAIConciergeInitialized) return;
  window.ZeviaAIConciergeInitialized = true;

  // Insert styles
  var style = document.createElement('style');
  style.id = 'zevia-ai-concierge-styles';
  style.textContent = `
    /* Floating trigger button */
    .zevia-ai-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
      background: linear-gradient(135deg, #0F2027 0%, #0077B6 100%);
      color: #FFF;
      border: 1px solid rgba(229, 169, 60, 0.4);
      border-radius: 9999px;
      padding: 12px 20px;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      font-size: 13.5px;
      font-weight: 600;
      letter-spacing: 0.03em;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 119, 182, 0.35), 0 4px 12px rgba(15, 32, 39, 0.2);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(8px);
      -webkit-tap-highlight-color: transparent;
    }
    .zevia-ai-trigger:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 14px 35px rgba(0, 119, 182, 0.45);
      border-color: #E5A93C;
    }
    .zevia-ai-trigger .ai-pulse-dot {
      width: 9px;
      height: 9px;
      background: #2ECC71;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);
      animation: aiPulse 2s infinite;
      flex-shrink: 0;
    }
    @keyframes aiPulse {
      0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
      70% { box-shadow: 0 0 0 8px rgba(46, 204, 113, 0); }
      100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
    }

    /* On mobile with sticky booking bar, position above sticky bar */
    @media (max-width: 768px) {
      .zevia-ai-trigger {
        bottom: 84px;
        right: 16px;
        padding: 10px 16px;
        font-size: 12.5px;
      }
    }

    /* Chat Drawer Window */
    .zevia-ai-window {
      position: fixed;
      bottom: 88px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 580px;
      max-height: calc(100vh - 120px);
      background: #FAF8F5;
      border-radius: 20px;
      border: 1px solid rgba(15, 32, 39, 0.12);
      box-shadow: 0 25px 60px -10px rgba(15, 32, 39, 0.35);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 1001;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.96);
      transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .zevia-ai-window.open {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0) scale(1);
    }

    @media (max-width: 480px) {
      .zevia-ai-window {
        bottom: 0;
        right: 0;
        left: 0;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        border: none;
      }
    }

    /* Window Header */
    .zevia-ai-header {
      background: linear-gradient(135deg, #0F2027 0%, #1A3644 100%);
      color: #FFF;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(229, 169, 60, 0.3);
      flex-shrink: 0;
    }
    .zevia-ai-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .zevia-ai-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #E5A93C, #D4982E);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 3px 10px rgba(229, 169, 60, 0.4);
      flex-shrink: 0;
    }
    .zevia-ai-header h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 19px;
      font-weight: 600;
      color: #FFF;
      line-height: 1.1;
      margin: 0;
    }
    .zevia-ai-status {
      font-size: 11.5px;
      color: #7FE3B5;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 2px;
    }
    .zevia-ai-status-dot {
      width: 6px;
      height: 6px;
      background: #2ECC71;
      border-radius: 50%;
      display: inline-block;
    }
    .zevia-ai-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .zevia-ai-btn-icon {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFF;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    .zevia-ai-btn-icon:hover {
      background: rgba(255, 255, 255, 0.22);
    }

    /* Message list container */
    .zevia-ai-messages {
      flex: 1;
      overflow-y: auto;
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
      background: #FAF8F5;
    }
    .zevia-ai-msg {
      max-width: 84%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.55;
      animation: msgFadeIn 0.25s ease forwards;
      word-wrap: break-word;
    }
    @keyframes msgFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .zevia-ai-msg.bot {
      background: #FFFFFF;
      color: #0F2027;
      border: 1px solid rgba(15, 32, 39, 0.08);
      border-bottom-left-radius: 4px;
      box-shadow: 0 3px 12px rgba(15, 32, 39, 0.04);
      align-self: flex-start;
    }
    .zevia-ai-msg.user {
      background: linear-gradient(135deg, #0F2027, #0077B6);
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
      box-shadow: 0 4px 14px rgba(0, 119, 182, 0.25);
    }
    .zevia-ai-msg a {
      color: #0077B6;
      font-weight: 600;
      text-decoration: underline;
    }
    .zevia-ai-msg.user a {
      color: #FFF8E7;
    }

    /* Chips container */
    .zevia-ai-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
      align-self: flex-start;
    }
    .zevia-ai-chip {
      background: #FFF;
      border: 1px solid rgba(0, 119, 182, 0.25);
      color: #0077B6;
      font-size: 11.5px;
      font-weight: 600;
      border-radius: 9999px;
      padding: 6px 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .zevia-ai-chip:hover {
      background: #0077B6;
      color: #FFF;
      transform: translateY(-1px);
    }

    /* Typing indicator */
    .zevia-ai-typing {
      display: none;
      align-self: flex-start;
      background: #FFF;
      padding: 10px 14px;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      border: 1px solid rgba(15, 32, 39, 0.08);
      gap: 4px;
      align-items: center;
    }
    .zevia-ai-typing.active {
      display: inline-flex;
    }
    .zevia-ai-typing span {
      width: 6px;
      height: 6px;
      background: #0077B6;
      border-radius: 50%;
      opacity: 0.4;
      animation: typingPulse 1s infinite alternate;
    }
    .zevia-ai-typing span:nth-child(2) { animation-delay: 0.2s; }
    .zevia-ai-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingPulse {
      to { opacity: 1; transform: translateY(-3px); }
    }

    /* Input Footer */
    .zevia-ai-footer {
      background: #FFFFFF;
      border-top: 1px solid rgba(15, 32, 39, 0.08);
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }
    .zevia-ai-form {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .zevia-ai-input {
      flex: 1;
      padding: 10px 14px;
      font-size: 13.5px;
      font-family: inherit;
      border: 1px solid rgba(15, 32, 39, 0.14);
      border-radius: 9999px;
      outline: none;
      background: #FAF8F5;
      color: #0F2027;
      transition: border 0.2s;
    }
    .zevia-ai-input:focus {
      border-color: #0077B6;
      background: #FFF;
    }
    .zevia-ai-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #0077B6;
      color: #FFF;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .zevia-ai-send:hover {
      background: #0F2027;
      transform: scale(1.06);
    }
    .zevia-ai-quick-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #718096;
      padding: 0 4px;
    }
    .zevia-ai-quick-links a {
      color: #0077B6;
      font-weight: 600;
      text-decoration: none;
    }
    .zevia-ai-quick-links a:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  // HTML Structure
  var widgetContainer = document.createElement('div');
  widgetContainer.id = 'zevia-ai-concierge-container';
  widgetContainer.innerHTML = `
    <button class="zevia-ai-trigger" id="zeviaAiTrigger" aria-label="Open AI Concierge">
      <span class="ai-pulse-dot"></span>
      <span>✨ AI Concierge</span>
    </button>

    <div class="zevia-ai-window" id="zeviaAiWindow" aria-modal="true" role="dialog">
      <div class="zevia-ai-header">
        <div class="zevia-ai-header-info">
          <div class="zevia-ai-avatar">🌴</div>
          <div>
            <h4>Zevia Concierge AI</h4>
            <div class="zevia-ai-status"><span class="zevia-ai-status-dot"></span> Online · 24/7 Resort Concierge</div>
          </div>
        </div>
        <div class="zevia-ai-controls">
          <button class="zevia-ai-btn-icon" id="zeviaAiReset" title="Reset Chat">↺</button>
          <button class="zevia-ai-btn-icon" id="zeviaAiClose" title="Close">✕</button>
        </div>
      </div>

      <div class="zevia-ai-messages" id="zeviaAiMessages">
        <div class="zevia-ai-msg bot">
          <b>Karibu! Welcome to Zevia Sands Resort.</b><br>
          I am your personal AI Island Concierge. How may I assist with your holiday or getaway today?<br><br>
          You can ask me about our <b>Room Packages</b> (Half Board & Full Board), villa rates, romantic <b>honeymoon rose petal setups</b>, dining hours, or airport transfers.
        </div>
        <div class="zevia-ai-chips" id="zeviaAiChips">
          <span class="zevia-ai-chip" data-query="What room packages do you offer?">🍽️ Room Packages</span>
          <span class="zevia-ai-chip" data-query="Can I request rose petals on the bed for our honeymoon?">🌹 Honeymoon Rose Petals</span>
          <span class="zevia-ai-chip" data-query="What are your villa prices per night?">💰 Villa Rates</span>
          <span class="zevia-ai-chip" data-query="Tell me about the 40m Lagoon pool">🏊 40m Infinity Pool</span>
          <span class="zevia-ai-chip" data-query="How do I get here from Ukunda airstrip?">🛫 Airport Transfers</span>
          <span class="zevia-ai-chip" data-query="How do I book a room?">📅 Book a Room</span>
        </div>
        <div class="zevia-ai-typing" id="zeviaAiTyping">
          <span></span><span></span><span></span>
        </div>
      </div>

      <div class="zevia-ai-footer">
        <form class="zevia-ai-form" id="zeviaAiForm">
          <input type="text" class="zevia-ai-input" id="zeviaAiInput" placeholder="Ask about packages, rose petals, rates..." autocomplete="off">
          <button type="submit" class="zevia-ai-send" id="zeviaAiSend" aria-label="Send Message">➤</button>
        </form>
        <div class="zevia-ai-quick-links">
          <span>Official Resort AI</span>
          <a href="https://wa.me/254702713853?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20the%20human%20concierge%20desk" target="_blank">Chat with Human Manager (0702713853)</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  // DOM Elements
  var trigger = document.getElementById('zeviaAiTrigger');
  var windowEl = document.getElementById('zeviaAiWindow');
  var closeBtn = document.getElementById('zeviaAiClose');
  var resetBtn = document.getElementById('zeviaAiReset');
  var form = document.getElementById('zeviaAiForm');
  var input = document.getElementById('zeviaAiInput');
  var messagesContainer = document.getElementById('zeviaAiMessages');
  var chipsContainer = document.getElementById('zeviaAiChips');
  var typingIndicator = document.getElementById('zeviaAiTyping');

  // Toggle chat
  function toggleChat(open) {
    if (open === undefined) {
      windowEl.classList.toggle('open');
    } else if (open) {
      windowEl.classList.add('open');
    } else {
      windowEl.classList.remove('open');
    }
    if (windowEl.classList.contains('open')) {
      input.focus();
      scrollBottom();
    }
  }

  trigger.addEventListener('click', function() { toggleChat(); });
  closeBtn.addEventListener('click', function() { toggleChat(false); });
  resetBtn.addEventListener('click', function() {
    sessionStorage.removeItem('zevia_ai_chat');
    messagesContainer.innerHTML = `
      <div class="zevia-ai-msg bot">
        <b>Karibu! Welcome to Zevia Sands Resort.</b><br>
        I am your personal AI Island Concierge. How may I assist your stay today?<br><br>
        Ask me about <b>Room Packages</b> (Half Board, Full Board, All-Inclusive), villa rates, romantic <b>honeymoon rose petal setups</b>, or transfers.
      </div>
      <div class="zevia-ai-chips" id="zeviaAiChips">
        <span class="zevia-ai-chip" data-query="What room packages do you offer?">🍽️ Room Packages</span>
        <span class="zevia-ai-chip" data-query="Can I request rose petals on the bed for our honeymoon?">🌹 Honeymoon Rose Petals</span>
        <span class="zevia-ai-chip" data-query="What are your villa prices per night?">💰 Villa Rates</span>
        <span class="zevia-ai-chip" data-query="Tell me about the 40m Lagoon pool">🏊 40m Infinity Pool</span>
        <span class="zevia-ai-chip" data-query="How do I get here from Ukunda airstrip?">🛫 Airport Transfers</span>
        <span class="zevia-ai-chip" data-query="How do I book a room?">📅 Book a Room</span>
      </div>
      <div class="zevia-ai-typing" id="zeviaAiTyping">
        <span></span><span></span><span></span>
      </div>
    `;
    bindChips();
  });

  function scrollBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendMessage(sender, text, isHtml) {
    var msg = document.createElement('div');
    msg.className = 'zevia-ai-msg ' + sender;
    if (isHtml) msg.innerHTML = text;
    else msg.textContent = text;

    messagesContainer.insertBefore(msg, typingIndicator);
    scrollBottom();
  }

  // Follow-up dynamic chips renderer
  function renderFollowUpChips(chips) {
    var oldFollowUps = document.querySelectorAll('.zevia-ai-followup-chips');
    oldFollowUps.forEach(function(el) { el.remove(); });

    if (!chips || chips.length === 0) return;

    var container = document.createElement('div');
    container.className = 'zevia-ai-chips zevia-ai-followup-chips';
    chips.forEach(function(item) {
      var chip = document.createElement('span');
      chip.className = 'zevia-ai-chip';
      chip.textContent = item.label;
      chip.setAttribute('data-query', item.query);
      chip.addEventListener('click', function() {
        handleQuery(item.query);
      });
      container.appendChild(chip);
    });
    messagesContainer.insertBefore(container, typingIndicator);
    scrollBottom();
  }

  // Check if query is unrelated to the resort
  function isIrrelevantQuery(text) {
    // Tech, programming, maths, crypto, finance
    var techPatterns = /\b(python|javascript|typescript|html|css|java|c\+\+|coding|code|script|github|compile|debug|algorithm|database|sql|math|calculus|algebra|solve|equation|crypto|bitcoin|ethereum|btc|nft|forex|stock market|shares|chatgpt|openai)\b/i;
    
    // Politics, elections, world governments, international conflicts
    var politicsPatterns = /\b(president|prime minister|election|parliament|congress|senate|democrat|republican|politics|political|government|war in|ukraine|russia|israel|military|putin|biden|trump|ruto)\b/i;
    
    // Academics, homework, generic world trivia
    var homeworkPatterns = /\b(homework|essay on|write an essay|capital of france|capital of usa|who invented|quantum physics|biology exam|chemistry formula)\b/i;
    
    // Automotive, medical diagnostics, legal
    var unrelatedServices = /\b(repair car|car engine|mechanic|diagnose illness|medical treatment|prescription drug|lawyer|lawsuit|sue someone)\b/i;

    // Sports trivia (unrelated to resort beach sports)
    var sportsTrivia = /\b(premier league|manchester united|arsenal|chelsea|liverpool|real madrid|barcelona|nba finals|champions league score)\b/i;

    return techPatterns.test(text) || politicsPatterns.test(text) || homeworkPatterns.test(text) || unrelatedServices.test(text) || sportsTrivia.test(text);
  }

  // Dynamic Knowledge Base and Flexible Intent Engine
  function generateAIResponse(userText) {
    var rawText = userText.trim();
    var text = rawText.toLowerCase();

    // 1. Irrelevant / Out-of-Scope Query Filter
    if (isIrrelevantQuery(text)) {
      return {
        html: `I specialize exclusively as your personal AI Island Concierge for <b>Zevia Sands Resort & Sanctuary</b>. 😊
        <br><br>
        While I would love to chat about everything under the sun, <b>I can only reply to queries regarding the resort</b>—such as our luxury villas, curated room packages (Half Board, Full Board, All-Inclusive), romantic honeymoon touches, coastal dining, beach adventures, and reservations. 🌴
        <br><br>
        How can I assist you with your holiday plans, villa rates, or bespoke experiences at Zevia Sands today?`,
        chips: [
          { label: '🌴 About the Resort', query: 'Tell me about Zevia Sands Resort' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '🌹 Honeymoon Petals', query: 'Can I request rose petals on the bed?' }
        ]
      };
    }

    // 2. Greetings & Pleasantries (Time-aware, warm Kenyan hospitality, tells about resort)
    var greetingPatterns = /^(hi|hello|hey|jambo|habari|greetings|morning|afternoon|evening|sasa|niaje|mambo|yo|sup|hola|bonjour|good\s*(morning|afternoon|evening|day))\b/i;
    var isJustGreeting = greetingPatterns.test(text) || text === 'hi' || text === 'hello' || text === 'hey' || text === 'jambo';

    if (isJustGreeting && !text.includes('package') && !text.includes('price') && !text.includes('book') && !text.includes('rate')) {
      var currentHour = new Date().getHours();
      var timeGreeting = 'Jambo & Karibu! 🌴';
      if (currentHour >= 5 && currentHour < 12) {
        timeGreeting = 'Good morning & Jambo! 🌅';
      } else if (currentHour >= 12 && currentHour < 18) {
        timeGreeting = 'Good afternoon & Jambo! ☀️';
      } else {
        timeGreeting = 'Good evening & Jambo! 🌙';
      }

      return {
        html: `${timeGreeting} A very warm welcome to <b>Zevia Sands Resort & Sanctuary</b> in Kalmara Bay, Diani Beach!
        <br><br>
        Nestled along two kilometers of private, powdery white sands on Kenya's South Coast, Zevia Sands is an ultra-luxury coastal sanctuary featuring private pool villas, overwater lagoon suites, our signature 40-meter cantilevered infinity pool, and barefoot seafood dining.
        <br><br>
        Whether you are planning a romantic honeymoon, an anniversary, or a restful beach holiday, I am here to assist you with:
        <br>• 🍽️ <b>Curated Room Packages</b> (Bed & Breakfast, Half Board, Full Board, All-Inclusive)
        <br>• 🌹 <b>Bespoke Romance</b> (Rose petals on bed, chilled champagne, floating villa pool breakfast)
        <br>• 💰 <b>Villa Rates & Seasonal Offers</b>
        <br>• 📅 <b>Effortless Online Reservations</b>
        <br><br>
        What would you love to explore today?`,
        chips: [
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '🌹 Honeymoon Touches', query: 'Can I request rose petals on the bed for our honeymoon?' },
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '🌴 About the Resort', query: 'Tell me about Zevia Sands Resort' }
        ]
      };
    }

    // 3. "How are you" / Friendly Check-in
    if (text.includes('how are you') || text.includes('how are u') || text.includes('how do you do') || text.includes('how r u') || text.includes('how is it going') || text.includes('how is your day')) {
      return {
        html: `I am doing wonderfully, thank you so much for asking! 😊 The sun is shining warm over Kalmara Bay, the turquoise ocean is tranquil, and the resort team is curating another magical day for our guests.
        <br><br>
        How are you doing today? Are you planning an upcoming getaway to the Kenyan coast, or would you like me to walk you through our luxury villas and packages?`,
        chips: [
          { label: '🌴 Tell Me About The Resort', query: 'Tell me about Zevia Sands Resort' },
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '📅 Book a Room', query: 'How do I book a room?' }
        ]
      };
    }

    // 4. Gratitude & Compliments
    if (text.includes('thank') || text.includes('asante') || text.includes('appreciate') || text.includes('great') || text.includes('awesome') || text.includes('wonderful') || text.includes('perfect') || text.includes('cool') || text.includes('nice job')) {
      return {
        html: `Karibu sana! 😊 It is my absolute pleasure. Our entire team at Zevia Sands is dedicated to making your coastal journey unforgettable, whether you are relaxing by the pool or enjoying a private candlelit dinner on the beach.
        <br><br>
        Can I assist you with anything else regarding your upcoming stay or travel arrangements?`,
        chips: [
          { label: '📅 Book My Stay', query: 'How do I book a room?' },
          { label: '🌹 Honeymoon Setup', query: 'Can I request rose petals on the bed?' },
          { label: '📞 Talk to Human Manager', query: 'Can I speak with the human concierge desk?' }
        ]
      };
    }

    // 5. Resort Overview & "What is this place"
    if (text.includes('about the resort') || text.includes('what is zevia sands') || text.includes('tell me about the resort') || text.includes('what is this place') || text.includes('tell me about zevia') || text.includes('describe the resort') || text.includes('who are you')) {
      return {
        html: `🌴 <b>Welcome to Zevia Sands Resort & Sanctuary</b>:
        <br><br>
        Set along the secluded, tranquil waters of Kalmara Bay in Diani Beach, Kenya, Zevia Sands is an ultra-exclusive haven crafted for private escapes, romantic milestones, and discerning travelers.
        <br><br>
        ✨ <b>What Awaits You:</b>
        <br>• <b>2km Secluded Shoreline</b>: Pure white sands sheltered by a thriving offshore coral barrier reef.
        <br>• <b>Architectural Pool Villas</b>: Ranging from tropical garden villas to private overwater lagoon villas with glass floor panels.
        <br>• <b>40-Meter Lagoon Infinity Pool</b>: Temperature-regulated freshwater pool with submerged loungers and a swim-up cocktail bar.
        <br>• <b>Coastal Gastronomy</b>: From our iconic Floating Villa Pool Breakfast to fresh seafood grilled over coconut charcoal at The Reef Lobster Grill.
        <br>• <b>Tailored Packages</b>: Bed & Breakfast, Half Board, Full Board, and VIP All-Inclusive plans.
        <br><br>
        Would you like to explore our villas, view rates, or learn about our romantic packages?`,
        chips: [
          { label: '🏡 Explore Villas', query: 'Tell me about the villas and rooms' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '📅 Reserve a Stay', query: 'How do I book a room?' }
        ]
      };
    }

    // 6. Room Packages (Half Board, Full Board, All-Inclusive, B&B)
    if (text.includes('package') || text.includes('halfboard') || text.includes('half board') || text.includes('fullboard') || text.includes('full board') || text.includes('all inclusive') || text.includes('all-inclusive') || text.includes('meal plan')) {
      return {
        html: `We offer 4 curated <b>Room Packages & Gourmet Meal Plans</b> to suit your vacation style:
        <br><br>
        ☕ <b>Bed & Breakfast (B&B)</b>: Included in all base villa rates. Includes daily tropical breakfast buffet, barista single-origin Kenyan coffee, and fresh cold-pressed juices.<br>
        🍽️ <b>Half Board (HB)</b>: <b>+$60 / KSh 7,800</b> per guest/night. Includes daily artisan breakfast + nightly 3-course beachfront dinner at <i>The Reef Lobster & Seafood Grill</i>.<br>
        🦞 <b>Full Board (FB)</b>: <b>+$110 / KSh 14,300</b> per guest/night. Daily breakfast, 2-course beachfront lunch, and 3-course dinner, plus poolside mocktails.<br>
        👑 <b>All-Inclusive Luxury (AI)</b>: <b>+$180 / KSh 23,400</b> per guest/night. All gourmet meals, unlimited cocktails & premium wines, afternoon high tea, and 1 complimentary 60-min beach massage per adult.<br><br>
        You can select your preferred package directly on our <a href="booking.html">Booking & Checkout Page</a> with live price recalculation!`,
        chips: [
          { label: '🌹 Honeymoon Rose Petals', query: 'Can I request rose petals on the bed?' },
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '📅 Book a Package', query: 'How do I book a room?' },
          { label: '💬 WhatsApp Concierge', query: 'Can I speak with the human concierge desk?' }
        ]
      };
    }

    // 7. Special Requests / Rose Petals / Honeymoon / Romantic / Surprises
    if (text.includes('rose petal') || text.includes('rose') || text.includes('roses') || text.includes('honeymoon') || text.includes('special request') || text.includes('anniversary') || text.includes('romantic') || text.includes('proposal') || text.includes('propose') || text.includes('bed') || text.includes('surprise') || text.includes('candlelight')) {
      return {
        html: `🌹 <b>Yes, absolutely! Romance and celebrations are our signature specialty.</b>
        <br><br>
        When reserving through our <a href="booking.html">Booking Portal</a> or contacting our concierge, you can choose from these bespoke touches:
        <br>• <b>Honeymoon Rose Petals on Bed & Floral Bath Setup</b>: Artfully arranged fresh red rose & hibiscus petals on your bed with scented candles and plush robes (Complimentary for honeymooners & anniversaries!).
        <br>• <b>Chilled Champagne on Arrival</b>: Moët & Chandon or Prosecco on ice awaiting you in your private villa.
        <br>• <b>Signature Floating Villa Pool Breakfast</b>: Fresh tropical fruits, pastries, and smoothies served on a floating wooden tray in your private pool.
        <br>• <b>Anniversary / Birthday Cake & Flower Bouquet</b>.
        <br>• <b>Private Candlelit Beach Dinner</b>: Set right at the water's edge under the stars.
        <br><br>
        You can tick these requests on our <a href="booking.html">Booking Page</a>, or message our team directly on WhatsApp at <a href="https://wa.me/254702713853" target="_blank">+254 702 713 853</a>!`,
        chips: [
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '📅 Book with Rose Petals', query: 'How do I book a room?' },
          { label: '💬 WhatsApp Concierge', query: 'Can I speak with the human concierge desk?' }
        ]
      };
    }

    // 8. Villa Rates / Prices / Cost
    if (text.includes('price') || text.includes('rate') || text.includes('cost') || text.includes('how much') || text.includes('night') || text.includes('shilling') || text.includes('dollar') || text.includes('ksh') || text.includes('usd') || text.includes('euro')) {
      return {
        html: `Here are our starting rates per villa per night (Bed & Breakfast included, taxes itemized at checkout):
        <br><br>
        🌴 <b>Deluxe Garden Palm Room</b>: from <b>KSh 52,000</b> ($400 / €368)<br>
        🏖️ <b>Beachfront Palm Villa</b>: from <b>KSh 63,700</b> ($490 / €450)<br>
        🪸 <b>Executive Coral Suite</b>: from <b>KSh 75,400</b> ($580 / €534)<br>
        🌊 <b>Overwater Lagoon Villa</b>: from <b>KSh 88,400</b> ($680 / €625)<br>
        🌅 <b>Horizon Infinity Villa (Private Pool)</b>: from <b>KSh 149,500</b> ($1,150 / €1,058)<br><br>
        ✨ <i>All stays include 24/7 butler concierge, fresh welcome coconut, Wi-Fi, and clear kayak gear. Zero prepayment required online!</i><br>
        Get an instant quote on our <a href="booking.html">Booking Calculator & Checkout →</a>`,
        chips: [
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '🏡 Villa Details', query: 'Tell me about the villas and rooms' },
          { label: '📅 Book Stay', query: 'How do I book a room?' }
        ]
      };
    }

    // 9. Booking & How to book
    if (text.includes('book') || text.includes('reserve') || text.includes('reservation') || text.includes('checkout') || text.includes('login') || text.includes('availability') || text.includes('how to book')) {
      return {
        html: `Booking your sanctuary escape at Zevia Sands is effortless and instant:
        <br><br>
        1. Open our <a href="booking.html"><b>Guest Booking & Login Portal</b></a>.<br>
        2. Select your villa category, check-in & check-out dates, and guest count.<br>
        3. Pick your <b>Room Package</b> (Bed & Breakfast, Half Board, Full Board, or All-Inclusive).<br>
        4. Select your <b>Special Requests</b> (such as Honeymoon Rose Petals, Champagne, or Floating Breakfast).<br>
        5. Enter your name, phone, and email under <i>Quick Guest Checkout</i> and click <b>Confirm & Book</b>!<br><br>
        You will receive an instant luxury boarding-pass voucher that you can send directly to WhatsApp (0702713853) or email. <b>No deposit required online—pay upon arrival!</b>`,
        chips: [
          { label: '📅 Go to Booking Portal', query: 'How do I book a room?' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '🌹 Honeymoon Petals', query: 'Can I request rose petals on the bed?' }
        ]
      };
    }

    // 10. Villas & Accommodation Details
    if (text.includes('villa') || text.includes('room') || text.includes('suite') || text.includes('overwater') || text.includes('beachfront') || text.includes('garden') || text.includes('accommodation')) {
      return {
        html: `🏡 <b>Our Sanctuary Accommodation Collection</b>:
        <br><br>
        • <b>Deluxe Garden Palm Room</b> (65 sqm): Nestled in aromatic tropical palms with a private sun garden and rainfall shower.<br>
        • <b>Beachfront Palm Villa</b> (95 sqm): Direct barefoot access to Kalmara white sands, private plunge pool, and ocean sun deck.<br>
        • <b>Executive Coral Suite</b> (130 sqm): Expansive living lounge, outdoor soaking tub, panoramic ocean views, and dedicated butler service.<br>
        • <b>Overwater Lagoon Villa</b> (160 sqm): Perched on stilts above the turquoise lagoon with glass floor observation panels and direct sea ladder.<br>
        • <b>Horizon Infinity Villa</b> (240 sqm): Our crown jewel. 2 master suites, 12m private cantilevered infinity pool, and personal chef on request.<br><br>
        Explore full photo galleries on our <a href="accommodation.html">Accommodation Page</a>!`,
        chips: [
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '📅 Book a Villa', query: 'How do I book a room?' }
        ]
      };
    }

    // 11. Food & Dining
    if (text.includes('food') || text.includes('dine') || text.includes('dining') || text.includes('restaurant') || text.includes('lobster') || text.includes('bar') || text.includes('eat') || text.includes('menu') || text.includes('breakfast') || text.includes('lunch') || text.includes('dinner') || text.includes('halal') || text.includes('vegan')) {
      return {
        html: `🍽️ <b>Coastal Dining at Zevia Sands</b>:
        <br><br>
        • <b>Floating Villa Breakfast</b>: Tropical fruits, dragonfruit smoothie bowls, warm pastries, and French toast served on a floating wooden tray in your private villa pool.<br>
        • <b>The Reef Lobster & Seafood Grill</b>: Barefoot beachfront dining. Coral spiny lobsters, garlic king prawns, and yellowfin tuna grilled fresh over coconut husks.<br>
        • <b>Lagoon Swim-Up Cocktail Bar</b>: Passionfruit mojitos, vintage wines, fresh coconuts, and cold mocktails served right in the 40m infinity pool.<br>
        • <b>Dietary Excellence</b>: 100% Halal certified, with dedicated plant-based vegan, gluten-free, and custom allergy menus upon request.<br><br>
        Browse the complete menu and prices on our <a href="dining.html#full-menu">Food & Dining page</a>!`,
        chips: [
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '🥥 Floating Breakfast', query: 'Can I request rose petals on the bed?' },
          { label: '📅 Book Dining / Villa', query: 'How do I book a room?' }
        ]
      };
    }

    // 12. Pool & Beach
    if (text.includes('pool') || text.includes('swim') || text.includes('infinity') || text.includes('beach') || text.includes('lagoon') || text.includes('ocean')) {
      return {
        html: `🏊 <b>The 40m Lagoon Infinity Pool & 2km Coastline</b>:
        <br><br>
        Our iconic 40-meter freshwater infinity pool is temperature-regulated and cantilevered dramatically over the Indian Ocean, featuring sunken daybeds, submerged stone bar stools, and our vibrant <b>Lagoon Swim-Up Bar</b>.
        <br><br>
        Our resort spans <b>two kilometers of secluded, powder-white sand beach</b> sheltered by an offshore coral barrier reef—meaning calm, crystal-clear, warm swimming at all tides! See photos on our <a href="beach-pool.html">Beach & Pool page</a>.`,
        chips: [
          { label: '🚣 Ocean Adventures', query: 'What activities and adventures do you offer?' },
          { label: '🏡 Beachfront Villas', query: 'Tell me about the villas and rooms' },
          { label: '📅 Book Stay', query: 'How do I book a room?' }
        ]
      };
    }

    // 13. Adventures & Activities
    if (text.includes('activity') || text.includes('activities') || text.includes('adventure') || text.includes('kayak') || text.includes('snorkel') || text.includes('catamaran') || text.includes('massage') || text.includes('spa') || text.includes('excursion')) {
      return {
        html: `✨ <b>Resort Experiences & Ocean Adventures</b>:
        <br><br>
        • 🚣 <b>100% Clear Glass Kayaking</b>: Glide over colourful coral gardens and marine life.<br>
        • 🐢 <b>Sea Turtle Reef Snorkel Safari</b>: Guided marine sanctuary excursion.<br>
        • ⛵ <b>Sunset Champagne Catamaran Cruise</b>: Sailing into the gold and crimson Diani sunset.<br>
        • 💆 <b>Beachside Palm Coconut Oil Massage</b>: Open-air ocean pavilion spa rituals.<br>
        • 🌿 <b>Mangrove Boardwalk & Evening Beach Bonfires</b>.<br><br>
        All activities can be arranged pre-arrival on our <a href="adventures.html">Adventures Page</a> or with our concierge!`,
        chips: [
          { label: '⛵ Sunset Catamaran', query: 'What activities and adventures do you offer?' },
          { label: '💆 Beach Spa', query: 'What activities and adventures do you offer?' },
          { label: '📅 Book Stay', query: 'How do I book a room?' }
        ]
      };
    }

    // 14. Weather & Best Time to Visit
    if (text.includes('weather') || text.includes('climate') || text.includes('rain') || text.includes('season') || text.includes('best time') || text.includes('when to visit')) {
      return {
        html: `☀️ <b>Diani Beach Tropical Weather</b>:
        <br><br>
        Kalmara Bay enjoys warm tropical sunshine all year round, with daytime temperatures averaging <b>28°C to 32°C</b> and soothing evening coastal breezes.
        <br><br>
        • <b>October to April</b>: Superb dry season with glass-calm waters—perfect for swimming, diving with turtles, and sunset sailing.<br>
        • <b>May to September</b>: Mild, refreshing coastal temperatures with lush tropical foliage.<br><br>
        Every season offers something special! Check availability on our <a href="booking.html">Booking Portal</a>.`,
        chips: [
          { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
          { label: '📅 Book Stay', query: 'How do I book a room?' }
        ]
      };
    }

    // 15. Location & Airport Transfers
    if (text.includes('location') || text.includes('where') || text.includes('airport') || text.includes('transfer') || text.includes('ukunda') || text.includes('mombasa') || text.includes('flight') || text.includes('direction') || text.includes('get here') || text.includes('taxi')) {
      return {
        html: `📍 <b>Location & Seamless Arrival</b>:
        <br><br>
        Zevia Sands Resort & Sanctuary is located on <b>Diani Beach Road, Kalmara Bay, South Coast, Kenya</b>.<br><br>
        • <b>Ukunda Airstrip (UKA)</b>: Only 15 minutes by chauffeured luxury transfer.<br>
        • <b>Moi International Airport Mombasa (MBA)</b>: 90 minutes via the Dongo Kundu bypass expressway or 10 minutes via private helicopter transfer to our resort helipad.<br>
        • <b>Mombasa SGR Express Train Station</b>: 60 minutes.<br><br>
        ✨ <i>Complimentary private luxury airport transfers are included on all stays of 3 nights or more!</i> See our map on the <a href="contact.html">Contact & Location page</a>.`,
        chips: [
          { label: '📅 Book with Transfer', query: 'How do I book a room?' },
          { label: '📞 Contact Concierge', query: 'Can I speak with the human concierge desk?' },
          { label: '🏡 Explore Villas', query: 'Tell me about the villas and rooms' }
        ]
      };
    }

    // 16. Contact / Phone / Email / Human Concierge
    if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('call') || text.includes('whatsapp') || text.includes('human') || text.includes('talk to someone') || text.includes('manager')) {
      return {
        html: `You can reach our human resort management desk 24 hours a day, 7 days a week:
        <br><br>
        📞 <b>Direct Phone Hotline</b>: <a href="tel:+254702713853">0702713853</a> / <a href="tel:+254702713853">+254 702 713 853</a><br>
        💬 <b>WhatsApp VIP Desk</b>: <a href="https://wa.me/254702713853" target="_blank">+254 702 713 853 (Chat Now)</a><br>
        ✉️ <b>Management Email</b>: <a href="mailto:vledoren500@gmail.com">vledoren500@gmail.com</a><br><br>
        Our team is always delighted to assist with bespoke itineraries, special honeymoon requests, or custom group bookings!`,
        chips: [
          { label: '💬 WhatsApp Us Now', query: 'Can I speak with the human concierge desk?' },
          { label: '📅 Book Online', query: 'How do I book a room?' },
          { label: '🍽️ Room Packages', query: 'What room packages do you offer?' }
        ]
      };
    }

    // 17. Default Contextual Resort Helper
    return {
      html: `Thank you for your question! Zevia Sands is Kenya's premier luxury coastal sanctuary in Kalmara Bay, Diani Beach, featuring private pool villas, a 40m lagoon infinity pool, and barefoot culinary excellence.
      <br><br>
      Here are the most popular topics I can assist you with right now:
      <br>• 🍽️ <b>Curated Room Packages</b>: Bed & Breakfast, Half Board, Full Board, All-Inclusive
      <br>• 🌹 <b>Bespoke Romance</b>: Rose petals on bed, chilled champagne, floating pool breakfast
      <br>• 💰 <b>Villa Rates & Instant Quote</b>: Calculate pricing on our <a href="booking.html">Booking Portal</a>
      <br>• 📞 <b>Direct Human Assistance</b>: WhatsApp <a href="https://wa.me/254702713853" target="_blank">+254 702 713 853</a> or email <a href="mailto:vledoren500@gmail.com">vledoren500@gmail.com</a>.
      <br><br>
      What would you like to explore next?`,
      chips: [
        { label: '🍽️ Room Packages', query: 'What room packages do you offer?' },
        { label: '🌹 Honeymoon Rose Petals', query: 'Can I request rose petals on the bed?' },
        { label: '💰 Villa Rates', query: 'What are your villa prices per night?' },
        { label: '📅 Book a Room', query: 'How do I book a room?' }
      ]
    };
  }

  // Handle user query
  function handleQuery(text) {
    if (!text || !text.trim()) return;
    appendMessage('user', text, false);
    input.value = '';

    // Hide old initial chips
    if (chipsContainer) chipsContainer.style.display = 'none';

    // Show typing indicator
    typingIndicator.classList.add('active');
    scrollBottom();

    // Natural brief delay for authentic response feel
    setTimeout(function() {
      typingIndicator.classList.remove('active');
      var response = generateAIResponse(text);
      appendMessage('bot', response.html, true);
      renderFollowUpChips(response.chips);
    }, 450);
  }

  // Bind chips
  function bindChips() {
    var chips = document.querySelectorAll('.zevia-ai-chip');
    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        var q = chip.getAttribute('data-query');
        handleQuery(q);
      });
    });
  }
  bindChips();

  // Handle submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    handleQuery(input.value);
  });

})();
