export class CustomerRequest {
    customerRequestId: string = '';
    customerRef: string = '';
    userRef: string = '';
    customerContactRef: string = '';
    title: string = '';
    description: string = '';
    customerContactName: string = '';
    status: string = '';
    priority: string = '';
    dateRequested: string = '';
    dueDate: string = '';
    subjectArea: string = '';
    assignedTo: string = '';
    createdBy: string = '';


    constructor(data?: any) {
        if (data) {
            this.customerRequestId = data.customerRequestId;
            this.customerRef = data.customerRef;
            this.userRef = data.userRef;
            this.customerContactRef = data.customerContactRef;
            this.title = data.title;
            this.description = data.description;
            this.customerContactName = data.customerContactName;
            this.status = data.status;
            this.priority = data.priority;
            this.dateRequested = data.dateRequested;
            this.subjectArea = data.subjectArea;
            this.dueDate = data.dueDate;
            this.assignedTo = data.assingedTo;
            this.createdBy = data.createdBy;
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
        customerContactName: this.customerContactName,
        status: this.status,
        priority: this.priority,
        dateRequested: this.dateRequested,
        subjectArea: this.subjectArea,
        dueDate: this.dueDate,
        assignedTo: this.assignedTo,
        createdBy: this.createdBy
        };
    }
}