// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  documentService: {
    protocol: 'https:',
    host: 'processpuzzlecms-dev.firebaseio.com',
    contextPath: ''
  },

  firebaseConfig: {
    apiKey: 'AIzaSyDkLfPmjbgBOVHsi3g75n2Is6PzX0J3ulk',
    authDomain: 'processpuzzlecms-dev.firebaseapp.com',
    databaseURL: 'https://processpuzzlecms-dev.firebaseio.com',
    storageBucket: 'processpuzzlecms-dev.appspot.com',
    messagingSenderId: '676590811043'
  },

  navigationBarService: {
    protocol: 'https:',
    host: 'processpuzzlecms-dev.firebaseio.com',
    contextPath: ''
  }
};
