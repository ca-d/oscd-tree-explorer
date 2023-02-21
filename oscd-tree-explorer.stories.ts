import { html, TemplateResult } from 'lit';

import './oscd-tree-explorer.js';

const nsdTree = await fetch('./tree.json').then(res => res.json());

export default {
  title: 'OpenSCD Tree Explorer',
  component: 'oscd-tree-explorer',
  argTypes: {
    multi: {
      type: 'boolean',
      defaultValue: false,
      required: false,
      control: 'boolean',
    },
    path: {
      type: 'array',
      defaultValue: [],
      required: false,
      control: 'array',
    },
    paths: {
      type: 'array',
      defaultValue: [],
      required: false,
      control: 'object',
    },
    tree: {
      type: 'object',
      defaultValue: {},
      required: false,
      control: 'object',
    },
    selection: {
      type: 'object',
      defaultValue: {},
      required: false,
      control: 'object',
    },
  },
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

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  multi: true,
};
