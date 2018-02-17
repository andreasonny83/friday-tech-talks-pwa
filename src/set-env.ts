// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { writeFile } from 'fs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();
const targetPath = `./src/environments/firebase.ts`;
const args = process.argv.slice(2);

let stg = '';

if (args.length && args[0] === 'staging') {
  stg = 'STG_';
}

const envConfigFile = `
export const firebaseConfig = {
  apiKey: '${process.env[stg + 'API_KEY']}',
  authDomain: '${process.env[stg + 'AUTH_DOMAIN']}',
  databaseURL: '${process.env[stg + 'DB_URL']}',
  projectId: '${process.env[stg + 'PROJECT_ID']}',
  storageBucket: '${process.env[stg + 'STORAGE_BUCKET']}',
};
`;

writeFile(targetPath, envConfigFile, err => {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
