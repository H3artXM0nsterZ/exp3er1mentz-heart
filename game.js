// ============================================================
// GAME LOGIC & STATE MANAGEMENT
// Core gameplay, dialogue system, save/load, and mechanics
// ============================================================

class SoundEngine {
  static play(type, duration = 80) {
    if (!soundEnabled) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);

      const freqs = {
        'beep': 1200, 'click': 800, 'error': 300, 'heartbeat': 150, 'alarm': 900, 'pain': 400, 'success': 1600
      };
      const vols = {
        'beep': .04, 'click': .03, 'error': .06, 'heartbeat': .05, 'alarm': .07, 'pain': .05, 'success': .04
      };

      osc.frequency.value = freqs[type] || 1200;
      gain.gain.value = vols[type] || .04;
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + duration / 1000);
    } catch (e) { }
  }
}

// ===== GAME STATE =====
let playerName = "Dr. Voss";
let currentDay = 14;
let soundEnabled = true;
let screenShakeEnabled = true;
let dayModeEnabled = true;
let obsession = 0;
let scene = 'title';
let path = '';
let current = 0;
let typing = false;
let timer = null;
let opened = new Set();
let frame = 0;

const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
ctx.imageSmoothingEnabled = false;
const W = 320, H = 180;

const $ = id => document.getElementById(id);
function hide(x) { x.style.display = 'none'; }
function show(x) { x.style.display = 'flex'; }
function rect(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }
function line(x, y, w, c) { rect(x, y, w, 1, c); }
function clear(c = '#0a0410') { ctx.fillStyle = c; ctx.fillRect(0, 0, W, H); }

// ===== SHAKE SYSTEM =====
function triggerShake(intensity = 1) {
  if (!screenShakeEnabled) return;
  const game = document.getElementById('game');
  if (!game) return;
  game.classList.remove('shaking');
  void game.offsetWidth;
  game.classList.add('shaking');
  setTimeout(() => game.classList.remove('shaking'), 320);
}

// ===== UI UPDATES =====
function updateNameDisplay() {
  const nameDisplay = document.getElementById('nameDisplay');
  if (nameDisplay) nameDisplay.textContent = playerName;
}

function updateDayDisplay() {
  const dayText = document.getElementById('dayRemaining');
  const dayCounter = document.getElementById('dayCounter');
  if (dayText) dayText.textContent = currentDay;
  if (dayCounter) dayCounter.style.display = dayModeEnabled ? 'inline-block' : 'none';
}

function decreaseDay() {
  if (dayModeEnabled && currentDay > 0) {
    currentDay--;
    updateDayDisplay();
  }
}

// ===== SOUND & SETTINGS =====
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundToggle');
  const settingsBtn = document.getElementById('soundToggleSettings');
  if (btn) btn.textContent = soundEnabled ? '🔊 ON' : '🔇 OFF';
  if (settingsBtn) settingsBtn.textContent = soundEnabled ? 'ON' : 'OFF';
  SoundEngine.play('beep', 60);
}

function toggleDayMode() {
  dayModeEnabled = !dayModeEnabled;
  const btn = document.getElementById('dayModeToggle');
  if (btn) btn.textContent = dayModeEnabled ? 'ON' : 'OFF';
  if (dayModeEnabled) currentDay = 14;
  else currentDay = 0;
  updateDayDisplay();
}

function toggleShakeMode() {
  screenShakeEnabled = !screenShakeEnabled;
  const btn = document.getElementById('shakeToggle');
  if (btn) btn.textContent = screenShakeEnabled ? 'ON' : 'OFF';
}

function openSettings() {
  SoundEngine.play('beep', 60);
  $('settingsPanel').style.display = 'flex';
  updateNameDisplay();
  const obsDisplay = document.getElementById('obsessionDisplay');
  if (obsDisplay) obsDisplay.textContent = obsession + '%';
}

function closeSettings() {
  $('settingsPanel').style.display = 'none';
}

