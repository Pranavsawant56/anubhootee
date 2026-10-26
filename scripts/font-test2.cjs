const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1500, height: 1200 } });
  const html = [
    '<!doctype html><html><head>',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Bellefair&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant:ital,wght@0,400;0,500;1,400&family=Cormorant+Infant:ital,wght@0,400;0,500;1,400&family=Sorts+Mill+Goudy:ital@0;1&family=Marcellus&family=Lora:ital,wght@0,400;0,500;1,400&family=Spectral:ital,wght@0,400;0,500;1,400&family=Cardo:ital,wght@0,400;1,400&display=swap" rel="stylesheet">',
    '<style>body{margin:0;padding:24px;background:#0b351f;color:#fffcf3} .row{margin-bottom:18px} .label{font:11px monospace;color:#efc51d;margin-bottom:2px} .sample{display:inline-block;font-size:72px;line-height:.94;letter-spacing:-.025em;white-space:nowrap} .sample em{font-style:italic;color:#efc51d}</style>',
    '</head><body><div id="rows"></div><script>',
    'const fonts = [["Baskervville",400],["Bellefair",400],["EB Garamond",400],["EB Garamond",500],["Cormorant",400],["Cormorant",500],["Cormorant Infant",400],["Sorts Mill Goudy",400],["Marcellus",400],["Lora",400],["Spectral",400],["Cardo",400]];',
    'const rows = document.getElementById("rows");',
    'for (const [f,w] of fonts) { const row = document.createElement("div"); row.className="row"; row.innerHTML = "<div class=\\"label\\">"+f+" "+w+"</div><div class=\\"sample\\" style=\\"font-family:\'"+f+"\';font-weight:"+w+"\\">India, in <em>stories</em><br>&amp; symbols.</div>"; rows.appendChild(row); }',
    '</script></body></html>'
  ].join('');
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);
  const data = await page.evaluate(() => [...document.querySelectorAll('.row')].map(row => {
    const s = row.querySelector('.sample');
    const r = s.getBoundingClientRect();
    return {label: row.querySelector('.label').textContent, width: Math.round(r.width), height: Math.round(r.height), font: getComputedStyle(s).fontFamily};
  }));
  console.log(JSON.stringify(data, null, 2));
  await page.screenshot({ path: 'C:\\Users\\Dell\\AppData\\Local\\Temp\\opencode\\anubhootee-shots\\font-test2.png', fullPage: true });
  await browser.close();
})();
