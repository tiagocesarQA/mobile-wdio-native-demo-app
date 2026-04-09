# Automação mobile — native-demo-app (WebdriverIO + Appium)

Projeto de testes end-to-end para o aplicativo **[webdriverio/native-demo-app](https://github.com/webdriverio/native-demo-app)** (v2.2.0), alinhado ao desafio de automação mobile: JavaScript, WebdriverIO, Appium, Mocha, Chai, Allure e GitLab CI.

## Pré-requisitos locais

- Node.js 20+
- Appium 2.x instalado globalmente (`npm i -g appium`) e drivers:
  - `appium driver install uiautomator2`
  - `appium driver install xcuitest`
- Android Studio (emulador Android) e/ou Xcode (simulador iOS)
- Variáveis de ambiente Android (`ANDROID_HOME`) quando for executar Android

## Instalação

```bash
npm ci
```

## Binários do aplicativo

Coloque os artefatos da [release v2.2.0](https://github.com/webdriverio/native-demo-app/releases/tag/v2.2.0) na pasta `apps/`:

- **Android:** `android.wdio.native.app.v2.2.0.apk`
- **iOS (simulador):** `ios.simulator.wdio.native.app.v2.2.0.zip` **ou** a pasta `.app` extraída (por exemplo `apps/wdiodemoapp.app`, como no bundle da release).

O `wdio.ios.conf.js` usa por defeito **`wdiodemoapp.app`** se existir em `apps/`; caso contrário, tenta o **`.zip`**. Podes forçar um caminho com `IOS_APP_PATH`.

Variáveis opcionais para caminhos customizados:

- `ANDROID_APP_PATH` — caminho absoluto para o `.apk`
- `IOS_APP_PATH` — caminho absoluto para o `.app` ou `.zip` do simulador

Ajuste também o nome/versão do dispositivo virtual:

- Android: `ANDROID_DEVICE_NAME`, `ANDROID_PLATFORM_VERSION`
- iOS: `IOS_DEVICE_NAME`, `IOS_PLATFORM_VERSION` (por defeito no projeto: **iPhone 17** + **26.4**, alinhado ao simulador local comum em Xcode recente)

## Execução

```bash
# Android (padrão npm test)
npm run test:android

# iOS (executa login → forms → navegação em sequência para um só simulador)
npm run test:ios
```

### BrowserStack (opcional)

1. Envie o `.apk` para o BrowserStack e copie a URL `bs://...`.
2. Exporte:

```bash
export BROWSERSTACK_USERNAME="..."
export BROWSERSTACK_ACCESS_KEY="..."
export BROWSERSTACK_APP_URL="bs://..."
npm run test:bs
```

Opcional: `BS_ANDROID_DEVICE`, `BS_ANDROID_VERSION`, `BROWSERSTACK_BUILD_NAME`, `BROWSERSTACK_SESSION_NAME`.

## Estrutura dos testes

- **Page Object:** `test/pageobjects/` e `test/pageobjects/components/`
- **10 cenários** em `test/specs/` (login/cadastro, erros de validação, navegação, formulário, dropdown data-driven com JSON)
- **Dados:** `test/data/login-credentials.json`, `test/data/dropdown-options.json`

## Evidências (Allure)

Durante falhas, são gravados screenshots em `artifacts/screenshots/` e anexos no Allure.

```bash
npm run allure:generate
npm run allure:open
```

## CI/CD (GitLab)

O ficheiro `.gitlab-ci.yml` inclui:

- Job **install** em pipelines de merge request / branch principal
- Job **e2e_browserstack_android** quando `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY` e `BROWSERSTACK_APP_URL` estão definidos
- Job manual **e2e_android_local_emulator** (exemplo com download do APK; requer runner com emulador/Appium)

## Licença

ISC (conforme `package.json`).
