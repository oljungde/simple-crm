import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { User } from './models/user.class';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './models/customer.class';
import { CustomerContact } from './models/customer-contact.class';

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

  customerContact = new CustomerContact();
  newCustomerContact = new CustomerContact();
  customerContactId: string = '';
  customerContactsCollection = collection(this.firestore, 'customerContacts');
  allCustomerContacts$ = new BehaviorSubject<any[]>([]);
  allCustomerContacts = this.allCustomerContacts$.asObservable();


  customerContacts: any = [];


  constructor() {
    this.observeUsers();
    this.observeCustomers();
    this.observeCustomerContacts();
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


observeCustomerContacts() {
  onSnapshot(this.customerContactsCollection, (changes) => {
    let customerContacts: any = [];
    changes.forEach((change) => {
      let customerContactData = change.data();
      customerContactData['id'] = change.id;
      customerContacts.push(customerContactData);
    });
    this.allCustomerContacts$.next(customerContacts);
    console.log('Recieved customer contact changes: ', this.allCustomerContacts$.value);
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
    // console.log('Current customer is ', this.newCustomer);
    // console.log('Customer to save is ', customerToSave);
    console.log('Customer to save is ', customerToSave.toJSON());
    debugger;
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


  saveNewCustomerContact(newCustomerContact?: CustomerContact) {
    this.loading = true;
    const customerContactToSave = newCustomerContact ? newCustomerContact : this.newCustomerContact;
    console.log('Customer contact to save is ', customerContactToSave.toJSON());
    addDoc(this.customerContactsCollection, customerContactToSave.toJSON())
      .then((docRef: DocumentReference) => {
      console.log('Customer contact added successfully', docRef);
      this.customerContactId = docRef.id;
      updateDoc(docRef, {customerContactId: docRef.id});
      this.loading = false;
    });
  }
}