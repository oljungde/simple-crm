import { Injectable, inject } from '@angular/core';
import { CustomerRequestNote } from '../models/customer-request-note.class';
import { Firestore, collection } from '@angular/fire/firestore';

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
}
