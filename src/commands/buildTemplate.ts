import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import * as vscode from 'vscode';

import { INDEX_TEMPLATE } from "../templates";
import { STORIES_TEMPLATE } from "../templates/stories";
import { createComponentTemplate } from "../templates/component";

import { StyleItem } from '../const';
import { BoolFlag } from './createComponent';
import { TESTS_TEMPLATE } from '../templates/testing';

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

const buildIndexFile = (folder: string, name: string) => {
  writeFile(folder, 'index', 'ts', INDEX_TEMPLATE, name);
};

const buildStoryTemplate = (folder: string, name: string) => {
  writeFile(folder, name, 'stories.tsx', STORIES_TEMPLATE, name);
};

const buildTestTemplate = (folder: string, name: string) => {
  writeFile(folder, name, 'test.tsx', TESTS_TEMPLATE, name);
};

const buildComponentFile = (folder: string, name: string, styleOption: StyleItem) => {
  let stylesImportLine = `import './${styleOption.defaultName}.${styleOption.ext}';\n`;
  if (styleOption.value === 'CSS_MODULES' || styleOption.value === 'STYLUS') {
    stylesImportLine = `import styles from './${name}.${styleOption.ext}';\n`;
  }
  if (styleOption.value === 'STYLED_COMPONENTS') {
    stylesImportLine = `import {} from './${styleOption.defaultName}';\n`
  }
  if (styleOption.value === 'NO_STYLES') {
    stylesImportLine = '';
  }

  const template = createComponentTemplate(stylesImportLine);
  writeFile(folder, name, 'tsx', template, name);
};

export const buildTemplate:(features: [StyleItem, BoolFlag, BoolFlag], name: string, folder: string) => void = (
  [styleType, storyBook, tests],
  name,
  folder
) => {
  try {
    buildIndexFile(folder, name);
    if (styleType && styleType.value !== 'NO_STYLES') {
      buildStylingTemplate(styleType, folder, name);
    }
    buildComponentFile(folder, name, styleType!);
    if (storyBook === 'Yes') {
      buildStoryTemplate(folder, name);
    }
    if (tests === 'Yes') {
      buildTestTemplate(folder, name);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error while building templates. ${error}`);
  }
};