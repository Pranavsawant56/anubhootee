const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  for (const width of [1512, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `C:\\Users\\Dell\\AppData\\Local\\Temp\\opencode\\anubhootee-shots\\hero-${width}.png`, clip: { x: 0, y: 0, width, height: width === 375 ? 850 : 700 } });
    await page.close();
  }
  await browser.close();
})();
