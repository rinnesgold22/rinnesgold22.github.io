// =====================================================================
// Section II: Independent identifiers
//
// Map of % pure independents by state, and a scatter of % pure
// independents vs. mean third-party presidential vote (Section I).
// Hovering a state on either figure highlights it on the other.
//
// Inputs: STATES_GEO, INDEPENDENT_IDENTIFIERS_CSV, ANNOTATIONS,
//         stateData (section1-vote-share.js),
//         showCustomTooltip / STATE_ABBR (shared.js)
// =====================================================================
(function drawSectionII() {

  // ---- Data ----------------------------------------------------------
  const rows = d3.csvParse(INDEPENDENT_IDENTIFIERS_CSV.trim(), d3.autoType).filter(r => r.state);
  const IND = {};
  rows.forEach(r => { IND[r.state] = r.pct_ind; });

  const RANK = {};
  Object.keys(IND).sort((a, b) => IND[b] - IND[a]).forEach((name, i) => { RANK[name] = i + 1; });

  const vals = Object.values(IND);
  const lo = d3.min(vals), hi = d3.max(vals), avg = d3.mean(vals);

  const stops = ['#e0d3ea', '#c9b0dc', '#a888c9', '#8763ac', '#623f7d', '#3a2150'];
  const color = d3.scaleLinear()
    .domain(d3.range(6).map(i => lo + (hi - lo) * i / 5))
    .range(stops)
    .clamp(true);

  const ABBR = STATE_ABBR;

  // Hover notes: { stateName: [text, ...] }
  const NOTES = {};
  ((typeof ANNOTATIONS !== 'undefined') ? ANNOTATIONS : [])
    .filter(n => n.figure === 'independents')
    .forEach(n => { (NOTES[n.state] = NOTES[n.state] || []).push(n.text); });

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ---- Legend --------------------------------------------------------
  const track = document.getElementById('legend-track-ind');
  track.style.background = `linear-gradient(to right, ${stops.join(',')})`;
  const pct = v => (v - lo) / (hi - lo) * 100;
  const tick = (left, text, cls, style) => {
    const el = document.createElement('div');
    el.className = cls;
    el.style.left = left + '%';
    if (text) el.textContent = text;
    Object.assign(el.style, style || {});
    return el;
  };
  track.append(
    tick(0, lo.toFixed(1) + '%', 'legend-tick'),
    tick(100, hi.toFixed(1) + '%', 'legend-tick'),
    tick(pct(avg), '', 'legend-marker'),
    tick(pct(avg), 'US ' + avg.toFixed(1) + '%', 'legend-tick', { color: 'var(--ind)' })
  );

  // ---- Hover (shared by map and scatter) -----------------------------
  const readout = document.getElementById('hover-readout-ind');

  function tooltipHtml(name) {
    const third = stateData[name] ? stateData[name].mean.toFixed(1) + '%' : 'n/a';
    return `<span class="t-name">${name}</span>` +
      `<span class="t-mean" style="color:var(--ind)">${IND[name].toFixed(1)}% pure independents</span>` +
      `<span class="t-hint">Rank #${RANK[name]} of 50 &middot; third-party presidential avg: ${third}</span>` +
      (NOTES[name] || []).map(t => `<span class="t-notetext">&#9733; ${esc(t)}</span>`).join('');
  }

  // Highlight a state on both figures; null clears.
  function highlight(name) {
    mapPaths.classed('linked', d => d.properties.name === name);
    dots.classed('linked', d => d.name === name);
    // Hovered dot moves to hoverLayer (above labels); others return to dotLayer.
    dots.each(function (d) {
      const target = (d.name === name) ? hoverLayer.node() : dotLayer.node();
      if (this.parentNode !== target) target.appendChild(this);
    });
  }

  function onHover(event, name) {
    if (IND[name] == null) return;
    showCustomTooltip(event, tooltipHtml(name));
    readout.textContent = `${name} — ${IND[name].toFixed(1)}% pure independents`;
    highlight(name);
  }

  function onLeave() {
    document.getElementById('tooltip').style.opacity = 0;
    readout.textContent = 'Hover over a state';
    highlight(null);
  }

  // ---- Map -----------------------------------------------------------
  const geoPath = d3.geoPath();
  const mapSvg = d3.select('#map-ind');
  const mapPaths = mapSvg.append('g')
    .selectAll('path')
    .data(STATES_GEO.features)
    .join('path')
    .attr('class', 'state-path no-click')
    .attr('d', geoPath)
    .attr('fill', d => IND[d.properties.name] != null ? color(IND[d.properties.name]) : '#ccc')
    .on('mousemove', (event, d) => onHover(event, d.properties.name))
    .on('mouseleave', onLeave);

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

  // ---- Scatter -------------------------------------------------------
  const W = 975, H = 560; // matches viewBox in index.html
  const margin = { top: 20, right: 30, bottom: 58, left: 64 };
  const iw = W - margin.left - margin.right;
  const ih = H - margin.top - margin.bottom;

  const points = Object.keys(IND)
    .filter(name => stateData[name])
    .map(name => ({ name, x: IND[name], y: stateData[name].mean }));

  const x = d3.scaleLinear()
    .domain([Math.floor(lo) - 0.5, Math.ceil(hi) + 0.5]).range([0, iw]).nice();
  const y = d3.scaleLinear()
    .domain([0, d3.max(points, d => d.y) * 1.1]).range([ih, 0]).nice();

  const svg = d3.select('#scatter-ind');
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g').attr('class', 'axis').attr('transform', `translate(0,${ih})`)
    .call(d3.axisBottom(x).ticks(8).tickFormat(d => d + '%').tickSize(-ih))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('.tick line').attr('stroke-dasharray', '2,3'))
    .call(a => a.selectAll('.tick text').attr('dy', '1.2em'));
  g.append('g').attr('class', 'axis')
    .call(d3.axisLeft(y).ticks(6).tickFormat(d => d + '%').tickSize(-iw))
    .call(a => a.select('.domain').remove())
    .call(a => a.selectAll('.tick line').attr('stroke-dasharray', '2,3'));

  g.append('text').attr('class', 'axis-title')
    .attr('x', iw / 2).attr('y', ih + 48).attr('text-anchor', 'middle')
    .text('Pure independents, % of electorate (2006–2024)');
  g.append('text').attr('class', 'axis-title')
    .attr('transform', `translate(${-48},${ih / 2}) rotate(-90)`).attr('text-anchor', 'middle')
    .text('Avg. third-party presidential vote, 1988–2024');

  // OLS fit and Pearson r (unweighted, n = 50)
  const mx = d3.mean(points, d => d.x), my = d3.mean(points, d => d.y);
  const sxy = d3.sum(points, d => (d.x - mx) * (d.y - my));
  const sxx = d3.sum(points, d => (d.x - mx) ** 2);
  const syy = d3.sum(points, d => (d.y - my) ** 2);
  const slope = sxy / sxx, intercept = my - slope * mx;
  const r = sxy / Math.sqrt(sxx * syy);
  const [x0, x1] = x.domain();

  g.append('line').attr('class', 'fit-line')
    .attr('x1', x(x0)).attr('y1', y(intercept + slope * x0))
    .attr('x2', x(x1)).attr('y2', y(intercept + slope * x1));
  g.append('text').attr('class', 'fit-label')
    .attr('x', 8).attr('y', 14)
    .text(`Correlation r = ${r.toFixed(2)}  ·  dashed line = best fit`);

  // Layers, bottom to top: dots, labels, hovered dot.
  const dotLayer = g.append('g');
  const labelLayer = g.append('g');
  const hoverLayer = g.append('g');

  const dots = dotLayer.selectAll('.scatter-dot')
    .data(points)
    .join('circle')
    .attr('class', 'scatter-dot')
    .attr('cx', d => x(d.x))
    .attr('cy', d => y(d.y))
    .attr('r', 7)
    .attr('fill', d => color(d.x))
    .on('mousemove', (event, d) => onHover(event, d.name))
    .on('mouseleave', onLeave);

  // Label outliers only: >= 19% independents, >= 7% third-party, or the minimum on either axis.
  const minX = d3.min(points, d => d.x), minY = d3.min(points, d => d.y);
  const labelled = points
    .filter(d => d.x >= 19 || d.y >= 7 || d.x === minX || d.y === minY)
    .map(d => ({ ...d, lx: x(d.x) + 10, ly: y(d.y) + 4 }))
    .sort((a, b) => a.ly - b.ly);

  // Nudge overlapping labels down.
  const placed = [];
  const LW = 20, LH = 12;
  labelled.forEach(l => {
    let tries = 0;
    while (tries++ < 20 && placed.some(p => Math.abs(p.lx - l.lx) < LW && Math.abs(p.ly - l.ly) < LH)) {
      l.ly += 4;
    }
    placed.push(l);
  });

  labelLayer.selectAll('.scatter-label')
    .data(placed)
    .join('text')
    .attr('class', 'scatter-label')
    .attr('x', d => d.lx)
    .attr('y', d => d.ly)
    .text(d => ABBR[d.name] || d.name);

})();
