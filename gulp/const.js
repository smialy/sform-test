'use strict';

import util from 'gulp-util';

export const LOG = util.log;
export const COLORS = util.colors;

import pkg from '../package.json';

export const PORT = util.env.port || 8000;

export const OPEN = util.env.open === 'true' ? true : false;

var environment = ((util.env.env === true ? 'dev' : util.env.env) || process.env.ENV || 'dev').toLowerCase();
if (['dev', 'dist', 'test'].indexOf(environment) === -1) {
  throw new Error('--env flag only accepts dev/dist/test')
}
if (!process.env.ENV) {
  LOG(COLORS.yellow('[INFO] Setting process.env.ENV=' + environment));
  process.env.ENV = environment;
}
LOG(COLORS.yellow('### Running in ' + environment + ' ###'));

export const ENV = environment;
