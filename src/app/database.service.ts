import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from './models/user.class';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './models/customer.class';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  loading: boolean = false;
  user = new User();
  newUser = new User();
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  allUsers$ = new BehaviorSubject<any[]>([]);
  allUsers = this.allUsers$.asObservable();

  customer = new Customer();
  newCustomer = new Customer();
  customerId: string = '';
  customersCollection = collection(this.firestore, 'customers');
  allCustomers$ = new BehaviorSubject<any[]>([]);
  allCustomers = this.allCustomers$.asObservable();


  constructor() {
    this.observeUsers();
    this.observeCustomers();
  }


observeUsers() {
  onSnapshot(this.usersCollection, (changes) => {
    let users: any = [];
    changes.forEach((change) => {
      let userData = change.data();
      userData['id'] = change.id;
      users.push(userData);
    });
    this.allUsers$.next(users);
    console.log('Recieved user changes: ', this.allUsers$.value);
  });
}


observeCustomers() {
  onSnapshot(this.customersCollection, (changes) => {
    let customers: any = [];
    changes.forEach((change) => {
      let customerData = change.data();
      customerData['id'] = change.id;
      customers.push(customerData);
    });
    this.allCustomers$.next(customers);
    console.log('Recieved customer changes: ', this.allCustomers$.value);
  });
}


  async getUser() {
    const docRef = doc(this.usersCollection, this.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = new User(docSnap.data());
      console.log('getUser is: ', this.user);
    } else {
      console.log('No such document!');
    } 
  }


  saveNewUser(newUser?: User) {
    this.loading = true;
    const userToSave = newUser ? newUser : this.newUser;
    console.log('Current user is ', this.newUser);
    addDoc(this.usersCollection, userToSave.toJSON())
      .then((docRef: DocumentReference) => {
      console.log('User added successfully', docRef);
      this.userId = docRef.id;
      updateDoc(docRef, {userId: docRef.id});
      this.loading = false;
    });
  }


  updateUser(user?: User) {
    this.loading = true;
    const docRef = doc(this.usersCollection, this.userId);
    updateDoc(docRef, user?.toJSON())
      .then(() => {
        this.userId = docRef.id;
        updateDoc(docRef, {userId: docRef.id});
        console.log('Document successfully updated! ', this.user);
        this.loading = false;
      });
  }


  saveNewCustomer(newCustomer?: Customer) {
    this.loading = true;
    const customerToSave = newCustomer ? newCustomer : this.newCustomer;
    console.log('Current customer is ', this.newCustomer);
    console.log('Customer to save is ', customerToSave);
    console.log('Customer to save is ', customerToSave.toJSON());
    addDoc(this.customersCollection, customerToSave.toJSON())
      .then((docRef: DocumentReference) => {
      console.log('Customer added successfully', docRef);
      this.customerId = docRef.id;
      updateDoc(docRef, {customerId: docRef.id});
      this.loading = false;
    });
  }


  async getCustomer() {
    const docRef = doc(this.customersCollection, this.customerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.customer = new Customer(docSnap.data());
      console.log('getCustomer is: ', this.customer);
    } else {
      console.log('No such document!');
    } 
  }


  updateCustomer(customer?: Customer) {
    this.loading = true;
    const docRef = doc(this.customersCollection, this.customerId);
    updateDoc(docRef, customer?.toJSON())
      .then(() => {
        this.customerId = docRef.id;
        updateDoc(docRef, {customerId: docRef.id});
        console.log('Document successfully updated! ', this.customer);
        this.loading = false;
      });
  }
}