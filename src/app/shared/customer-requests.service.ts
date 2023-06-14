import { Injectable, inject } from '@angular/core';
import { CustomerRequest } from '../models/customer-request.class';
import { DocumentReference, Firestore, addDoc, collection, onSnapshot, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestsService {
  loading: boolean = false;
  newCustomerRequest = new CustomerRequest();
  customerRequestId: string = '';
  firestore: Firestore = inject(Firestore);
  customerRequestsCollection = collection(this.firestore, 'customerRequests');
  allCustomerRequests$ = new BehaviorSubject<any[]>([]);
  allCustomerRequests = this.allCustomerRequests$.asObservable();

  constructor() {
    this.observeCustomerRequests();
  }


  observeCustomerRequests() {
    onSnapshot(this.customerRequestsCollection, (changes) => {
      let customerRequests: any = [];
      changes.forEach((change) => {
        let customerRequestData = change.data();
        customerRequestData['id'] = change.id;
        customerRequests.push(customerRequestData);
      });
      this.allCustomerRequests$.next(customerRequests);
      console.log('Recieved customer request changes: ', this.allCustomerRequests$.value);
    });
  }


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


  getCustomerRequests(customerRef: string): any {
    return new Observable(observer => {
      const customerRequestsQuery = query(this.customerRequestsCollection, where('customerRef', '==', customerRef));
      const unsubscribe = onSnapshot(customerRequestsQuery, (querySnapshot) => {
        let customerRequestsData: any = [];
        querySnapshot.forEach((customerRequest: any) => {
          let customerRequestData = customerRequest.payload.doc.data();
          customerRequestData['id'] = customerRequest.payload.doc.id;
          customerRequestsData.push(customerRequestData);
        });
        observer.next(customerRequestsData);
      });
      return unsubscribe;
    });
  }
}