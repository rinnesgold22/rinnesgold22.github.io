// =====================================================================
// Section III: Competitive elections
//
// For each state, counts the elections (1988-2024) where
// third > |dem - rep|. Computed from Section I's stateData.
// Draws a histogram of state tiles (one column per count) and a
// states-per-year bar chart; hovering either highlights the other.
//
// Inputs: ANNOTATIONS, stateData (section1-vote-share.js),
//         showCustomTooltip / STATE_ABBR (shared.js)
// =====================================================================
(function drawSectionIII() {

  const YEARS = [1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024];
  const MAX = YEARS.length;

  // ---- Data ----------------------------------------------------------
  // [{ name, count, hits: [{ year, third, margin }] }]
  const states = Object.entries(stateData).map(([name, rec]) => {
    const hits = rec.years
      .map(y => ({ year: y.year, third: y.third, margin: Math.abs(y.dem - y.rep) }))
      .filter(y => y.third > y.margin);
    return { name, count: hits.length, hits };
  });

  // Hover notes: { stateName: [text, ...] }
  const NOTES = {};
  ((typeof ANNOTATIONS !== 'undefined') ? ANNOTATIONS : [])
    .filter(n => n.figure === 'competitive')
    .forEach(n => { (NOTES[n.state] = NOTES[n.state] || []).push(n.text); });
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Scale runs from 0 to the highest count observed.
  const stops = ['#d3ece8', '#a6d8d0', '#6fbcb1', '#3f9a8e', '#1f7268', '#0d4a43'];
  const maxCount = d3.max(states, d => d.count);
  const color = d3.scaleLinear()
    .domain(d3.range(6).map(i => maxCount * i / 5))
    .range(stops)
    .clamp(true);
  const textColor = c => d3.hsl(c).l < 0.5 ? '#fff' : '#000';

  // ---- Hover ---------------------------------------------------------
  function tooltipHtml(s) {
    const list = s.hits.length
      ? s.hits.map(h =>
          `${h.year}: third party ${h.third.toFixed(1)}% vs. margin ${h.margin.toFixed(1)} pts`
        ).join('<br>')
      : 'Never — the major-party margin was always larger.';
    return `<span class="t-name">${s.name}</span>` +
      `<span class="t-mean" style="color:var(--comp)">${s.count} of ${MAX} elections</span>` +
      `<span class="t-hint">${list}</span>` +
      (NOTES[s.name] || []).map(t => `<span class="t-notetext">&#9733; ${esc(t)}</span>`).join('');
  }

  function hideTip() { document.getElementById('tooltip').style.opacity = 0; }

  // State hover: outline tile, dim bars for years it didn't qualify.
  function focusState(s) {
    tiles.classed('linked', d => s && d.name === s.name);
    const yrs = s ? new Set(s.hits.map(h => h.year)) : null;
    bars.classed('dim', d => yrs && !yrs.has(d.year));
  }

  // Year hover: dim tiles for states that didn't qualify that year.
  function focusYear(year) {
    tiles.classed('dim', d => year != null && !d.hits.some(h => h.year === year));
    bars.classed('dim', d => year != null && d.year !== year);
  }

  // ---- Tile histogram ------------------------------------------------
  const W = 975;
  const TILE_H = 22, GAP = 3;
  const margin = { top: 26, right: 6, bottom: 56, left: 6 };
  const iw = W - margin.left - margin.right;

  // Alphabetical within each column, bottom to top.
  const byCount = d3.group(states, d => d.count);
  byCount.forEach(list => list
    .sort((a, b) => d3.ascending(a.name, b.name))
    .forEach((s, i) => { s.stack = i; }));
  const tallest = d3.max(Array.from(byCount.values()), l => l.length);
  const ih = tallest * (TILE_H + GAP);
  const H = margin.top + ih + margin.bottom;

  const x = d3.scaleBand().domain(d3.range(0, MAX + 1)).range([0, iw]).paddingInner(0.12);
  const tileY = i => ih - (i + 1) * (TILE_H + GAP) + GAP;

  const svg = d3.select('#hist-comp').attr('viewBox', `0 0 ${W} ${H}`);
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Baseline and column labels
  g.append('line').attr('class', 'hist-base')
    .attr('x1', 0).attr('x2', iw).attr('y1', ih + 3).attr('y2', ih + 3);
  g.selectAll('.col-label')
    .data(x.domain())
    .join('text')
    .attr('class', 'col-label')
    .attr('x', d => x(d) + x.bandwidth() / 2)
    .attr('y', ih + 20)
    .attr('text-anchor', 'middle')
    .text(d => d);
  g.append('text').attr('class', 'axis-title')
    .attr('x', iw / 2).attr('y', ih + 46).attr('text-anchor', 'middle')
    .text('Number of elections (of 10) in which the third-party share exceeded the Democratic–Republican margin');

  // State count above each column
  g.selectAll('.col-count')
    .data(Array.from(byCount, ([count, list]) => ({ count, n: list.length })))
    .join('text')
    .attr('class', 'col-count')
    .attr('x', d => x(d.count) + x.bandwidth() / 2)
    .attr('y', d => tileY(d.n - 1) - 7)
    .attr('text-anchor', 'middle')
    .text(d => d.n === 1 ? '1 state' : `${d.n} states`);

  const tiles = g.selectAll('.tile')
    .data(states)
    .join('g')
    .attr('class', 'tile')
    .attr('transform', d => `translate(${x(d.count)},${tileY(d.stack)})`)
    .on('mousemove', (event, d) => { showCustomTooltip(event, tooltipHtml(d)); focusState(d); })
    .on('mouseleave', () => { hideTip(); focusState(null); });

  tiles.append('rect')
    .attr('width', x.bandwidth())
    .attr('height', TILE_H)
    .attr('rx', 2)
    .attr('fill', d => color(d.count));

  tiles.append('text')
    .attr('x', x.bandwidth() / 2)
    .attr('y', TILE_H / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('fill', d => textColor(color(d.count)))
    .text(d => STATE_ABBR[d.name] || d.name);

  // Note markers
  tiles.filter(d => NOTES[d.name])
    .append('text')
    .attr('class', 'note-star')
    .attr('x', x.bandwidth() - 9)
    .attr('y', TILE_H / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text('★');

  // ---- States-per-year bars ------------------------------------------
  const perYear = YEARS.map(year => ({
    year,
    n: states.filter(s => s.hits.some(h => h.year === year)).length
  }));

  const YW = 975, YH = 170;
  const ym = { top: 22, right: 6, bottom: 26, left: 6 };
  const yiw = YW - ym.left - ym.right, yih = YH - ym.top - ym.bottom;

  const bx = d3.scaleBand().domain(YEARS).range([0, yiw]).paddingInner(0.3);
  const by = d3.scaleLinear().domain([0, 50]).range([yih, 0]);

  const ysvg = d3.select('#years-comp').attr('viewBox', `0 0 ${YW} ${YH}`);
  const yg = ysvg.append('g').attr('transform', `translate(${ym.left},${ym.top})`);

  yg.append('line').attr('class', 'hist-base')
    .attr('x1', 0).attr('x2', yiw).attr('y1', yih).attr('y2', yih);

  const bars = yg.selectAll('.year-bar-g')
    .data(perYear)
    .join('g')
    .attr('class', 'year-bar-g')
    .on('mousemove', (event, d) => {
      showCustomTooltip(event,
        `<span class="t-name">${d.year}</span>` +
        `<span class="t-mean" style="color:var(--comp)">${d.n} of 50 states</span>` +
        `<span class="t-hint">Third-party share exceeded the major-party margin</span>`);
      focusYear(d.year);
    })
    .on('mouseleave', () => { hideTip(); focusYear(null); });

  // Full-height transparent hit area
  bars.append('rect')
    .attr('x', d => bx(d.year)).attr('width', bx.bandwidth())
    .attr('y', -ym.top).attr('height', yih + ym.top)
    .attr('fill', 'transparent');
  bars.append('rect')
    .attr('class', 'year-bar')
    .attr('x', d => bx(d.year)).attr('width', bx.bandwidth())
    .attr('y', d => by(d.n)).attr('height', d => yih - by(d.n))
    .attr('rx', 2);
  bars.append('text')
    .attr('class', 'col-count')
    .attr('x', d => bx(d.year) + bx.bandwidth() / 2)
    .attr('y', d => by(d.n) - 6)
    .attr('text-anchor', 'middle')
    .text(d => d.n);
  bars.append('text')
    .attr('class', 'col-label')
    .attr('x', d => bx(d.year) + bx.bandwidth() / 2)
    .attr('y', yih + 18)
    .attr('text-anchor', 'middle')
    .text(d => d.year);

})();
