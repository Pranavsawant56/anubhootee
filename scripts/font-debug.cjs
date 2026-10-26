const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1512, height: 900 } });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(() => {
    const h1 = document.querySelector('#hero-title');
    const body = document.body;
    return {
      bodyClass: body.className,
      bodyFont: getComputedStyle(body).fontFamily,
      bodySerifVar: getComputedStyle(body).getPropertyValue('--font-serif'),
      bodySansVar: getComputedStyle(body).getPropertyValue('--font-sans'),
      bodySerif: getComputedStyle(body).getPropertyValue('--serif'),
      bodySans: getComputedStyle(body).getPropertyValue('--sans'),
      h1Class: h1.className,
      h1Font: getComputedStyle(h1).fontFamily,
      h1Serif: getComputedStyle(h1).getPropertyValue('--serif'),
      fonts: [...document.fonts].map(f => ({family:f.family, weight:f.weight, style:f.style, status:f.status})),
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
