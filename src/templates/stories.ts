export const STORIES_TEMPLATE = `import {{componentName}} from "./{{componentName}}";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: '{{componentName}}',
  component: {{componentName}},
} as ComponentMeta<typeof {{componentName}}>;

const Template:ComponentStory<typeof {{componentName}}> = (args) => <{{componentName}} {...args} />
`;