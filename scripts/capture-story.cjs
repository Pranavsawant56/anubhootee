const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  for (const width of [1512, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:3001/stories/a-temple-morning', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => { await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res; }))); });
    await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `C:\\Users\\Dell\\AppData\\Local\\Temp\\opencode\\anubhootee-shots\\story-${width}.png`, fullPage: true });
    const data = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth, docHeight: document.documentElement.scrollHeight, title: document.title, h1: document.querySelector('h1')?.textContent, bodyFont: getComputedStyle(document.body).fontFamily }));
    console.log(width, JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})();
