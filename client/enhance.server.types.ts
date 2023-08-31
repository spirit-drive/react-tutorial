/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const p = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const pathMain = p.join(__dirname, 'src', 'server.types.ts');

const update = (path: string) => {
  let fileContent = fs.readFileSync(path, 'utf8');

  fileContent = fileContent.replace(`import { gql } from '@apollo/client';\n`, '');

  fs.writeFileSync(path, fileContent);
};

update(pathMain);
