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
        'Hi Hold the Line, I\'d like a free sandbag quote.',
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
