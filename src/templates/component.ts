export const createComponentTemplate = (stylesImportLine:string = '') => {
  return (
    `import React from 'react';
${stylesImportLine}
interface I{{componentName}}Props {
  children?: React.ReactNode;
}

const {{componentName}}:React.FC<I{{componentName}}Props> = (props) => {
  return (
    <>
  
    </>
  );
}

export default {{componentName}};
`
  );
};