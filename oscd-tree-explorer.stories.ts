import { html, TemplateResult } from 'lit';

import './oscd-tree-explorer.js';

export default {
  title: 'OscdComponent',
  component: 'oscd-tree-explorer',
  argTypes: {
    title: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  title = 'Hello world',
  counter = 5,
  textColor,
  slot,
}: ArgTypes) => html`
  <oscd-tree-explorer
    style="--oscd-tree-explorer-text-color: ${textColor || 'black'}"
    .title=${title}
    .counter=${counter}
  >
    ${slot}
  </oscd-tree-explorer>
`;

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'My title',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};
