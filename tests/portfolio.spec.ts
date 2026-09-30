import { test, expect } from '@playwright/test';
test.beforeEach(async ({page}) => { await page.addInitScript(() => sessionStorage.setItem('azqa-lab-intro','seen')); });
const slugs = ['enterprise-ai-security', 'researchlens-ai', 'system-monitoring-assistant', 'uniguide-ai', 'mpafnet'];
test('responsive layout, portrait, and mobile navigation', async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByAltText('Azqa Jafar, AI and ML Engineer')).toBeVisible();
    expect(await page.getByAltText('Azqa Jafar, AI and ML Engineer').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    if (width <= 900) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('navigation').getByRole('link', { name: 'Systems', exact: true }).click();
      await expect(page).toHaveURL(/#projects$/);
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    }
  }
});
test('project routes, diagrams, missing route, and no console errors', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  for (const slug of slugs) {
    const response = await page.goto(`/projects/${slug}`); expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const nodes = page.locator('.node'); await nodes.nth(1).click(); await expect(nodes.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/projects/${slug}$`));
    await page.setViewportSize({ width: 320, height: 800 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  const response = await page.goto('/projects/missing-project'); expect(response?.status()).toBe(404);
  expect(errors).toEqual([]);
});
test('SEO, downloadable CV, crawlability and external links', async ({ page, request }) => {
  await page.goto('/'); await expect(page).toHaveTitle(/Azqa Jafar.*AI & ML Engineer/);
  expect(await page.locator('script[type="application/ld+json"]').first().textContent()).toContain('Person');
  for (const href of ['https://github.com/azqajafardev', 'https://linkedin.com/in/azqa-jafar', 'https://www.sciencedirect.com/science/article/pii/S2090447926004843']) {
    const link = page.locator(`a[href="${href}"]`).first(); await expect(link).toHaveAttribute('target', '_blank'); await expect(link).toHaveAttribute('rel', /noopener/);
  }
  const pdf = await request.get('/Azqa_Jafar_CV.pdf'); expect(pdf.status()).toBe(200); expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
  const sitemap = await request.get('/sitemap.xml'); expect(sitemap.status()).toBe(200); for (const slug of slugs) expect(await sitemap.text()).toContain(`/projects/${slug}`);
  const robots = await request.get('/robots.txt'); expect(await robots.text()).toContain('Allow: /'); expect(await robots.text()).not.toContain('YOUR-DOMAIN');
  expect((await request.get('/opengraph-image')).status()).toBe(200);
});
test('contact validation and honest delivery errors', async ({ page, request }) => {
  const response = await request.post('/api/contact', { data: { name: 'A', email: 'invalid' } }); expect(response.status()).toBe(400);
  await page.goto('/#contact');
  await page.getByLabel('Name', { exact: true }).fill('Test Visitor'); await page.getByRole('textbox', { name: 'Email', exact: true }).fill('test@example.com'); await page.getByLabel('Project / Opportunity', { exact: true }).fill('Engineering collaboration'); await page.getByLabel('Message', { exact: true }).fill('A test message for validating the contact user interface.');
  await page.route('**/api/contact', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Message delivery is currently unavailable. Please email azqajafar@gmail.com directly.' }) }));
  await page.getByRole('button', { name: 'Send message' }).click(); await expect(page.locator('.contact-form').getByRole('alert')).toContainText('azqajafar@gmail.com');
  await expect(page.getByRole('link',{name:'Open email draft'})).toHaveAttribute('href',/mailto:azqajafar@gmail.com\?subject=Engineering%20collaboration/);
  await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }));
  await page.getByRole('button', { name: 'Send message' }).click(); await expect(page.locator('.contact-form').getByRole('status')).toContainText('Your message has been sent');
});
test('reduced motion and keyboard access', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/'); await page.keyboard.press('Tab'); await expect(page.getByText('Skip to content')).toBeFocused(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/#main-content$/);
  expect(await page.locator('.trace').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none');
});

test('blueprint branches, stack pause, manifest and bounded intro',async ({page,request})=>{
 await page.goto('/');
 const tools=page.locator('.branch').getByRole('button',{name:/Tools/});
 await tools.focus(); await expect(tools).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('.blueprint-note')).toContainText('external services');
 await page.getByRole('button',{name:'Pause stack animation'}).click();
 await expect(page.locator('.engineering-strip')).toHaveClass(/paused/);
 expect((await request.get('/manifest.webmanifest')).status()).toBe(200);
 await page.evaluate(()=>sessionStorage.removeItem('azqa-lab-intro'));
 await page.addInitScript(()=>sessionStorage.removeItem('azqa-lab-intro'));
 await page.reload();
 await expect(page.locator('.lab-intro')).not.toBeVisible({timeout:5000});
});
