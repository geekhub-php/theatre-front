/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
*/
import '@angular/localize/init';

import { enableProdMode } from '@angular/core';
export { renderModule, renderModuleFactory } from '@angular/platform-server';

export { AppServerModule } from './app/app.server.module';
import { environment } from './environments/environment';

import localeUk from '@angular/common/locales/uk';
import localeUkExtra from '@angular/common/locales/extra/uk';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeUk, 'uk-UA', localeUkExtra);

if (environment.production) {
  enableProdMode();
}
