const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  for (const width of [1512, 1024, 768, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    const data = await page.evaluate(() => {
      const rect = el => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY)}; };
      const fig = document.querySelector('#places figure');
      const img = document.querySelector('#places figure img');
      const side = document.querySelector('#places div[class*="side"]');
      const cards = document.querySelector('#places div[class*="cards"]');
      const msg = document.querySelector('#places div[class*="message"]');
      return {fig: rect(fig), img: rect(img), side: rect(side), cards: rect(cards), msg: rect(msg), places: rect(document.querySelector('#places'))};
    });
    console.log(width, JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})();
