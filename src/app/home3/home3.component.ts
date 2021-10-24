import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { GoogleUser } from '../services/googleuser-model';
import { SocialEventItem } from '../services/socialevent-model';

@Component({
  selector: 'app-home3',
  providers: [AppService],
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.css']
})
export class Home3Component implements OnInit {
  public socialEventItemList: SocialEventItem[] = [];
  public isLoggedIn = false;
  public customerState: string = "";
  public showSocialEventLogTable = false;
  public loggedInGoogleUserPublicInfo: GoogleUser;
  public userPublicInfoIsRetrieved = false;
  public customerLoggedInEmail: string;
  public loggedin: string;
  public errorMessage: string;
  public imageLink: String;
  public helloMessage: String;
  constructor(private _service: AppService, private route: ActivatedRoute, private _http: HttpClient) { }

  
  onshowSocialEventLogTableChange(e) {
    this.showSocialEventLogTable = e.target.checked;
  }
  ngOnInit() {

    this.isLoggedIn = this._service.isCustomerLoggedIn();

    if (this.isLoggedIn) {
      this._service.addSocialEventItem("home", "[2] Resource Owner has already logged in.");
      this.customerLoggedInEmail = this._service.getCustomerLoggedInEmail();
      this.customerState = "Resource Owner: " + this.customerLoggedInEmail;
      this.userPublicInfoIsRetrieved = false;

    }
    else {
      
      this.customerState = "Resource Owner has NOT logged in.";
      this.route.queryParams
        .subscribe(params => {

          this.customerLoggedInEmail = params.email;
          this.loggedin = params.status;
        }
        );

      if (this.customerLoggedInEmail && this.loggedin === "loggedin") {
        
        this._service.addSocialEventItem("home", "[1] Resource Owner is logged in.");
        this._service.saveCustomerLoggedInInfo(this.customerLoggedInEmail);
        this.isLoggedIn = this._service.isCustomerLoggedIn();
        this.customerState = "Resource Owner: " + this.customerLoggedInEmail;
        
      }
      else if(!this.customerLoggedInEmail && this.loggedin === "AuthenticationFailure") {
        this._service.addSocialEventItem("home", "[1] Resource Owner has NOT logged in.");
        this.isLoggedIn = this._service.isCustomerLoggedIn();
        this.customerState = "Resource Owner has NOT logged in!" + "Error: " + this.loggedin;
      }
      else {
        this._service.addSocialEventItem("home", "[1] Resource Owner is NOT logged in.");
      }

    }
    this.socialEventItemList = this._service.getSocialEventItemList();
  }

  async sayHello() {
    var googleUserInfo  = await this._service.sayHello();

    this.helloMessage = "Hi, " + googleUserInfo.given_name + " " + googleUserInfo.family_name + ". This message is coming directly from Spring Boot Application.";

  }
//getgoogleuserinfo
async getGoogleUserInfo() {
  var googleUserPublicInfo: GoogleUser;
    /*
      https://developers.google.com/identity/protocols/oauth2/web-server#httprest_2
      Calling Google APIs
    */
    this._service.addSocialEventItem("home", "Customer clicked getPublicInfoFromGoogle.");
    
    
      this._service.addSocialEventItem("home", "Customer info will be retrived from server via Access token!");
      googleUserPublicInfo = await this._service.retrieveGoogleUserInfo();
      this.customerState = "Resource Owner: " + this._service.googleUserPublicInfo.email;
      this.loggedInGoogleUserPublicInfo = this._service.googleUserPublicInfo;
      //this.imageLink = this.loggedInGoogleUserPublicInfo.picture;
      this.helloMessage = "Hi, " + this.loggedInGoogleUserPublicInfo.given_name + " " + this.loggedInGoogleUserPublicInfo.family_name + ". This message is coming from Google API.";
      console.log(this.imageLink);
      console.log(this.loggedInGoogleUserPublicInfo);
    

    this.socialEventItemList = this._service.getSocialEventItemList();
}
}
