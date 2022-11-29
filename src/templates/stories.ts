export const STORIES_TEMPLATE = `import {{componentName}} from './{{componentName}}';
import { Meta, StoryObj } from '@storybook/react';

const meta:Meta<typeof {{componentName}}> = {
  title: '{{componentName}}',
  component: {{componentName}},
};

export default meta;

type Story = StoryObj<typeof {{componentName}}>;

export const Default:Story = {
  render: args => <{{componentName}} {...args} />,
  args: {}
};
`