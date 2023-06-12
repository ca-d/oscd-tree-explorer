import { html, TemplateResult } from 'lit';

import './oscd-tree-grid.js';

const defaultTree = await fetch('./tree.json').then(res => res.json());

export default {
  title: 'OpenSCD Tree Table',
  component: 'oscd-tree-grid',
  argTypes: {
    tree: {
      type: 'object',
      defaultValue: defaultTree,
      required: false,
      control: 'object',
    },
    paths: {
      type: 'array',
      defaultValue: [['CILO', 'Blk']],
      required: false,
      control: 'array',
    },
    filter: {
      type: 'string',
      defaultValue: 'CSWI',
      required: false,
      control: 'text',
    },
  },
};

interface Story {
  (args: Record<string, unknown>): TemplateResult;
  args?: Partial<Record<string, unknown>>;
  argTypes?: Record<string, unknown>;
}

const Template: Story = ({
  tree = defaultTree,
  paths = [['CILO', 'Blk']],
  filter = 'CSWI',
}) => html`
  <oscd-tree-grid
    .tree=${tree}
    paths="${JSON.stringify(paths)}"
    filter="${filter}"
  >
  </oscd-tree-grid>
`;

export const Default = Template.bind({});
Default.args = {};
