import { Injectable, inject } from '@angular/core';
import { CustomerRequest } from '../models/customer-request.class';
import { DocumentReference, Firestore, addDoc, collection, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestsService {
  loading: boolean = false;
  newCustomerRequest = new CustomerRequest();
  customerRequestId: string = '';
  firestore: Firestore = inject(Firestore);
  customerRequestsCollection = collection(this.firestore, 'customerRequests');

  constructor() { }


  saveNewCustomerRequest(customerRequest?: CustomerRequest) {
    this.loading = true;
    const customerRequestToSave = customerRequest ? customerRequest : this.newCustomerRequest;
    console.log('customerRequestToSave is: ', customerRequestToSave);
    addDoc(this.customerRequestsCollection, customerRequestToSave.toJSON())
      .then((docRef: DocumentReference) => {
        console.log('new customer request added: ', docRef);
        this.customerRequestId = docRef.id;
        updateDoc(docRef, { customerRequestId: docRef.id });
        this.loading = false;
      });
  }
}