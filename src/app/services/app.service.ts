import {Injectable, Injector} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Observable, throwError} from 'rxjs'
import { catchError } from 'rxjs/operators';
import { SocialEventItem } from './socialevent-model';
import { DatePipe, formatDate } from '@angular/common';
import { GoogleUser } from './googleuser-model';
import { environment } from 'src/environments/environment';


@Injectable()
export class AppService {
  //public googleUserPublicInfo: any;
  public googleUserPublicInfo: GoogleUser;

   //public clientId = '169035187152-ir059f2fola3l2mokvuc6ufvikc1p1qs.apps.googleusercontent.com'; //'newClient';
   //public redirectUri = 'http://localhost:4200'; //'http://localhost:8089/';
   public socialEventItemList: SocialEventItem[] = [];
  constructor( private injector: Injector,   private _http: HttpClient){
   
    this.googleUserPublicInfo = new GoogleUser("-", "-", "-", "-", "-", "-", false, "-");
  }

  isCustomerLoggedIn() {
    return Cookie.check("loggedin_email");
  }

  saveCustomerLoggedInInfo(email: string) {
    var expireDate = new Date().getTime() + (1000 * 3); // 3 minutes
    Cookie.set('loggedin_email', email);
  }

  getCustomerLoggedInEmail() {
    if(this.isCustomerLoggedIn()) {
      return Cookie.get("loggedin_email");
    }
    else {
      return "";
    }
  }

  addSocialEventItem(
    calledURLIn: String,
    descriptionIn: String) {

        this.socialEventItemList = this.getSocialEventItemList();
        var eventNoCalculated = this.socialEventItemList.length + 1;

        let createdDate  = formatDate(Date.now(),'yyyy-MM-dd HH:mm:ss','en-US');

        let  socialEventItem = {  
          eventNo: eventNoCalculated,  
          createdDate: createdDate,  
          calledURL: calledURLIn,
          description: descriptionIn 
        };

      this.socialEventItemList.push(socialEventItem);
      var expireDate = new Date().getTime() + (1000 * 10);
      Cookie.set("social_event_list", JSON.stringify(this.socialEventItemList), expireDate);
    
      

  }
/*
  getCookieByName(name: string) {
    if(Cookie.check(name)) {
      return Cookie.get(name);
    }
  }
*/
  getSocialEventItemList() {
    if (Cookie.check('social_event_list')) {
      var json_str = Cookie.get('social_event_list');
      this.socialEventItemList = JSON.parse(json_str);  
    }
    else {
      this.socialEventItemList = [];
    }

    return this.socialEventItemList;
  }
  logout() {

    this.googleUserPublicInfo = new GoogleUser("-", "-", "-", "-", "-", "-", false, "-");
    Cookie.delete("loggedin_email");
    Cookie.delete("social_event_list");
    let logoutURL = environment.frontEndHomeURL; //"https://localhost:4200";
    window.location.href = logoutURL;
  }

  async sayHello() {
    
    var helloURL = environment.backEndOauth2ClientHelloEndPointURL; // "https://localhost:8080/googleSocialWebClient/hello";
    

    const data = await this._http.get<GoogleUser>(helloURL).toPromise();

    var googleUser  = new GoogleUser(data.sub, data.name, data.given_name,
      data.family_name, data.picture, data.email,
      data.email_verified, data.locale);

      this.addSocialEventItem(helloURL, "Resource Owner clicked 'Say Hello' button.");

    return googleUser;
    
  }

  async retrieveGoogleUserInfo(){

/*
    var helloURL = "https://localhost:8080/rizaSocialWebClient/hello";
    this._http.get(helloURL)
      .subscribe((res: any) => {
        //this.menuItemFromApi = res;     
        console.log(res);
      }, errorRes => {
        if (errorRes.status == 401) {
          this.errorMessage = 'Unauthenticated!';
        }
      });

*/
/*
    let params = new URLSearchParams();   
    
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
  */  
    var googleUserInfoEndPointURL = environment.backendOaut2ClientGetgoogleuserinfoEndPointURL;

    //const data = await this._http.get<GoogleUser>('https://localhost:8080/googleSocialWebClient/getgoogleuserinfo').toPromise();
    const data = await this._http.get<GoogleUser>(googleUserInfoEndPointURL).toPromise();

    this.googleUserPublicInfo = new GoogleUser(data.sub, data.name, data.given_name,
      data.family_name, data.picture, data.email,
      data.email_verified, data.locale);

      this.addSocialEventItem(googleUserInfoEndPointURL, "Customer info is retrived from server using Access token!");

   
    return this.googleUserPublicInfo;
  }
}