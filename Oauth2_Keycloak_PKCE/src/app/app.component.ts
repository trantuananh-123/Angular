import { Component, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './config/auth.config';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Oauth2_Keycloak_PKCE';

  text: string = '';
  helloSubscription!: Subscription;

  constructor(private oauthService: OAuthService, private appService: AppService) {
    this.configure();
    this.helloSubscription = this.appService.hello().subscribe((data: any) => {
      this.text = data;
    });
  }

  ngOnDestroy(): void {
    this.helloSubscription.unsubscribe();
  }

  configure(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}
