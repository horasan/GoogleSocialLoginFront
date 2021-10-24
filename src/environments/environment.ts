// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const homeURL = "https://localhost:4200";
const oauth2ClientBaseURL = "https://localhost:8080";
const oauth2ClientBaseContextPath = "/googleSocialWebClient";
const oauth2ClientHelloEndPoint = "/hello";
const oaut2ClientGetgoogleuserinfoEndPoint = "/getgoogleuserinfo";

export const environment = {
  production: false,
  frontEndHomeURL: homeURL,
  backendOauth2ClientBaseURL: oauth2ClientBaseURL,
  backendOauth2ClientBaseContextPath: oauth2ClientBaseContextPath,
  backendOauth2ClientHelloEndPoint: oauth2ClientHelloEndPoint,
  backendOaut2ClientGetgoogleuserinfoEndPoint: oaut2ClientGetgoogleuserinfoEndPoint,

  backEndOauth2ClientHelloEndPointURL: oauth2ClientBaseURL + oauth2ClientBaseContextPath + oauth2ClientHelloEndPoint,
  backendOaut2ClientGetgoogleuserinfoEndPointURL: oauth2ClientBaseURL + oauth2ClientBaseContextPath + oaut2ClientGetgoogleuserinfoEndPoint

  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
