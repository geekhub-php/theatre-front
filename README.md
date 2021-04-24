# TheatreFront

![TheatreCodeStatus](https://github.com/geekhub-php/theatre-front/actions/workflows/test-and-deploy.yml/badge.svg)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests
 
Unit tests run via [Karma](https://karma-runner.github.io).

### Run on Linux

First you should find your chrome browser binary

```bash
which chromium-browser
```

Then export `CHROME_BIN` env variable or just use before `ng test` command:
```bash
CHROME_BIN=/usr/bin/chromium-browser ng test --watch=false
```

### Run on Windows

```bash
ng test --watch=false
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Fix issue with e2e tests and travis

While stable chrome version will update on travis-ci
this can cause to fail e2e tests on CI, with error:

```bash
 This version of ChromeDriver only supports Chrome version 77
```

To fix them, you should update webdriver and 
protractor configuration according to new version
of Chrome (see current version in Travis logs).  
Update in `travis.yml`:

```bash
webdriver-manager update --versions.chrome={{version_of_chrome}}
```

Update `protractor.conf.js`:

```bash
chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_{{version_of_chrome}}'
```
