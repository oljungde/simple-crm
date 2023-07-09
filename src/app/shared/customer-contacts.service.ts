import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { CustomerContact } from '../models/customer-contact.class';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactsService {
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  customerContact = new CustomerContact();
  newCustomerContact = new CustomerContact();
  customerContactId: string = '';
  customerContactsCollection = collection(this.firestore, 'customerContacts');
  allCustomerContacts$ = new BehaviorSubject<any[]>([]);
  allCustomerContacts = this.allCustomerContacts$.asObservable();

  customerContacts: any = [];
  customerContacts$: any = [];

  constructor() {
    this.observeCustomerContacts();
  }


  /**
   * observe the customer contacts collection, sets the id and update the allCustomerContacts$ BehaviorSubject
   */
  observeCustomerContacts() {
    onSnapshot(this.customerContactsCollection, (changes) => {
      let customerContacts: any = [];
      changes.forEach((change) => {
        let customerContactData = change.data();
        customerContactData['id'] = change.id;
        customerContacts.push(customerContactData);
      });
      this.allCustomerContacts$.next(customerContacts);
    });
  }

  /**
  * saving a new customer contact
  * @param newCustomerContact is an instance of CustomerContact
  */
  saveNewCustomerContact(newCustomerContact?: CustomerContact) {
    this.loading = true;
    const customerContactToSave = newCustomerContact ? newCustomerContact : this.newCustomerContact;
    addDoc(this.customerContactsCollection, customerContactToSave.toJSON())
      .then((docRef: DocumentReference) => {
        this.customerContactId = docRef.id;
        updateDoc(docRef, { customerContactId: docRef.id });
        this.loading = false;
      });
  }


  /**
   * get the customer contacts for a customer from firestore and set the id for each customer contact
   * @param customerRef is the customer reference of the customer to get
   */
  getCustomerContacts(customerRef: string): Observable<any> {
    return new Observable(observer => {
      const customerContactsQuery = query(this.customerContactsCollection, where('customerRef', '==', customerRef));
      const unsubscribe = onSnapshot(customerContactsQuery, (querySnapshot) => {
        let customerContacts: any = [];
        querySnapshot.forEach((doc) => {
          let customerContactData = doc.data();
          customerContactData['id'] = doc.id;
          customerContacts.push(customerContactData);
        });
        observer.next(customerContacts);
      });
      return unsubscribe;
    });
  }


  /**
   * updating a customer contact
   * @param customerContact is an instance of CustomerContact
   */
  updateCustomerContact(customerContact?: CustomerContact) {
    this.loading = true;
    let customerContactId = customerContact?.customerContactId;
    const docRef = doc(this.customerContactsCollection, customerContactId);
    updateDoc(docRef, customerContact?.toJSON())
      .then(() => {
        this.customerContactId = docRef.id;
        updateDoc(docRef, { customerContactId: docRef.id });
        this.loading = false;
      });
  }
}