import { Injectable, inject } from '@angular/core';
import { CustomerRequestNote } from '../models/customer-request-note.class';
import { Firestore, addDoc, collection, updateDoc, query, where, orderBy, onSnapshot } from '@angular/fire/firestore';
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


  /**
   * saving a new customer request note
   * @param customerRequestNote is an instance of CustomerRequestNote
   */
  saveNewCustomerRequestNote(customerRequestNote?: CustomerRequestNote) {
    this.loading = true;
    const customerRequestNoteToSave = customerRequestNote ? customerRequestNote : this.newCustomerRequestNote;
    addDoc(this.customerRequestsNotesCollection, customerRequestNoteToSave.toJSON())
      .then((docRef: any) => {
        this.customerRequestNoteId = docRef.id;
        updateDoc(docRef, { customerRequestNoteId: docRef.id });
        this.loading = false;
      });
  }


  /**
   * get all notes for a customer request from firestore
   * @param requestRef is the customer request reference of the customer request notes to get the note for the request
   * @returns 
   */
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