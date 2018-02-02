# Friday Tech Talk PWA

> Live app running at: https://friday-tech-talk-pwa.firebaseapp.com/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Firebase

A Firebase account is required for deploying the app and using the real-time
database.

### Setup

Create a free Firebase account if you don't have one already, then set up a new
project from [console.firebase.google.com](https://console.firebase.google.com/).

Once done run `npm run firebase:add` in your terminal from inside this
project's root directory, then select your new project from the list and name
it `default`.

Then inside your database, you will need to create a `AppInfo` node
and create a `name` to dynamically assign a name to your Web application.
This name will appear inside the header and footer of your application.

### Configure the Environment

These configuration details need to be stored in our app, one way to do this using the environment. This allows you to use different credentials in development and production.

Rename `src/environments/firebase.example.ts` to `src/environments/firebase.ts`
and add a your firebase project's information to the exported constant:

```js
export const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  databaseURL: 'your-database-url',
  storageBucket: 'your-storage-bucket',
};
```

### Deployment

Now, if you want to deploy your code live and set up the database rules, just
run `npm run firebase:deploy`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress.io](https://www.cypress.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