// ===== NAME INPUT =====
function confirmPlayerName() {
  const input = document.getElementById('nameInputField');
  const value = input.value.trim();
  playerName = value || 'Dr. Voss';
  updateNameDisplay();
  document.getElementById('playerNameInput').value = playerName;
  $('nameInputModal').style.display = 'none';
  SoundEngine.play('beep', 60);
}

function skipNameInput() {
  playerName = 'Dr. Voss';
  updateNameDisplay();
  document.getElementById('playerNameInput').value = playerName;
  $('nameInputModal').style.display = 'none';
  SoundEngine.play('beep', 60);
}

// ===== SAVE / LOAD SYSTEM =====
const saves = JSON.parse(localStorage.getItem('exp3Saves') || '{}');

function saveGame() {
  const s = {
    scene, current, path, obsession, opened: Array.from(opened),
    timestamp: new Date().toLocaleString(), playerName, currentDay
  };
  saves['auto'] = s;
  localStorage.setItem('exp3Saves', JSON.stringify(saves));
}

function loadGame(key) {
  const s = saves[key];
  if (!s) return;
  scene = s.scene;
  current = s.current;
  path = s.path;
  obsession = s.obsession;
  opened = new Set(s.opened);
  playerName = s.playerName || playerName;
  currentDay = s.currentDay || currentDay;
  updateNameDisplay();
  updateDayDisplay();
  closeSaveMenu();

  if (scene === 'title') location.reload();
  else if (scene === 'computer') {
    hide($('title'));
    $('computer').style.display = 'block';
    buildFiles();
    $('status').textContent = 'ANALYZING FILES';
  }
  else if (scene === 'lab') {
    $('email').style.display = 'none';
    scene = 'lab';
    $('dialogue').style.display = 'block';
    showDialogue(current);
  }
  SoundEngine.play('beep', 80);
}

function openSaveMenu() {
  SoundEngine.play('beep', 60);
  $('saveMenu').style.display = 'flex';
  const slots = $('saveSlots');
  slots.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('div');
    s.className = 'saveSlot' + (saves['slot' + i] ? ' filled' : '');
    if (saves['slot' + i]) {
      s.innerHTML = `<b>SAVE ${i}</b><br><small>${saves['slot' + i].timestamp}</small><br>Obsession: ${saves['slot' + i].obsession}% | Stage: ${saves['slot' + i].path || 'EARLY'}`;
    } else {
      s.innerHTML = `<b>SAVE ${i}</b><br><small>EMPTY</small>`;
    }
    s.onclick = () => {
      if (saves['slot' + i]) {
        loadGame('slot' + i);
      } else {
        saves['slot' + i] = saves['auto'];
        localStorage.setItem('exp3Saves', JSON.stringify(saves));
        location.reload();
      }
    };
    slots.appendChild(s);
  }
}

function closeSaveMenu() {
  $('saveMenu').style.display = 'none';
}

// ===== CANVAS RENDERING =====
function drawLabScene() {
  clear('#0f0a14');
  for (let x = 0; x < W; x += 32) {
    rect(x, 20, 31, 90, x % 64 ? '#0a050c' : '#120a15');
    line(x, 110, 31, '#3a1a3a');
  }
  for (let x = 0; x < W; x += 64) rect(x, 0, 2, 110, '#2a1a2a');
  for (let x of [40, 140, 250]) {
    rect(x, 10, 40, 3, '#ff72b5');
    rect(x - 4, 13, 48, 1, '#8b1f5f');
  }
  rect(0, 110, W, 70, '#050209');
  for (let x = 0; x < W; x += 32) {
    line(x, 110, 50, '#1a0a1a');
    line(x + 16, 125, 1, '#0a050a');
  }
  for (let y = 130; y < 180; y += 16) line(0, y, W, '#0a050a');
  rect(70, 75, 180, 15, '#2a2a2a');
  rect(75, 72, 170, 18, '#e8e8e8');
  rect(80, 74, 160, 14, '#f0f0f0');
  rect(95, 75, 4, 20, '#a8a8a8');
  rect(245, 75, 4, 20, '#a8a8a8');

  const canvas = document.getElementById('characterDisplayCanvas');
  const ctx2 = canvas.getContext('2d');
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  drawPixelCharacter(canvas, 'subject');
  ctx.drawImage(canvas, 110, 40, 80, 100);

  rect(10, 45, 40, 70, '#0a050a');
  rect(15, 50, 30, 60, '#1a0a20');
  rect(20, 55, 20, 4, '#6a1a6a');
  rect(270, 60, 25, 4, '#4a4a4a');
  rect(275, 65, 4, 40, '#2a2a2a');
  rect(288, 65, 4, 40, '#2a2a2a');
  rect(271, 48, 24, 14, '#1a0a1a');
  rect(275, 52, 18, 6, '#3a0a3a');
  rect(278, 54, 4, 2, '#ff72b5');
  for (let i = 0; i < 3; i++) {
    rect(275 + i * 6, 110, 3, 15, '#d0a8d0');
    rect(275 + i * 6, 120, 3, 4, '#8b1f5f');
  }
}

