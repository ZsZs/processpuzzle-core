export const environment = {
  production: true,
  documentService: {
    protocol: 'https:',
    host: 'processpuzzlecms.firebaseio.com',
    contextPath: 'documents'
  },

   fileService: {
      protocol: 'http:',
      host: 'file.processpuzzle.com',
      contextPath: ''
   },

  navigationBarService: {
    protocol: 'https:',
    host: 'processpuzzlecms.firebaseio.com',
    contextPath: 'navigationBars'
  }
};
