import { html, TemplateResult } from 'lit';

import './oscd-tree-explorer.js';

const nsdTree = await fetch('/tree.json').then(res => res.json());

export default {
  title: 'OpenSCD Tree Explorer',
  component: 'oscd-tree-explorer',
};

interface Story {
  (args: Record<string, unknown>): TemplateResult;
  args?: Partial<Record<string, unknown>>;
  argTypes?: Record<string, unknown>;
}

const Template: Story = ({
  multi = false,
  selection = {},
  tree = nsdTree,
  paths = [],
  path = [],
  filter = '',
}) => html`
  <oscd-tree-explorer
    ?multi=${multi}
    .selection=${selection}
    .tree=${tree}
    .paths=${paths}
    .path=${path}
    .filter=${filter}
  >
  </oscd-tree-explorer>
`;

export const SingleSelect = Template.bind({});

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  multi: true,
};
