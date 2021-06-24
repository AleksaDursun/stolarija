import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import * as redis from 'redis';
const compression = require('compression');
const crypto = require('crypto');
const keyHash = getHash();
const useragent = require('express-useragent');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const SitemapGenerator = require('sitemap-generator');
const schedule = require('node-schedule');

import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Application {
  const server = express();
  server.use(compression());
  server.use(useragent.express());
  server.use(cookieParser());
  const distFolder = join(process.cwd(), 'dist');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
      ? 'index.original.html'
      : 'index';

  // Redis cache client
  const redisClient = redis.createClient({
    retry_strategy: (options) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 5) {
        return undefined;
      }
      return Math.min(options.attempt * 100, 3000);
    },
  });
  redisClient.on('error', (error) => {
    console.error(error.message);
  });
  redisClient.on('connect', () => {
    console.log('Successfully connected to redis');
  });

  // Creates a cache key using the request URL
  const cacheKey: (req) => string = (req) => {
    if (req.useragent.isMobile) {
      return `mobile_${keyHash}_${req.originalUrl}`;
    }
    return `desktop_${keyHash}_${req.originalUrl}`;
  };

  // Universal express-engine
  server.engine(
      'html',
      ngExpressEngine({
        bootstrap: AppServerModule,
      })
  );
  server.set('view engine', 'html');
  server.set('views', distFolder);

  const noCachePages = ['checkout', 'wishlist', 'cart', 'my-account', '?cache=false'];

  // Middleware to send a cached response if one exists
  const cachedResponse = (req, res, next) => {
    const noCache = !!noCachePages.find(page => req.originalUrl.includes(page));
    if (noCache) {
      return next();
    } else  if (redisClient) {
      return redisClient.get(cacheKey(req), (error: Error, reply: string) => {
        if (reply?.length) {
          // Cache exists. Send the response.
          res.set('Cache-Control', 'max-age=300');
          res.cookie('storageToken', keyHash, { maxAge: 900000, httpOnly: false });
          res.send(reply);
        } else {
          // Use the Universal engine to render a response.
          next();
        }
      });
    } else  {
      return next();
    }
  };



  // Middleware to render a response using the Universal engine
  const universalRenderer = (req, res) => {
    res.render(
        indexHtml,
        {
          req,
          res,
          providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        },
        (error: Error, html: string) => {
          if (error) {
            return req.next(error);
          }
          if (res.statusCode === 200) {
            // Cache the rendered HTML
            redisClient.set(cacheKey(req), html);
          }
          res.set('Cache-Control', 'max-age=300');
          res.cookie('storageToken', keyHash, { maxAge: 900000, httpOnly: false });
          res.send(html);
        }
    );
  };

  // Serve static files from dist
  server.get(
      '*.*',
      express.static(distFolder, {
        maxAge: '1y',
      })
  );

  // All regular routes use the Universal engine
  server.get('*', cachedResponse, universalRenderer);

  return server;
}

function run() {
  const port = process.env.PORT || 4004;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

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

const domino = require('domino');
const path = require('path');
const template = fs
    .readFileSync(path.join('dist', 'index.html'))
    .toString();
const window = domino.createWindow(template);


// Ignite UI browser objects abstractions
(global as any).window = window;
(global as any).document = window.document;
(global as any).Event = window.Event;
(global as any).KeyboardEvent = window.KeyboardEvent;
(global as any).MouseEvent = window.MouseEvent;
(global as any).FocusEvent = window.FocusEvent;
(global as any).PointerEvent = window.PointerEvent;
(global as any).HTMLElement = window.HTMLElement;
(global as any).simplemaps_usmap_mapdata = {};
(global as any).HTMLElement.prototype.getBoundingClientRect = () => {
  return {
    left: '',
    right: '',
    top: '',
    bottom: ''
  };
};

// Other optional depending on your application configuration
(global as any).object = window.object;
(global as any).navigator = window.navigator;
(global as any).localStorage = window.localStorage;
(global as any).DOMTokenList = window.DOMTokenList;

function getHash() {
  return crypto.createHash('md5').update(new Date().toString()).digest('hex');
}


schedule.scheduleJob('0 0 * * *', () => {
  // create generator
  const generator = SitemapGenerator('https://umjetnostudrvetu.ba', {
    filepath: './src/sitemap.xml',
    maxEntriesPerFile: 50000,
    stripQuerystring: true
  });

  generator.on('error', (error) => {
    console.log(error);
    // => { code: 404, message: 'Not found.', url: 'http://example.com/foo' }
  });

  generator.on('add', (url) => {
    console.log('Url: ' + url);
  });

// register event listeners
  generator.on('done', () => {
    // sitemaps created
    console.log('Sitemap done!');
  });

// start the crawler
  generator.start();
});
