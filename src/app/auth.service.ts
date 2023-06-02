import { Injectable, OnInit, Inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isUserLoggedIn: boolean = true;
  ;

  constructor(@Inject(Auth) private auth: Auth) { }


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


  signInWithEmailAndPassword(email: string, password: string){
    this.isUserLoggedIn = true;
    if (!this.auth) {
      console.error('Firebase has not been initialized yet.');
      return;
    }
  }
}
