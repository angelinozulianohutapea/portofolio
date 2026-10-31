/* ==========================================================================
   main.js — membuat semua halaman dari window.CONTENT (js/content.js)
   dan menjalankan efek. Tanpa library, tanpa build step.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.CONTENT || {};
  var doc = document, root = doc.documentElement;
  var page = doc.body.getAttribute('data-page') || 'home';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(pointer: fine)').matches;

  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var has = function (v) { return v != null && String(v).trim() !== ''; };
  var list = function (v) {
    if (Array.isArray(v)) return v.filter(function (x) { return x != null && (typeof x !== 'string' || has(x)); });
    return has(v) ? [v] : [];
  };
  var isUrl = function (u) { return /^(https?:|mailto:|tel:|\/|\.|#|[\w-]+\/)/i.test(String(u)); };

  /* ---------- Normalisasi data ---------- */
  var imgObj = function (x) {
    return typeof x === 'string' ? { src: x, alt: '', caption: '' } : { src: x.src || '', alt: x.alt || '', caption: x.caption || '' };
  };
  var bio = list(C.bio);
  var social = list(C.social).filter(function (s) { return s && has(s.url); });
  var P = list(C.projects).filter(function (p) { return p && has(p.title); }).map(function (p, i) {
    var o = Object.assign({}, p);
    o.id = has(p.id) ? String(p.id) : String(i + 1);
    o.n = String(i + 1).padStart(2, '0');
    o.images = list(p.images).map(imgObj).filter(function (x) { return has(x.src); });
    o.stack = list(p.stack);
    o.links = list(p.links).filter(function (l) { return l && has(l.url); });
    return o;
  });
  var skills = (function () {
    var loose = [], groups = [];
    list(C.skills).forEach(function (s) {
      if (typeof s === 'string') loose.push(s);
      else if (s && list(s.items).length) groups.push({ group: s.group || '', items: list(s.items) });
    });
    if (loose.length) groups.unshift({ group: '', items: loose });
    return groups;
  })();
  var tlFilter = function (e) { return e && (has(e.title) || has(e.org)); };
  var exp = list(C.experience).filter(tlFilter);
  var edu = list(C.education).filter(tlFilter);
  var hasAbout = bio.length || skills.length || exp.length || edu.length || has(C.photo);
  var mailto = 'mailto:' + esc(C.email);

  /* ---------- Potongan HTML ---------- */
  function imgTag(o, cls) {
    return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + esc(o.src) + '" alt="' + esc(o.alt) + '" loading="lazy" decoding="async">';
  }
  function setMeta(title, desc) {
    doc.title = title;
    var m = $('meta[name="description"]');
    if (m && desc) m.setAttribute('content', desc);
  }

  /* ---------- Header & footer ---------- */
  function buildChrome() {
    var items = [];
    if (P.length) items.push(['Work', 'projects.html', 'work']);
    if (hasAbout) items.push(['About', 'about.html', 'about']);
    items.push(['Contact', 'contact.html', 'contact']);
    var cur = page === 'project' ? 'work' : page;
    $('#bar').innerHTML =
      '<a class="brand" href="index.html" data-label="Home" aria-label="' + esc(C.name) + ' — home">' + esc(C.name) + '</a>' +
      '<nav aria-label="Main">' +
      items.map(function (it, i) {
        return '<a href="' + it[1] + '"' + (cur === it[2] ? ' aria-current="page"' : '') + '><span class="mono">0' + (i + 1) + '</span>' + it[0] + '</a>';
      }).join('') +
      '<button class="tt" type="button" id="theme"></button></nav>';

    $('#foot').innerHTML =
      '<span class="mono">&copy; ' + new Date().getFullYear() + ' ' + esc(C.name) + '</span>' +
      '<a class="mono" href="' + mailto + '">' + esc(C.email) + '</a>' +
      (FINE ? '<span class="mono">Press D &mdash; detection overlay</span>' : '');

    var th = $('#theme');
    var label = function () { th.textContent = root.getAttribute('data-theme') === 'light' ? 'Dark' : 'Light'; };
    label();
    th.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next === 'light' ? 'light' : '');
      if (next === 'dark') root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', next === 'light' ? 'light' : ''); } catch (e) {}
      label();
    });
  }

  /* ---------- Bagian-bagian halaman ---------- */
  function rowHTML(p) {
    var tags = p.stack.slice(0, 3).map(esc).join(' / ');
    return '<a class="row" href="project.html?id=' + encodeURIComponent(p.id) + '" data-label="' + esc(p.title) + '" data-img="' + esc(p.images[0] ? p.images[0].src : '') + '">' +
      '<span class="no mono">' + p.n + '</span><span class="ttl">' + esc(p.title) + '</span>' +
      '<span class="tg mono">' + tags + '</span><span class="yr mono">' + esc(p.year || '') + '</span></a>';
  }
  function workSection(arr, idx, showAll) {
    return '<section class="sec" id="work"><div class="sec-h rv"><span class="mono">(' + idx + ')</span><h2>Selected work</h2>' +
      (showAll ? '<a class="more mono ul" href="projects.html">All projects (' + P.length + ')</a>' : '') +
      '</div><div class="rows">' + arr.map(rowHTML).join('') + '</div></section>';
  }
  function factsHTML() {
    var f = [['Role', esc(C.role)], ['Email', '<a class="ul" href="' + mailto + '">' + esc(C.email) + '</a>']];
    if (has(C.location)) f.push(['Based in', esc(C.location)]);
    if (has(C.cv)) f.push(['CV', '<a class="ul" href="' + esc(C.cv) + '" target="_blank" rel="noopener">Download PDF</a>']);
    return '<dl class="facts">' + f.map(function (x) { return '<div><dt class="mono">' + x[0] + '</dt><dd>' + x[1] + '</dd></div>'; }).join('') + '</dl>';
  }
  function socialHTML() {
    if (!social.length) return '';
    return '<div class="soc">' + social.map(function (s) {
      return '<a class="mono" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label || s.url) + ' &#8599;</a>';
    }).join('') + '</div>';
  }
  function ctaSection() {
    return '<section class="cta"><p class="mono rv">Contact</p><a class="mail mag" href="' + mailto + '">' + esc(C.email) + '</a>' + socialHTML() + '</section>';
  }

  /* ---------- Halaman: Home ---------- */
  function home() {
    var w = String(C.name).trim().split(/\s+/), a = w.shift() || '', b = w.join(' ');
    var html =
      '<section class="hero"><div class="hero-top"><span class="mono">' + esc(C.role) + '</span><span class="mono">Portfolio &mdash; ' + new Date().getFullYear() + '</span></div>' +
      '<h1 class="mega" aria-label="' + esc(C.name) + '"><span class="ln" aria-hidden="true"><span>' + esc(a) + '</span></span>' +
      (b ? '<span class="ln" aria-hidden="true"><span>' + esc(b) + '</span></span>' : '') + '</h1>' +
      '<div class="hero-foot">' + (has(C.tagline) ? '<p class="tagline">' + esc(C.tagline) + '</p>' : '<span></span>') + factsHTML() + '</div></section>';
    var idx = 1;
    if (P.length) html += workSection(P.slice(0, 6), '0' + idx++, P.length > 6);
    if (bio.length) {
      html += '<section class="sec"><div class="sec-h rv"><span class="mono">(0' + idx++ + ')</span><h2>About</h2>' +
        (hasAbout ? '<a class="more mono ul" href="about.html">More</a>' : '') + '</div><p class="lead rv">' + esc(bio[0]) + '</p></section>';
    }
    html += ctaSection();
    $('#main').innerHTML = html;
  }

  /* ---------- Halaman: Projects ---------- */
  function projects() {
    setMeta('Work — ' + C.name, C.name + ' — selected projects.');
    $('#main').innerHTML =
      '<div class="pg-head"><span class="mono">Index (' + P.length + ')</span><h1>Work</h1></div>' +
      (P.length ? '<section class="sec" style="padding-top:0;border-top:0"><div class="rows">' + P.map(rowHTML).join('') + '</div></section>' : '') +
      ctaSection();
  }

  /* ---------- Halaman: Project (template) ---------- */
  function project() {
    var id = new URLSearchParams(location.search).get('id');
    var i = P.findIndex(function (p) { return p.id === id; });
    if (i < 0) {
      setMeta('Not found — ' + C.name);
      $('#main').innerHTML = '<div class="nf"><h1>Project not found</h1><a class="btn" href="' + (P.length ? 'projects.html' : 'index.html') + '">Back</a></div>';
      return;
    }
    var p = P[i], next = P[(i + 1) % P.length];
    setMeta(p.title + ' — ' + C.name, has(p.summary) ? p.summary : p.title + ' — ' + C.name);
    var meta = [];
    if (has(p.year)) meta.push(['Year', esc(p.year)]);
    if (has(p.role)) meta.push(['Role', esc(p.role)]);
    if (p.stack.length) meta.push(['Stack', p.stack.map(esc).join(', ')]);
    var secs = [['Problem', p.problem], ['Approach', p.approach], ['Result', p.result]].filter(function (s) { return has(s[1]); });
    var html =
      '<div class="pg-head"><span class="mono">Project ' + p.n + ' / ' + String(P.length).padStart(2, '0') + '</span><h1 style="font-size:clamp(48px,11vw,190px)">' + esc(p.title) + '</h1>' +
      (has(p.summary) ? '<p class="lead">' + esc(p.summary) + '</p>' : '') + '</div>' +
      (meta.length ? '<dl class="pj-meta">' + meta.map(function (m) { return '<div><dt class="mono">' + m[0] + '</dt><dd>' + m[1] + '</dd></div>'; }).join('') + '</dl>' : '') +
      (p.images.length ? '<div class="pj-imgs">' + p.images.map(function (o) {
        return '<figure class="rv">' + imgTag(o) + (has(o.caption) ? '<figcaption class="mono">' + esc(o.caption) + '</figcaption>' : '') + '</figure>';
      }).join('') + '</div>' : '') +
      secs.map(function (s, k) { return '<section class="pj-sec"><span class="mono">(0' + (k + 1) + ') ' + s[0] + '</span><div class="rv">' + esc(s[1]) + '</div></section>'; }).join('') +
      (p.links.length ? '<section class="pj-sec"><span class="mono">Links</span><div><div class="btns">' + p.links.map(function (l) {
        return '<a class="btn mag" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label || 'Open') + ' &#8599;</a>';
      }).join('') + '</div></div></section>' : '') +
      (P.length > 1 ? '<a class="pj-next" href="project.html?id=' + encodeURIComponent(next.id) + '" data-label="' + esc(next.title) + '"><span class="mono">Next project</span><span class="ttl">' + esc(next.title) + '</span></a>' : '') +
      '<div style="padding:0 var(--pad) 60px"><a class="mono ul" href="projects.html">&larr; All projects</a></div>';
    $('#main').innerHTML = html;
  }

  /* ---------- Halaman: About ---------- */
  function about() {
    setMeta('About — ' + C.name, C.name + ' — ' + C.role + '.');
    var side = has(C.photo) ? '<div class="side rv"><img class="portrait" src="' + esc(C.photo) + '" alt="Portrait of ' + esc(C.name) + '" decoding="async"></div>' : '';
    var main = '';
    if (bio.length) main += '<div class="block bio rv">' + bio.map(function (t, i) { return '<p' + (i === 0 ? ' class="lead"' : '') + '>' + esc(t) + '</p>'; }).join('') + '</div>';
    if (skills.length) {
      main += '<div class="block"><h2 class="rv"><span class="mono">(01)</span>Skills</h2>' + skills.map(function (g) {
        return '<div class="fgroup rv"><span class="mono">' + esc(g.group) + '</span><ul class="inl">' + g.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>';
    }
    var tl = function (arr, title, n) {
      if (!arr.length) return '';
      return '<div class="block"><h2 class="rv"><span class="mono">(' + n + ')</span>' + title + '</h2>' + arr.map(function (e) {
        return '<div class="tl-row rv"><span class="mono">' + esc(e.period || '') + '</span><div><h3>' + esc(e.title || e.org) + '</h3>' +
          (has(e.title) && has(e.org) ? '<span class="org mono">' + esc(e.org) + '</span>' : '') +
          (has(e.description) ? '<p>' + esc(e.description) + '</p>' : '') + '</div></div>';
      }).join('') + '</div>';
    };
    main += tl(exp, 'Experience', '0' + (skills.length ? 2 : 1)) + tl(edu, 'Education', '0' + ((skills.length ? 1 : 0) + (exp.length ? 1 : 0) + 1));
    if (has(C.cv)) main += '<div class="btns rv"><a class="btn fill mag" href="' + esc(C.cv) + '" target="_blank" rel="noopener">Download CV</a></div>';
    $('#main').innerHTML =
      '<div class="pg-head"><span class="mono">' + esc(C.role) + '</span><h1>About</h1></div>' +
      '<div class="about' + (side ? '' : ' nophoto') + '">' + side + '<div class="main">' + main + '</div></div>' + ctaSection();
  }

  /* ---------- Halaman: Contact ---------- */
  function contact() {
    setMeta('Contact — ' + C.name, 'Get in touch with ' + C.name + '.');
    $('#main').innerHTML =
      '<div class="pg-head"><span class="mono">' + esc(C.role) + '</span><h1>Contact</h1></div>' +
      '<div class="contact"><div class="l"><p class="mono" style="margin-bottom:16px">Email</p><a class="mail mag" href="' + mailto + '">' + esc(C.email) + '</a>' +
      (has(C.location) ? '<p class="mono" style="margin-top:40px">Based in</p><p>' + esc(C.location) + '</p>' : '') + socialHTML() + '</div>' +
      '<div class="r"><form id="f" novalidate>' +
      '<label><span class="mono">Name</span><input id="fn" type="text" autocomplete="name" required></label>' +
      '<label><span class="mono">Email</span><input id="fe" type="email" autocomplete="email" required></label>' +
      '<label><span class="mono">Message</span><textarea id="fm" rows="6" required></textarea></label>' +
      '<input class="hp" id="fh" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<button class="btn fill mag" type="submit">Send message</button><p class="status" role="status" aria-live="polite"></p></form></div></div>';
    bindForm();
  }
  function bindForm() {
    var f = $('#f'), st = $('.status', f);
    var say = function (t, cls) { st.textContent = t; st.className = 'status ' + (cls || ''); };
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#fh').value) return;
      var n = $('#fn').value.trim(), m = $('#fe').value.trim(), t = $('#fm').value.trim();
      $$('input,textarea', f).forEach(function (x) { x.removeAttribute('aria-invalid'); });
      var bad = [];
      if (!n) bad.push('#fn');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) bad.push('#fe');
      if (t.length < 5) bad.push('#fm');
      if (bad.length) {
        bad.forEach(function (s) { $(s).setAttribute('aria-invalid', 'true'); });
        $(bad[0]).focus();
        say('Please fill in your name, a valid email and a message.', 'err');
        return;
      }
      var done = function () { f.reset(); say('Thank you, ' + n + '. Your message has been sent.', 'ok'); };
      if (has(C.formEndpoint)) {
        say('Sending…');
        fetch(C.formEndpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name: n, email: m, message: t }) })
          .then(function (r) { if (!r.ok) throw new Error('bad'); done(); })
          .catch(function () { say('Could not send. Please email ' + C.email + ' directly.', 'err'); });
      } else {
        location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent('Message from ' + n) + '&body=' + encodeURIComponent(t + '\n\n— ' + n + ' (' + m + ')');
        say('Your email app should open with the message ready to send.', 'ok');
      }
    });
  }

  /* ---------- Efek: reveal, progress, parallax ---------- */
  function effects() {
    $$('.row').forEach(function (r, i) { r.classList.add('rv'); r.style.setProperty('--d', Math.min(i, 6) * 0.06 + 's'); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.rv').forEach(function (x) { io.observe(x); });

    var prog = $('.prog'), mega = $('.mega'), tick = false;
    function onScroll() {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = scrollY, h = root.scrollHeight - innerHeight;
        prog.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
        if (mega && !RM && y < innerHeight * 1.2) {
          mega.style.transform = 'translateY(' + (y * 0.16) + 'px)';
          mega.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.95));
        }
        tick = false;
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------- Elemen khas: overlay "detection" ----------
     Kotak + label dibuat dari elemen halaman yang sebenarnya (jenis dan ukuran
     hasil pengukuran). Tidak ada angka atau deteksi palsu. Tekan D untuk on/off. */
  function detection() {
    if (!FINE) return;
    var xh = $('.xh'), xv = $('.xv'), box = $('.bbox'), lab = $('.bbox b'), pv = $('.preview'), pi = $('.preview img');
    var SEL = 'h1,h2,h3,a,button,img,input,textarea,.lead,dl>div,.tl-row,.fgroup,figure,.bio p';
    var on = true;
    try { on = localStorage.getItem('det') !== 'off'; } catch (e) {}
    root.classList.toggle('det-off', !on);

    var mx = -50, my = -50, raf = 0;
    function kind(el) {
      var t = el.tagName;
      if (t === 'A') return el.classList.contains('row') ? 'entry' : (el.classList.contains('btn') ? 'button' : 'link');
      if (t === 'H1' || t === 'H2' || t === 'H3') return 'heading';
      if (t === 'IMG' || t === 'FIGURE') return 'image';
      if (t === 'BUTTON') return 'button';
      if (t === 'INPUT' || t === 'TEXTAREA') return 'field';
      if (t === 'DIV' || t === 'DL') return 'item';
      return 'text';
    }
    function frame() {
      raf = 0;
      xh.style.transform = 'translateY(' + my + 'px)';
      xv.style.transform = 'translateX(' + mx + 'px)';
      pv.style.transform = 'translate(' + (mx + 26) + 'px,' + (my - 40) + 'px)';
      if (!on) return;
      var t = doc.elementFromPoint(mx, my), hit = t && t.closest ? t.closest(SEL) : null;
      if (!hit || hit.closest('.curtain')) { box.classList.remove('on'); return; }
      var r = hit.getBoundingClientRect();
      box.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px)';
      box.style.width = r.width + 'px';
      box.style.height = r.height + 'px';
      box.classList.toggle('flip', r.top < 36);
      lab.textContent = kind(hit) + ' · ' + Math.round(r.width) + '×' + Math.round(r.height);
      box.classList.add('on');
    }
    addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
    doc.addEventListener('pointerleave', function () { box.classList.remove('on'); });
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });

    addEventListener('keydown', function (e) {
      if (e.key !== 'd' && e.key !== 'D') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target && e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA') return;
      on = !on;
      root.classList.toggle('det-off', !on);
      try { localStorage.setItem('det', on ? 'on' : 'off'); } catch (x) {}
    });

    // pratinjau gambar mengikuti kursor di daftar proyek (hanya jika proyek punya gambar)
    $$('.row').forEach(function (r) {
      var src = r.getAttribute('data-img');
      if (!src) return;
      r.addEventListener('pointerenter', function () { pi.src = src; pv.classList.add('on'); });
      r.addEventListener('pointerleave', function () { pv.classList.remove('on'); });
    });
  }

  /* ---------- Efek: tombol magnetis ---------- */
  function magnetic() {
    if (!FINE || RM) return;
    $$('.mag').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.12 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.25 + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- Transisi halaman (tirai) ----------
     Tidak ada layar loading saat pertama dibuka. Tirai hanya muncul saat berpindah halaman. */
  function transitions() {
    var cur = $('.curtain');
    function reset() {
      cur.style.transition = 'none';
      cur.classList.remove('in', 'out');
      void cur.offsetWidth;
      cur.style.transition = '';
    }
    if (root.classList.contains('tr')) {
      try { sessionStorage.removeItem('tr'); } catch (e) {}
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          cur.classList.add('out');
          root.classList.remove('tr');
          setTimeout(reset, 700);
        });
      });
    }
    addEventListener('pageshow', function (e) { if (e.persisted) { root.classList.remove('tr'); reset(); } });

    doc.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      var u;
      try { u = new URL(a.href, location.href); } catch (x) { return; }
      if (u.protocol !== location.protocol || u.origin !== location.origin) return;
      if (u.pathname === location.pathname && u.search === location.search) return;
      if (RM) return;
      e.preventDefault();
      var label = (a.getAttribute('data-label') || a.textContent.replace(/^\s*\d+\s*/, '')).trim().slice(0, 28);
      cur.firstElementChild.textContent = label;
      try { sessionStorage.setItem('tr', label); } catch (x) {}
      cur.classList.add('in');
      setTimeout(function () { location.href = a.href; }, 520);
    });
  }

  /* ---------- Gambar rusak -> kotak netral ---------- */
  doc.addEventListener('error', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    var d = doc.createElement('div');
    d.className = 'ph mono';
    d.textContent = 'Image not found: ' + (t.getAttribute('src') || '');
    if (t.parentNode) t.parentNode.replaceChild(d, t);
  }, true);

  /* ---------- Info untuk pemilik: field yang masih kosong ---------- */
  function report() {
    var miss = [];
    if (!has(C.tagline)) miss.push('tagline');
    if (!has(C.location)) miss.push('location');
    if (!has(C.photo)) miss.push('photo');
    if (!bio.length) miss.push('bio');
    if (!has(C.cv)) miss.push('cv');
    if (!social.length) miss.push('social');
    if (!P.length) miss.push('projects');
    if (!skills.length) miss.push('skills');
    if (!exp.length) miss.push('experience');
    if (!edu.length) miss.push('education');
    if (!has(C.formEndpoint)) miss.push('formEndpoint (form falls back to mailto)');
    if (miss.length && window.console) console.info('[portfolio] Empty in js/content.js (hidden on the site): ' + miss.join(', '));
  }

  /* ---------- Jalankan ---------- */
  try { C.name = has(C.name) ? C.name : 'Your Name'; } catch (e) {}
  buildChrome();
  ({ home: home, projects: projects, project: project, about: about, contact: contact }[page] || home)();
  effects();
  detection();
  magnetic();
  transitions();
  report();
})();
