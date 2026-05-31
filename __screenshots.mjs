import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const BASE = 'http://localhost:5174';
const OUT = 'docs/screenshots';

const templates = [
  { id: 'shadcn',        name: 'Shadcn' },
  { id: 'shadcn-retro',  name: 'Retro' },
  { id: 'awesomeshadcn', name: 'Awesome' },
  { id: 'plain',         name: 'Plain' },
  { id: 'claude',        name: 'Claude' },
  { id: 'terminal',      name: 'Terminal' },
  { id: 'editorial',     name: 'Editorial' },
];

for (const t of templates) {
  for (const theme of ['light', 'dark']) {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });

    await page.evaluate(({ templateId, themeVal }) => {
      localStorage.setItem('cv-markdown:template', templateId);
      localStorage.setItem('cv-markdown:theme', themeVal);
    }, { templateId: t.id, themeVal: theme });

    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const filePath = `${OUT}/${t.name}-${theme}.png`;
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`${t.name} ${theme} -> ${filePath}`);
  }
}

// Also take a full overview screenshot showing the app UI with theme toggle visible
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('cv-markdown:template', 'shadcn');
  localStorage.setItem('cv-markdown:theme', 'light');
});
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
// Use a larger viewport for overview to show more of the app
await page.setViewportSize({ width: 1440, height: 900 });
await page.screenshot({ path: `${OUT}/overview.png`, fullPage: false });
console.log(`Overview -> ${OUT}/overview.png`);

await browser.close();
console.log('All done');
