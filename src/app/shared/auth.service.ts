import { Injectable, OnInit, Inject } from '@angular/core';
import { Auth, signOut, updateEmail, updatePassword } from '@angular/fire/auth';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isUserLoggedIn: boolean = sessionStorage.getItem('isUserLoggedIn') === 'true';
  isGuestLogin: boolean = sessionStorage.getItem('isGuestLogin') === 'true';
  loginError: boolean = false;
  passwordChangeError: boolean = false;
  user: User | null = null;


  constructor(@Inject(Auth) private auth: Auth, private router: Router) { }


  ngOnInit() {
  }


  registerUser(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if(!this.auth){
        console.error('Firebase has not been initialized yet.');
        reject('Firebase has not been initialized yet.');
        return;
      }
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          resolve();
        })
        .catch((error) => {
          if(error.code === 'auth/email-already-in-use'){
            console.error('Email already in use');
            reject('Email already in use');
          } else {
            console.error(error);
          }
          reject(error);
        });
    });
    // if (!this.auth) {
    //   console.error('Firebase has not been initialized yet.');
    //   return;
    // }
    // createUserWithEmailAndPassword(this.auth, email, password)
    //   .then((userCredential) => {
    //     this.emailIsRegistered = false;
    //   })
    //   .catch((error) => {
    //     if(error.code === 'auth/email-already-in-use'){
    //       this.emailIsRegistered = true;
    //     } else {
    //       this.emailIsRegistered = false;
    //       console.error(error);
    //     }
    //   });
  }


  async userLogin(email: string, password: string){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    console.log(this.loginError);
    this.loginError = false;
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      sessionStorage.setItem('isUserLoggedIn', 'true');
      this.isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn') === 'true';
      this.user = userCredential.user;
      console.log('auth user is ', this.user);
      this.loginError = false;
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.loginError = true;
    }
  }


  async guestLogin(){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    this.loginError = false;
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, 'guest@oliver-jung.dev', '123456');
      sessionStorage.setItem('isGuestLogin', 'true');
      this.isGuestLogin = sessionStorage.getItem('isGuestLogin') === 'true';
      sessionStorage.setItem('isUserLoggedIn', 'true');
      this.isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn') === 'true';
      this.user = userCredential.user;
      this.loginError = false;
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.loginError = true;
    }
  }
  

  userSignOut(){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    signOut(this.auth)
    .then(() => {
      sessionStorage.setItem('isUserLoggedIn', 'false');
      this.isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn') === 'true';
      sessionStorage.setItem('isGuestLogin', 'false');
      this.isGuestLogin = sessionStorage.getItem('isGuestLogin') === 'true';
      this.router.navigate(['/login']);
      console.log('User signed out!');
    });
  }


  changeUserPassword(newPassword: string){
    console.log(this.user);
    if (this.user) {
      updatePassword(this.user, newPassword)
    }
  }
}
