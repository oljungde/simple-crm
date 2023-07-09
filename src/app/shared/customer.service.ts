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


  /**
   * observe the customers collection, sets the id and update the allCustomers$ BehaviorSubject
   */
  observeCustomers() {
    onSnapshot(this.customersCollection, (changes) => {
      let customers: any = [];
      changes.forEach((change) => {
        let customerData = change.data();
        customerData['id'] = change.id;
        customers.push(customerData);
      });
      this.allCustomers$.next(customers);
    });
  }


  /**
   * save a new customer
   * @param newCustomer is an instance of Customer
   */
  saveNewCustomer(newCustomer?: Customer) {
    this.loading = true;
    const customerToSave = newCustomer ? newCustomer : this.newCustomer;
    addDoc(this.customersCollection, customerToSave.toJSON())
      .then((docRef: DocumentReference) => {
        this.customerId = docRef.id;
        updateDoc(docRef, { customerId: docRef.id });
        this.loading = false;
      });
  }


  /**
   * get all customers from firestore and set the id for each customer
   */
  async getCustomer() {
    const docRef = doc(this.customersCollection, this.customerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.customer = new Customer(docSnap.data());
    } else {
      console.log('No such document!');
    }
  }


  /**
   * get a customer name by customer id from firestore
   * @param customerId is the customer id of the customer to get
   * @returns a customer name
   */
  async getCustomerNameById(customerId: string) {
    const docRef = doc(this.customersCollection, customerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()['name'];
    } else {
      console.log('No such document!');
    }
  }


  /**
   * update a customer
   * @param customer is an instance of Customer
   */
  updateCustomer(customer?: Customer) {
    this.loading = true;
    const docRef = doc(this.customersCollection, this.customerId);
    updateDoc(docRef, customer?.toJSON())
      .then(() => {
        this.customerId = docRef.id;
        updateDoc(docRef, { customerId: docRef.id });
        this.loading = false;
      });
  }
}