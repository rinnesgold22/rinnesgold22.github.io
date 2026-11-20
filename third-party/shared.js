// =====================================================================
// Shared helpers, loaded before the section scripts.
// =====================================================================
// Tooltip: all sections use the single #tooltip element.
function showCustomTooltip(event, html) {
  const tooltip = document.getElementById('tooltip');
  tooltip.innerHTML = html;
  tooltip.style.opacity = 1;
  positionTooltip(event);
}

// Follows the cursor; flips left/up near the window edge.
function positionTooltip(event) {
  const tooltip = document.getElementById('tooltip');
  const pad = 14;
  let x = event.clientX + pad;
  let y = event.clientY + pad;
  const tw = tooltip.offsetWidth || 200;
  const th = tooltip.offsetHeight || 60;
  if (x + tw > window.innerWidth - 10) x = event.clientX - tw - pad;
  if (y + th > window.innerHeight - 10) y = event.clientY - th - pad;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

const STATE_ABBR = {
  'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO',
  'Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID',
  'Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA',
  'Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN',
  'Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV',
  'New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC',
  'North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA',
  'Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX',
  'Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV',
  'Wisconsin':'WI','Wyoming':'WY'
};
