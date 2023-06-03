import { Injectable, OnInit, Inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isUserLoggedIn: boolean = false;
  loginError: boolean = false;


  constructor(@Inject(Auth) private auth: Auth, private router: Router) { }


  ngOnInit() {
  }


  registerUser(email: string, password: string){
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) =>
    {
      // this.addNewUserToFirebase(userCredential.user.uid)
    })
    // password.value = '';
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
      this.isUserLoggedIn = true;
      const user = userCredential.user;
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
      this.isUserLoggedIn = false;
      console.log('User signed out!');
    });
  }
}
