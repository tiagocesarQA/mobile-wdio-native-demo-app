const path = require('node:path');
const shared = require('./wdio.shared.conf.js').config;

const APP =
  process.env.ANDROID_APP_PATH ||
  path.join(process.cwd(), 'apps', 'android.wdio.native.app.v2.2.0.apk');

exports.config = {
  ...shared,
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          relaxedSecurity: true,
        },
        logPath: './artifacts/logs/appium-service.log',
      },
    ],
  ],
  capabilities: [
    {
      platformName: 'Android',
      'wdio:maxInstances': 1,
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
      'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '15.0',
      'appium:orientation': 'PORTRAIT',
      'appium:automationName': 'UiAutomator2',
      'appium:app': APP,
      'appium:appWaitActivity': 'com.wdiodemoapp.*',
      'appium:newCommandTimeout': 240,
    },
  ],
};
