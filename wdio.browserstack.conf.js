const shared = require('./wdio.shared.conf.js').config;

const user = process.env.BROWSERSTACK_USERNAME;
const key = process.env.BROWSERSTACK_ACCESS_KEY;
const app = process.env.BROWSERSTACK_APP_URL;

exports.config = {
  ...shared,
  user,
  key,
  hostname: 'hub.browserstack.com',
  port: 443,
  path: '/',
  services: [],
  maxInstances: 1,
  onPrepare: async function () {
    if (!user || !key || !app) {
      throw new Error(
        'Defina BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY e BROWSERSTACK_APP_URL (URL bs://... do upload).',
      );
    }
  },
  capabilities: [
    {
      platformName: 'android',
      'bstack:options': {
        projectName: 'native-demo-app',
        buildName: process.env.BROWSERSTACK_BUILD_NAME || process.env.CI_COMMIT_REF_NAME || 'local',
        sessionName: process.env.BROWSERSTACK_SESSION_NAME || 'wdio-android',
        app,
        deviceName: process.env.BS_ANDROID_DEVICE || 'Google Pixel 8',
        platformVersion: process.env.BS_ANDROID_VERSION || '14.0',
        debug: true,
        networkLogs: true,
      },
    },
  ],
};
