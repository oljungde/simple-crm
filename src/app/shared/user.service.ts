import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loading: boolean = false;
  user = new User();
  newUser = new User();
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  allUsers$ = new BehaviorSubject<any[]>([]);
  allUsers = this.allUsers$.asObservable();
  userLoggedInId: any;
  userLoggedInFullName: any;

  constructor() {
    this.observeUsers();
  }


  /**
   * observe the users collection, sets the id and update the allUsers$ BehaviorSubject
   */
  observeUsers() {
    onSnapshot(this.usersCollection, (changes) => {
      let users: any = [];
      changes.forEach((change) => {
        let userData = change.data();
        userData['id'] = change.id;
        users.push(userData);
      });
      this.allUsers$.next(users);

    });
  }


  /**
   * get a user by id from firestore
   */
  async getUser() {
    const docRef = doc(this.usersCollection, this.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = new User(docSnap.data());
    } else {
      console.log('No such document!');
    }
  }


  /**
   * get a user ID by email from firestore
   * @param email is the email of the user to get the id for
   */
  async getUserIdByEmail(email: string) {
    const usersQuery = query(this.usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(usersQuery);
    querySnapshot.forEach((doc) => {
      this.userLoggedInId = doc.id;
    });
  }


  /**
   * get a user full name by id from firestore
   * @param userId is the id of the user to get the full name for
   * @returns the full name of the user
   */
  async getUserFullNameById(userId: string) {
    const docRef = doc(this.usersCollection, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()['fullName'];
    } else {
      console.log('No such document!');
    }
  }


  /**
   * save a new user
   * @param newUser is an instance of User
   */
  saveNewUser(newUser?: User) {
    this.loading = true;
    const userToSave = newUser ? newUser : this.newUser;
    addDoc(this.usersCollection, userToSave.toJSON())
      .then((docRef: DocumentReference) => {
        this.userId = docRef.id;
        updateDoc(docRef, { userId: docRef.id });
        this.loading = false;
      });
  }


  /**
   * update a user
   * @param user is an instance of User
   */
  updateUser(user?: User) {
    this.loading = true;
    const docRef = doc(this.usersCollection, this.userId);
    updateDoc(docRef, user?.toJSON())
      .then(() => {
        this.userId = docRef.id;
        updateDoc(docRef, { userId: docRef.id });
        this.loading = false;
      });
  }
}