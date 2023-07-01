export class CustomerRequestNote {
    customerRequestNoteId: string = '';
    note: string = '';
    customerRequestRef: string = '';
    userRef: string = '';
    dateCreated: Date = new Date();


    constructor(data?: any) {
        if (data) {
            this.customerRequestNoteId = data.customerRequestNoteId;
            this.note = data.note;
            this.customerRequestRef = data.customerRequestRef;
            this.userRef = data.userRef;
            this.dateCreated = data.dateCreated;
        }
    }


    toJSON() {
        return {
            customerRequestNoteId: this.customerRequestNoteId,
            note: this.note,
            customerRequestRef: this.customerRequestRef,
            userRef: this.userRef,
            dateCreated: this.dateCreated
        };
    }
}