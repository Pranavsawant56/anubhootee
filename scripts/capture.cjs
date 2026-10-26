const { chromium } = require('playwright-core');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  const out = 'C:\\Users\\Dell\\AppData\\Local\\Temp\\opencode\\anubhootee-shots';
  const results = {};
  for (const width of [1512, 1440, 1024, 768, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
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
    await page.evaluate(async () => {
      await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res; })));
    });
    await page.evaluate(() => { window.scrollTo(0, 0); window.dispatchEvent(new Event('scroll')); });
    await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}\\pw-${width}.png`, fullPage: true });
    results[width] = await page.evaluate(() => {
      const q = s => document.querySelector(s);
      const rect = el => el ? (() => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY)}; })() : null;
      const cs = el => el ? getComputedStyle(el) : null;
      const images = [...document.images].map(img => ({src: img.getAttribute('src'), complete: img.complete, nw: img.naturalWidth, nh: img.naturalHeight, rect: rect(img)}));
      return {
        scrollY,
        innerWidth, scrollWidth: document.documentElement.scrollWidth, docHeight: document.documentElement.scrollHeight,
        header: rect(q('header')),
        hero: rect(q('#home > .container > div')),
        heroCopy: rect(q('#home > .container > div > div:first-child')),
        heroImg: rect(q('#home figure')),
        h1: rect(q('#hero-title')),
        h1Font: cs(q('#hero-title'))?.fontSize,
        h1Weight: cs(q('#hero-title'))?.fontWeight,
        h1LS: cs(q('#hero-title'))?.letterSpacing,
        h1Family: cs(q('#hero-title'))?.fontFamily,
        support: rect(q('#home p[class*="support"]')),
        paths: rect(q('#explore')),
        pathTitle: rect(q('#explore h2')),
        chola: rect(q('#chola')),
        cholaFig: rect(q('#chola figure')),
        cholaCopy: rect(q('#chola div[class*="copy"]')),
        cholaCards: rect(q('#chola div[class*="symbolGrid"]')),
        cholaProcess: rect(q('#chola div[class*="process"]')),
        places: rect(q('#places')),
        travelTitle: rect(q('#places h2')),
        travelFig: rect(q('#places figure')),
        travelCards: rect(q('#places div[class*="cards"]')),
        stories: rect(q('#stories')),
        journalHeader: rect(q('#stories div[class*="header"]')),
        journalGrid: rect(q('#stories div[class*="grid"]')),
        journalCard: rect(q('#stories article')),
        about: rect(q('#about')),
        aboutPanel: rect(q('#about aside')),
        footer: rect(q('footer')),
        images,
        h2Fonts: [...document.querySelectorAll('h2')].map(h => ({text:h.textContent.trim().slice(0,30), size:getComputedStyle(h).fontSize, weight:getComputedStyle(h).fontWeight, w:Math.round(h.getBoundingClientRect().width), top:Math.round(h.getBoundingClientRect().top+scrollY)})),
      };
    });
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(`${out}\\metrics.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})();
