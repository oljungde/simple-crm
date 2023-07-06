import { Injectable, inject } from '@angular/core';
import { CustomerRequest } from '../models/customer-request.class';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestsService {
  loading: boolean = false;
  newCustomerRequest = new CustomerRequest();
  customerRequestId: string = '';
  currentCustomerRequest: any;
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
      const customerRequestsQuery = query(
        this.customerRequestsCollection, where('customerRef', '==', customerRef),
        orderBy('dateRequested', 'desc')
      );
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


  async getCurrentCustomerRequest() {
    const docRef = doc(this.customerRequestsCollection, this.customerRequestId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.currentCustomerRequest = new CustomerRequest(docSnap.data());
    } else {
      console.log('No such document!');
    }
  }
  // Hier weiter
  // funktion schreiben, die sowohl userRef als auch status als Parameter nimmt und dann die entsprechenden customerRequests zurückgibt
  getCustomerRequestsAsTasksByUserRef(userRef: string): Observable<any> {
    return new Observable(observer => {
      let customerRequestsAsTasks: any = [];
      const statuses = ['pending', 'in progress'];
      let completedStatuses = 0;

      const getStatusRequests = (status: string) => {
        const customerRequestsQuery = query(
          this.customerRequestsCollection,
          where('assignedToUserRef', '==', userRef),
          where('status', '==', status),
          orderBy('dueDate', 'asc')
        );
        return onSnapshot(customerRequestsQuery, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let customerRequestData = doc.data();
            customerRequestData['id'] = doc.id;
            customerRequestsAsTasks.push(customerRequestData);
          });
          completedStatuses++;
          if (completedStatuses === statuses.length) {
            observer.next(customerRequestsAsTasks);
            observer.complete();
          }
        });
      }

      const unsubscribes = statuses.map(status => getStatusRequests(status));
      return () => {
        for (let unsub of unsubscribes) {
          unsub();
        }
      };
    });
  }



  async updateCustomerRequest(customerRequest: CustomerRequest) {
    this.loading = true;
    const docRef = doc(this.customerRequestsCollection, this.customerRequestId);
    await updateDoc(docRef, customerRequest.toJSON())
      .then(() => {
        console.log('Customer Request updated');
        this.loading = false;
      });
  }
}