  const codeLines = [
    { indent: 0, tokens: [
      { t: '// 👋 Hey, I\'m Rijan', c: 'c-cmt' }
    ]},
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { t: 'const ', c: 'c-kw' },
      { t: 'developer', c: 'c-fn' },
      { t: ' = {', c: 'c-op' },
    ]}, 
    { indent: 1, tokens: [
      { t: 'name', c: 'c-prop' },
      { t: ':    ', c: 'c-op' },
      { t: '"Rijan Chudal"', c: 'c-str' },
      { t: ',', c: 'c-op' },
    ]},
    { indent: 1, tokens: [
      { t: 'stack', c: 'c-prop' },
      { t: ':   ', c: 'c-op' },
      { t: '[', c: 'c-op' },
      { t: '"M"', c: 'c-str' },
      { t: ', ', c: 'c-op' },
      { t: '"E"', c: 'c-str' },
      { t: ', ', c: 'c-op' },
      { t: '"R"', c: 'c-str' },
      { t: ', ', c: 'c-op' },
      { t: '"N"', c: 'c-str' },
      { t: ']', c: 'c-op' },
      { t: ',', c: 'c-op' },
    ]},
    { indent: 1, tokens: [
      { t: 'role', c: 'c-prop' },
      { t: ':    ', c: 'c-op' },
      { t: '"Full-Stack Dev"', c: 'c-str' },
      { t: ',', c: 'c-op' },
    ]},
    { indent: 1, tokens: [
      { t: 'creative', c: 'c-prop' },
      { t: ': ', c: 'c-op' },
      { t: '"Video Editor"', c: 'c-str' },
      { t: ',', c: 'c-op' },
    ]},
    { indent: 1, tokens: [
      { t: 'open', c: 'c-prop' },
      { t: ':    ', c: 'c-op' },
      { t: 'true', c: 'c-bool' },
      { t: ',', c: 'c-op' },
    ]},
    { indent: 0, tokens: [{ t: '}', c: 'c-op' }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [
      { t: 'async ', c: 'c-kw' },
      { t: 'function ', c: 'c-kw' },
      { t: 'hire', c: 'c-fn' },
      { t: '(', c: 'c-op' },
      { t: 'you', c: 'c-prop' },
      { t: ') {', c: 'c-op' },
    ]},
    { indent: 1, tokens: [
      { t: 'const ', c: 'c-kw' },
      { t: 'result', c: 'c-fn' },
      { t: ' = ', c: 'c-op' },
      { t: 'await ', c: 'c-kw' },
      { t: 'build', c: 'c-fn' },
      { t: '(', c: 'c-op' },
      { t: 'you', c: 'c-prop' },
      { t: '.', c: 'c-op' },
      { t: 'idea', c: 'c-prop' },
      { t: ');', c: 'c-op' },
    ]},
    { indent: 1, tokens: [
      { t: 'return ', c: 'c-kw' },
      { t: '"🚀 Shipped!"', c: 'c-str' },
      { t: ';', c: 'c-op' },
    ]},
    { indent: 0, tokens: [{ t: '}', c: 'c-op' }] },
  ];

  function buildLineHTML(lineObj, lineNum, showCursor) {
    const indent = '  '.repeat(lineObj.indent);
    let inner = '';
    if (lineObj.tokens.length === 0) {
      inner = '&nbsp;';
    } else {
      inner = lineObj.tokens.map(tk => `<span class="${tk.c}">${escCode(tk.t)}</span>`).join('');
    }
    const cursorHTML = showCursor ? '<span class="cursor-blink"></span>' : '';
    return `<div class="code-line${lineNum === -1 ? '' : ''}">
      <span class="line-num">${lineNum}</span>
      <span>${indent}${inner}${cursorHTML}</span>
    </div>`;
  }

  function escCode(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  const codeBody = document.getElementById('codeBody');
  let currentLine = 0;
  const LINE_DELAY = 90; // ms per line

  function typeLines() {
    if (currentLine >= codeLines.length) {
      // finished — keep last cursor blinking then remove
      setTimeout(() => {
        codeBody.querySelectorAll('.cursor-blink').forEach(c => c.remove());
      }, 2000);
      return;
    }

    // Remove any previous cursors
    codeBody.querySelectorAll('.cursor-blink').forEach(c => c.remove());

    // Add current line
    const lineNum = currentLine + 1;
    const div = document.createElement('div');
    div.innerHTML = buildLineHTML(codeLines[currentLine], lineNum, true);
    codeBody.appendChild(div.firstElementChild);
    currentLine++;

    // Scroll to bottom
    codeBody.scrollTop = codeBody.scrollHeight;

    // Delay before next line (blank lines faster)
    const delay = codeLines[currentLine - 1].tokens.length === 0 ? 30 : LINE_DELAY + Math.random() * 60;
    setTimeout(typeLines, delay);
  }

  // Start after hero animates in
  setTimeout(typeLines, 1400);

  // ── END CODE WINDOW ──

  // Cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx+'px'; cursor.style.top = my+'px';
  });
  (function animateRing() {
    rx += (mx-rx)*0.11; ry += (my-ry)*0.11;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a, button, .project-card, .service-item, .video-thumb, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('big'); ring.classList.remove('big'); });
  });

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

  // Reveal on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Skill bar animation
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.cskill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.creative-skills').forEach(el => {
    el.querySelectorAll('.cskill-fill').forEach(b => b.style.width = '0');
    barObs.observe(el);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const t = document.getElementById(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });