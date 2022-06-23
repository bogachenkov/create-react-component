import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as vscode from 'vscode';

import { INDEX_TEMPLATE } from "../templates";
import { STORIES_TEMPLATE } from "../templates/stories";
import { createComponentTemplate } from "../templates/component";

import { StyleItem } from '../const';

const writeFile = (
  folder: string, 
  fileName: string, 
  fileExt: string,
  template: string,
  componentName: string
) => {
  fs.writeFileSync(
    path.join(
      folder,
      `${fileName}.${fileExt}`
    ),
    mustache.render(template, {componentName})
  );
};

const buildStylingTemplate = (style: StyleItem, folder: string, name: string) => {
  writeFile(
    folder, 
    style.defaultName ?? name, 
    style.ext, 
    style.template, 
    name
  );
};

const buildStoryTemplate = (folder: string, name: string) => {
  writeFile(folder, name, 'stories.tsx', STORIES_TEMPLATE, name);
};

const buildIndexFile = (folder: string, name: string) => {
  writeFile(folder, 'index', 'ts', INDEX_TEMPLATE, name);
};

const buildComponentFile = (folder: string, name: string, styleOption: StyleItem) => {
  let stylesImportLine = `import './${styleOption.defaultName}.${styleOption.ext}';\n`;
  if (styleOption.value === 'CSS_MODULES') {
    stylesImportLine = `import styles from './${name}.${styleOption.ext}';\n`;
  }
  if (styleOption.value === 'STYLED_COMPONENTS') {
    stylesImportLine = '';
  }

  const template = createComponentTemplate(stylesImportLine);
  writeFile(folder, name, 'tsx', template, name);
};

export const buildTemplate:(features: [StyleItem, string], name: string, folder: string) => void = (
  [styleType, storyBook],
  name,
  folder
) => {
  try {
    buildIndexFile(folder, name);
    if (styleType) {
      buildStylingTemplate(styleType, folder, name);
    }
    buildComponentFile(folder, name, styleType!);
    if (storyBook === 'Yes') {
      buildStoryTemplate(folder, name);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error while building templates. ${error}`);
  }
};