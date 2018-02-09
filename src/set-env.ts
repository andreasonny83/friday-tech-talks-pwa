import { writeFile } from 'fs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const targetPath = `./src/environments/firebase.ts`;
const envConfigFile = `
export const firebaseConfig = {
  apiKey: '${process.env.API_KEY}',
  authDomain: '${process.env.AUTH_DOMAIN}',
  databaseURL: '${process.env.DB_URL}',
  projectId: '${process.env.PROJECT_ID}',
  storageBucket: '${process.env.STORAGE_BUCKET}',
};
`;

writeFile(targetPath, envConfigFile, err => {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
