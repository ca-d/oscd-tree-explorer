import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import './oscd-tree-explorer.js';
import type { OscdTreeExplorer } from './oscd-tree-explorer.js';

describe('oscd-tree-explorer', () => {
  it('can override the path via attribute', async () => {
    const el = await fixture<OscdTreeExplorer>(
      html`<oscd-tree-explorer path='["1", "2", "3"]'></oscd-tree-explorer>`
    );

    expect(el.path).to.deep.equal(['1', '2', '3']);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<OscdTreeExplorer>(
      html`<oscd-tree-explorer></oscd-tree-explorer>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
