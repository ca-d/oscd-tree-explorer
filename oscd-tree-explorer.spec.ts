import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import './oscd-tree-explorer.js';
import type { OscdTreeExplorer } from './oscd-tree-explorer.js';

describe('OscdComponent', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<OscdTreeExplorer>(
      html`<oscd-tree-explorer></oscd-tree-explorer>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<OscdTreeExplorer>(
      html`<oscd-tree-explorer></oscd-tree-explorer>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<OscdTreeExplorer>(
      html`<oscd-tree-explorer title="attribute title"></oscd-tree-explorer>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<OscdTreeExplorer>(
      html`<oscd-tree-explorer></oscd-tree-explorer>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
