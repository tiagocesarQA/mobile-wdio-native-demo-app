const AppScreen = require('./AppScreen');

const SWIPE_SCREEN_SELECTOR = '~Swipe-screen';

class SwipeScreen extends AppScreen {
  constructor() {
    super(SWIPE_SCREEN_SELECTOR);
  }

  get screen() {
    return $(SWIPE_SCREEN_SELECTOR);
  }

  get logo() {
    return $('~WebdriverIO logo');
  }
}

module.exports = new SwipeScreen();
