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


  /**
   * observe the customer requests collection, sets the id and update the allCustomerRequests$ BehaviorSubject
   */
  observeCustomerRequests() {
    onSnapshot(this.customerRequestsCollection, (changes) => {
      let customerRequests: any = [];
      changes.forEach((change) => {
        let customerRequestData = change.data();
        customerRequestData['id'] = change.id;
        customerRequests.push(customerRequestData);
      });
      this.allCustomerRequests$.next(customerRequests);
    });
  }


  /**
   * save a new customer request
   * @param customerRequest is an instance of CustomerRequest
   */
  saveNewCustomerRequest(customerRequest?: CustomerRequest) {
    this.loading = true;
    const customerRequestToSave = customerRequest ? customerRequest : this.newCustomerRequest;
    addDoc(this.customerRequestsCollection, customerRequestToSave.toJSON())
      .then((docRef: DocumentReference) => {
        this.customerRequestId = docRef.id;
        updateDoc(docRef, { customerRequestId: docRef.id });
        this.loading = false;
      });
  }


  /**
   *get the customer requests for a customer from firestore and set the id for each customer request 
   * @param customerRef is the customer reference of the customer to get the customer requests for
   * @returns an Observable with the customer requests for the customer
   */
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


  /**
   * get the customer request which is currently selected
   */
  async getCurrentCustomerRequest() {
    const docRef = doc(this.customerRequestsCollection, this.customerRequestId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.currentCustomerRequest = new CustomerRequest(docSnap.data());
    } else {
      console.log('No such document!');
    }
  }


  /**
   * get the customer requests as tasks for a user from firestore for each status and set the id for each customer request
   * @param userRef is the user reference of the user to get the customer requests as tasks for
   * @returns an Observable with the customer requests as tasks for the user
   */
  getCustomerRequestsAsTasksByUserRef(userRef: string): Observable<any> {
    return new Observable(observer => {
      let customerRequestsAsTasks: any = [];
      const statuses = ['pending', 'in_progress'];
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


  /**
   * update a customer request
   * @param customerRequest is an instance of CustomerRequest
   */
  async updateCustomerRequest(customerRequest: CustomerRequest) {
    this.loading = true;
    const docRef = doc(this.customerRequestsCollection, this.customerRequestId);
    await updateDoc(docRef, customerRequest.toJSON())
      .then(() => {
        this.loading = false;
      });
  }
}