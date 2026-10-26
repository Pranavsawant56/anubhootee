const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1512, height: 900 } });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const data = await page.evaluate(() => {
    const rect = el => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY)}; };
    const support = document.querySelector('#home p[class*="support"]');
    const actions = document.querySelector('#home div[class*="actions"]');
    const chips = document.querySelector('#home ul[class*="chips"]');
    return {
      support: {...rect(support), text: support.textContent, lineHeight: getComputedStyle(support).lineHeight, maxWidth: getComputedStyle(support).maxWidth},
      actions: rect(actions),
      chips: rect(chips),
      portal: !!document.querySelector('nextjs-portal'),
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
