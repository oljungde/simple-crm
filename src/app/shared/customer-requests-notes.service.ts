import { Injectable, inject } from '@angular/core';
import { CustomerRequestNote } from '../models/customer-request-note.class';
import { Firestore, addDoc, collection, updateDoc, query,  where, orderBy, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestsNotesService {
  loading: boolean = false;
  newCustomerRequestNote = new CustomerRequestNote();
  customerRequestNoteId: string = '';
  firestore: Firestore = inject(Firestore);
  customerRequestsNotesCollection = collection(this.firestore, 'customerRequestsNotes');


  constructor() { }


  saveNewCustomerRequestNote(customerRequestNote?: CustomerRequestNote) {
    this.loading = true;
    const customerRequestNoteToSave = customerRequestNote ? customerRequestNote : this.newCustomerRequestNote;
    console.log('customerRequestNoteToSave is: ', customerRequestNoteToSave);
    addDoc(this.customerRequestsNotesCollection, customerRequestNoteToSave.toJSON())
      .then((docRef: any) => {
        this.customerRequestNoteId = docRef.id;
        updateDoc(docRef, { customerRequestNoteId: docRef.id });
        this.loading = false;
      });
  }

  getNotesByRequestRef(requestRef: string) {
      return new Observable(observer => {
        const customerRequestNotesQuery = query(
          this.customerRequestsNotesCollection, where('customerRequestRef', '==', requestRef),
          orderBy('dateCreated', 'desc')
        );
        const unsubscribe = onSnapshot(customerRequestNotesQuery, (querySnapshot) => {
          let customerRequestNotes: any = [];
          querySnapshot.forEach((doc) => {
            let customerRequestNoteData = doc.data();
            customerRequestNoteData['id'] = doc.id;
            customerRequestNotes.push(customerRequestNoteData);
          });
          observer.next(customerRequestNotes);
        });
      return unsubscribe;
    });
  }
}