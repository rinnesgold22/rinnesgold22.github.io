// =====================================================================
// Section IV: Getting on the ballot
//
// Ranked bar table of petition signatures required per 1,000 eligible
// voters (2024, independent presidential candidates). Each row also
// lists raw signatures, filing deadline, and any fees as notes.
// Sortable; collapsed to the top and bottom 10 by default.
//
// Inputs: BALLOT_SIGNATURES_CSV, ANNOTATIONS, showCustomTooltip (shared.js)
// =====================================================================
(function drawSectionIV() {

  // ---- Data ----------------------------------------------------------
  const parseDay = d3.timeParse('%d-%b');
  const fmtDay = d3.timeFormat('%b %-d');
  const fmtInt = d3.format(',');
  const fmtUSD = d3.format('$,');

  const rows = d3.csvParse(BALLOT_SIGNATURES_CSV.trim(), d3.autoType)
    .filter(r => r.state)
    .map(r => {
      const day = parseDay(r.filing_deadline);
      if (day) day.setFullYear(2024);
      return {
        name: r.state,
        rate: r.sig_per_vep_1000,
        sigs: r.num_signatures_required_2024,
        deadline: day,
        payAlt: r.pay_alternative || 0, // fee accepted instead of signatures
        fee: r.cost || 0                 // filing fee in addition to signatures
      };
    });

  const RANK = {};
  rows.slice().sort((a, b) => b.rate - a.rate).forEach((r, i) => { RANK[r.name] = i + 1; });

  const maxRate = d3.max(rows, r => r.rate);

  // Hover notes: { stateName: [text, ...] }
  const NOTES = {};
  ((typeof ANNOTATIONS !== 'undefined') ? ANNOTATIONS : [])
    .filter(n => n.figure === 'ballot')
    .forEach(n => { (NOTES[n.state] = NOTES[n.state] || []).push(n.text); });
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ---- Notes line + tooltip ------------------------------------------
  function notesHtml(r) {
    const parts = [
      `${fmtInt(r.sigs)} signatures`,
      r.deadline ? `due ${fmtDay(r.deadline)}` : null,
      r.payAlt ? `<span class="fee">or pay ${fmtUSD(r.payAlt)} instead</span>` : null,
      r.fee ? `<span class="fee">+ ${fmtUSD(r.fee)} filing fee</span>` : null
    ];
    return parts.filter(Boolean).join(' &middot; ');
  }

  function tooltipHtml(r) {
    return `<span class="t-name">${r.name}</span>` +
      `<span class="t-mean" style="color:var(--ballot)">${r.rate.toFixed(2)} signatures per 1,000 eligible voters</span>` +
      `<span class="t-hint">Rank #${RANK[r.name]} of 50 (1 = most demanding)<br>${notesHtml(r)}</span>` +
      (NOTES[r.name] || []).map(t => `<span class="t-notetext">&#9733; ${esc(t)}</span>`).join('');
  }

  // ---- Sorting -------------------------------------------------------
  const SORTS = {
    rate:     { label: 'Per 1,000 voters', cmp: (a, b) => b.rate - a.rate },
    sigs:     { label: 'Total signatures', cmp: (a, b) => b.sigs - a.sigs },
    deadline: { label: 'Earliest deadline', cmp: (a, b) => (a.deadline || 0) - (b.deadline || 0) },
    name:     { label: 'A–Z',              cmp: (a, b) => d3.ascending(a.name, b.name) }
  };
  let sortKey = 'rate';
  let expanded = false;
  const EDGE = 10; // rows shown at each end when collapsed

  // Sort buttons
  const controls = document.getElementById('ballot-sort');
  Object.entries(SORTS).forEach(([key, s]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sort-btn';
    btn.dataset.key = key;
    btn.textContent = s.label;
    btn.addEventListener('click', () => { sortKey = key; draw(); });
    controls.appendChild(btn);
  });

  // ---- Table ---------------------------------------------------------
  const body = document.getElementById('ballot-rows');
  const toggle = document.getElementById('ballot-toggle');
  toggle.addEventListener('click', () => { expanded = !expanded; draw(); });

  function makeRow(r) {
    const row = document.createElement('div');
    row.className = 'ballot-row';

    const name = document.createElement('div');
    name.className = 'ballot-name';
    name.textContent = r.name;
    if (NOTES[r.name]) {
      const star = document.createElement('span');
      star.className = 'ballot-star';
      star.textContent = '★';
      name.appendChild(star);
    }

    const barCell = document.createElement('div');
    barCell.className = 'ballot-barcell';
    const bar = document.createElement('div');
    bar.className = 'ballot-bar';
    bar.style.width = (r.rate / maxRate * 100) + '%';
    const val = document.createElement('span');
    val.className = 'ballot-val';
    val.textContent = r.rate.toFixed(2);
    barCell.append(bar, val);

    const notes = document.createElement('div');
    notes.className = 'ballot-notes';
    notes.innerHTML = notesHtml(r);

    row.append(name, barCell, notes);
    row.addEventListener('mousemove', e => showCustomTooltip(e, tooltipHtml(r)));
    row.addEventListener('mouseleave', () => {
      document.getElementById('tooltip').style.opacity = 0;
    });
    return row;
  }

  function draw() {
    const sorted = rows.slice().sort(SORTS[sortKey].cmp);
    body.innerHTML = '';

    const collapse = !expanded && sorted.length > EDGE * 2;
    const shown = collapse
      ? [...sorted.slice(0, EDGE), null, ...sorted.slice(-EDGE)]
      : sorted;

    shown.forEach(r => {
      if (r) { body.appendChild(makeRow(r)); return; }
      const gap = document.createElement('div');
      gap.className = 'ballot-gap';
      gap.textContent = `${sorted.length - EDGE * 2} more states`;
      body.appendChild(gap);
    });

    toggle.textContent = expanded ? 'Show top and bottom 10 only' : `Show all ${sorted.length} states`;
    controls.querySelectorAll('.sort-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.key === sortKey));
  }

  draw();

})();
