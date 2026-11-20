// =====================================================================
// Section V: Voter registration rules
//
// 2024 registration deadlines, grouped by days before Election Day.
// Three linked figures:
//   - countdown timeline of state chips (also serves as the map legend)
//   - map colored by deadline group
//   - mean third-party presidential vote (Section I) by deadline group
// Hovering a state highlights it on the timeline and map; hovering a
// group bar highlights that group's states.
//
// Inputs: STATES_GEO, VOTER_REGISTRATION_CSV, ANNOTATIONS,
//         stateData (section1-vote-share.js),
//         showCustomTooltip / STATE_ABBR (shared.js)
// =====================================================================
(function drawSectionV() {

  // ---- Data ----------------------------------------------------------
  const parseDay = d3.timeParse('%d-%b');
  const fmtDay = d3.timeFormat('%b %-d');

  // Deadline groups, in display order (most to least open). Colors run deep
  // (same-day) to pale (30 days); no registration is hatched.
  const GROUPS = [
    { key: 'none',  label: 'No registration required', color: 'url(#reg-hatch)' },
    { key: 'same',  label: 'Same-day registration',  color: '#8e3b5f' },
    { key: 'd1',    label: '1–14 days before',       color: '#c27596' },
    { key: 'd15',   label: '15–25 days before',      color: '#dfaabf' },
    { key: 'd26',   label: '26–30 days before',      color: '#f1d9e2' }
  ];
  const GROUP = Object.fromEntries(GROUPS.map(g => [g.key, g]));
  const groupFor = r => r.none ? 'none'
    : r.days === 0 ? 'same'
    : r.days <= 14 ? 'd1'
    : r.days <= 25 ? 'd15' : 'd26';

  const rows = d3.csvParse(VOTER_REGISTRATION_CSV.trim(), d3.autoType)
    .filter(r => r.state)
    .map(r => {
      const none = /no registration/i.test(String(r.registration_deadline));
      const day = none ? null : parseDay(r.registration_deadline);
      if (day) day.setFullYear(2024);
      const rec = { name: r.state, none, deadline: day, days: none ? null : r.days_before_election };
      rec.group = groupFor(rec);
      return rec;
    });
  const BY_NAME = Object.fromEntries(rows.map(r => [r.name, r]));

  // Hover notes: { stateName: [text, ...] }
  const NOTES = {};
  ((typeof ANNOTATIONS !== 'undefined') ? ANNOTATIONS : [])
    .filter(n => n.figure === 'registration')
    .forEach(n => { (NOTES[n.state] = NOTES[n.state] || []).push(n.text); });
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Label text color for a group's fill
  const inkFor = key => (key === 'same' || key === 'd1') ? '#fff' : '#000';

  // Diagonal hatch for "no registration". Defined once (in the timeline SVG);
  // url(#reg-hatch) resolves document-wide, so the map and bars use it too.
  function addHatch(svg) {
    const p = svg.append('defs').append('pattern')
      .attr('id', 'reg-hatch').attr('width', 6).attr('height', 6)
      .attr('patternUnits', 'userSpaceOnUse').attr('patternTransform', 'rotate(45)');
    p.append('rect').attr('width', 6).attr('height', 6).style('fill', 'var(--bg)');
    p.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 6)
      .style('stroke', 'var(--reg)').attr('stroke-width', 2.5);
  }

  // ---- Hover ---------------------------------------------------------
  const readout = document.getElementById('hover-readout-reg');

  function deadlineText(r) {
    if (r.none) return 'No voter registration';
    if (r.days === 0) return 'Same-day registration (Election Day, Nov 5)';
    return `${fmtDay(r.deadline)} (${r.days} days before Election Day)`;
  }

  function tooltipHtml(r) {
    const third = stateData[r.name] ? stateData[r.name].mean.toFixed(1) + '%' : 'n/a';
    return `<span class="t-name">${r.name}</span>` +
      `<span class="t-mean" style="color:var(--reg)">${deadlineText(r)}</span>` +
      `<span class="t-hint">Third-party presidential avg, 1988–2024: ${third}</span>` +
      (NOTES[r.name] || []).map(t => `<span class="t-notetext">&#9733; ${esc(t)}</span>`).join('');
  }

  function hideTip() { document.getElementById('tooltip').style.opacity = 0; }

  function focusState(name) {
    mapPaths.classed('linked', d => d.properties.name === name);
    chips.classed('linked', d => d.name === name);
  }

  function focusGroup(key) {
    mapPaths.classed('dim', d => key != null && (BY_NAME[d.properties.name] || {}).group !== key);
    chips.classed('dim', d => key != null && d.group !== key);
    bars.classed('dim', d => key != null && d.key !== key);
  }

  function onState(event, name) {
    const r = BY_NAME[name];
    if (!r) return;
    showCustomTooltip(event, tooltipHtml(r));
    readout.textContent = `${name} — ${deadlineText(r)}`;
    focusState(name);
  }

  function offState() {
    hideTip();
    readout.textContent = 'Hover over a state';
    focusState(null);
  }

  // ---- Countdown timeline --------------------------------------------
  // Left: days 30 to 1 on a shared axis, chips stacked per deadline.
  // Right: separate blocks for same-day (Election Day) and no registration.
  const W = 975;
  const CW = 22, CH = 16, G = 3;           // chip size and gap
  const AX0 = 14, AX1 = 690;               // x range for 30..1 days
  const SAME_X = 745, SAME_COLS = 4;       // same-day block
  const NONE_X = SAME_X + SAME_COLS * (CW + G) + 50;

  const dx = d3.scaleLinear().domain([30, 1]).range([AX0, AX1]);

  // Stack/grid positions
  const dated = rows.filter(r => r.group !== 'same' && r.group !== 'none');
  const byDays = d3.group(dated, r => r.days);
  byDays.forEach(list => list.sort((a, b) => d3.ascending(a.name, b.name))
    .forEach((r, i) => { r.col = 0; r.row = i; r.cx = dx(r.days) - CW / 2; }));
  const same = rows.filter(r => r.group === 'same').sort((a, b) => d3.ascending(a.name, b.name));
  same.forEach((r, i) => { r.col = i % SAME_COLS; r.row = Math.floor(i / SAME_COLS); r.cx = SAME_X + r.col * (CW + G); });
  rows.filter(r => r.group === 'none').forEach((r, i) => { r.row = i; r.cx = NONE_X; });

  const maxRows = d3.max(rows, r => r.row) + 1;
  const tm = { top: 30, bottom: 46 };
  const ih = maxRows * (CH + G);
  const H = tm.top + ih + tm.bottom;
  const rowY = row => tm.top + ih - (row + 1) * (CH + G) + G;

  const tsvg = d3.select('#reg-timeline').attr('viewBox', `0 0 ${W} ${H}`);
  addHatch(tsvg);
  const base = tm.top + ih + 3;

  // Baselines
  tsvg.append('line').attr('class', 'hist-base').attr('x1', AX0 - CW).attr('x2', AX1 + CW).attr('y1', base).attr('y2', base);
  tsvg.append('line').attr('class', 'hist-base')
    .attr('x1', SAME_X - 4).attr('x2', SAME_X + SAME_COLS * (CW + G) + 1).attr('y1', base).attr('y2', base);
  tsvg.append('line').attr('class', 'hist-base').attr('x1', NONE_X - 4).attr('x2', NONE_X + CW + 4).attr('y1', base).attr('y2', base);

  // Day-count axis
  const ticks = [30, 25, 20, 15, 10, 5];
  tsvg.selectAll('.reg-tick').data(ticks).join('text')
    .attr('class', 'col-label').attr('text-anchor', 'middle')
    .attr('x', d => dx(d)).attr('y', base + 17)
    .text(d => d);
  tsvg.append('text').attr('class', 'axis-title').attr('text-anchor', 'middle')
    .attr('x', (AX0 + AX1) / 2).attr('y', base + 38)
    .text('Days before Election Day');
  tsvg.append('text').attr('class', 'axis-title').attr('text-anchor', 'middle')
    .attr('x', SAME_X + (SAME_COLS * (CW + G)) / 2 - G / 2).attr('y', base + 17)
    .text('Election Day');
  tsvg.append('text').attr('class', 'axis-title').attr('text-anchor', 'middle')
    .attr('x', NONE_X + CW / 2).attr('y', base + 17)
    .text('None');

  // Counts above each stack / block
  const counts = Array.from(byDays, ([days, list]) => ({ x: dx(days), row: list.length, n: list.length }));
  counts.push({ x: SAME_X + (SAME_COLS * (CW + G)) / 2 - G / 2, row: Math.ceil(same.length / SAME_COLS), n: same.length });
  tsvg.selectAll('.reg-count').data(counts.filter(c => c.n > 1)).join('text')
    .attr('class', 'col-count').attr('text-anchor', 'middle')
    .attr('x', d => d.x).attr('y', d => rowY(d.row - 1) - 6)
    .text(d => d.n);

  const chips = tsvg.selectAll('.chip').data(rows).join('g')
    .attr('class', 'chip tile')
    .attr('transform', d => `translate(${d.cx},${rowY(d.row)})`)
    .on('mousemove', (event, d) => onState(event, d.name))
    .on('mouseleave', offState);
  chips.append('rect').attr('width', CW).attr('height', CH).attr('rx', 2)
    .attr('fill', d => GROUP[d.group].color);
  chips.append('text').attr('x', CW / 2).attr('y', CH / 2)
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
    .attr('fill', d => inkFor(d.group))
    .text(d => STATE_ABBR[d.name] || d.name);

  // Legend swatches (HTML)
  const legend = document.getElementById('reg-legend');
  GROUPS.forEach(g => {
    const n = rows.filter(r => r.group === g.key).length;
    const item = document.createElement('span');
    const sw = document.createElement('i');
    sw.className = 'swatch' + (g.key === 'none' ? ' swatch-hatch' : '');
    if (g.key !== 'none') sw.style.background = g.color;
    item.append(sw, document.createTextNode(`${g.label} (${n})`));
    legend.appendChild(item);
  });

  // ---- Map -----------------------------------------------------------
  const geoPath = d3.geoPath();
  const mapSvg = d3.select('#map-reg');
  const mapPaths = mapSvg.append('g')
    .selectAll('path')
    .data(STATES_GEO.features)
    .join('path')
    .attr('class', 'state-path no-click')
    .attr('d', geoPath)
    .attr('fill', d => {
      const r = BY_NAME[d.properties.name];
      return r ? GROUP[r.group].color : '#ccc';
    })
    .on('mousemove', (event, d) => onState(event, d.properties.name))
    .on('mouseleave', offState);

  // Note markers at state centroids
  mapSvg.append('g')
    .selectAll('text')
    .data(STATES_GEO.features.filter(f => NOTES[f.properties.name]))
    .join('text')
    .attr('class', 'note-star')
    .attr('x', d => geoPath.centroid(d)[0])
    .attr('y', d => geoPath.centroid(d)[1])
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text('★');

  // ---- Third-party vote by deadline group ----------------------------
  const allMean = d3.mean(rows.filter(r => stateData[r.name]), r => stateData[r.name].mean);
  const groupStats = GROUPS.map(g => {
    const members = rows.filter(r => r.group === g.key && stateData[r.name]);
    return { ...g, n: members.length, mean: d3.mean(members, r => stateData[r.name].mean) };
  }).filter(g => g.n > 0);

  const BW = 975, ROW = 34;
  const bm = { top: 26, right: 70, bottom: 30, left: 250 };
  const BH = bm.top + groupStats.length * ROW + bm.bottom;
  const bx = d3.scaleLinear().domain([0, Math.ceil(d3.max(groupStats, g => g.mean))]).range([0, BW - bm.left - bm.right]);

  const bsvg = d3.select('#reg-bars').attr('viewBox', `0 0 ${BW} ${BH}`);
  const bg = bsvg.append('g').attr('transform', `translate(${bm.left},${bm.top})`);
  const plotH = groupStats.length * ROW;

  bg.append('g').attr('class', 'axis').attr('transform', `translate(0,${plotH})`)
    .call(d3.axisBottom(bx).ticks(7).tickFormat(d => d + '%').tickSize(-plotH))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('.tick line').attr('stroke-dasharray', '2,3'));

  const bars = bg.selectAll('.reg-bar-g').data(groupStats).join('g')
    .attr('class', 'reg-bar-g')
    .attr('transform', (d, i) => `translate(0,${i * ROW})`)
    .on('mousemove', (event, d) => {
      showCustomTooltip(event,
        `<span class="t-name">${d.label}</span>` +
        `<span class="t-mean" style="color:var(--reg)">${d.mean.toFixed(1)}% average third-party vote</span>` +
        `<span class="t-hint">${d.n} state${d.n === 1 ? '' : 's'} &middot; mean of state averages, 1988–2024</span>`);
      focusGroup(d.key);
    })
    .on('mouseleave', () => { hideTip(); focusGroup(null); });

  bars.append('rect').attr('x', -bm.left).attr('width', BW).attr('height', ROW).attr('fill', 'transparent');
  bars.append('text').attr('class', 'reg-bar-label')
    .attr('x', -12).attr('y', ROW / 2).attr('text-anchor', 'end').attr('dominant-baseline', 'central')
    .text(d => `${d.label} (${d.n})`);
  bars.append('rect').attr('class', 'reg-bar')
    .attr('y', 7).attr('height', ROW - 14).attr('width', d => bx(d.mean)).attr('rx', 2)
    .attr('fill', d => d.color);
  bars.append('text').attr('class', 'ballot-val')
    .attr('x', d => bx(d.mean) + 8).attr('y', ROW / 2).attr('dominant-baseline', 'central')
    .text(d => d.mean.toFixed(1) + '%');

  // All-state average reference line
  bg.append('line').attr('class', 'fit-line reg-avg')
    .attr('x1', bx(allMean)).attr('x2', bx(allMean)).attr('y1', -8).attr('y2', plotH);
  bg.append('text').attr('class', 'fit-label reg-avg-label').attr('text-anchor', 'middle')
    .attr('x', bx(allMean)).attr('y', -12)
    .text(`All states ${allMean.toFixed(1)}%`);

})();
