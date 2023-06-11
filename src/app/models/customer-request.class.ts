export class CustomerRequest {
    customerRequestId: string = '';
    customerRef: string = '';
    userRef: string = '';
    customerContactRef: string = '';
    title: string = '';
    description: string = '';
    status: string = '';
    priority: string = '';
    dateRequested: string = '';
    dueDate: string = '';
    subjectArea: string = '';
    assingedTo: string = '';


    constructor(data?: any) {
        if (data) {
            this.customerRequestId = data.customerRequestId;
            this.customerRef = data.customerRef;
            this.userRef = data.userRef;
            this.customerContactRef = data.customerContactRef;
            this.title = data.title;
            this.description = data.description;
            this.status = data.status;
            this.priority = data.priority;
            this.dateRequested = data.dateRequested;
            this.subjectArea = data.subjectArea;
            this.dueDate = data.dueDate;
            this.assingedTo = data.assingedTo;
        }
    }


    toJSON() {
        return {
        customerRequestId: this.customerRequestId,
        customerRef: this.customerRef,
        userRef: this.userRef,
        customerContactRef: this.customerContactRef,
        title: this.title,
        description: this.description,
        status: this.status,
        priority: this.priority,
        dateRequested: this.dateRequested,
        subjectArea: this.subjectArea,
        dueDate: this.dueDate,
        assingedTo: this.assingedTo
        };
    }
}