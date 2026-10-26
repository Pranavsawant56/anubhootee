const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  for (const width of [1512, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:3001/stories/a-temple-morning', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const step = Math.max(500, window.innerHeight * 0.8);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise(r => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 400));
    });
    await page.evaluate(async () => { await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res; }))); });
    await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `C:\\Users\\Dell\\AppData\\Local\\Temp\\opencode\\anubhootee-shots\\story-${width}.png`, fullPage: true, timeout: 60000 });
    const data = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth, docHeight: document.documentElement.scrollHeight, title: document.title, h1: document.querySelector('h1')?.textContent, images: [...document.images].map(i => ({src:i.getAttribute('src'), complete:i.complete, nw:i.naturalWidth, nh:i.naturalHeight})) }));
    console.log(width, JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})();
