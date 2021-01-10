import 'zone.js/dist/zone-node';

import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export const app = () => {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/theatre-front/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    // this is for i18n
    const supportedLocales = ['en-US', 'uk-UA']; // supported Locales
    const defaultLocale = 'en-US';
    const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);

    // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
    const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;

    res.render(`${locale}/${indexHtml}`, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
};

const run = () => {
  const defaultPort = 4000;
  const port = process.env.PORT || defaultPort;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.warn(`Node Express server listening on http://localhost:${port}`);
  });
};

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
