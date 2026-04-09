/**
 * Garante que o elemento fique visível. No iOS evita scrollIntoView (ações W3C)
 * que em Xcode/iOS recentes podem falhar com waitForQuiescence.
 */
async function ensureElementVisible(element, scrollableElement, { maxSteps = 16 } = {}) {
  const el = await element;
  await el.waitForExist({ timeout: 20000 });
  const scrollRoot = scrollableElement ? await scrollableElement : null;

  if (!driver.isIOS) {
    await el.scrollIntoView({
      maxScrolls: 6,
      scrollableElement: scrollRoot || undefined,
    });
    await el.waitForDisplayed({ timeout: 10000 });
    return;
  }

  for (let i = 0; i < maxSteps; i++) {
    try {
      if (await el.isDisplayed()) {
        return;
      }
    } catch {
      /* continua */
    }

    if (scrollRoot) {
      try {
        await browser.execute('mobile: scroll', {
          elementId: scrollRoot.elementId,
          direction: 'down',
        });
        continue;
      } catch {
        try {
          await browser.execute('mobile:scroll', {
            elementId: scrollRoot.elementId,
            direction: 'down',
          });
          continue;
        } catch {
          /* swipe global */
        }
      }
    }

    try {
      await browser.execute('mobile: swipe', { direction: 'up' });
    } catch {
      try {
        await browser.execute('mobile:swipe', { direction: 'up' });
      } catch {
        await browser.pause(250);
      }
    }
  }

  await el.waitForDisplayed({ timeout: 15000 });
}

module.exports = { ensureElementVisible };