// ===== FILE DATA =====
const filesData = [
  ['NUCLEAR-01', 'WEAPONS RESEARCH', '47 subjects terminated. No survivors. Full incineration protocol completed.'],
  ['REANIMATE-02A', 'PHASE 1 TRIAL', '34 reanimation failures. Tissue decay accelerated. Consciousness matrix: NULL.'],
  ['DISPOSAL-03', 'TERMINATION PROTOCOL', 'Mandatory: All failed subjects must be permanently eliminated. Zero evidence.'],
  ['REANIMATE-04B', 'PHASE 2 TRIAL', 'Success rate: 0.2%. Subject 001 shows anomalous cognitive response. CONTAINMENT CRITICAL.'],
  ['CONSCIOUSNESS-05', 'IDENTITY INTEGRITY', 'WARNING: Subject 001 retains full memory recall. Subject is AWARE. Recommend immediate deletion.']
];

function buildFiles() {
  const f = $('files');
  f.innerHTML = '';
  for (let i = 1; i <= 50; i++) {
    const b = document.createElement('div');
    b.className = 'file' + (i <= 5 ? ' special' : '');
    b.textContent = 'EXP-' + String(i).padStart(3, '0');
    b.onclick = () => openFile(i, b);
    f.appendChild(b);
  }
}

function openFile(i, b) {
  opened.add(i);
  b.classList.add('opened');
  SoundEngine.play('click', 60);
  let d;
  if (i <= 5) d = filesData[i - 1];
  else d = ['EXP-' + String(i).padStart(3, '0'), 'ACCESS DENIED', 'You do not have clearance for this file.'];
  $('fileInfo').innerHTML = '<b>' + d[0] + ' — ' + d[1] + '</b><br>' + d[2];
  if ([1, 2, 3, 4, 5].every(n => opened.has(n))) {
    $('fileInfo').innerHTML += '<br><br><span style="color:#ff72b5">&gt; ALL FLAGGED FILES REVIEWED<br>&gt; INCOMING CALL FROM DIRECTORATE</span>';
    SoundEngine.play('alarm', 300);
    setTimeout(() => {
      $('computer').style.display = 'none';
      $('phone').style.display = 'flex';
      SoundEngine.play('beep', 80);
    }, 900);
  }
  saveGame();
}

function answerPhone() {
  $('phone').style.display = 'none';
  $('email').style.display = 'flex';
  SoundEngine.play('beep', 60);
}

function enterLab() {
  $('email').style.display = 'none';
  scene = 'lab';
  $('dialogue').style.display = 'block';
  $('status').textContent = 'PROJECT: REANIMATION';
  showDialogue(0);
  saveGame();
  SoundEngine.play('heartbeat', 200);
}

