const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1512, height: 900 } });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const measure = async () => page.evaluate(() => {
    const h1 = document.querySelector('#hero-title');
    const range = document.createRange();
    range.selectNodeContents(h1);
    const rects = [...range.getClientRects()].map(r => ({x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height)}));
    const h2 = document.querySelector('#explore h2');
    const r2 = document.createRange(); r2.selectNodeContents(h2);
    const rects2 = [...r2.getClientRects()].map(r => ({x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height)}));
    return { h1: {font: getComputedStyle(h1).fontFamily, size:getComputedStyle(h1).fontSize, ls:getComputedStyle(h1).letterSpacing, rects}, h2: {font: getComputedStyle(h2).fontFamily, size:getComputedStyle(h2).fontSize, ls:getComputedStyle(h2).letterSpacing, rects: rects2} };
  });
  console.log('current', JSON.stringify(await measure(), null, 2));
  await page.addStyleTag({ content: `@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap'); #hero-title, #explore h2, #chola h2, #places h2, #stories h2, #about h2 { font-family: 'Cormorant', serif !important; }` });
  await page.waitForTimeout(2500);
  console.log('cormorant', JSON.stringify(await measure(), null, 2));
  await page.addStyleTag({ content: `#hero-title { transform: scaleX(0.91); transform-origin: left center; }` });
  await page.waitForTimeout(300);
  console.log('scaled', JSON.stringify(await measure(), null, 2));
  await browser.close();
})();
