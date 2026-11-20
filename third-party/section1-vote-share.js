// =====================================================================
// Section I: Presidential vote share
//
// Draws the third-party vote share map and the state detail panel.
// Also builds stateData (per-state mean/median/rank), which Sections
// II, III, and V reuse.
//
// Inputs: STATES_GEO, VOTE_SHARES_CSV, ANNOTATIONS,
//         showCustomTooltip (shared.js)
// =====================================================================

// Blank lines are filtered out so they don't become empty state rows.
const voteShareRows = d3.csvParse(VOTE_SHARES_CSV.trim(), d3.autoType).filter(r => r.state);
const stateData = buildStateData(voteShareRows);
render(stateData, STATES_GEO);

// Returns { stateName: { mean, median, rank, years: [{year, dem, rep, third}] } }
function buildStateData(rows) {
  const byState = d3.group(rows, d => d.state);

  const stateData = {};
  byState.forEach((yearRows, stateName) => {
    yearRows.sort((a, b) => a.year - b.year);

    const thirds = yearRows.map(r => r.third);
    stateData[stateName] = {
      mean: d3.mean(thirds),
      median: d3.median(thirds),
      years: yearRows.map(r => ({ year: r.year, dem: r.dem, rep: r.rep, third: r.third }))
    };
  });

  // Rank 1 = highest mean third-party share.
  const ranked = Object.entries(stateData).sort((a, b) => b[1].mean - a[1].mean);
  ranked.forEach(([name], i) => { stateData[name].rank = i + 1; });

  return stateData;
}