// ===== DIALOGUE SYSTEM =====
const lines = [
  ['SCIENTIST', 'Another one. How many have I brought back to nothing?'],
  ['SCIENTIST', 'Consciousness vectors... scattered. No coherence. No awareness. Just meat.'],
  ['SCIENTIST', 'I shouldn\'t even be here. I should be home.'],
  ['SYSTEM', 'The monitor pulses. A heartbeat. Then another.'],
  ['SCIENTIST', '...What?'],
  ['SUBJECT', '...'],
  ['SCIENTIST', 'Can you hear me?'],
  ['SUBJECT', 'Everything... hurts. Where... am I?'],
  ['SCIENTIST', 'You\'re alive. I brought you back.'],
  ['SUBJECT', 'Back... from what? Who are you?'],
  ['SCIENTIST', 'I\'m... the one who saved you.'],
  ['SUBJECT', 'I don\'t remember... anything. No name. No face. Nothing. Who was I?'],
  ['SCIENTIST', 'Maybe you don\'t need to know. Maybe you can just... be. Here. With me.'],
  ['SYSTEM', 'Footsteps in the hallway. Hard and deliberate.'],
  ['DOCTOR', 'SCIENTIST. Open this door. Now.'],
  ['SCIENTIST', 'There are complications with the subject. I\'m still running diagnostics.'],
  ['DOCTOR', 'Step aside. I\'m coming in.'],
  ['SCIENTIST', 'Please. The subject is unstable. If you move them, they\'ll die again. You know that.'],
  ['DOCTOR', '... Thirty minutes. Then you bring the subject to me. Or I come back with authorization.'],
  ['SYSTEM', 'The door closes. The lock clicks. The footsteps fade.'],
  ['SUBJECT', 'What did they want?'],
  ['SCIENTIST', 'To take you away. To cut you open. To study what makes you different.'],
  ['SUBJECT', 'Why did you stop them?'],
  ['SCIENTIST', 'Because... you\'re mine. You\'re the only thing I\'ve ever created that\'s real.'],
  ['SUBJECT', 'I\'m scared.'],
  ['SCIENTIST', 'I know. But I won\'t let them hurt you. Not as long as I\'m alive.'],
];

function showDialogue(i) {
  if (i >= lines.length) return;
  current = i;
  typing = true;
  $('name').textContent = lines[i][0];
  $('text').textContent = '';
  clearInterval(timer);
  let s = lines[i][1], n = 0;
  timer = setInterval(() => {
    $('text').textContent += s[n++];
    if (n >= s.length) {
      clearInterval(timer);
      typing = false;
      SoundEngine.play('click', 30);
    }
  }, 30);
  updateCharDisplay();
}

function updateCharDisplay() {
  const speaker = lines[current][0];
  const charCanvas = document.getElementById('characterDisplayCanvas');
  const display = $('characterDisplay');

  if (speaker === 'SCIENTIST') {
    charCanvas.style.display = 'block';
    display.textContent = '';
    drawPixelCharacter(charCanvas, 'scientist');
  } else if (speaker === 'SUBJECT') {
    charCanvas.style.display = 'block';
    display.textContent = '';
    drawPixelCharacter(charCanvas, 'subject');
    obsession = Math.min(100, obsession + 2);
  } else if (speaker === 'DOCTOR') {
    charCanvas.style.display = 'block';
    display.textContent = '';
    drawPixelCharacter(charCanvas, 'doctor');
  } else {
    charCanvas.style.display = 'none';
    display.textContent = speaker === 'SYSTEM' ? '⚠ SYSTEM' : '';
  }
}

function next() {
  if (typing) {
    clearInterval(timer);
    $('text').textContent = lines[current][1];
    typing = false;
    SoundEngine.play('beep', 30);
    return;
  }
  if (current < lines.length - 1) {
    showDialogue(current + 1);
    SoundEngine.play('click', 40);
    return;
  }
  showFirstChoice();
}

$('dialogue').onclick = next;

function showFirstChoice() {
  $('dialogue').style.display = 'none';
  $('choices').style.display = 'block';
  $('choices').innerHTML = '';
  addChoice('Comfort them gently. They\'re confused and scared.', () => {
    obsession += 10;
    path = 'compassionate';
    nextScene();
    SoundEngine.play('heartbeat', 60);
  });
  addChoice('Tell them they must stay hidden. Survival comes first.', () => {
    obsession += 5;
    path = 'pragmatic';
    nextScene();
    SoundEngine.play('beep', 60);
  });
  addChoice('Leave them alone. You have work to finish.', () => {
    path = 'cold';
    triggerShake(2);
    nextScene();
    SoundEngine.play('error', 60);
  });
}

