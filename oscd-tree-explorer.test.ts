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

describe('oscd-tree-explorer', () => {
  let element: OscdTreeExplorer;

  beforeEach(async () => {
    element = await fixture(
      html`<oscd-tree-explorer
        title="Test Title"
        counter="41"
      ></oscd-tree-explorer>`
    );
    document.body.prepend(element);
  });

  afterEach(() => element.remove());

  it('displays the title and counter', async () => {
    await visualDiff(element, 'oscd-tree-explorer');
  });

  it('increments the counter on button click', async () => {
    element.shadowRoot?.querySelector('button')?.click();
    await timeout(100);
    await visualDiff(element, 'oscd-tree-explorer-incremented');
  });
});
