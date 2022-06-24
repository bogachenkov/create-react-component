// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { CONSTANTS, StyleItem } from '../const';
import { validateInput } from '../utils/inputValidator';
import { buildTemplate } from './buildTemplate';
import { capitalizeString } from '../utils/capitalize';

export const createComponent = async ({fsPath}: {fsPath: string}) => {

	const componentNameOptions: vscode.InputBoxOptions = {
		placeHolder: "Enter Component Name",
		validateInput,
		ignoreFocusOut: true
	};

	const stylesTypeOptions = CONSTANTS.STYLES.map(s => s.label);

	const stylesTypeOptionsConfig: vscode.QuickPickOptions = {
		canPickMany: false,
		placeHolder: "Select Stylesheet Format",
		ignoreFocusOut: true
	};

	type StorybookFlag = 'Yes' | 'No';
  const storybookOptions = ['Yes', 'No'];

  const storybookOptionConfig: vscode.QuickPickOptions = {
    canPickMany: false,
    placeHolder: CONSTANTS.STORY,
    ignoreFocusOut: true
  }

	try {
		const componentName = await vscode.window.showInputBox(componentNameOptions);
		if (!componentName) { return };
		const capComponentName = capitalizeString(componentName);

		const selectedStylesType = await vscode.window.showQuickPick(stylesTypeOptions, stylesTypeOptionsConfig);
		if (!selectedStylesType) { return };

		const useStoryBookFlag = await vscode.window.showQuickPick(storybookOptions, storybookOptionConfig);
		if (!useStoryBookFlag) { return };

		if(typeof capComponentName === "string") {
			const folder = path.join(fsPath, capComponentName);
			
			const style = CONSTANTS.STYLES.find((item) => item.label === selectedStylesType) ?? CONSTANTS.STYLES[0];
			const selectedFeatures = [style, useStoryBookFlag] as [StyleItem, StorybookFlag];

			try {
				fs.mkdirSync(folder);
				buildTemplate(selectedFeatures, capComponentName, folder);
			}
			catch(error) {
				vscode.window.showErrorMessage(`Error while creating a new component. ${error}`);
			}
		}
	} catch (error) {
		vscode.window.showErrorMessage(`Error while creating a new component. ${error}`);
	}
};