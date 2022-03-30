export const environment = {
  production: true,
  version: "0.0.1",
  storage: {
    token: 'token',
    employeeData: 'employeeData',
    remember: 'remember',
  },
  apis: {
    stampingAPI: {
      uri: "https://apisnet.col.gob.mx/wsStampingSAT",
      prefix: "apiV1"
    },
    pdfApi: {
      uri: "https://apisnet.col.gob.mx/wsreporter",
      prefix: "apiV1"
    }
  }
};
