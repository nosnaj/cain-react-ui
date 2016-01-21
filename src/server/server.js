/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
import qs from 'qs';
import fs from 'fs';

import handleRender from './render';

const app = new Express();
const port = 9000;

app.use(Express.static(__dirname + '/../static'));

try {
 fs.statSync(__dirname + '/../static/bundle.js');
} catch (ex) {
  (require('./webpack').default)(app);
}

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
})
