(function () {
  'use strict';

  const data = window.emergencyData;
  const chat = document.getElementById('chat');
  const actions = document.getElementById('actions');

  // ── State ──
  let currentEmergency = null;
  let currentProtocol = null;
  let currentStep = null;

  // ── Helpers ──
  function scrollToBottom() {
    requestAnimationFrame(() => (chat.scrollTop = chat.scrollHeight));
  }

  function addMessage(html, type = 'bot') {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerHTML = html;
    chat.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.id = 'typing';
    div.innerHTML =
      '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chat.appendChild(div);
    scrollToBottom();
  }

  function removeTyping() {
    const el = document.getElementById('typing');
    if (el) el.remove();
  }

  function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function botSay(html, type = 'bot', delayMs = 500) {
    showTyping();
    await delay(delayMs);
    removeTyping();
    addMessage(html, type);
  }

  function formatPathLabel(key) {
    return key
      .replace(/_path$/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // ── UI Controls ──
  function showInputArea() {
    actions.innerHTML = `
      <div class="input-row">
        <input type="text" id="user-input" placeholder="Describe the emergency..." autocomplete="off">
        <button id="send-btn">Send</button>
      </div>`;
    const input = document.getElementById('user-input');
    const btn = document.getElementById('send-btn');
    const send = () => {
      const v = input.value.trim();
      if (v) handleUserQuery(v);
    };
    btn.addEventListener('click', send);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') send();
    });
    input.focus();
  }

  function showYesNo(onYes, onNo) {
    actions.innerHTML = `
      <div class="btn-row">
        <button class="action-btn btn-yes" id="btn-yes">✓  Yes</button>
        <button class="action-btn btn-no" id="btn-no">✗  No</button>
      </div>`;
    document.getElementById('btn-yes').addEventListener('click', () => {
      addMessage('Yes', 'user');
      onYes();
    });
    document.getElementById('btn-no').addEventListener('click', () => {
      addMessage('No', 'user');
      onNo();
    });
  }

  function showCustomBranch(branch) {
    const keys = Object.keys(branch).filter((k) => k !== 'question');
    let html = '<div class="btn-row">';
    keys.forEach((k) => {
      html += `<button class="action-btn btn-custom" data-path="${branch[k]}">${formatPathLabel(k)}</button>`;
    });
    html += '</div>';
    actions.innerHTML = html;
    actions.querySelectorAll('.btn-custom').forEach((btn) => {
      btn.addEventListener('click', () => {
        addMessage(btn.textContent, 'user');
        resolvePath(btn.dataset.path);
      });
    });
  }

  function showNext(onNext) {
    actions.innerHTML = `<button class="btn-next" id="btn-next">Next Step →</button>`;
    document.getElementById('btn-next').addEventListener('click', onNext);
  }

  function showNextAndRedirect(nextPath, redirectEmergencyId) {
    const em = data.emergencies[redirectEmergencyId];
    const label = em ? em.label : redirectEmergencyId;
    actions.innerHTML = `
      <div class="btn-row">
        <button class="btn-next" id="btn-next" style="flex:1">Continue →</button>
        <button class="action-btn btn-custom" id="btn-redirect" style="flex:1">Switch: ${label}</button>
      </div>`;
    document
      .getElementById('btn-next')
      .addEventListener('click', () => resolvePath(nextPath));
    document
      .getElementById('btn-redirect')
      .addEventListener('click', () =>
        startEmergencyRedirect(redirectEmergencyId)
      );
  }

  function showRestart() {
    actions.innerHTML = `<button class="btn-restart" id="btn-restart">🔄  New Emergency</button>`;
    document
      .getElementById('btn-restart')
      .addEventListener('click', resetChat);
  }

  function showChips() {
    const emergencies = Object.values(data.emergencies);
    const emojis = {
      fracture: '🦴',
      choking: '😵',
      unconscious_person: '🫥',
    };
    let html = '<div class="chips">';
    emergencies.forEach((e) => {
      html += `<button class="chip" data-id="${e.id}">${emojis[e.id] || '🏥'} ${e.label}</button>`;
    });
    html += '</div>';
    const div = document.createElement('div');
    div.innerHTML = html;
    chat.appendChild(div.firstElementChild);
    scrollToBottom();
    chat.querySelectorAll('.chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        addMessage(btn.textContent.trim(), 'user');
        startEmergency(data.emergencies[btn.dataset.id]);
      });
    });
  }

  // ── Path Resolution ──
  function resolvePath(path) {
    // 1. Is it a step ID in the current protocol?
    if (currentProtocol) {
      const step = currentProtocol.steps.find((s) => s.id === path);
      if (step) {
        showProtocolStep(step);
        return;
      }
    }

    // 2. Ends with "_start" → protocol reference
    if (path.endsWith('_start')) {
      const key = path.replace('_start', '');
      // Look in current emergency first
      if (currentEmergency && currentEmergency.protocols[key]) {
        currentProtocol = currentEmergency.protocols[key];
        startProtocol(currentProtocol);
        return;
      }
      // Look across all emergencies
      for (const em of Object.values(data.emergencies)) {
        if (em.protocols[key]) {
          currentEmergency = em;
          currentProtocol = em.protocols[key];
          addMessage(
            `Switching to <b>${em.label}</b> protocols...`,
            'system'
          );
          startProtocol(currentProtocol);
          return;
        }
      }
    }

    // 3. Is it a triage question ID?
    if (currentEmergency) {
      const tq = currentEmergency.triage_questions.find(
        (q) => q.id === path
      );
      if (tq) {
        showTriageQuestion(tq);
        return;
      }
    }

    addMessage(
      '⚠️ Could not resolve next step. Please restart.',
      'warning'
    );
    showRestart();
  }

  // ── Emergency Detection ──
  async function handleUserQuery(query) {
    addMessage(query, 'user');
    actions.innerHTML = '';

    const q = query.toLowerCase();
    const emergency = Object.values(data.emergencies).find((e) =>
      e.aliases.some((alias) => q.includes(alias))
    );

    if (!emergency) {
      await botSay(
        "I couldn't identify the emergency from your description. Please try again or select one below:",
        'bot',
        600
      );
      showChips();
      showInputArea();
      return;
    }

    startEmergency(emergency);
  }

  // ── Emergency Start ──
  async function startEmergency(emergency) {
    currentEmergency = emergency;
    currentProtocol = null;
    currentStep = null;
    actions.innerHTML = '';

    await botSay(
      `🏥 <b>Emergency Detected: ${emergency.label}</b>`,
      'system',
      400
    );

    if (emergency.call_emergency_first) {
      await botSay('🚨 CALL 112 / 911 IMMEDIATELY 🚨', 'critical', 300);
    }

    await botSay(emergency.opening_statement, 'bot', 600);

    // Start triage
    showTriageQuestion(emergency.triage_questions[0]);
  }

  function startEmergencyRedirect(emergencyId) {
    const emergency = data.emergencies[emergencyId];
    if (emergency) {
      startEmergency(emergency);
    } else {
      addMessage(
        '⚠️ Could not find that emergency protocol.',
        'warning'
      );
      showRestart();
    }
  }

  // ── Triage ──
  async function showTriageQuestion(tq) {
    await botSay(`❓ ${tq.question}`, 'bot', 500);
    showYesNo(
      () => resolvePath(tq.yes_path),
      () => resolvePath(tq.no_path)
    );
  }

  // ── Protocol ──
  async function startProtocol(protocol) {
    await botSay(
      `📋 <b>Protocol: ${protocol.label}</b><div class="step-detail">${protocol.description}</div>`,
      'bot',
      400
    );
    showProtocolStep(protocol.steps[0]);
  }

  async function showProtocolStep(step) {
    currentStep = step;

    // Build step message
    let html = `<span class="step-badge">Step ${step.step_number}</span><br>`;
    html += step.instruction;
    if (step.detail)
      html += `<div class="step-detail">${step.detail}</div>`;

    await botSay(html, 'bot', 600);

    // Warning
    if (step.warning) {
      await botSay(`⚠️ ${step.warning}`, 'warning', 300);
    }

    // Priority callout
    if (step.priority === 'critical') {
      await botSay('🚨 THIS IS CRITICAL — ACT NOW', 'critical', 200);
    }

    // Handle terminal
    if (step.is_terminal) {
      const phrases = data.shared_knowledge.reassurance_phrases;
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      await botSay(`✅ ${phrase}`, 'system', 400);
      await botSay(
        'You have completed this protocol. Stay with the person until help arrives.',
        'bot',
        400
      );
      showRestart();
      return;
    }

    // Handle redirect_to (may coexist with next)
    if (step.redirect_to && step.next) {
      showNextAndRedirect(step.next, step.redirect_to);
      return;
    }
    if (step.redirect_to && !step.next) {
      await botSay(
        `↩️ Switching to <b>${step.redirect_to}</b> protocol...`,
        'system',
        300
      );
      startEmergencyRedirect(step.redirect_to);
      return;
    }

    // Handle branch
    if (step.branch) {
      await botSay(`❓ ${step.branch.question}`, 'bot', 500);
      if (step.branch.yes_path && step.branch.no_path) {
        showYesNo(
          () => resolvePath(step.branch.yes_path),
          () => resolvePath(step.branch.no_path)
        );
      } else {
        showCustomBranch(step.branch);
      }
      return;
    }

    // Handle simple next
    if (step.next) {
      showNext(() => resolvePath(step.next));
      return;
    }

    // Fallback
    showRestart();
  }

  // ── Reset ──
  function resetChat() {
    currentEmergency = null;
    currentProtocol = null;
    currentStep = null;
    chat.innerHTML = '';
    welcome();
  }

  // ── Welcome ──
  async function welcome() {
    await botSay(
      "👋 I'm <b>MedAI</b>, your offline emergency first-aid assistant.",
      'bot',
      400
    );
    await botSay(
      "Describe the situation or pick an emergency below. I'll guide you step by step.",
      'bot',
      500
    );
    showChips();
    showInputArea();
  }

  // ── Boot ──
  welcome();
})();
