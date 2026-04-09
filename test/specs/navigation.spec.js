const { expect } = require('chai');
const TabBar = require('../pageobjects/components/TabBar');
const HomeScreen = require('../pageobjects/HomeScreen');
const LoginScreen = require('../pageobjects/LoginScreen');
const FormsScreen = require('../pageobjects/FormsScreen');
const SwipeScreen = require('../pageobjects/SwipeScreen');

describe('Navegação entre telas', () => {
  beforeEach(async () => {
    await TabBar.waitForTabBarShown();
  });

  it('deve percorrer Home, Login, Forms, Swipe e voltar à Home', async () => {
    await TabBar.openHome();
    await HomeScreen.waitForIsShown(true);

    await TabBar.openLogin();
    await LoginScreen.waitForIsShown(true);

    await TabBar.openForms();
    await FormsScreen.waitForIsShown(true);

    await TabBar.openSwipe();
    await SwipeScreen.waitForIsShown(true);
    for (let i = 0; i < 10; i++) {
      if ((await SwipeScreen.logo.isExisting()) && (await SwipeScreen.logo.isDisplayed())) break;
      try {
        await driver.execute('mobile: swipe', { direction: 'left' });
      } catch {
        try {
          await driver.execute('mobile:swipe', { direction: 'left' });
        } catch {
          await browser.pause(200);
        }
      }
    }
    expect(await SwipeScreen.logo.isExisting()).to.equal(
      true,
      'elemento WebdriverIO logo deve existir no ecrã Swipe',
    );

    await TabBar.openHome();
    await HomeScreen.waitForIsShown(true);
  });
});
