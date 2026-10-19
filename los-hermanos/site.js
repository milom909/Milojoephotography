(function () {
  var PHONE = '415-895-8570';

  // menu button on phones
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // copy buttons: data-copy="text" or data-copy-from="elementId"
  function copy(btn, text, fallbackEl) {
    var label = btn.textContent;
    var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = label; }, 1600); };
    var fallback = function () {
      if (fallbackEl) {
        var range = document.createRange(); range.selectNodeContents(fallbackEl);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      }
      btn.textContent = 'Selected, press copy';
      setTimeout(function () { btn.textContent = label; }, 2400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
  }
  document.querySelectorAll('[data-copy], [data-copy-from]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-copy-from');
      var el = src ? document.getElementById(src) : document.querySelector('[data-phone-text]');
      copy(btn, src ? el.textContent : btn.getAttribute('data-copy'), el);
    });
  });

  // stacking diagram: drop the bags in, bottom row first
  var wall = document.getElementById('wall');
  if (wall) {
    var n = 0;
    var rows = wall.querySelectorAll('.row');
    for (var r = rows.length - 1; r >= 0; r--) {
      rows[r].querySelectorAll('.sb').forEach(function (b) { b.style.animationDelay = (n++ * 0.06) + 's'; });
    }
    var replay = document.getElementById('replay');
    var play = function () { wall.classList.remove('go'); void wall.offsetWidth; wall.classList.add('go'); };
    if (replay) replay.addEventListener('click', play);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { play(); io.disconnect(); } });
      }, { threshold: 0.4 });
      io.observe(wall);
    }
  }

  // photo viewer on the Our Work page
  var lb = document.getElementById('lightbox');
  if (lb) {
    var shots = Array.prototype.slice.call(document.querySelectorAll('.gallery button'));
    var lbImg = document.getElementById('lbImg');
    var lbCap = document.getElementById('lbCap');
    var lbCount = document.getElementById('lbCount');
    var cur = 0, lastFocus = null;
    var show = function (i) {
      cur = (i + shots.length) % shots.length;
      var img = shots[cur].querySelector('img');
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = shots[cur].parentNode.querySelector('figcaption').textContent;
      lbCount.textContent = (cur + 1) + ' / ' + shots.length;
    };
    var close = function () { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
    shots.forEach(function (b, i) {
      b.addEventListener('click', function () {
        lastFocus = b; show(i); lb.hidden = false; document.body.style.overflow = 'hidden';
        document.getElementById('lbClose').focus();
      });
    });
    document.getElementById('lbPrev').addEventListener('click', function () { show(cur - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(cur + 1); });
    document.getElementById('lbClose').addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-img')) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  // quote form: builds a text message to send us
  var form = document.getElementById('qform');
  if (form) {
    // services page links here as quote.html#garage, #gate, etc.
    var pre = (location.hash || '').slice(1);
    if (pre) {
      var box = document.getElementById('q-' + pre);
      if (box && box.type === 'checkbox') box.checked = true;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var street = form.elements.street.value.trim();
      var picks = Array.prototype.map.call(form.querySelectorAll('.checks input:checked'), function (c) { return c.value; });
      var err = document.getElementById('q-err');
      if (!street || !picks.length) {
        err.textContent = !street ? 'Add your street so we know where to come.' : 'Pick at least one area you want covered.';
        (!street ? form.elements.street : form.querySelector('.checks input')).focus();
        return;
      }
      err.textContent = '';
      var notes = form.elements.notes.value.trim();
      var msg = [
        'Hi Hold the Line, I\'d like a free sandbag quote with the El Niño Community Discount (15% off).',
        name ? 'Name: ' + name : null,
        'Street: ' + street + ', Larkspur',
        'Cover: ' + picks.join(', '),
        'Timing: ' + form.elements.when.value,
        notes ? 'Notes: ' + notes : null
      ].filter(Boolean).join('\n');
      document.getElementById('q-msg').textContent = msg;
      document.getElementById('q-sms').href = 'sms:+14158958570?&body=' + encodeURIComponent(msg);
      var out = document.getElementById('q-out');
      out.hidden = false;
      out.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    document.getElementById('q-reset').addEventListener('click', function () {
      form.reset();
      document.getElementById('q-out').hidden = true;
      document.getElementById('q-err').textContent = '';
      form.elements.name.focus();
    });
  }
})();

// original "Hold the Line" jingle, made with Web Audio (no music file)
(function () {
  var brand = document.getElementById('brand');
  var btn = document.getElementById('tuneBtn');
  if (!brand) return;
  var AC = window.AudioContext || window.webkitAudioContext;
  var ctx = null, busyUntil = 0, clicked = false;
  document.addEventListener('pointerdown', function () { clicked = true; }, { once: true, capture: true });

  function note(freq, start, len, vol) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + len);
    o.connect(g); g.connect(ctx.destination);
    o.start(start); o.stop(start + len + 0.05);
  }
  function chord(freqs, start, len) { freqs.forEach(function (f) { note(f, start, len, 0.07); }); }

  function play() {
    if (!AC) return;
    var now0 = Date.now();
    if (now0 < busyUntil) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === 'suspended') ctx.resume();
    var t = ctx.currentTime + 0.05, b = 0.16;
    // driving stabs, then a lift and a held chord
    chord([196.0, 246.9, 293.7], t, 0.12);
    chord([196.0, 246.9, 293.7], t + b, 0.12);
    chord([196.0, 246.9, 293.7], t + b * 2, 0.12);
    chord([220.0, 261.6, 329.6], t + b * 3, 0.18);
    note(392.0, t + b * 4.5, 0.14, 0.1);
    note(440.0, t + b * 5.5, 0.14, 0.1);
    note(523.3, t + b * 6.5, 0.14, 0.1);
    chord([261.6, 329.6, 392.0, 523.3], t + b * 7.5, 0.9);
    busyUntil = now0 + 2200;
    brand.classList.add('playing');
    setTimeout(function () { brand.classList.remove('playing'); }, 2200);
  }

  // hover plays only after the visitor has clicked somewhere (browser rule)
  brand.addEventListener('mouseenter', function () { if (clicked) play(); });
  if (btn) btn.addEventListener('click', play);
})();
