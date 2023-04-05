import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  loggedIn = false;
  user :  SocialUser = new SocialUser;
  errorMessage = "";

  constructor (
    private authService: AuthService,
    private storageService: StorageService,
    private socialAuthService: SocialAuthService
    ){}

    ngOnInit() {
      this.socialAuthService.authState.subscribe((user) => {
        this.user = user;
        console.log(this.user)
        this.loggedIn = (user != null);
      });
    }

  onSubmit(form : NgForm){
    const {firstName, lastName, email, password, agreement, verifyBy} = form.value
    const phoneNumber = form.value.countryCode + form.value.phoneNumber;

    this.authService.signup(firstName, lastName, email, phoneNumber, password, agreement, verifyBy).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data.token);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
  
}
