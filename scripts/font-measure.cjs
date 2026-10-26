const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  const html = [
    '<!doctype html><html><head>',
    '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">',
    '<style>body{margin:0;padding:20px;background:#0b351f;color:#fffcf3} .s{font-family:\'Cormorant Garamond\';font-size:72px;line-height:.94;letter-spacing:-.04em;white-space:nowrap;display:inline-block} .s em{font-style:italic;color:#efc51d}</style>',
    '</head><body><div class="s" id="a">India, in <em>stories</em></div><br><div class="s" id="b">&amp; symbols.</div><script>',
    '</script></body></html>'
  ].join('');
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  const data = await page.evaluate(() => ['a','b'].map(id => { const el=document.getElementById(id); const r=el.getBoundingClientRect(); return {id, width:Math.round(r.width), height:Math.round(r.height)}; }));
  console.log(JSON.stringify(data,null,2));
  await browser.close();
})();
