import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import './oscd-tree-grid.js';
import type { OscdTreeTable } from './oscd-tree-grid.js';

const tree = {
  a: {
    children: {
      aa: {},
      ab: {
        children: {
          abb: {
            children: {
              abba: { text: 'ABBA!', mandatory: true },
              abbb: {},
              abbc: {},
            },
            mandatory: true,
          },
          abc: {},
        },
        mandatory: true,
      },
      ac: {},
    },
  },
  b: { children: { bb: { children: { bba: {}, bbc: {} } }, bc: {} } },
  c: { children: { ca: {}, cb: { children: { cba: {}, cbb: {}, cbc: {} } } } },
};

describe('oscd-tree-grid', () => {
  it('can override the selected paths via attribute', async () => {
    const el = await fixture<OscdTreeTable>(
      html`<oscd-tree-grid
        .tree=${tree}
        paths='[["a", "ab", "abc"],["b", "bb", "bbc"]]'
      ></oscd-tree-grid>`
    );

    expect(el.paths).to.deep.equal([
      ['a', 'ab', 'abc'],
      ['a', 'ab', 'abb', 'abba'],
      ['b', 'bb', 'bbc'],
    ]);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<OscdTreeTable>(
      html`<oscd-tree-grid></oscd-tree-grid>`
    );

    await expect(el).shadowDom.to.be.accessible({
      ignoredRules: ['list'],
    });
  });
});
