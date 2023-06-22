import { Injectable, inject } from '@angular/core';
import { CustomerRequest } from '../models/customer-request.class';
import { DocumentReference, Firestore, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

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


  customerRequests: any = [];
  customerRequests$: any = [];

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


  getCustomerRequests(customerRef: string): Observable<any> {
    return new Observable(observer => {
      const customerRequestsQuery = query(this.customerRequestsCollection, where('customerRef', '==', customerRef));
      const unsubscribe = onSnapshot(customerRequestsQuery, (querySnapshot) => {
        let customerRequests: any = [];
        querySnapshot.forEach((doc) => {
          let customerRequestData = doc.data();
          customerRequestData['id'] = doc.id;
          customerRequests.push(customerRequestData);
        });
        observer.next(customerRequests);
      });
      return unsubscribe;
    });
  }
}