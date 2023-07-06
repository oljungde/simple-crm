import { Injectable, inject } from '@angular/core';
import { Customer } from '../models/customer.class';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  customer = new Customer();
  newCustomer = new Customer();
  customerId: string = '';
  customersCollection = collection(this.firestore, 'customers');
  allCustomers$ = new BehaviorSubject<any[]>([]);
  allCustomers = this.allCustomers$.asObservable();

  constructor() {
    this.observeCustomers();
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


  saveNewCustomer(newCustomer?: Customer) {
    this.loading = true;
    const customerToSave = newCustomer ? newCustomer : this.newCustomer;
    console.log('Customer to save is ', customerToSave.toJSON());
    addDoc(this.customersCollection, customerToSave.toJSON())
      .then((docRef: DocumentReference) => {
        console.log('Customer added successfully', docRef);
        this.customerId = docRef.id;
        updateDoc(docRef, { customerId: docRef.id });
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


  async getCustomerNameById(customerId: string) {
    const docRef = doc(this.customersCollection, customerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()['name'];
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
        updateDoc(docRef, { customerId: docRef.id });
        console.log('Document successfully updated! ', this.customer);
        this.loading = false;
      });
  }
}