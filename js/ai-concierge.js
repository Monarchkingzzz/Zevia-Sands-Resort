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

  // Knowledge base and intent engine
  function generateAIResponse(userText) {
    var text = userText.toLowerCase().trim();

    // 1. Room packages (Half Board, Full Board, All-Inclusive, B&B)
    if (text.includes('package') || text.includes('halfboard') || text.includes('half board') || text.includes('fullboard') || text.includes('full board') || text.includes('all inclusive') || text.includes('all-inclusive') || text.includes('meal plan')) {
      return `We offer 4 curated <b>Room Packages & Meal Plans</b> for our guests:
      <br><br>
      ☕ <b>Bed & Breakfast (B&B)</b>: Included in standard villa rates. Includes daily gourmet artisan breakfast buffet and specialty Kenyan coffee.<br>
      🍽️ <b>Half Board (HB)</b>: +$60 / KSh 7,800 per guest/nt. Includes daily breakfast + 3-course dinner at The Reef Lobster & Seafood Grill.<br>
      🦞 <b>Full Board (FB)</b>: +$110 / KSh 14,300 per guest/nt. Includes breakfast, beachfront lunch, and dinner, plus poolside refreshments.<br>
      👑 <b>All-Inclusive Luxury (AI)</b>: +$180 / KSh 23,400 per guest/nt. Includes all meals, unlimited signature swim-up cocktails and premium wines, afternoon tea, and 1 complimentary 60-min beach massage.<br><br>
      You can select your preferred package directly on our <a href="booking.html">Booking & Checkout Page</a>!`;
    }

    // 2. Special Requests / Rose Petals / Honeymoon / Romantic
    if (text.includes('rose petal') || text.includes('rose') || text.includes('honeymoon') || text.includes('special request') || text.includes('anniversary') || text.includes('romantic') || text.includes('proposal') || text.includes('bed')) {
      return `🌹 <b>Yes, absolutely!</b> We love crafting unforgettable romantic touches for couples, honeymooners, and anniversaries.
      <br><br>
      When reserving through our <a href="booking.html">Booking Portal</a>, you can select:
      <br>• <b>Honeymoon Rose Petals on Bed & Floral Bath Setup</b>: Fresh red rose and tropical hibiscus petals artfully arranged with aromatic candles.
      <br>• <b>Chilled Moët Champagne or Prosecco</b> waiting on ice in your villa upon arrival.
      <br>• <b>Signature Floating Pool Breakfast</b> delivered directly to your villa's private pool.
      <br>• <b>Custom Anniversary Cake & Flower Bouquet</b>.
      <br><br>
      You can also enter your custom message or request in the <b>Special Requests box</b> during checkout, or tell our concierge via WhatsApp at <a href="https://wa.me/254702713853" target="_blank">+254 702 713 853</a>!`;
    }

    // 3. Villa Rates / Prices / Cost
    if (text.includes('price') || text.includes('rate') || text.includes('cost') || text.includes('how much') || text.includes('night') || text.includes('shilling') || text.includes('dollar')) {
      return `Here are our direct starting rates per night (Bed & Breakfast included):
      <br><br>
      🌴 <b>Deluxe Garden Palm Room</b>: from <b>KSh 52,000</b> ($400 / €368)<br>
      🏖️ <b>Beachfront Palm Villa</b>: from <b>KSh 63,700</b> ($490 / €450)<br>
      🪸 <b>Executive Coral Suite</b>: from <b>KSh 75,400</b> ($580 / €534)<br>
      🌊 <b>Overwater Lagoon Villa</b>: from <b>KSh 88,400</b> ($680 / €625)<br>
      🌅 <b>Horizon Infinity Villa (Private Pool)</b>: from <b>KSh 149,500</b> ($1,150 / €1,058)<br><br>
      All stays include 24/7 concierge, welcome fresh coconut, and clear kayak gear. <a href="booking.html">Check Availability & Instant Quote →</a>`;
    }

    // 4. Booking & How to book
    if (text.includes('book') || text.includes('reserve') || text.includes('reservation') || text.includes('checkout') || text.includes('login')) {
      return `Booking your stay at Zevia Sands is fast and effortless!
      <br><br>
      1. Visit our <a href="booking.html"><b>Guest Booking & Login Portal</b></a>.<br>
      2. Choose your villa, travel dates, and room package (B&B, Half Board, Full Board, or All-Inclusive).<br>
      3. Tick your <b>Special Requests</b> (e.g. Rose Petals on Bed, Champagne, Airport Transfer).<br>
      4. Input your name, phone number, and email, then submit to receive an instant confirmed voucher that syncs with WhatsApp and email!`;
    }

    // 5. Pool & Beach
    if (text.includes('pool') || text.includes('swim') || text.includes('infinity') || text.includes('beach') || text.includes('lagoon')) {
      return `🏊 <b>The 40m Lagoon Infinity Pool & 2km Coast</b>:
      <br><br>
      Our signature 40-meter freshwater infinity pool is temperature-controlled and cantilevered toward the Indian Ocean, featuring submerged stone loungers and the popular <b>Lagoon Swim-Up Cocktail Bar</b>.
      <br><br>
      Our resort also spans <b>two kilometers of secluded, powder-white sand beach</b> sheltered by an offshore coral barrier reef—ideal for calm, warm swimming all day long. Learn more on our <a href="beach-pool.html">Beach & Pool page</a>.`;
    }

    // 6. Food & Dining
    if (text.includes('food') || text.includes('dine') || text.includes('dining') || text.includes('restaurant') || text.includes('lobster') || text.includes('bar') || text.includes('eat') || text.includes('menu') || text.includes('breakfast')) {
      return `🍽️ <b>Dining at Zevia Sands</b>:
      <br><br>
      • <b>Floating Villa Breakfast</b>: Tropical fruits, dragonfruit smoothie bowls, pastries, and French toast served on a floating wooden tray in your private pool.<br>
      • <b>The Reef Lobster & Seafood Grill</b>: Barefoot dining on the sands. Coral spiny lobsters, garlic tiger prawns, and yellowfin tuna grilled over coconut charcoal.<br>
      • <b>Lagoon Swim-Up Bar</b>: Cocktails, aged Kenyan rum, passionfruit caipirinhas, and chilled rosé served right in the pool.<br><br>
      View our <a href="dining.html#full-menu">Full Day Coastal Menu</a> for all dishes and prices!`;
    }

    // 7. Adventures & Activities
    if (text.includes('activity') || text.includes('activities') || text.includes('adventure') || text.includes('kayak') || text.includes('snorkel') || text.includes('catamaran') || text.includes('massage') || text.includes('spa')) {
      return `✨ <b>Resort Experiences & Adventures</b>:
      <br><br>
      • 🚣 <b>100% Clear Glass Kayaking</b> over coral gardens.<br>
      • 🐢 <b>Sea Turtle Reef Snorkel Safari</b> with resident marine guides.<br>
      • ⛵ <b>Sunset Champagne Catamaran Cruise</b> along the Diani coastline.<br>
      • 💆 <b>Beachside Palm Coconut Oil Massage</b> with soothing ocean waves.<br>
      • 🌿 Mangrove botanical boardwalks and evening bonfire storytelling.<br><br>
      Explore all details on our <a href="adventures.html">Adventures Page</a>.`;
    }

    // 8. Location & Airport Transfers
    if (text.includes('location') || text.includes('where') || text.includes('airport') || text.includes('transfer') || text.includes('ukunda') || text.includes('mombasa') || text.includes('flight') || text.includes('direction') || text.includes('get here')) {
      return `📍 <b>Location & Getting Here</b>:
      <br><br>
      Zevia Sands Resort is located on <b>Diani Beach Road, Kalmara Bay, South Coast, Kenya</b>.<br><br>
      • <b>Ukunda Airstrip (UKA)</b>: 15 minutes by chauffeured luxury transfer.<br>
      • <b>Moi International Airport Mombasa (MBA)</b>: 90 mins by expressway or 10 mins by chartered helicopter to our on-site landing pad.<br>
      • <b>Mombasa SGR Express Train</b>: 60 minutes from the Mombasa terminus.<br><br>
      Complimentary private transfers are provided on stays of 3 nights or more! See the map on our <a href="contact.html">Contact & Location page</a>.`;
    }

    // 9. Contact / Phone / Email / Human Concierge
    if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('call') || text.includes('whatsapp') || text.includes('human') || text.includes('talk')) {
      return `You can reach our human resort concierge 24 hours a day, 7 days a week:
      <br><br>
      📞 <b>Phone</b>: <a href="tel:+254702713853">0702713853</a> / <a href="tel:+254702713853">+254 702 713 853</a><br>
      💬 <b>WhatsApp VIP</b>: <a href="https://wa.me/254702713853" target="_blank">+254 702 713 853 (Chat Now)</a><br>
      ✉️ <b>Email</b>: <a href="mailto:vledoren500@gmail.com">vledoren500@gmail.com</a><br><br>
      Our management desk is always delighted to assist you with tailored requests!`;
    }

    // 10. Default helpful answer
    return `Thank you for your question! Zevia Sands is an ultra-luxury beach sanctuary in Kalmara Bay, Kenya featuring private pool villas, a 40m lagoon infinity pool, and pristine white sands.
    <br><br>
    I can provide quick details on:
    <br>• <b>Room Packages</b>: Bed & Breakfast, Half Board, Full Board, All-Inclusive
    <br>• <b>Honeymoon Touches</b>: Rose petals on bed, chilled champagne, romantic beach dinners
    <br>• <b>Rates & Booking</b>: Instant quote on our <a href="booking.html">Booking Page</a>
    <br>• <b>Direct Concierge Assistance</b>: WhatsApp <a href="https://wa.me/254702713853" target="_blank">+254 702 713 853</a> or email <a href="mailto:vledoren500@gmail.com">vledoren500@gmail.com</a>.
    <br><br>What would you like to explore next?`;
  }

  // Handle user query
  function handleQuery(text) {
    if (!text || !text.trim()) return;
    appendMessage('user', text, false);
    input.value = '';

    // Hide chips after first query
    if (chipsContainer) chipsContainer.style.display = 'none';

    // Show typing indicator
    typingIndicator.classList.add('active');
    scrollBottom();

    // Natural brief delay
    setTimeout(function() {
      typingIndicator.classList.remove('active');
      var responseHtml = generateAIResponse(text);
      appendMessage('bot', responseHtml, true);
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
