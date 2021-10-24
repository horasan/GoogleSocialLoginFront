import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-header',
  providers: [AppService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  constructor(private _service:AppService) { }

  ngOnInit() {
    
  }
  ngOnDestroy(): void {
    
  }
  logout() {
    this._service.logout();
}

loginWithGoogleX() {

  console.log("redirected to google for customer username/password entry for getting authorization code");
  console.log("Step 4: Handle the OAuth 2.0 server response");
  let redirectURL = 'https://localhost:8080/googleSocialWebClient/hello';
  this._service.addSocialEventItem(redirectURL, "Resource Owner clicked login with google.");
  window.location.href = redirectURL;
}

loginWithGoogle() {
  let redirectURL = 'https://localhost:8080/googleSocialWebClient/oauth2/authorization/google';
  this._service.addSocialEventItem(redirectURL, "Resource Owner clicked login with google.");
  window.location.href = redirectURL;
}



}
