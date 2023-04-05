import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { httpInterceptorProviders } from './interceptors/http.interceptor';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

import { GoogleSigninButtonDirective } from './directives/google-btn-directive';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    GoogleSigninButtonDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '80395039495-l0m9u634isp64b51r706gb5f70aiv1o4.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1355775495155337')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
