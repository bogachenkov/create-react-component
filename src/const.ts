import { STYLING_TEMPLATES } from "./templates/styles";

type StylingMethods = 'CSS' | 'CSS_MODULES' | 'SASS' | 'LESS' | 'STYLUS' | 'STYLED_COMPONENTS';

export type StyleItem = {
  value: StylingMethods;
  label: string;
  ext: string;
  defaultName?: string;
  template: string;
}

type Constants = {
  STYLES: StyleItem[],
  STORY: string;
}

export const CONSTANTS:Constants = {
  STYLES: [
    {
      value: 'CSS',
      label: 'CSS',
      ext: 'css',
      defaultName: 'styles',
      template: STYLING_TEMPLATES.CSS,
    },
    {
      value: 'CSS_MODULES',
      label: 'CSS Modules',
      ext: 'module.css',
      template: STYLING_TEMPLATES.CSS_MODULES,
    },
    {
      value: 'SASS',
      label: 'SASS (.scss)',
      ext: 'scss',
      defaultName: 'styles',
      template: STYLING_TEMPLATES.SCSS ,
    },
    {
      value: 'LESS',
      label: 'LESS',
      ext: 'less',
      defaultName: 'styles',
      template: STYLING_TEMPLATES.LESS,
    },
    {
      value: 'STYLUS',
      label: 'Stylus',
      ext: 'styl',
      defaultName: 'styles',
      template: STYLING_TEMPLATES.STYLUS,
    },
    {
      value: 'STYLED_COMPONENTS',
      label: 'styled-components',
      ext: 'ts',
      defaultName: 'styled',
      template: STYLING_TEMPLATES.STYLED_COMPONENTS
    }
  ],
  STORY: 'Create Storybook file?'
}