# Create React Component

<p align="center">
  <img src="https://badgen.net/vs-marketplace/v/bogachenkov.create-react-comp" />
  <img src="https://badgen.net/vs-marketplace/i/bogachenkov.create-react-comp" />
  <img src="https://badgen.net/vs-marketplace/d/bogachenkov.create-react-comp" />
</p>

⏱️ The easy way to create Component folder with the files you need

![Demo](https://s8.gifyu.com/images/demo-1e29592bb5802fcf4.gif)

## Structure
  - `ParentFolder`
    - `NewComponent`
      - `index.ts`
      - `NewComponent.tsx`
      - [Optional files]
      - `NewComponent.[module.css|css|scss|less|styl|styled.ts]`
      - `NewComponent.stories.tsx` (for storybook@7.x you need to install the pre-release version of this extension)
      - `NewComponent.test.tsx`

## Features
  - Quickly generate React Component folder with Typescript
  - You can choose between different styling methods - CSS, CSS Modules, LESS, SASS, Stylus and styled-components
  - Also, you can optionally create `.stories` and ``.test`` files

## How it works

  - In the explorer tab of VS Code, right-click on the directory in which you want to create the component
  - Select "Create React Component" option
  - Enter a component name
  - Select the options you want to use
