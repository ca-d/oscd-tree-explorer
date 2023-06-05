import { html, TemplateResult } from 'lit';

import './oscd-tree-grid.js';

const nsdTree = await fetch('./tree.json').then(res => res.json());

export default {
  title: 'OpenSCD Tree Table',
  component: 'oscd-tree-grid',
  argTypes: {
    paths: {
      type: 'array',
      defaultValue: [],
      required: false,
      control: 'array',
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
    filter: {
      type: 'string',
      defaultValue: '',
      required: false,
      control: 'string',
    },
  },
};

interface Story {
  (args: Record<string, unknown>): TemplateResult;
  args?: Partial<Record<string, unknown>>;
  argTypes?: Record<string, unknown>;
}

const Template: Story = ({
  selection = {},
  tree = nsdTree,
  paths = [],
  filter = '',
}) => html`
  <oscd-tree-grid
    .selection=${selection}
    .tree=${tree}
    .paths=${paths}
    .filter=${filter}
  >
  </oscd-tree-grid>
`;

export const Default = Template.bind({});
Default.args = {};
