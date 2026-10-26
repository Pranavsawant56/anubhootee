const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const html = [
    '<!doctype html><html><head>',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Libre+Caslon+Display&family=Prata&display=swap" rel="stylesheet">',
    '<style>body{margin:0;padding:30px;background:#f2f0e4;color:#0b351f} .row{margin-bottom:26px} .label{font:12px monospace;margin-bottom:4px} .sample{display:inline-block;font-size:72px;line-height:.86;letter-spacing:-.02em;white-space:nowrap} .sample em{font-style:italic;color:#efc51d}</style>',
    '</head><body><div id="rows"></div><script>',
    'const fonts = [["Playfair Display",400],["Playfair Display",500],["DM Serif Display",400],["Bodoni Moda",400],["Bodoni Moda",500],["Cormorant Garamond",400],["Cormorant Garamond",500],["Libre Caslon Display",400],["Prata",400]];',
    'const rows = document.getElementById("rows");',
    'for (const [f,w] of fonts) { const row = document.createElement("div"); row.className="row"; row.innerHTML = "<div class=\\"label\\">"+f+" "+w+"</div><div class=\\"sample\\" style=\\"font-family:\'"+f+"\';font-weight:"+w+"\\">India, in <em>stories</em></div>"; rows.appendChild(row); }',
    '</script></body></html>'
  ].join('');
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);
  const widths = await page.evaluate(() => [...document.querySelectorAll('.row')].map(row => {
    const s = row.querySelector('.sample');
    const r = s.getBoundingClientRect();
    return {label: row.querySelector('.label').textContent, width: Math.round(r.width), height: Math.round(r.height), font: getComputedStyle(s).fontFamily};
  }));
  console.log(JSON.stringify(widths, null, 2));
  await page.screenshot({ path: 'C:\\Users\\Dell\\AppData\\Local\\Temp\\opencode\\anubhootee-shots\\font-test.png', fullPage: true });
  await browser.close();
})();
