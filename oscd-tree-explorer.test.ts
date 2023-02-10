import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { visualDiff } from '@web/test-runner-visual-regression';

import './oscd-tree-explorer.js';
import type { OscdTreeExplorer } from './oscd-tree-explorer.js';

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(2000 * factor);

describe('oscd-tree-explorer', () => {});