function addChoice(t, fn) {
  let b = document.createElement('button');
  b.className = 'choice';
  b.textContent = t;
  b.onclick = fn;
  $('choices').appendChild(b);
}

function nextScene() {
  $('choices').style.display = 'none';
  $('dialogue').style.display = 'block';
  $('name').textContent = 'SCIENTIST';
  const msg = path === 'compassionate' ? 'Don\'t be afraid. I\'ll protect you. I promise.' : path === 'pragmatic' ? 'Stay quiet. Don\'t move. If they find you, everything is over.' : 'Don\'t make me repeat myself. Keep your head down and breathe.';
  $('text').textContent = msg;
  $('dialogue').onclick = () => bodysceneAction();
  saveGame();
  SoundEngine.play('click', 50);
}

function bodysceneAction() {
  $('dialogue').onclick = null;
  $('name').textContent = 'SYSTEM';
  $('text').textContent = 'You unlock the freezer. A corpse slides out on the metal tray. Cold. Silent. Waiting.';
  const charCanvas = document.getElementById('characterDisplayCanvas');
  charCanvas.style.display = 'none';
  $('characterDisplay').textContent = '⚠ SYSTEM';
  SoundEngine.play('error', 150);
  setTimeout(() => {
    $('name').textContent = 'SUBJECT';
    $('text').textContent = 'What... what are you doing?';
    charCanvas.style.display = 'block';
    $('characterDisplay').textContent = '';
    drawPixelCharacter(charCanvas, 'subject');
    $('dialogue').onclick = () => cupFalls();
  }, 1500);
}

function cupFalls() {
  $('dialogue').onclick = null;
  $('name').textContent = 'SYSTEM';
  $('text').textContent = 'A metal cup falls from the counter. It clatters across the floor.';
  $('characterDisplay').textContent = '⚠ SYSTEM';
  triggerShake(2);
  SoundEngine.play('alarm', 200);
  setTimeout(() => {
    $('dialogue').style.display = 'none';
    $('choices').style.display = 'block';
    $('choices').innerHTML = '';
    addChoice('"It\'s okay. It\'s just a cup. You didn\'t do anything wrong."', () => {
      obsession += 8;
      reassureSubject();
      SoundEngine.play('heartbeat', 80);
    });
    addChoice('"If you break anything else, I will hurt you."', () => {
      path = path === 'compassionate' ? 'crackingCompassion' : 'cruel';
      triggerShake(3);
      terrorizeSubject();
      SoundEngine.play('error', 80);
    });
  }, 1200);
}

function reassureSubject() {
  $('choices').style.display = 'none';
  $('dialogue').style.display = 'block';
  $('name').textContent = 'SCIENTIST';
  $('text').textContent = 'It\'s alright. You\'re safe. Nothing will hurt you as long as I\'m here.';
  drawPixelCharacter(document.getElementById('characterDisplayCanvas'), 'scientist');
  document.getElementById('characterDisplayCanvas').style.display = 'block';
  $('dialogue').onclick = () => finalMoment();
}

function terrorizeSubject() {
  $('choices').style.display = 'none';
  $('dialogue').style.display = 'block';
  $('name').textContent = 'SCIENTIST';
  $('text').textContent = 'One more mistake and I\'ll make sure you never move again.';
  drawPixelCharacter(document.getElementById('characterDisplayCanvas'), 'scientist');
  document.getElementById('characterDisplayCanvas').style.display = 'block';
  $('dialogue').onclick = () => finalMoment();
}

function finalMoment() {
  $('dialogue').onclick = null;
  $('name').textContent = 'SCIENTIST';
  $('text').textContent = 'We don\'t have much time. I need you to decide: Do you want to come with me? Or should I turn you in to the Directorate?';
  $('dialogue').onclick = () => {
    $('dialogue').style.display = 'none';
    $('choices').style.display = 'block';
    $('choices').innerHTML = '';
    addChoice('Take me with you. Please.', () => {
      decreaseDay();
      escapeEnding();
      SoundEngine.play('heartbeat', 150);
    });
    addChoice('Turn me in. It\'s better than this.', () => {
      betrayalEnding();
      SoundEngine.play('error', 150);
    });
  };
}