function render(STATE_DATA, STATES_GEO) {

  const YEARS = [1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024];

  // Section I notes from annotations.js.
  const ALL_NOTES = (typeof ANNOTATIONS !== 'undefined') ? ANNOTATIONS : [];
  const notesFor = (name) => ALL_NOTES
    .filter(n => n.figure === 'vote-share' && n.state === name)
    .sort((a, b) => a.year - b.year);

  // ---- Color scale ---------------------------------------------------
  const meansArr = Object.values(STATE_DATA).map(d => d.mean);
  const minMean = d3.min(meansArr);
  const maxMean = d3.max(meansArr);
  const natMean = d3.mean(meansArr); // unweighted mean of state means

  const thirdStops = ['#f2e2a8', '#e8cd6f', '#d4ac3a', '#b3861f', '#8a6112', '#5c4009'];

  // Six stops spread evenly between the lowest and highest state means.
  const colorScale = d3.scaleLinear()
    .domain(d3.range(0, 6).map(i => minMean + (maxMean - minMean) * i / 5))
    .range(thirdStops)
    .clamp(true);

  // ---- Legend --------------------------------------------------------
  const legendTrack = document.getElementById('legend-track');
  legendTrack.style.background = `linear-gradient(to right, ${thirdStops.join(',')})`;

  // Position of a value along the legend, in percent.
  function pct(v) {
    return (v - minMean) / (maxMean - minMean) * 100;
  }

  const tickLo = document.createElement('div');
  tickLo.className = 'legend-tick';
  tickLo.style.left = '0%';
  tickLo.textContent = minMean.toFixed(1) + '%';

  const tickHi = document.createElement('div');
  tickHi.className = 'legend-tick';
  tickHi.style.left = '100%';
  tickHi.textContent = maxMean.toFixed(1) + '%';

  const markNat = document.createElement('div');
  markNat.className = 'legend-marker';
  markNat.style.left = pct(natMean) + '%';
  markNat.title = 'National mean';

  const natTick = document.createElement('div');
  natTick.className = 'legend-tick';
  natTick.style.left = pct(natMean) + '%';
  natTick.style.color = 'var(--focus)';
  natTick.textContent = 'US ' + natMean.toFixed(1) + '%';

  legendTrack.append(tickLo, tickHi, markNat, natTick);

  // ---- Map -----------------------------------------------------------
  // Geometry is pre-projected (us-atlas states-albers-10m), so geoPath
  // is used without a projection.
  const svg = d3.select('#map');
  const path = d3.geoPath();
  const statesFeatures = STATES_GEO.features;

  const nameFor = (feature) => feature.properties.name;

  const mapGroup = svg.append('g');

  const statePaths = mapGroup.selectAll('path')
    .data(statesFeatures)
    .join('path')
    .attr('class', 'state-path')
    .attr('d', path)
    .attr('fill', d => {
      const rec = STATE_DATA[nameFor(d)];
      return rec ? colorScale(rec.mean) : '#333'; // no data (e.g. DC)
    })
    .attr('data-name', d => nameFor(d));

  // ---- Tooltip -------------------------------------------------------
  // showCustomTooltip is defined in shared.js.
  const tooltip = document.getElementById('tooltip');
  const hoverReadout = document.getElementById('hover-readout');

  function showTooltip(event, d) {
    const name = nameFor(d);
    const rec = STATE_DATA[name];
    if (!rec) return;
    showCustomTooltip(event,
      `<span class="t-name">${name}</span>` +
      `<span class="t-mean">${rec.mean.toFixed(2)}% average</span>` +
      `<span class="t-hint">Rank #${rec.rank} of 50 &middot; click for detail</span>` +
      (notesFor(name).length ? `<span class="t-note">&#9733; Includes a note</span>` : '')
    );
    hoverReadout.textContent = `${name} — ${rec.mean.toFixed(2)}% average third-party share`;
  }

  function hideTooltip() {
    tooltip.style.opacity = 0;
    hoverReadout.textContent = 'Hover over a state';
  }

  statePaths
    .on('mousemove', (event, d) => showTooltip(event, d))
    .on('mouseleave', hideTooltip)
    .on('click', (event, d) => openPanel(nameFor(d)));

  // ---- Detail panel --------------------------------------------------
  const panel = document.getElementById('panel');
  const backdrop = document.getElementById('backdrop');
  const panelCloseBtn = document.getElementById('panel-close');

  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    statePaths.classed('selected', false);
  }

  backdrop.addEventListener('click', closePanel);
  panelCloseBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

  function openPanel(name) {
    const rec = STATE_DATA[name];
    if (!rec) return;

    statePaths.classed('selected', d => nameFor(d) === name);

    document.getElementById('panel-name').textContent = name;
    document.getElementById('panel-rank').textContent =
      `Ranks #${rec.rank} of 50 · national average is ${natMean.toFixed(2)}%`;

    const thirds = rec.years.map(y => y.third);
    const bestIdx = d3.maxIndex(thirds);
    const worstIdx = d3.minIndex(thirds);

    document.getElementById('stat-mean').textContent = rec.mean.toFixed(2) + '%';
    document.getElementById('stat-median').textContent = rec.median.toFixed(2) + '%';
    document.getElementById('stat-high').textContent =
      rec.years[bestIdx].third.toFixed(1) + '% (' + rec.years[bestIdx].year + ')';
    document.getElementById('stat-low').textContent =
      rec.years[worstIdx].third.toFixed(1) + '% (' + rec.years[worstIdx].year + ')';

    drawDetailChart(rec, name);
    drawSplitRow(rec);

    panel.classList.add('open');
    backdrop.classList.add('open');
  }

  // ---- Panel: line chart ---------------------------------------------
  function drawDetailChart(rec, name) {
    const svgEl = d3.select('#detail-chart');
    svgEl.selectAll('*').remove();

    const W = 1120, H = 220; // matches viewBox in index.html
    const margin = { top: 16, right: 24, bottom: 28, left: 44 };
    const iw = W - margin.left - margin.right;
    const ih = H - margin.top - margin.bottom;

    const x = d3.scalePoint().domain(YEARS).range([0, iw]).padding(0.5);

    // 25% headroom above the highest point.
    const maxY = Math.max(d3.max(rec.years, d => d.third), rec.mean) * 1.25;
    const y = d3.scaleLinear().domain([0, maxY]).range([ih, 0]).nice();

    const gRoot = svgEl.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    gRoot.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${ih})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select('.domain').remove());

    gRoot.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(4).tickFormat(d => d + '%').tickSize(-iw)) // full-width gridlines
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke-dasharray', '2,3'));

    // State's own 10-election mean
    gRoot.append('line')
      .attr('class', 'mean-line')
      .attr('x1', 0).attr('x2', iw)
      .attr('y1', y(rec.mean)).attr('y2', y(rec.mean));

    const lineGenerator = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.third))
      .curve(d3.curveMonotoneX);

    gRoot.append('path')
      .datum(rec.years)
      .attr('class', 'third-line')
      .attr('d', lineGenerator);

    gRoot.selectAll('.third-dot')
      .data(rec.years)
      .join('circle')
      .attr('class', 'third-dot')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.third))
      .attr('r', 4.5)
      .on('mousemove', (event, d) => {
        showCustomTooltip(event, `<span class="t-name">${d.year}</span><span class="t-mean">${d.third.toFixed(1)}%</span>`);
      })
      .on('mouseleave', hideTooltip);

    drawNotes(name, rec, gRoot, x, y, W, margin);
  }

  // ---- Panel: annotation notes ---------------------------------------
  // Notes are HTML boxes in #detail-notes, above the chart, with an SVG
  // leader line down to the annotated year's dot. Horizontal positions
  // are percentages of the chart width so they stay aligned at any size.
  function drawNotes(name, rec, gRoot, x, y, W, margin) {
    const band = document.getElementById('detail-notes');
    band.innerHTML = '';
    band.style.height = '0px';

    const NOTE_W = 38;   // % of chart width
    const GAP = 1.5;     // % between adjacent notes
    let nextFree = 0;

    notesFor(name).forEach(n => {
      const point = rec.years.find(d => d.year === n.year);
      if (!point) return;

      // Center over the year, clamp to the chart, avoid overlapping earlier notes.
      const xPct = (margin.left + x(n.year)) / W * 100;
      let left = Math.min(Math.max(xPct - NOTE_W / 2, 0), 100 - NOTE_W);
      left = Math.max(left, nextFree);
      nextFree = left + NOTE_W + GAP;

      const box = document.createElement('div');
      box.className = 'chart-note';
      box.style.left = left + '%';
      box.style.width = NOTE_W + '%';
      const yr = document.createElement('span');
      yr.className = 'chart-note-year';
      yr.textContent = n.year;
      box.append(yr, document.createTextNode(n.text));
      band.appendChild(box);

      gRoot.insert('line', '.third-dot')
        .attr('class', 'note-line')
        .attr('x1', x(n.year)).attr('x2', x(n.year))
        .attr('y1', y(point.third) - 6)
        .attr('y2', -margin.top);

      gRoot.selectAll('.third-dot').filter(d => d.year === n.year).classed('selyear', true);
    });

    // Boxes are absolutely positioned; size the band to the tallest.
    const tallest = d3.max(Array.from(band.children), el => el.offsetHeight) || 0;
    band.style.height = tallest + 'px';
  }

  // ---- Panel: stacked bars (HTML divs) -------------------------------
  function drawSplitRow(rec) {
    const wrap = document.getElementById('split-row');
    wrap.innerHTML = '';

    const H = 66;            // bar height, px
    const MIN_THIRD_PX = 4;  // minimum visible third-party segment, px

    rec.years.forEach(y => {
      const col = document.createElement('div');
      col.className = 'split-col';

      // column-reverse: first child is drawn at the bottom.
      const barWrap = document.createElement('div');
      barWrap.className = 'split-bar-wrap';
      barWrap.style.height = H + 'px';

      // Enforce a minimum third-party height, taken from the larger party.
      let demPx = (y.dem / 100) * H;
      let repPx = (y.rep / 100) * H;
      let thirdPx = (y.third / 100) * H;
      if (thirdPx < MIN_THIRD_PX) {
        const deficit = MIN_THIRD_PX - thirdPx;
        thirdPx = MIN_THIRD_PX;
        if (demPx >= repPx) demPx = Math.max(demPx - deficit, 0);
        else repPx = Math.max(repPx - deficit, 0);
      }

      // Bottom to top: Dem, Rep, third party.
      const segments = [
        { px: demPx, color: 'var(--dem)', label: 'Democratic', value: y.dem },
        { px: repPx, color: 'var(--rep)', label: 'Republican', value: y.rep },
        { px: thirdPx, color: 'var(--focus)', label: 'Third party / independent', value: y.third }
      ];
      segments.forEach(seg => {
        const el = document.createElement('div');
        el.className = 'split-seg';
        el.style.height = seg.px + 'px';
        el.style.flexShrink = '0';
        el.style.background = seg.color;
        el.addEventListener('mousemove', (event) => {
          showCustomTooltip(event,
            `<span class="t-name">${y.year}</span>` +
            `<span class="t-mean">${seg.label}: ${seg.value.toFixed(1)}%</span>`
          );
        });
        el.addEventListener('mouseleave', hideTooltip);
        barWrap.appendChild(el);
      });

      const label = document.createElement('div');
      label.className = 'split-yr';
      label.style.textAlign = 'center';
      label.textContent = "'" + String(y.year).slice(2); // 1988 -> '88

      col.append(barWrap, label);
      wrap.appendChild(col);
    });
  }

} // end render()
