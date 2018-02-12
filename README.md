# Friday Tech Talk PWA

[![CircleCI](https://circleci.com/gh/andreasonny83/friday-tech-talks-pwa/tree/master.svg?style=svg)](https://circleci.com/gh/andreasonny83/friday-tech-talks-pwa/tree/master)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.
- [Friday Tech Talk PWA](#friday-tech-talk-pwa)
  - [Setup](#setup)
    - [Configure the Environment](#configure-the-environment)
  - [Development server](#development-server)
  - [Build](#build)
  - [Deployment](#deployment)
    - [Deploying from your local machine](#deploying-from-your-local-machine)
    - [Continuous Deployment](#continuous-deployment)
  - [Multiple environments](#multiple-environments)
  - [Firebase setup for multiple projects](#firebase-setup-for-multiple-projects)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Contributing](#contributing)
  - [License](#license)

## Setup

A Firebase account is required for deploying the app and using the real-time
database.

Create a free Firebase account if you don't have one already, then set up a new
project from [console.firebase.google.com](https://console.firebase.google.com/).

Once done run `npm run firebase:login` to login into your Firebase account,
then `npm run firebase:add` in your terminal from inside this
project's root directory and select your new project from the list and name it `production`.

Navigate to your [Firebase console](https://console.firebase.google.com/),
select your project from the list - then enter inside the RealTime Database tab.
Click on the drop-down menu on the top right - then select `Import JSON` and
select the `db-setup.json` file present in this repo's main directory.

### Configure the Environment

Your Firebase details need to be stored in our app - rename the `.env.sample` file
to become `.env` and replace the Firebase variables according to your
new prject's configuration.

```sh
$ npm run firebase:info
```

Run this command in your terminal to retreive all the details you need.

One last step is running

```sh
$ npm run config
```

This will generate a `firebase.ts` file inside your `src/enviroment` folder
containing your local Firebase configuration.

## Development server

Run `nmp start` for a dev server.
Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Build

Run `nmp run build` to build the project.
The build artifacts will be stored in the `dist/` directory.

## Deployment

Before deploying this app - you will need to have a Firebase configuration
file in this project.

```sh
$ npm run config
```

Read the [Configure the Environment](#configure-the-environment) for more information
about this task.

If you want to deploy this app from a CI/CD tool, you can set you automation
tool to run `npm run deploy:cd` task. Read more in the
[Continuous Deployment](#continuous-deployment) section.

### Deploying from your local machine

```sh
$ npm run firebase:deploy
```

This will deploy your code live and set up the database rules according
to the `database.rules.json` file present in this project.

### Continuous Deployment

```sh
$ npm run deploy:cd
```

This task will:

* Generate a Firebase configuration file according to your environment variables configuration
* Generate a distribution version of the app
* Deploy the app using `firebase-tool`

If you want to automate the deployment process you will need to store your
Firebase configuration inside your automation tool's environment variables.

You will also need to generate a firebase:ci token to be store inside a
`FIREBASE_TOKEN` environment variable.

```sh
$ npm run firebase:login:ci
```

To get the token on your local machine.

This project already contains an automatic deployment configuration using CircleCI.
You can see our configuration inside the `.circleci` folder.

## Multiple environments

You may want to use different Firebase projects for running the automated E2E
tests during the deployment pipeline.
This project already supports a Staging environmet implementation out-of-the-box.

## Firebase setup for multiple projects

To link a new Firebasse project to this app, make sure you have already configured
your production project with the instructions listed in the [Setup](#setup) section.

Then create add a new Staging project with the following steps:

1. Run `npm run firebase:add` to add a new Firebase project
1. Select your staging Firebase project from the list
1. Name it `staging`

Now your local `` file should looks like the following

```json
{
  "projects": {
    "production": "your-production-firebase-project",
    "staging": "your-staging-firebase-project"
  }
}
```

Now, you need to generate a new `firebase.ts` file to be used in your staging
project.
To do that, just run `npm run config:staging`.

Now, you can switch between the 2 project with `npm run firebase:use:production`
and `npm run firebase:use:staging`.

## Running unit tests

Run `nmp test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress.io](https://www.cypress.io/).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
1.  Create your feature branch: `git checkout -b my-new-feature`
1.  Add your changes: `git add .`
1.  Commit your changes: `git commit -am 'Add some feature'`
1.  Push to the branch: `git push origin my-new-feature`
1.  Submit a pull request :sunglasses:

## License

[MIT License](https://andreasonny.mit-license.org/2018) © Andrea SonnY