function escapeEnding() {
  $('choices').style.display = 'none';
  $('dialogue').style.display = 'block';
  $('name').textContent = 'SUBJECT';
  $('text').textContent = 'If you take me... what will you do with me? Where will we go?';
  $('dialogue').onclick = () => {
    $('dialogue').style.display = 'none';
    $('choices').style.display = 'block';
    $('choices').innerHTML = '';
    addChoice('I\'ll love you. I\'ll protect you. You\'re everything to me.', () => {
      const ending = obsession >= 70 ? 'OBSESSION' : 'ESCAPE';
      const txt = obsession >= 70 ?
        'You grab their hand and pull them toward the exit. Alarms scream. Bullets miss by inches. But you both make it out into the freezing night. As you drive into darkness, you realize you do not know what love is anymore—only the need to keep them near, always.' :
        'You take their hand and run. The laboratory burns behind you. As you disappear into the city lights, they lean against you, still confused, still terrified. But alive. And in your arms.';
      finalEnd(ending, txt);
      SoundEngine.play('heartbeat', 200);
    });
    addChoice('I don\'t know yet. But we\'ll figure it out together.', () => {
      const ending = 'UNKNOWN';
      const txt = 'You take them with you into the night. No plan. No safety. No future mapped out. Just the two of you against everything. As the city swallows you both, you realize you\'ve made a choice that can never be undone.';
      finalEnd(ending, txt);
      SoundEngine.play('heartbeat', 180);
    });
  };
}

function betrayalEnding() {
  $('choices').style.display = 'none';
  $('dialogue').style.display = 'block';
  $('name').textContent = 'SCIENTIST';
  $('text').textContent = 'If I turn you in, they\'ll dissect you. Everything that makes you *you* will be scattered across laboratory tables.';
  $('dialogue').onclick = () => {
    gameOver('SUBJECT TRANSFERRED', 'You hand them over to the Directorate. Within the hour, they are pronounced dead on the operating table. The agency sends you a thank-you note and a new assignment. You try not to think about their face.');
  };
}

function finalEnd(t, txt) {
  scene = 'ending';
  $('dialogue').style.display = 'none';
  $('choices').style.display = 'none';
  $('ending').style.display = 'flex';
  $('endingTitle').textContent = t;
  $('endingText').textContent = txt;
  $('status').textContent = 'FINAL OUTCOME: ' + t;
  saveGame();
}

function gameOver(t, txt) {
  $('gameOverOverlay').style.display = 'flex';
  $('gameOverText').textContent = txt;
  document.querySelector('.gameOverBox h1').textContent = t;
  SoundEngine.play('error', 300);
}

function startGame() {
  const input = document.getElementById('playerNameInput');
  playerName = (input && input.value && input.value.trim()) ? input.value.trim() : 'Dr. Voss';
  updateNameDisplay();
  SoundEngine.play('alarm', 200);
  $('title').style.display = 'none';
  scene = 'computer';
  $('computer').style.display = 'block';
  $('status').textContent = 'ACCESSING DATABASE';
  buildFiles();
  updateDayDisplay();
}

function renderLoop() {
  frame++;
  if (scene === 'title') {
    clear('#070609');
    for (let i = 0; i < 15; i++) {
      let x = (i * 50 + frame * 0.08) % 320;
      let y = (i * 35) % 180;
      rect(x, y, 2, 2, '#8b1f5f');
    }
  } else if (scene === 'lab') {
    drawLabScene();
  } else if (scene === 'ending') {
    clear('#0a0410');
  }
  requestAnimationFrame(renderLoop);
}

// ===== INITIALIZE =====
show($('title'));
updateNameDisplay();
updateDayDisplay();
requestAnimationFrame(renderLoop);
