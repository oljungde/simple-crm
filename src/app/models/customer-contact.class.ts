export class CustomerContact {
    customerContactId: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    position: string | undefined;
    customerRef: string = '';
    customerId: string | undefined;

    constructor(data?: any) {
        if (data) {
            this.customerContactId = data.customerContactId;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.phone = data.phone;
            this.position = data.position;
            this.customerRef = data.customerRef;
        }
    }

    toJSON() {
        return {
        customerContactId: this.customerContactId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        position: this.position,
        customerRef: this.customerRef
        };
    }
}