(() => {
  const screens = {
    start: document.getElementById('startScreen'),
    kick: document.getElementById('kickScreen'),
    shame: document.getElementById('shameScreen'),
    advice: document.getElementById('adviceScreen')
  };

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const gameFrame = document.getElementById('gameFrame');
  const kickPrompt = document.getElementById('kickPrompt');
  const resultFlash = document.getElementById('resultFlash');
  const timelineGlitch = document.getElementById('timelineGlitch');
  const windReadout = document.getElementById('windReadout');
  const timelineBadge = document.getElementById('timelineBadge');
  const nateAdvice = document.getElementById('nateAdvice');
  const shaneAdvice = document.getElementById('shaneAdvice');
  const shameText = document.getElementById('shameText');
  const shameBy = document.getElementById('shameBy');
  const missLabel = document.getElementById('missLabel');
  const soundBtn = document.getElementById('soundBtn');

  const audio = {
    kick: new Audio('assets/audio/kick.wav'),
    cheer: new Audio('assets/audio/cheer.wav'),
    doink: new Audio('assets/audio/doink.wav'),
    boo: new Audio('assets/audio/boo.wav'),
    blip: new Audio('assets/audio/blip.wav')
  };
  Object.values(audio).forEach(a => { a.preload = 'auto'; });
  let soundOn = true;
  function play(name, volume = 1) {
    if (!soundOn || !audio[name]) return;
    const a = audio[name];
    a.currentTime = 0;
    a.volume = volume;
    a.play().catch(() => {});
  }

  const advicePairs = [
    {
      nate: 'Solid kick. Now try not to ruin it with your draft. Take value when it falls and stop inventing reasons to pass on good players.',
      shane: 'Good kick. Good vibes. Draft the guy you want. Regret is tomorrow’s problem.'
    },
    {
      nate: 'Matt’s seven-year average finish is 7.14. That is no longer a slump. It is an address.',
      shane: 'If Matt loves the pick, let him have it. Seventh place needs players too.'
    },
    {
      nate: 'Jimbo has an average finish under third in the data we pulled. Unfortunately, this gives the old bastard statistical permission to keep talking shit.',
      shane: 'Jim is going to make fun of your pick either way. At least make him work for it.'
    },
    {
      nate: 'Ramsey remembers the original timeline, before the rest of you started drafting and ruining everything. The annoying part is he has actually won enough to keep believing this.',
      shane: 'Ramsey was taking your guy next. He has the almanac, three screenshots, and a theory about why the commissioner changed the future.'
    },
    {
      nate: 'Teti has drafted Aaron Rodgers five times. At some point roster construction becomes a long-term relationship.',
      shane: 'If Rodgers is still on the board, somebody tell Teti there’s a call. We can save him from himself.'
    },
    {
      nate: 'Teti being late may actually be an advantage. It prevents him from participating in the part where everybody in this room overthinks the obvious answer.',
      shane: 'Teti will blame a bad pick on a fire call. You’ll blame yours on research. His excuse is better.'
    },
    {
      nate: 'Chad has the first pick. The advanced strategy is to take the player everyone agrees should go first and resist the urge to prove you are smarter than the room.',
      shane: 'Chad, take the obvious guy. This is fantasy football, not a Patriots trade-down seminar.'
    },
    {
      nate: 'Jay tends to look dangerous early. Draft for December, not for the part of the season when everybody starts saying Jay’s team looks scary.',
      shane: 'Jay loves action. If he says a pick is a lock, ask whether he means fantasy or a parlay.'
    },
    {
      nate: 'Farkas quietly went from the basement to first over several seasons. That is either patience or the slowest criminal enterprise in league history.',
      shane: 'Worry about the quiet guy. He spends all the time Ramsey uses arguing actually thinking.'
    },
    {
      nate: 'Justin is new, drinks Busch Light by choice, and roots for the Browns. We do not have draft history, but those are three significant warning indicators.',
      shane: 'Busch Light and the Browns. Justin came into this league pre-trained for disappointment. Honestly, that might make him dangerous.'
    },
    {
      nate: 'Justin is six-foot-infinity and still chose Busch Light. Height clearly does not correlate with judgment.',
      shane: 'Prince of Edinboro. Browns fan. Busch Light. If Create-a-Player had a bad-decisions slider, Justin maxed it out.'
    },
    {
      nate: 'Justin is reportedly outselling Matt at Husqvarna. If he takes Matt’s sleeper too, I assume regional management gets involved.',
      shane: 'Matt, you cannot let the new guy take your accounts and your running back. Have some professional pride.'
    },
    {
      nate: 'Pia’s draft-order process is at least as defensible as the strategic process most of you will use tonight.',
      shane: 'Pia already did her job. If you hate your slot, take it up with a child.'
    },
    {
      nate: 'Most of these guys have known each other since they were kids and spent years at Jimbo’s house. Decades of familiarity have somehow produced no competitive advantage.',
      shane: 'They grew up together, hung around Jim’s house, and learned one thing: never give anybody a clean opening to talk shit.'
    },
    {
      nate: 'Shane was projected first after a draft and finished tenth. We still gave him half of this booth. That is a governance failure.',
      shane: 'Projections are just numbers with anxiety. I had a take. I stand by having had it.'
    },
    {
      nate: 'Shane drafted Matt Gay five straight years. I am not calling it strategy. I am not calling it healthy. I am simply documenting it.',
      shane: 'That is called brand consistency. Look it up.'
    },
    {
      nate: 'Do not get cute in the middle rounds. You need starters and useful depth, not a roster you have to explain like modern art.',
      shane: 'Take good players. I cannot believe we are giving this level of analysis away for free.'
    },
    {
      nate: 'You do not need to win the draft tonight. You need to avoid doing something everyone will remember for the next eight years.',
      shane: 'Exactly. Be memorable later. Preferably when you are holding the trophy.'
    },
    {
      nate: 'The lion-and-cheetah joke is not strategy. It has never been strategy. I have asked Shane to stop treating it like strategy.',
      shane: 'One day a lion and a cheetah played cards. The cheetah won. Lion says, “you cheetah!” Cheetah says, “you lion!” Still works.'
    },
    {
      nate: 'If Ramsey says collusion, first determine whether someone simply selected a player he wanted. That resolves most cases.',
      shane: 'If the corkboard comes out before Round 5, we are ahead of schedule.'
    },
    {
      nate: 'Christian McCaffrey has appeared in Jonah’s first round more than once. Familiarity is not analysis, but at least it is a coherent addiction.',
      shane: 'If your guy keeps working, keep taking him. If he stops working, pretend Nate told you to do it.'
    },
    {
      nate: 'Jimbo has been giving half this room shit since before fantasy football apps existed. You are not going to out-heckle him tonight. Build a better roster instead.',
      shane: 'If Jim starts laughing before you finish announcing the pick, just keep talking. Showing fear feeds him.'
    }
  ];

  const timelinePairs = [
    {
      nate: 'Ramsey says this player was still available in the original timeline. I asked what changed. He showed me a screenshot with three red circles and no date.',
      shane: 'I believe him. Not because the evidence is good. Because I want to see how far this goes.'
    },
    {
      nate: 'A pick has altered the 2021 branch of the timeline. Ramsey is requesting commissioner review and, inexplicably, a recount.',
      shane: 'Nobody touch anything. He says he can fix it if we draft exactly the same players in reverse order.'
    },
    {
      nate: 'Ramsey’s almanac says this is a reach. He refuses to disclose which version of the future produced the almanac.',
      shane: 'The man has two championships and absolutely no reason to become more normal now.'
    },
    {
      nate: 'Someone selected a player one spot before Ramsey. The timeline is now considered compromised.',
      shane: 'Commissioner Mazzer, please secure the grassy knoll.'
    }
  ];

  const misses = {
    any: [
      { by:'NATE', text:'Our model had that kick as makeable. We failed to account for you.' },
      { by:'SHANE', text:'Pia picked the draft order with more precision than that.' },
      { by:'NATE', text:'Farkas said nothing. Somehow that was still the harshest reaction.' },
      { by:'SHANE', text:'Teti could have kicked that between calls.' },
      { by:'NATE', text:'The commissioner reviewed the play. Unfortunately it still sucked.' },
      { by:'SHANE', text:'Ramsey was going to miss that exact kick next.' },
      { by:'NATE', text:'Jimbo already has a joke about that. You will hear it until somebody dies.' },
      { by:'SHANE', text:'Justin drinks Busch Light and somehow YOUR judgment is what we’re discussing.' },
      { by:'NATE', text:'The Browns have seen cleaner execution. That sentence should embarrass you.' },
      { by:'SHANE', text:'Matt finishes seventh more accurately than you kick.' },
      { by:'NATE', text:'Shane has three tenth-place finishes in the data and even he is disappointed.' },
      { by:'SHANE', text:'Jimbo has been talking shit since these guys were kids. Congratulations on handing him fresh material.' },
      { by:'NATE', text:'Justin voluntarily combines Browns football with Busch Light. He has suffered enough to kick better than that.' },
      { by:'SHANE', text:'Busch Light tastes like somebody missed a field goal. So at least Justin will understand this.' }
    ],
    left: [
      { by:'NATE', text:'Wide left. The football demonstrated a strong preference for somewhere else.' },
      { by:'SHANE', text:'Wide left. You were not kicking to Farkas’s house.' },
      { by:'NATE', text:'Ramsey would like to know whether the left upright colluded against him.' },
      { by:'SHANE', text:'That kick had less direction than Matt’s path out of seventh.' },
      { by:'NATE', text:'Expected field goal: yes. Observed field goal: whatever that was.' }
    ],
    right: [
      { by:'SHANE', text:'Wide right. You’re drafting a kicker in the second round, aren’t you?' },
      { by:'NATE', text:'Tracking briefly classified that as a pass.' },
      { by:'SHANE', text:'That thing is headed toward Edinboro. Justin, duck.' },
      { by:'NATE', text:'Justin could sell that kick as a Husqvarna attachment and Matt would still lose the account.' },
      { by:'SHANE', text:'Even Ramsey cannot argue that one through.' }
    ],
    short: [
      { by:'SHANE', text:'Short. Story of the entire effort.' },
      { by:'NATE', text:'The kick had the ambition of a seventh-place roster.' },
      { by:'SHANE', text:'Justin’s Busch Light can traveled farther.' },
      { by:'NATE', text:'The football appears to have reconsidered midway through the attempt.' },
      { by:'SHANE', text:'Jimbo’s dad jokes have more distance.' }
    ],
    doink: [
      { by:'SHANE', text:'DOINK. That is the closest you’re getting to useful advice.' },
      { by:'NATE', text:'Technically impressive. Practically worthless.' },
      { by:'SHANE', text:'Hit the post harder than Jay hits a sportsbook.' },
      { by:'NATE', text:'Ramsey has filed a protest arguing that the upright moved.' },
      { by:'SHANE', text:'Matt says it almost counted. This explains some standings.' }
    ]
  };

  let stats = JSON.parse(localStorage.getItem('fantasyKickStats') || '{"kicks":0,"made":0,"streak":0}');
  let wind = 0;
  let dragging = false;
  let start = null;
  let current = null;
  let anim = null;
  let ready = false;
  let lastAdvice = -1;
  let lastMiss = '';
  let currentScreen = 'start';

  const BASE_W = 960;
  const BASE_H = 720;
  const ball = { x: 467, y: 458 };
  const goal = { x: 477, half: 76, crossbar: 277, top: 56 };

  const kickBg = new Image();
  kickBg.src = 'assets/img/kick-reference.png?v=3.1.1';
  kickBg.onload = () => { if (currentScreen === 'kick') draw(); };

  function showScreen(name) {
    currentScreen = name;
    Object.entries(screens).forEach(([key, el]) => el.classList.toggle('active', key === name));
    play('blip', .28);
    if (name === 'kick') {
      setTimeout(() => {
        resetKick();
        resizeCanvas();
      }, 20);
    }
    window.scrollTo(0, 0);
  }

  function uniqueIndex(length, previous) {
    if (length < 2) return 0;
    let i = Math.floor(Math.random() * length);
    if (i === previous) i = (i + 1 + Math.floor(Math.random() * (length - 1))) % length;
    return i;
  }

  function selectAdvice(timeline = false) {
    const pool = timeline ? timelinePairs : advicePairs;
    const i = uniqueIndex(pool.length, timeline ? -1 : lastAdvice);
    if (!timeline) lastAdvice = i;
    const pair = pool[i];
    nateAdvice.textContent = pair.nate;
    shaneAdvice.textContent = pair.shane;
    timelineBadge.hidden = !timeline;
  }

  function selectShame(type) {
    const pool = [...(misses[type] || []), ...misses.any];
    let item = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && item.text === lastMiss) item = pool[(pool.indexOf(item) + 1) % pool.length];
    lastMiss = item.text;
    shameText.textContent = item.text;
    shameBy.textContent = `— ${item.by}`;
    missLabel.textContent = type === 'left' ? 'WIDE LEFT' : type === 'right' ? 'WIDE RIGHT' : type === 'short' ? 'SHORT' : type === 'doink' ? 'DOINK' : 'NO GOOD';
  }

  function updateStats() {
    document.getElementById('kicksStat').textContent = stats.kicks;
    document.getElementById('madeStat').textContent = stats.made;
    document.getElementById('pctStat').textContent = stats.kicks ? `${Math.round(stats.made / stats.kicks * 100)}%` : '---';
  }

  function newWind() {
    wind = Math.round((Math.random() * 9 - 4.5) * 10) / 10;
    const arrow = wind < -.45 ? '←' : wind > .45 ? '→' : '•';
    windReadout.textContent = `${arrow} ${Math.abs(wind).toFixed(1)} MPH`;
  }

  function resizeCanvas() {
    if (currentScreen !== 'kick') return;
    const r = canvas.getBoundingClientRect();
    const ratio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.round(r.width * ratio);
    canvas.height = Math.round(r.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }

  function dims() {
    const r = canvas.getBoundingClientRect();
    return { w: r.width, h: r.height, sx: r.width / BASE_W, sy: r.height / BASE_H };
  }
  function X(v) { return v * dims().sx; }
  function Y(v) { return v * dims().sy; }

  function drawCrowd(horizonY) {
    const d = dims();
    const top = Y(horizonY - 90), bottom = Y(horizonY + 42);
    const standGrad = ctx.createLinearGradient(0, top, 0, bottom);
    standGrad.addColorStop(0, '#102844');
    standGrad.addColorStop(1, '#07131f');
    ctx.fillStyle = standGrad;
    ctx.fillRect(0, top, d.w, bottom - top);
    ctx.fillStyle = '#5f7485';
    ctx.fillRect(0, top, d.w, Math.max(2, Y(4)));
    const crowd = ['#d77924', '#eab33a', '#d8e1e6', '#244d83', '#b94722'];
    for (let row = 0; row < 9; row++) {
      for (let i = 0; i < 78; i++) {
        const px = (i * 14 + (row % 2) * 7) % BASE_W;
        const py = horizonY - 75 + row * 13;
        ctx.fillStyle = crowd[(i * 3 + row * 2) % crowd.length];
        ctx.fillRect(X(px), Y(py), Math.max(2, X(5)), Math.max(2, Y(5)));
      }
    }
    ctx.fillStyle = '#0d3563';
    ctx.fillRect(0, Y(horizonY + 25), d.w, Y(25));
    ctx.fillStyle = '#aebbc1';
    ctx.fillRect(0, Y(horizonY + 24), d.w, Math.max(2, Y(3)));
  }

  function drawLights(x, y, flip = false) {
    ctx.save();
    ctx.translate(X(x), Y(y));
    if (flip) ctx.scale(-1, 1);
    const s = Math.min(dims().sx, dims().sy);
    ctx.fillStyle = '#525f68';
    ctx.fillRect(-2 * s, 24 * s, 5 * s, 120 * s);
    ctx.fillStyle = '#18212a';
    ctx.fillRect(-35 * s, 0, 70 * s, 38 * s);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      ctx.shadowColor = '#e9f8ff';
      ctx.shadowBlur = 10 * s;
      ctx.fillStyle = '#edf8ff';
      ctx.fillRect((-28 + c * 13) * s, (5 + r * 11) * s, 7 * s, 7 * s);
    }
    ctx.restore();
    ctx.shadowBlur = 0;
  }

  function drawField(horizonY) {
    const d = dims();
    const y0 = Y(horizonY + 48), y1 = d.h;
    const grad = ctx.createLinearGradient(0, y0, 0, y1);
    grad.addColorStop(0, '#337b3b');
    grad.addColorStop(1, '#174d27');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(X(75), y0); ctx.lineTo(X(885), y0); ctx.lineTo(d.w, y1); ctx.lineTo(0, y1); ctx.closePath(); ctx.fill();

    for (let n = 0; n < 6; n++) {
      const t = n / 6;
      const y = horizonY + 80 + Math.pow(t, 1.55) * 505;
      const left = 80 - t * 90, right = 880 + t * 90;
      ctx.strokeStyle = 'rgba(255,255,255,.35)';
      ctx.lineWidth = Math.max(1, Y(2));
      ctx.beginPath(); ctx.moveTo(X(left), Y(y)); ctx.lineTo(X(right), Y(y)); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255,255,255,.85)';
    ctx.lineWidth = Math.max(1, X(2));
    [260, 700].forEach(x => { ctx.beginPath(); ctx.moveTo(X(440 + (x - 440) * .12), y0); ctx.lineTo(X(x), y1); ctx.stroke(); });

    for (let y = horizonY + 95; y < 625; y += 54) {
      for (let x = 110; x < 900; x += 82) {
        ctx.fillStyle = 'rgba(255,255,255,.9)';
        ctx.fillRect(X(x), Y(y), X(18), Math.max(1.5, Y(3)));
      }
    }
  }

  function drawBillboard(x, y, w, h, line1, line2) {
    ctx.save();
    ctx.fillStyle = '#d7dcda';
    ctx.strokeStyle = '#06101d';
    ctx.lineWidth = Math.max(2, X(3));
    ctx.fillRect(X(x), Y(y), X(w), Y(h));
    ctx.strokeRect(X(x), Y(y), X(w), Y(h));
    ctx.fillStyle = '#102a4a';
    ctx.textAlign = 'center';
    ctx.font = `${Math.max(8, X(12))}px Arial`;
    ctx.fillText(line1, X(x + w / 2), Y(y + 20));
    ctx.font = `${Math.max(7, X(10))}px Arial`;
    ctx.fillText(line2, X(x + w / 2), Y(y + 37));
    ctx.restore();
  }

  function drawGoal() {
    ctx.save();
    ctx.strokeStyle = '#f2cc26';
    ctx.lineWidth = Math.max(4, X(6));
    ctx.lineCap = 'square';
    ctx.shadowColor = 'rgba(0,0,0,.5)';
    ctx.shadowOffsetX = X(3);
    ctx.shadowOffsetY = Y(3);
    ctx.beginPath();
    ctx.moveTo(X(goal.x), Y(365));
    ctx.lineTo(X(goal.x), Y(goal.crossbar));
    ctx.moveTo(X(goal.x - goal.half), Y(goal.crossbar));
    ctx.lineTo(X(goal.x + goal.half), Y(goal.crossbar));
    ctx.moveTo(X(goal.x - goal.half), Y(goal.crossbar));
    ctx.lineTo(X(goal.x - goal.half), Y(goal.top));
    ctx.moveTo(X(goal.x + goal.half), Y(goal.crossbar));
    ctx.lineTo(X(goal.x + goal.half), Y(goal.top));
    ctx.stroke();
    ctx.restore();
  }

  function drawKicker() {
    ctx.save();
    const sx = dims().sx, sy = dims().sy;
    ctx.translate(X(405), Y(486));
    // shadow
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath(); ctx.ellipse(0, Y(80), X(42), Y(10), 0, 0, Math.PI * 2); ctx.fill();
    // legs
    ctx.strokeStyle = '#e6edf2'; ctx.lineWidth = Math.max(9, X(12)); ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(X(-10), Y(35)); ctx.lineTo(X(-18), Y(80)); ctx.moveTo(X(13), Y(35)); ctx.lineTo(X(22), Y(80)); ctx.stroke();
    // socks/shoes
    ctx.strokeStyle = '#0b1c36'; ctx.lineWidth = Math.max(6, X(8));
    ctx.beginPath(); ctx.moveTo(X(-18), Y(75)); ctx.lineTo(X(-23), Y(86)); ctx.moveTo(X(22), Y(75)); ctx.lineTo(X(29), Y(84)); ctx.stroke();
    // torso jersey
    const jersey = ctx.createLinearGradient(X(-25), 0, X(28), 0); jersey.addColorStop(0, '#0b2e65'); jersey.addColorStop(.55, '#1556a2'); jersey.addColorStop(1, '#071d43');
    ctx.fillStyle = jersey; ctx.strokeStyle = '#031029'; ctx.lineWidth = Math.max(2, X(3));
    ctx.fillRect(X(-28), Y(-22), X(56), Y(62)); ctx.strokeRect(X(-28), Y(-22), X(56), Y(62));
    // arms
    ctx.strokeStyle = '#c78d64'; ctx.lineWidth = Math.max(8, X(10));
    ctx.beginPath(); ctx.moveTo(X(-24), Y(-5)); ctx.lineTo(X(-39), Y(25)); ctx.moveTo(X(24), Y(-5)); ctx.lineTo(X(38), Y(25)); ctx.stroke();
    // helmet
    ctx.fillStyle = '#d6dde2'; ctx.strokeStyle = '#05152d'; ctx.lineWidth = Math.max(2, X(3));
    ctx.beginPath(); ctx.arc(0, Y(-37), X(21), Math.PI, Math.PI * 2); ctx.lineTo(X(20), Y(-28)); ctx.lineTo(X(-20), Y(-28)); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#2355a5'; ctx.lineWidth = Math.max(2, X(3)); ctx.beginPath(); ctx.moveTo(X(-6), Y(-57)); ctx.lineTo(X(-6), Y(-30)); ctx.stroke();
    // jersey number
    ctx.fillStyle = '#f0f2f3'; ctx.font = `bold ${Math.max(12, X(19))}px Arial`; ctx.textAlign = 'center'; ctx.fillText('00', 0, Y(15));
    ctx.restore();
  }

  function drawBall(x = ball.x, y = ball.y, scale = 1, rot = 0) {
    ctx.save();
    ctx.translate(X(x), Y(y));
    ctx.rotate(rot);
    ctx.scale(dims().sx * scale, dims().sy * scale);
    const g = ctx.createLinearGradient(-22, -12, 22, 12); g.addColorStop(0, '#4e1d08'); g.addColorStop(.55, '#9a4518'); g.addColorStop(1, '#4b1a07');
    ctx.fillStyle = g; ctx.strokeStyle = '#1d0901'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, 0, 24, 13, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#f5ead7'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(7, 4); ctx.stroke();
    for (let i = -3; i <= 3; i += 3) { ctx.beginPath(); ctx.moveTo(i - 2, -1); ctx.lineTo(i + 1, -4); ctx.stroke(); }
    ctx.restore();
  }

  function drawPowerMeter() {
    const x = 892, y = 320, w = 32, h = 170;
    ctx.fillStyle = 'rgba(2,5,9,.88)'; ctx.strokeStyle = '#a6bac5'; ctx.lineWidth = Math.max(2, X(2));
    ctx.fillRect(X(x), Y(y), X(w), Y(h)); ctx.strokeRect(X(x), Y(y), X(w), Y(h));
    const colors = ['#2ecb3e','#8dde2a','#e0dc2a','#ffad1b','#ee3126'];
    for (let i = 0; i < 5; i++) { ctx.fillStyle = colors[i]; ctx.fillRect(X(x + 7), Y(y + h - 15 - i * 30), X(18), Y(23)); }
    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.max(7, X(8))}px Arial`; ctx.textAlign = 'center'; ctx.fillText('POWER', X(x + w / 2), Y(y + h + 14));
  }

  function drawSwipe() {
    if (!dragging || !start || !current) return;
    ctx.save();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = Math.max(4, X(6)); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X(start.x), Y(start.y)); ctx.lineTo(X(current.x), Y(current.y)); ctx.stroke();
    const angle = Math.atan2(Y(current.y - start.y), X(current.x - start.x));
    ctx.translate(X(current.x), Y(current.y)); ctx.rotate(angle); ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-X(22), -Y(11)); ctx.lineTo(-X(22), Y(11)); ctx.closePath(); ctx.fill(); ctx.restore();
  }

  function drawStadium() {
    const d = dims();
    const sky = ctx.createLinearGradient(0, 0, 0, Y(270));
    sky.addColorStop(0, '#234f82'); sky.addColorStop(.62, '#4f7596'); sky.addColorStop(1, '#18283b');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, d.w, d.h);
    // cloud haze
    ctx.fillStyle = 'rgba(226,235,239,.22)';
    ctx.beginPath(); ctx.ellipse(X(220), Y(100), X(180), Y(35), 0, 0, Math.PI * 2); ctx.ellipse(X(710), Y(76), X(160), Y(28), 0, 0, Math.PI * 2); ctx.fill();
    drawLights(90, 55); drawLights(865, 55, true);
    drawCrowd(250);
    drawField(250);
    drawBillboard(36, 247, 185, 47, 'BROWNS + BUSCH', 'HARD MODE — JUSTIN');
    drawBillboard(733, 247, 190, 47, '7.14 AVERAGE', 'MATT HAS A SYSTEM');
    drawBillboard(300, 247, 220, 47, 'THE TIMELINE WAS REAL', '— RAMSEY');
    drawGoal();
    drawKicker();
    drawPowerMeter();
  }

  function draw() {
    if (currentScreen !== 'kick') return;
    const d = dims();
    ctx.clearRect(0, 0, d.w, d.h);
    if (kickBg.complete && kickBg.naturalWidth) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(kickBg, 0, 0, d.w, d.h);
      ctx.fillStyle = 'rgba(2, 4, 10, 0.14)';
      ctx.fillRect(0, 0, d.w, d.h);
    } else {
      drawStadium();
    }
    if (anim) drawBall(anim.x, anim.y, anim.scale, anim.rot);
    drawSwipe();
  }

  function pointerPos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * BASE_W / r.width, y: (e.clientY - r.top) * BASE_H / r.height };
  }

  canvas.addEventListener('pointerdown', e => {
    if (!ready) return;
    dragging = true; start = pointerPos(e); current = start;
    canvas.setPointerCapture(e.pointerId);
    kickPrompt.classList.add('hidden');
    draw();
  });
  canvas.addEventListener('pointermove', e => { if (!dragging) return; current = pointerPos(e); draw(); });
  canvas.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false; current = pointerPos(e); kick(start, current); start = current = null;
  });
  canvas.addEventListener('pointercancel', () => { dragging = false; start = current = null; kickPrompt.classList.remove('hidden'); draw(); });

  function kick(a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    if (dy > -28) { kickPrompt.classList.remove('hidden'); draw(); return; }
    ready = false;
    play('kick', 1);
    if (navigator.vibrate) navigator.vibrate(28);

    const distance = Math.hypot(dx, dy);
    const power = Math.max(0, Math.min(1, distance / 245));
    const aim = (dx / Math.max(100, Math.abs(dy))) * 205;
    const windEffect = wind * 4.2;
    const targetX = goal.x + aim + windEffect;
    const short = power < .43;
    const atPost = Math.abs(Math.abs(targetX - goal.x) - goal.half) < 10 && !short;
    const made = !short && Math.abs(targetX - goal.x) < goal.half - 8;
    const type = made ? 'made' : short ? 'short' : atPost ? 'doink' : targetX < goal.x ? 'left' : 'right';
    animateKick(targetX, power, type);
  }

  function animateKick(targetX, power, type) {
    const started = performance.now();
    const duration = 880;
    function step(now) {
      const p = Math.min(1, (now - started) / duration);
      const ease = 1 - Math.pow(1 - p, 2);
      const finalY = type === 'short' ? 430 : 150;
      const x = ball.x + (targetX - ball.x) * ease;
      const lineY = ball.y + (finalY - ball.y) * ease;
      const arc = Math.sin(Math.PI * p) * 138 * power;
      const y = lineY - arc;
      anim = { x, y, scale: 1 - .62 * ease, rot: p * 7.5 };
      draw();
      if (p < 1) requestAnimationFrame(step); else finishKick(type);
    }
    requestAnimationFrame(step);
  }

  function flash(text, bad) {
    resultFlash.textContent = text;
    resultFlash.className = `result-flash${bad ? ' bad' : ''}`;
    resultFlash.hidden = false;
    setTimeout(() => { resultFlash.hidden = true; }, 760);
  }

  function finishKick(type) {
    stats.kicks++;
    let timeline = false;
    if (type === 'made') {
      stats.made++; stats.streak++;
      play('cheer', .78); flash('IT’S GOOD!', false);
      if (navigator.vibrate) navigator.vibrate([24, 35, 24]);
      timeline = Math.random() < .09;
      if (timeline) {
        setTimeout(() => { timelineGlitch.hidden = false; play('blip', .6); }, 420);
      }
    } else {
      stats.streak = 0;
      if (type === 'doink') play('doink', 1); else play('boo', .55);
      flash(type === 'doink' ? 'DOINK!' : 'NO GOOD!', true);
      if (navigator.vibrate) navigator.vibrate(55);
    }
    localStorage.setItem('fantasyKickStats', JSON.stringify(stats));
    updateStats();

    setTimeout(() => {
      anim = null;
      if (type === 'made') {
        timelineGlitch.hidden = true;
        selectAdvice(timeline);
        showScreen('advice');
      } else {
        selectShame(type);
        showScreen('shame');
      }
    }, type === 'made' && timeline ? 1350 : 1050);
  }

  function resetKick() {
    anim = null; dragging = false; start = current = null; ready = true;
    resultFlash.hidden = true; timelineGlitch.hidden = true; kickPrompt.classList.remove('hidden');
    newWind(); draw();
  }

  document.getElementById('startBtn').addEventListener('click', () => showScreen('kick'));
  document.getElementById('kickMenuBtn').addEventListener('click', () => showScreen('start'));
  document.getElementById('tryAgainBtn').addEventListener('click', () => showScreen('kick'));
  document.getElementById('shameMenuBtn').addEventListener('click', () => showScreen('start'));
  document.getElementById('playAgainBtn').addEventListener('click', () => showScreen('kick'));
  document.getElementById('adviceMenuBtn').addEventListener('click', () => showScreen('start'));
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.textContent = `SOUND: ${soundOn ? 'ON' : 'OFF'}`;
    if (soundOn) play('blip', .35);
  });
  window.addEventListener('resize', resizeCanvas);

  updateStats();
  newWind();
})();
